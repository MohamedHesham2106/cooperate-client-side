import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react';

import Button from '../../UI/Button';
import Error from '../../UI/Error';
import Form from '../../UI/Form';
import Modal from '../../UI/Modal';
import axiosInstance from '../../../utils/axios';

interface IProps {
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  userId: string;
  bio?: string;
}
const BioModal: FC<IProps> = ({ onClose, userId, bio }) => {
  const [biography, setBiography] = useState<string | undefined>(bio);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const router = useRouter();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axiosInstance
      .patch(`/api/user/${userId}`, {
        new_biography: biography,
      })
      .catch((error) => {
        const err = error as IError;
        const { message } = err.response.data;
        setError(message);
      })
      .finally(() => {
        setFormSubmitted(true);
        onClose();
        if (!error) {
          router.reload();
        }
      });
    setFormSubmitted(true);
  };
  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setBiography(value);
  };
  return (
    <Modal
      onClose={onClose}
      className='p-2 flex flex-col gap-5 justify-center '
    >
      <h1 className='text-2xl font-semibold'>Overview</h1>
      <div className='pl-3 '>
        <h1 className='text-base font-normal '>
          Use this space to show clients you have the skills and experience
          they're looking for.
        </h1>
        <ul className='list-disc pl-5 pt-6 flex flex-col gap-3'>
          <li>Describe your strengths and skills</li>
          <li>Highlight projects, accomplishments and education</li>
          <li>Keep it short and make sure it's error-free</li>
        </ul>
      </div>

      {error && <Error message={error} />}
      <Form OnSubmit={submitHandler} className='flex flex-col gap-5'>
        <div className='py-2 px-4 bg-white '>
          <label htmlFor='bio' className='sr-only'>
            Publish post
          </label>
          <textarea
            name='bio'
            onChange={changeHandler}
            rows={8}
            className='block p-5 w-full text-sm text-gray-800 bg-white border-2 border-black focus:ring-0 resize-none'
            value={biography}
            required
          ></textarea>
        </div>
        <Button type='submit' onClick={formSubmitted ? onClose : undefined}>
          Submit
        </Button>
      </Form>
    </Modal>
  );
};
export default BioModal;
