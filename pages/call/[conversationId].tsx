import { ZegoUser } from '@zegocloud/zego-uikit-prebuilt';
import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { LegacyRef } from 'react';

import { useAuthenticate } from '../../context/AuthProvider';
import { useSocket } from '../../context/SocketContext';
import axiosInstance from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';

interface IProps {
  conversation_id: string;
  receiverId: string;
  fullName: string;
}

const CallRoom: NextPage<IProps> = ({
  conversation_id,
  receiverId,
  fullName,
}) => {
  const { socket } = useSocket(); // Get the socket object from a custom hook
  const { uuid } = useAuthenticate(); // Get the UUID from a custom hook

  // Function to initiate the video call
  const myMeeting = async (element: HTMLElement) => {
    const appID = 1977067723; // Zego app ID
    const serverSecret = '8bf6539de5e99c85fe01db7e3ed23d7d'; // Zego server secret
    const { ZegoUIKitPrebuilt } = await import(
      '@zegocloud/zego-uikit-prebuilt'
    ); // Import the ZegoUIKitPrebuilt library dynamically

    // Generate a kit token for the test environment
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      conversation_id,
      uuid,
      fullName
    );
    // Create a ZegoUIKitPrebuilt instance
    const zc = ZegoUIKitPrebuilt.create(kitToken);

    if (zc) {
      zc.joinRoom({
        container: element, // Set the HTML element as the container for the video call
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // Set the scenario mode for a one-on-one call
        },

        showScreenSharingButton: true,
        showTurnOffRemoteCameraButton: true,
        showTurnOffRemoteMicrophoneButton: true,
        showRemoveUserButton: false,
        turnOnCameraWhenJoining: false,
        showPreJoinView: false,
        showMyMicrophoneToggleButton: true,
        layout: 'Sidebar',
        turnOnMicrophoneWhenJoining: false, // set this option to false to turn off the microphone when joining
        onJoinRoom: (_users: ZegoUser[]) => {
          socket.emit('call', { conversation_id, receiverId, fullName }); // Emit a 'call' event through the socket
        },
      });
    }
  };

  return (
    <div className='mt-28 min-h-screen bg-[#1d1e2e] dark:bg-[#1d1e2e] rounded-sm m-10 flex items-center justify-center'>
      <div
        ref={myMeeting as LegacyRef<HTMLDivElement>} // Assign the myMeeting function as the ref for the div element
        className='w-[100vw] h-[100vh]'
      ></div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { jwt_refresh, jwt_access } = req.cookies;
  const userId = getPayloadFromToken(jwt_refresh)?.sub;
  const { conversationId } = params as ParsedUrlQuery;
  const conversation_id = conversationId?.toString().replace('~', '');
  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const conversations = await axiosInstance.get(
      `/api/conversation/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt_access}`,
        },
      }
    );
    const { data } = await axiosInstance.get(`/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt_access}`,
      },
    });
    const full_name = `${data.user.first_name} ${data.user.last_name}`;
    let isValid = false;
    let receiverId = null;
    for (const conversation of conversations.data.conversations) {
      if (
        (conversation.Freelancer_id === userId ||
          conversation.client_id === userId) &&
        conversation._id === conversation_id
      ) {
        // If the user is the freelancer, set receiverId to the client ID, and vice versa
        receiverId =
          conversation.Freelancer_id === userId
            ? conversation.client_id
            : conversation.Freelancer_id;
        isValid = true;
        break;
      }
    }

    if (isValid)
      return {
        props: {
          conversation_id,
          receiverId,
          fullName: full_name,
        },
      };

    return {
      redirect: { destination: '/404', permanent: false },
    };
  } catch (error) {
    console.log(error);
    return { redirect: { destination: '/404', permanent: false } };
  }
};
export default CallRoom;
