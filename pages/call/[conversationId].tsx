import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useCallback, useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import SimplePeer from 'simple-peer';

import Button from '../../components/UI/Button';
import Container from '../../components/UI/Container';
import { useSocket } from '../../context/SocketContext';
import axiosInstance from '../../utils/axios';
import { getPayloadFromToken } from '../../utils/cookie';

interface IProps {
  receiverId: string;
}

const CallRoom: NextPage<IProps> = ({ receiverId }) => {
  const { socket } = useSocket();
  const [openCam, setOpenCam] = useState<boolean>(false);
  const [usingCam, setUsingCam] = useState<boolean>(false);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | undefined>();
  const peerRef = useRef<Peer.Instance>();
  const [gotCall, setGotCall] = useState<boolean>(false);
  const [call, setCall] = useState<any>();
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);

  const handleAnswer = useCallback(() => {
    setGotCall(false);
    setCallAccepted(true);
    if (!call || !localStream || !socket) return;

    const newPeer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: localStream,
    });
    peerRef.current = newPeer;
    newPeer.on('signal', (data) => {
      socket.emit('answer', { signal: data, receiverId });
    });
    newPeer.on('stream', (currentStream) => {
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = currentStream;
      }
    });
    newPeer.signal(call.signal);
  }, [call, localStream, receiverId, socket]);

  const handleCall = useCallback(() => {
    if (!socket?.connected) return;

    const newPeer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: localStream,
    });
    newPeer.on('signal', (data) => {
      console.log('signal el f handleCall', data);
      socket.emit('call', { signal: data, receiverId });
    });
    newPeer.on('stream', (currStream) => {
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = currStream;
      }
    });
    socket.on('answer', ({ signal }) => {
      setCallAccepted(true);
      newPeer.signal(signal);
    });
    peerRef.current = newPeer;
  }, [localStream, receiverId, socket]);
  const leaveCall = useCallback(() => {
    setCallEnded(true);
    if (peerRef.current) peerRef.current.destroy();

    window.location.reload();
  }, []);
  const handleOpenCam = useCallback(() => {
    setOpenCam((openCam) => !openCam);
  }, []);

  useEffect(() => {
    if (openCam && !usingCam) {
      // only create the stream if the camera is not currently being used
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then((currStream: MediaStream) => {
          setLocalStream(currStream);
          if (myVideoRef.current) {
            myVideoRef.current.srcObject = currStream;
          }
          setUsingCam(true); // set the state to true to indicate that the camera stream is currently being used
        });
    } else if (!openCam && usingCam) {
      // only remove the stream if the camera is currently being used
      if (localStream)
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = null;
      }
      setUsingCam(false); // set the state to false to indicate that the camera stream is no longer being used
    }
  }, [localStream, openCam, usingCam]);
  useEffect(() => {
    socket.on('call', (data) => {
      console.log('galy offer');
      console.log(data);
      setGotCall(true);

      setCall(data);
    });
  }, [socket]);

  return (
    <Container className='mt-24 min-h-screen p-5 bg-gray-700 rounded-sm m-5 grid grid-cols-1 gap-2 '>
      <div
        className={`${
          userVideoRef && !callEnded
            ? 'grid grid-cols-2 gap-3'
            : 'grid-cols-1 grid'
        }`}
      >
        {myVideoRef && openCam && (
          <div className='flex items-center justify-center'>
            <video muted autoPlay ref={myVideoRef} playsInline />
          </div>
        )}
        {userVideoRef && !callEnded && (
          <div className='flex items-center justify-center'>
            <video autoPlay ref={userVideoRef} playsInline />
          </div>
        )}
      </div>

      <div className='flex items-start justify-center gap-5'>
        {!usingCam && (
          <Button type='button' width='w-1/3' onClick={handleOpenCam}>
            Start Camera
          </Button>
        )}

        {usingCam && (
          <Button type='button' width='w-1/3' onClick={handleOpenCam}>
            Stop Camera
          </Button>
        )}
        {gotCall && (
          <Button type='button' width='w-1/3' onClick={handleAnswer}>
            Answer
          </Button>
        )}
        {callAccepted ? (
          <Button type='button' width='w-1/3' onClick={leaveCall}>
            Hang Up
          </Button>
        ) : (
          <Button type='button' width='w-1/3' onClick={handleCall}>
            Call
          </Button>
        )}
      </div>
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { jwt_refresh, jwt_access } = req.cookies;
  const userId = getPayloadFromToken(jwt_refresh).sub;
  const { conversationId } = params as ParsedUrlQuery;
  const conversation_id = conversationId?.toString().replace('~', '');
  if (!jwt_access) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const conversations = await axiosInstance.get(
      `/api/conversation/${userId}`
    );
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
