import Image from 'next/image';
import { ChangeEvent, DragEvent, FC, MouseEvent, useState } from 'react';
//import axiosInstance from '../../utils/axios';
import { ImCross } from 'react-icons/im';

import Button from '../../UI/Button';
import Error from '../../UI/Error';
import Form from '../../UI/Form';
import Modal from '../../UI/Modal';
interface IProps {
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  userId?: string;
}

const ProfilePictureModal: FC<IProps> = ({ onClose, userId }) => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [image, setImage] = useState<File | null>(null);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    setError('');
    const currFile = event.target?.files?.[0];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (currFile && validImageTypes.includes(currFile.type)) {
      setImage(currFile);
    } else {
      setError('Only images in the formats GIF, JPEG, and PNG are accepted.');
    }
  };
  const handleOndragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleOndrop = (event: DragEvent<HTMLDivElement>) => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    // grab the image file
    const imageFile = event.dataTransfer.files[0];
    setError('');
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (imageFile && validImageTypes.includes(imageFile.type)) {
      setImage(imageFile);
    } else {
      setError('Only images in the formats GIF, JPEG, and PNG are accepted.');
    }
  };
  const removeImage = () => {
    setImage(null);
  };

  return (
    <Modal onClose={onClose} className='p-2 flex flex-col gap-5 justify-center'>
      <h1 className='text-2xl font-semibold'>Update Profile Picture</h1>
      {error && <Error message={error} />}
      <Form className='flex flex-col w-full p-5 '>
        <div className='p-3  w-full rounded-md'>
          <div
            onDragOver={handleOndragOver}
            onDrop={handleOndrop}
            className='h-56 w-full overflow-hidden relative border-4 items-center rounded-md cursor-pointer   border-blue-700 border-dotted'
          >
            <input
              type='file'
              onChange={handleFile}
              className='h-full w-full opacity-0 z-10 absolute'
              name='files'
            />
            <div className='h-full w-full absolute z-1 flex flex-col justify-center items-center top-0'>
              <svg
                aria-hidden='true'
                className='w-20 h-20 mb-3 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                ></path>
              </svg>
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {image && (
              <div className='w-full h-16 flex items-center justify-between rounded p-3 bg-white'>
                <div className='flex flex-row items-center gap-2'>
                  <div className='h-12 w-12 '>
                    <Image
                      className='w-full h-full rounded'
                      src={URL.createObjectURL(image)}
                      alt='profile'
                      width={60}
                      height={60}
                    />
                  </div>
                  <span className='truncate w-44'>{image.name}</span>
                </div>
                <div
                  onClick={removeImage}
                  className='h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm'
                >
                  <ImCross color='#fff' />
                </div>
              </div>
            )}
          </div>
        </div>

        <Button type='submit' onClick={formSubmitted ? onClose : undefined}>
          Update Profile
        </Button>
      </Form>
    </Modal>
  );
};
export default ProfilePictureModal;
