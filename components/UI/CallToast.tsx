import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { BiPhoneCall } from 'react-icons/bi';

interface IProps {
  t: any;
  conversation_id: string;
  caller: string;
}

const CallToast: React.FC<IProps> = ({ t, conversation_id, caller }) => {
  return (
    <div
      className='p-4 border border-gray-300 rounded-lg bg-white dark:border-gray-600 dark:bg-gray-800  md:w-2/12 w-full flex flex-col gap-5'
      role='alert'
    >
      <div className='flex items-center justify-center'>
        <h3 className='text-sm font-bold text-gray-800 dark:text-gray-300 flex items-center gap-1 '>
          <BiPhoneCall size={15} />
          {caller} is calling you!
        </h3>
      </div>

      <div className='flex items-center justify-between'>
        <Link
          href={`/call/~${conversation_id}`}
          onClick={() => toast.dismiss(t.id)}
          className='text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800'
        >
          Answer
        </Link>
        <button
          onClick={() => toast.dismiss(t.id)}
          type='button'
          className='text-blue-800 bg-transparent border border-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:text-gray-300 dark:hover:text-white'
          data-dismiss-target='#alert-additional-content-5'
          aria-label='Close'
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default CallToast;
