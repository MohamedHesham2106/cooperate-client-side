import { Fragment } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { BsFileEarmarkPost } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';
import { RiSuitcaseFill } from 'react-icons/ri';

import DashboardCard from '../DashboardCard';
interface IProps {
  data: IDashboard;
}
const DashboardContent: React.FC<IProps> = ({ data }) => {
  // Define an array of cards with different statistics
  const cards = [
    {
      title: 'Total Number of Users',
      content: data.userCount,
      icon: <HiUsers size={20} />,
      bgColor: 'bg-orange-500',
    },
    {
      title: 'Active Users',
      content: data.activeUsersCount,
      icon: <HiUsers size={20} />,
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Freelancer',
      content: data.freelancerCount,
      icon: <HiUsers size={20} />,
      bgColor: 'bg-indigo-500',
    },
    {
      title: 'Clients',
      content: data.clientCount,
      icon: <HiUsers size={20} />,
      bgColor: 'bg-red-500',
    },
    {
      title: 'Posted Jobs',
      content: data.jobCount,
      icon: <BsFileEarmarkPost size={20} />,
      bgColor: 'bg-green-500',
    },
    {
      title: 'Active Projects',
      content: data.projectCount,
      icon: <RiSuitcaseFill size={20} />,
      bgColor: 'bg-purple-500',
    },
  ];

  // Calculate the percentage of freelancers among all users
  const freelancerPercentage =
    (data.freelancerCount / (data.clientCount + data.freelancerCount)) * 100;

  // Calculate the percentage of clients among all users
  const clientPercentage =
    (data.clientCount / (data.clientCount + data.freelancerCount)) * 100;

  return (
    <Fragment>
      <section className='grid grid-cols-3 w-full gap-2'>
        {cards.map((card, i) => (
          <DashboardCard
            key={i}
            title={card.title}
            content={card.content as unknown as string}
            icon={card.icon}
            bgColor={card.bgColor}
          />
        ))}
      </section>
      <section className='grid grid-cols-2 justify-center  gap-16 items-center'>
        <div className=' bg-gray-900  shadow-lg rounded-lg px-16 pb-8 w-full flex items-center justify-center flex-col gap-6 text-center dark:bg-gray-700'>
          <p className='text-white font-bold shadow text-xl p-3 rounded-b-xl bg-blue-500 w-full'>
            Percentage of Freelancers
          </p>
          <div className='w-56 h-56'>
            <CircularProgressbar
              value={freelancerPercentage}
              text={`${freelancerPercentage.toFixed(2)}%`}
              styles={{
                path: { stroke: '#3b82f6', strokeLinecap: 'round' },
                trail: {
                  stroke: '#fff',
                  strokeLinecap: 'round',
                },
                text: {
                  textAnchor: 'middle',
                  fill: '#fff',
                  fontWeight: '700',
                },
              }}
            />
          </div>
        </div>

        <div className=' bg-gray-900 shadow-lg rounded-lg w-full px-16 pb-8  flex items-center justify-center flex-col gap-6 text-center dark:bg-gray-700'>
          <p className='text-white shadow font-bold text-xl p-3 rounded-b-xl bg-green-500 w-full'>
            Percentage of Clients
          </p>
          <div className='w-56 h-56'>
            <CircularProgressbar
              value={clientPercentage}
              text={`${clientPercentage.toFixed(2)}%`}
              styles={{
                path: { stroke: '#22c55e', strokeLinecap: 'round' },
                trail: {
                  stroke: '#fff',
                  strokeLinecap: 'round',
                },
                text: {
                  textAnchor: 'middle',

                  fill: '#fff',
                  fontWeight: '700',
                },
              }}
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default DashboardContent;
