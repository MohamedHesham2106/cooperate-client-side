import { toast } from 'react-hot-toast';

import Button from './Button';

interface IProps {
  t: any;
}

const CallToast: React.FC<IProps> = ({ t }) => {
  return (
    <div
      id='toast-notification'
      className='p-4 text-gray-900 border  bg-white dark:bg-gray-600 rounded-lg shadow-lg dark:border-none min-w-[300px]'
      role='alert'
    >
      <div className='flex items-center flex-col gap-2'>
        <span className='mb-1 text-sm font-bold text-gray-900 dark:text-white '>
          New notification
        </span>
        <button
          onClick={() => toast.dismiss(t.id)}
          type='button'
          className='ml-auto -mx-1.5 -my-1.5 bg-white dark:bg-gray-600 dark:text-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 '
        >
          X
        </button>

        <Button type='button'>Accept</Button>
      </div>
    </div>
  );
};

export default CallToast;
