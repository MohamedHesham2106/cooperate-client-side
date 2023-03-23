import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { TiTick } from 'react-icons/ti';

import Container from '../../components/UI/Container';
import { fadeIn } from '../../utils/variants';
const About: FC = () => {
  const variants = useMemo(() => fadeIn('down', 0.7), []);
  return (
    <Container className='relative w-full  p-4 px-12 mx-auto  bg-white  sm:px-6 lg:px-8 mb-5'>
      <motion.div
        variants={variants}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.5 }}
        className='relative'
      >
        <div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center'>
          <Image
            className='flex justify-center lg:justify-start w-auto h-auto'
            width={400}
            height={400}
            src='/images/businessman-working-on-laptop.svg'
            alt='working on laptop'
            priority
          />

          <div className='ml-auto lg:col-start-2 lg:max-w-2xl'>
            <h4 className='mt-2 text-2xl font-extrabold leading-8 text-gray-900  sm:text-3xl sm:leading-9 font-serif'>
              What&apos;s great about it?
            </h4>
            <p className='mt-4 text-base leading-6 text-gray-500 font-sans'>
              At{' '}
              <span className='font-semibold text-sm text-blue-500 '>
                COO<span className='text-orange-500 font-bold text-lg'>/</span>
                RATE
              </span>
              , we are committed to providing top-notch services to our clients
              and freelancers. Our platform boasts a diverse pool of highly
              skilled professionals with a range of expertise, ensuring that you
              will find the right person for your project.
            </p>
            <ul className='mt-8 lg:grid lg:gap-6 lg:grid-cols-2 lg:pb-0 pb-3'>
              {[
                { text: 'No Cost to Join' },
                { text: 'Post a job and hire top talent' },
                { text: '24/7 support' },
                { text: 'Track progress' },
              ].map((item, index) => (
                <li className='mt-6 lg:mt-0' key={index}>
                  <div className='flex'>
                    <span className='flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full'>
                      <TiTick />
                    </span>
                    <span className='ml-4 text-sm font-medium leading-6 text-gray-500 '>
                      {item.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default About;
