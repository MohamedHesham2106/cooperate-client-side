import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import Button from '../../UI/Button';
import { useAuthenticate } from '../../../context/AuthProvider';

const IdentityVerification: React.FC = () => {
  const webcamRef = useRef<Webcam>(null!); // Specify Webcam as the generic type
  const [recording, setRecording] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const { uuid } = useAuthenticate();
  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    const requestCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraPermission(true);
        mediaStream = stream;
      } catch (error) {
        console.error('Error requesting camera permission:', error);
      }
    };

    requestCameraPermission();

    // Cleanup function to stop the camera stream
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  const startRecording = () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.srcObject
    ) {
      const videoStream = webcamRef.current.video.srcObject as MediaStream;
      const mediaRecorder = new MediaRecorder(videoStream, {
        mimeType: 'video/webm',
      });
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstart = () => {
        setRecording(true);
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: 'video/webm' });
        setRecording(false);
        downloadVideoBlob(recordedBlob, `${uuid}.webm`);
        sendVerificationRequest(recordedBlob);
      };

      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, 15000);
    }
  };

  const sendVerificationRequest = (videoBlob: Blob) => {
    const formData = new FormData();

    formData.append('video', videoBlob, `${uuid}.webm`);

    // console.log('user_id:', formData.get('user_id'));
    // console.log('video:', formData.get('video'));

    axios
      .post(`http://localhost:4000/match_face?user_id=${uuid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // Handle the verification response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };
  const downloadVideoBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Trigger the click event to start the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };
  return (
    <div className='flex flex-col justify-between gap-5 items-center min-h-[500px] relative'>
      <div className='flex flex-col gap-5 mb-16 items-center'>
        {cameraPermission ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            videoConstraints={{ facingMode: 'user' }}
          />
        ) : (
          <p>Please grant camera permission to proceed.</p>
        )}
        <span className='text-gray-500 dark:text-white'>
          Please keep your face in frame during the verification process.
        </span>
      </div>

      <div className='absolute bottom-2 w-full'>
        {recording ? (
          <p className='text-white bg-blue-500 dark:bg-gray-900 cursor-not-allowed  hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-2xl w-full text-base   px-5 py-2.5 text-center'>
            Verifying
          </p>
        ) : (
          <Button onClick={startRecording}>Verify Identity</Button>
        )}
      </div>
    </div>
  );
};

export default IdentityVerification;
