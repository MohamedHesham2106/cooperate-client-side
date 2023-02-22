import Container from 'components/UI/Container';
import Image from 'next/image';
import { FC } from 'react';
import { TiTick } from 'react-icons/ti';
const About: FC = () => {
  return (
    <Container className='relative w-full md:w-[93%] p-4 px-12 mx-auto  bg-white  sm:px-6 lg:px-8 my-5  md:drop-shadow-xl'>
      <div className='relative'>
        <div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center'>
          <Image
            className='flex justify-center lg:justify-start w-auto h-auto'
            width={500}
            height={500}
            src='/images/businessman-working-on-laptop.svg'
            alt='working on laptop'
          />

          <div className='ml-auto lg:col-start-2 lg:max-w-2xl'>
            <h4 className='mt-2 text-2xl font-extrabold leading-8 text-gray-900  sm:text-3xl sm:leading-9'>
              What&apos;s great about it?
            </h4>
            <p className='mt-4 text-lg leading-6 text-gray-500 '>
              At{' '}
              <span className='font-semibold text-blue-500 '>
                COO<span className='text-orange-500 font-bold text-2xl'>/</span>
                RATE
              </span>
              , we are committed to providing top-notch services to our clients
              and freelancers. Our platform boasts a diverse pool of highly
              skilled professionals with a range of expertise, ensuring that you
              will find the right person for your project.
            </p>
            <ul className='mt-8 lg:grid lg:gap-6 lg:grid-cols-2 lg:pb-0 pb-3'>
              <li className='mt-6 lg:mt-0'>
                <div className='flex'>
                  <span className='flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full'>
                    <TiTick />
                  </span>
                  <span className='ml-4 text-base font-medium leading-6 text-gray-500 '>
                    No Cost to Join
                  </span>
                </div>
              </li>
              <li className='mt-6 lg:mt-0'>
                <div className='flex'>
                  <span className='flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full  '>
                    <TiTick />
                  </span>
                  <span className='ml-4 text-base font-medium leading-6 text-gray-500 '>
                    Post a job and hire top talent
                  </span>
                </div>
              </li>
              <li className='mt-6 lg:mt-0'>
                <div className='flex'>
                  <span className='flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full  '>
                    <TiTick />
                  </span>
                  <span className='ml-4 text-base font-medium leading-6 text-gray-500 '>
                    24/7 support
                  </span>
                </div>
              </li>
              <li className='mt-6 lg:mt-0'>
                <div className='flex'>
                  <span className='flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full '>
                    <TiTick />
                  </span>
                  <span className='ml-4 text-base font-medium leading-6 text-gray-500 '>
                    Track progress
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
