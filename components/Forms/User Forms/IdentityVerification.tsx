import axios from 'axios';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { TiTick } from 'react-icons/ti';
import Webcam from 'react-webcam';

import Button from '../../UI/Button';
import Form from '../../UI/Form';
import { useAuthenticate } from '../../../context/AuthProvider';
import axiosInstance from '../../../utils/axios';

interface IProps {
  isIDVerified?: IUser['isIDVerified'];
  IDimage?: IUser['IDimage'];
}
const IdentityVerification: React.FC<IProps> = ({ isIDVerified, IDimage }) => {
  const webcamRef = useRef<Webcam>(null!); // Specify Webcam as the generic type
  const [recording, setRecording] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(
    IDimage ? true : false
  );
  const [selectedFile, setSelectedFile] = useState<File>();
  const { uuid } = useAuthenticate();
  const router = useRouter();

  // Handle Upload File
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const currFile = event.target?.files?.[0];
    setSelectedFile(currFile);
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      try {
        await axiosInstance.put(`/api/user/${uuid}/createID`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('ID image uploaded successfully.');
        setTimeout(() => {
          router.reload();
        }, 3000);
      } catch (error) {
        // Handle error
        toast.error('Something went wrong.');
      }
    }
  };
  useEffect(() => {
    if (IDimage) {
      let mediaStream: MediaStream | null = null;

      const requestCameraPermission = async () => {
        try {
          // Request camera permission from the user
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });

          // Set camera permission to true
          setCameraPermission(true);

          // Store the media stream for cleanup
          mediaStream = stream;
        } catch (error) {
          console.error('Error requesting camera permission:', error);
        }
      };

      // Call the camera permission function
      requestCameraPermission();

      // Cleanup function to stop the camera stream
      return () => {
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
        }
      };
    }
  }, [IDimage]);

  const startRecording = () => {
    if (IDimage) {
      if (
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.srcObject
      ) {
        const videoStream = webcamRef.current.video.srcObject as MediaStream;

        // Create a media recorder to record the video stream
        const mediaRecorder = new MediaRecorder(videoStream, {
          mimeType: 'video/webm',
        });

        const chunks: Blob[] = [];

        // Event handler when data is available from the media recorder
        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        // Event handler when recording starts
        mediaRecorder.onstart = () => {
          setRecording(true);
        };

        // Event handler when recording stops
        mediaRecorder.onstop = () => {
          const recordedBlob = new Blob(chunks, { type: 'video/webm' });

          // Set recording state to false
          setRecording(false);

          // Send the recorded video blob for verification
          sendVerificationRequest(recordedBlob);
        };

        // Start recording
        mediaRecorder.start();

        // Stop recording after 15 seconds
        setTimeout(() => {
          mediaRecorder.stop();
        }, 15000);
      }
    }
  };

  const sendVerificationRequest = (videoBlob: Blob) => {
    if (IDimage) {
      const formData = new FormData();

      // Append the video blob to the form data
      formData.append('video', videoBlob, `${uuid}.webm`);

      // Send a verification request with the video blob
      axios
        .put(`http://localhost:4000/match_face?user_id=${uuid}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // Handle the verification response
          if (response.data.response === 'matched') {
            toast.success('Verification Process Status: Matched');
          } else {
            toast.error('Verification Process Status: Unknown');
          }
        })
        .catch((_error) => {
          // Handle errors
          toast.error('Something went wrong.');
        });
    }
  };

  // Render Verification with Conditions.
  const renderVerificationContent = () => {
    if (!isIDVerified && IDimage === undefined) {
      return (
        <div className='flex justify-center items-center '>
          <Form
            className='flex items-center gap-2 w-2/3 '
            OnSubmit={submitHandler}
          >
            <label className='w-full rounded relative inline-flex group items-center justify-center px-3.5 py-2  cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white'>
              <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-sm group-hover:w-full group-hover:h-16 opacity-10'></span>
              <span className='relative flex flex-col items-center justify-center'>
                Upload ID Image{' '}
                <span className='text-xs'>
                  (
                  {selectedFile
                    ? selectedFile.name
                    : 'Make Sure Your Face is Showing in your ID'}
                  )
                </span>
              </span>
              <input
                type='file'
                className='hidden'
                accept='application/pdf'
                onChange={handleFileChange}
              />
            </label>
            <Button type="submit" className='rounded-md bg-blue-500 p-4 text-white shadow-md hover:bg-blue-600'>
              <TiTick size={20} title='submit Uploaded Image' />
            </Button>
          </Form>
        </div>
      );
    } else {
      return <Button onClick={startRecording}>Verify Identity</Button>;
    }
  };
  return (
    <div className='flex flex-col justify-between gap-5 items-center min-h-[500px] relative'>
      <div className='flex flex-col gap-5 mb-16 items-center'>
        {IDimage && cameraPermission ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            videoConstraints={{ facingMode: 'user' }}
          />
        ) : (
          <p>
            {IDimage
              ? 'Please grant camera permission to proceed.'
              : 'Please provide an ID image to proceed.'}
          </p>
        )}
        <span className='text-gray-500 dark:text-white'>
          Please keep your face in frame during the verification process.
        </span>
      </div>

      <div className='absolute bottom-2 w-full'>
        {!recording ? (
          renderVerificationContent()
        ) : (
          <p className='text-white bg-blue-500 dark:bg-gray-900 cursor-not-allowed hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-2xl w-full text-base px-5 py-2.5 text-center'>
            Verifying
          </p>
        )}
      </div>
    </div>
  );
};

export default IdentityVerification;
