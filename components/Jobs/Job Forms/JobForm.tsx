import { motion } from 'framer-motion';
import Multiselect from 'multiselect-react-dropdown';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { FC, useMemo, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { BsPaypal } from 'react-icons/bs';
import useSWR from 'swr';

import FawryIcon from '../../SVG/FawryIcon';
import Button from '../../UI/Button';
import Form from '../../UI/Form';
import Input from '../../UI/Input';
import axiosInstance from '../../../utils/axios';
import { fadeIn } from '../../../utils/variants';
type IProps = {
  user: IUser;
};

const JobForm: FC<IProps> = ({ user }) => {
  const { theme } = useTheme();
  const router = useRouter();
  // Job Values State
  const [jobValues, setJobValues] = useState<IJob>({
    title: '',
    description: '',
    skills: [],
    category: '',
    budget: 0,
    payment_type: undefined,
    project_length: new Date().toISOString().substr(0, 10),
  });

  // Add Skills
  const handleSkillsSelect = (
    _selectedList: string[],
    selectedItem: string
  ) => {
    setJobValues((prevState) => ({
      ...prevState,
      skills: [...(prevState.skills || []), selectedItem],
    }));
  };
  // Remove Skills
  const handleSkillsRemove = (_selectedList: string[], removedItem: string) => {
    setJobValues((prevState) => ({
      ...prevState,
      skills: prevState.skills?.filter((skill) => skill !== removedItem),
    }));
  };
  // Add Categories
  const handleCategorySelect = (
    _selectedList: string[],
    selectedItem: string
  ) => {
    // Update the jobValues object with the selected category
    setJobValues((prevState) => ({
      ...prevState,
      category: selectedItem,
    }));
  };
  // Remove Categories
  const handleCategoryRemove = (
    _selectedList: string[],
    _removedItem: unknown
  ) => {
    // Remove the category from the jobValues object
    setJobValues((prevState) => ({
      ...prevState,
      category: '',
    }));
  };

  const MAX_CHARACTERS = 3000;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setJobValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  // calculate number of characters left
  const descriptionLength = jobValues.description?.length;
  const charactersLeft = MAX_CHARACTERS - Number(descriptionLength);

  // Define the fetcher function
  const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
  };
  // Use the useSWR hook to fetch the categories data
  const { data } = useSWR('/api/category', fetcher);

  // Get array of categories
  const categories = data?.categories.map(
    (category: ICategory) => category.name
  );

  // Get array of Skills
  const skills = data?.categories.flatMap((category: ICategory) =>
    category.skills?.map((skill: ISkill) => skill.name)
  );

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      description,
      budget,
      category,
      experience_level,
      payment_type,
      project_length,
      skills,
      title,
    } = jobValues;
    await axiosInstance
      .post(`/api/job/${user._id}`, {
        description,
        budget,
        category_name: category,
        payment_type,
        experience_level,
        title,
        skills,
        project_length,
      })
      .then((_res) => {
        router.back();
      })
      .catch((error) => console.log(error));
  };
  const variants = useMemo(() => fadeIn('down', 0.5), []);
  return (
    <motion.div
      variants={variants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.1 }}
      className='flex flex-col gap-5 dark:bg-gray-700 p-5 rounded-md dark:shadow-md dark:shadow-gray-900'
    >
      <h1 className='text-center text-2xl font-bold'>
        Tell us what you need done
      </h1>
      <p className='text-center'>
        Contact skilled freelancers within minutes. View profiles, ratings,
        portfolios and chat with them.Pay the freelancer only when you are 100%
        satisfied with their work.
      </p>
      <Form OnSubmit={submitHandler} className='flex flex-col gap-3'>
        <div className='border-2 rounded-2xl p-4 grid md:grid-cols-[5fr_2fr] grid-cols-1 gap-3 dark:bg-gray-800 dark:border-none dark:shadow-sm dark:shadow-gray-900'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-left text-lg font-semibold'>
              Choose a name for your project
            </h3>
            <p className='text-blue-500 text-sm font-[350] '>
              This help your job stand out among the right candidates
            </p>
            <Input
              name='title'
              onChange={handleChange}
              value={jobValues.title}
              required={true}
              placeholder=' e.g. Graphic designer needed to design ad creative for  multiple campaigns.'
            />
          </div>
          <div className='hidden md:flex md:flex-col border-l-2 px-2 '>
            <h3 className='font-semibold'>Example titles</h3>
            <ul className='text-sm list-disc ml-5'>
              <li>
                Build responsive WordPress site with payment/booking
                functionality.
              </li>
              <li>Instagram ad specialist for product launch.</li>
              <li>
                UX designer with e-commerce experience to support app
                development.
              </li>
            </ul>
          </div>
        </div>
        <div className='border-2 rounded-2xl p-4 flex flex-col dark:bg-gray-800 dark:border-none dark:shadow-sm dark:shadow-gray-900'>
          <div className='flex flex-col gap-2 relative'>
            <h3 className='text-left text-lg font-semibold'>
              Tell us more about your project
            </h3>
            <textarea
              name='description'
              onChange={handleChange}
              rows={8}
              className='block p-5 w-full text-sm text-gray-800 bg-white border border-gray-400  focus:border-blue-500 resize-none dark:border-none dark:focus:ring-0 outline-none rounded-md dark:bg-gray-900  dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 scrollbar-hide'
              value={jobValues.description}
              placeholder='Describe your project here...'
              required
              maxLength={MAX_CHARACTERS}
            ></textarea>
            <span className='absolute bottom-2 right-2 text-gray-400'>
              {charactersLeft} characters left
            </span>
          </div>
        </div>
        <div className='border-2 rounded-2xl p-4 flex flex-col dark:bg-gray-800 dark:border-none dark:shadow-sm dark:shadow-gray-900'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-left text-lg font-semibold'>
              What category best describes your project?
            </h3>
            <p className='text-blue-500 text-sm font-[350] '>
              You can only choose one
            </p>
            {categories && (
              <Multiselect
                isObject={false}
                style={{
                  searchBox: {
                    padding: '0.75rem',
                    border: `${theme === 'dark' ? ' rgb(17,24,39)' : '#000'}`,
                    background: `${
                      theme === 'dark' ? ' rgb(17,24,39)' : '#fff'
                    }`,
                  },
                  multiselectContainer: {
                    color: ` ${theme === 'dark' ? 'rgb(17,24,39)' : '#000'}`,
                  },
                }}
                options={categories}
                selectionLimit={true}
                onSelect={handleCategorySelect}
                onRemove={handleCategoryRemove}
                placeholder='Select Category'
                avoidHighlightFirstOption={true}
              />
            )}
          </div>
        </div>
        <div className='border-2 rounded-2xl p-4 flex flex-col dark:bg-gray-800 dark:border-none dark:shadow-sm dark:shadow-gray-900'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-left text-lg font-semibold'>
              What skills are required?
            </h3>

            {skills && (
              <Multiselect
                isObject={false}
                options={skills}
                style={{
                  searchBox: {
                    padding: '0.75rem',
                    border: `${theme === 'dark' ? ' rgb(17,24,39)' : '#000'}`,
                    background: `${
                      theme === 'dark' ? ' rgb(17,24,39)' : '#fff'
                    }`,
                  },
                  multiselectContainer: {
                    color: ` ${
                      theme === 'dark' ? 'rgb(17,24,39)' : 'rgb(59,130,246)'
                    }`,
                  },
                }}
                onSelect={handleSkillsSelect}
                onRemove={handleSkillsRemove}
                placeholder='Select Skills'
                avoidHighlightFirstOption={true}
              />
            )}
          </div>
        </div>
        <div className='border-2 rounded-2xl p-4 flex flex-col dark:bg-gray-800 dark:border-none dark:shadow-sm dark:shadow-gray-900'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-left text-lg font-bold'>
              What&apos;s the experience level required?
            </h3>
          </div>
          <div className='flex flex-col gap-2 py-5 px-2 '>
            <div className='flex'>
              <div className='flex items-center h-5'>
                <input
                  name='experience_level'
                  type='radio'
                  value='entry'
                  onChange={handleChange}
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 '
                />
              </div>
              <div className='ml-2 text-sm'>
                <label
                  htmlFor='experience_lvl'
                  className='font-medium text-gray-900 dark:text-white'
                >
                  Entry Level
                </label>
                <p className='text-xs font-normal text-gray-500 '>
                  Searching for someone new to the field.
                </p>
              </div>
            </div>
            <div className='flex '>
              <div className='flex items-center h-5'>
                <input
                  name='experience_level'
                  aria-describedby='helper-radio-text'
                  type='radio'
                  value='intermediate'
                  onChange={handleChange}
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 '
                />
              </div>
              <div className='ml-2 text-sm'>
                <label
                  htmlFor='experience_lvl'
                  className='font-medium text-gray-900 dark:text-white'
                >
                  Intermediate Level
                </label>
                <p
                  id='helper-radio-text'
                  className='text-xs font-normal text-gray-500 '
                >
                  Searching for substantial experience in this field.
                </p>
              </div>
            </div>
            <div className='flex'>
              <div className='flex items-center h-5'>
                <input
                  name='experience_level'
                  value='expert'
                  type='radio'
                  onChange={handleChange}
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 '
                />
              </div>
              <div className='ml-2 text-sm'>
                <label
                  htmlFor='experience_lvl'
                  className='font-medium text-gray-900 dark:text-white'
                >
                  Expert Level
                </label>
                <p
                  id='helper-radio-text'
                  className='text-xs font-normal text-gray-500 '
                >
                  Searching for comprehensive and deep expertise in this field.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='border-2 rounded-2xl p-4 flex flex-col dark:bg-gray-800 dark:border-none dark:shadow-sm dark:shadow-gray-900'>
          <div className='flex flex-col gap-2 relative'>
            <h3 className='text-left text-lg font-semibold'>
              Project&apos;s budget
            </h3>
            <Input
              value={jobValues.budget}
              onChange={handleChange}
              name='budget'
              type='number'
            />
            <span className='absolute bottom-2 right-5 text-gray-400'>$</span>
          </div>
        </div>
        <div className='border-2 rounded-2xl p-4 flex flex-col dark:bg-gray-800 dark:border-none dark:shadow-sm dark:shadow-gray-900'>
          <div className='flex flex-col gap-2 relative'>
            <h3 className='text-left text-lg font-semibold'>
              Project&apos;s Deadline
            </h3>
            <div className='relative max-w-sm'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <BiCalendar />
              </div>
              <input
                name='project_length'
                onChange={handleChange}
                type='date'
                value={jobValues.project_length}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full outline-none pl-10 p-2.5 dark:bg-gray-900 dark:text-white dark:border-gray-900  '
                placeholder='Select date'
              />
            </div>
          </div>
        </div>
        <div className='border-2 rounded-2xl p-4 flex flex-col dark:bg-gray-800 dark:border-none dark:shadow-sm dark:shadow-gray-900'>
          <div className='flex flex-col gap-2 '>
            <h3 className='text-left text-lg font-bold'>
              Payment&apos;s Method
            </h3>
            <div className=' flex gap-2 mt-3'>
              <div className='w-full md:w-1/5 '>
                <input
                  className='hidden'
                  type='radio'
                  value='paypal'
                  id='paypal'
                  name='payment_type'
                  onChange={handleChange}
                />
                <label
                  className='flex flex-col items-center p-4 border-2 rounded-xl border-gray-400 cursor-pointer dark:bg-gray-900 '
                  htmlFor='paypal'
                >
                  <BsPaypal size={50} className=' p-2' />
                  <span>Paypal</span>
                </label>
              </div>
              <div className='w-full md:w-1/5'>
                <input
                  id='Fawry'
                  className='hidden'
                  type='radio'
                  name='payment_type'
                  value='Fawry'
                  onChange={handleChange}
                />
                <label
                  className='flex flex-col p-4 border-2 rounded-xl items-center border-gray-400 cursor-pointer dark:bg-gray-900  '
                  htmlFor='Fawry'
                >
                  <FawryIcon />
                  <span>Fawry</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-end gap-4'>
          <Button
            type='button'
            className='md:w-1/5 w-full bg-white rounded-full text-base px-5 py-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type='submit' width='md:w-1/5 w-full'>
            Post Job
          </Button>
        </div>
      </Form>
    </motion.div>
  );
};
export default JobForm;
