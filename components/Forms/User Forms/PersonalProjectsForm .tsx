import { useRouter } from 'next/router';
import React, { FC, Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import { IoRemoveCircleSharp } from 'react-icons/io5';

import Button from '../../UI/Button';
import Form from '../../UI/Form';
import Input from '../../UI/Input';
import axiosInstance from '../../../utils/axios';
interface IProps {
  user: IUser;
}
const PersonalProjectsForm: FC<IProps> = ({ user }) => {
  // Initialize the state for personalProjects with an initial empty array
  const [personalProjects, setPersonalProjects] = useState<
    { title: string; url: string }[]
  >([{ title: '', url: '' }]);

  // Event handler for adding a new personalProjects
  const handleAddPersonalProjects = () => {
    setPersonalProjects([...personalProjects, { title: '', url: '' }]);
  };

  // Event handler for updating a personalProjects at a specific index
  const handlePersonalProjectsChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newPersonalProjects = [...personalProjects];
    newPersonalProjects[index] = {
      ...newPersonalProjects[index],
      [field]: value,
    };
    setPersonalProjects(newPersonalProjects);
  };

  // Event handler for removing a personalProjects at a specific index
  const handleRemovePersonalProjects = (index: number) => {
    const newPersonalProjects = [...personalProjects];
    newPersonalProjects.splice(index, 1);
    setPersonalProjects(newPersonalProjects);
  };
  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if any category is empty
    let isEmpty = false;
    for (const project of personalProjects) {
      if (project.url.trim() === '' || project.title.trim() === '') {
        isEmpty = true;
        break;
      }
    }

    // If any projects is empty, display an error toast and stop form submission
    if (isEmpty) {
      toast.error("You can't submit an empty Personal Project");
      return;
    }

    // All categories are not empty, proceed with the form submission
    for (const personalProject of personalProjects) {
      await axiosInstance
        .put(`/api/user/${user._id}/personalProjects`, {
          url: personalProject.url,
          title: personalProject.title,
        })
        .then(() => {
          toast.success(
            `${
              personalProjects.length === 1 ? 'Project' : 'Projects'
            } Added Successfully.`
          );
          setTimeout(() => {
            router.reload();
          }, 2000);
        })
        .catch((_error) => {
          toast.error('Something went wrong.');
        });
    }
  };
  const router = useRouter();
  const handleRemovePersonalProject = async (
    title: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await axiosInstance
      .delete(`/api/user/${user._id}/personalProjects`, {
        data: {
          title,
        },
      })
      .then(() => {
        toast.success('Removed Successfully');
        setTimeout(() => {
          router.reload();
        }, 2000);
      })
      .catch(() => {
        toast.error('Something went wrong.');
      });
  };
  return (
    <Fragment>
      <div className='p-1 flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold w-full text-center md:text-start'>
          Personal Projects
        </h2>
        <span className='md:w-1/2 w-full border-t-2 border-black my-2 dark:border-gray-700 '></span>

        <Form className='mt-10 ' OnSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            {personalProjects.map((project, index) => (
              <div
                className='flex justify-between items-center gap-3'
                key={index}
              >
                <div className='w-full'>
                  <Input
                    name='title'
                    type='text'
                    value={project.title}
                    onChange={(e) =>
                      handlePersonalProjectsChange(
                        index,
                        'title',
                        e.target.value
                      )
                    }
                    placeholder='Title'
                  />
                </div>
                <div className='w-full'>
                  <Input
                    name='url'
                    type='text'
                    value={project.url}
                    onChange={(e) =>
                      handlePersonalProjectsChange(index, 'url', e.target.value)
                    }
                    placeholder='URL'
                  />
                </div>
                {personalProjects.length > 1 && (
                  <button
                    className='px-2 py-2.5 rounded bg-red-500 text-white text-lg flex items-center justify-center'
                    type='button'
                    onClick={() => handleRemovePersonalProjects(index)}
                  >
                    <IoRemoveCircleSharp />
                  </button>
                )}
              </div>
            ))}
            <div className='flex items-center justify-end gap-5 '>
              <Button
                type='button'
                onClick={handleAddPersonalProjects}
                className={`w-1/3 focus:outline-none font-medium rounded-2xl text-base bg-gray-200 hover:bg-gray-300 px-5 py-2.5 text-center dark:text-gray-900 ${
                  personalProjects.length >= 3
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={personalProjects.length >= 3}
              >
                Add Fields
              </Button>
              <Button width='w-1/3' type='submit'>
                Add Personal Projects
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className='p-1 flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold w-full text-center md:text-start'>
          Current Personal Projects
        </h2>
        <span className='md:w-1/2 w-full border-t-2 border-black my-2 dark:border-gray-700 '></span>
        {user.personal_projects && user.personal_projects?.length > 0 ? (
          user.personal_projects.map(
            (project: { title: string; url: string }, index: number) => {
              return (
                <div
                  key={index}
                  className='flex gap-5 items-center justify-between bg-white dark:bg-gray-900'
                >
                  <h3 className='p-3 font-bold rounded-md bg-gray-100 dark:bg-gray-900 text-xl w-full dark:text-white '>
                    {project.title}
                  </h3>
                  <Button
                    onClick={(event) =>
                      handleRemovePersonalProject(project.title, event)
                    }
                    type='button'
                    className='w-1/3 focus:outline-none font-medium rounded-md text-base bg-gray-200 hover:bg-gray-300 px-5 py-2.5 text-center dark:text-white dark:bg-red-500'
                  >
                    Remove
                  </Button>
                </div>
              );
            }
          )
        ) : (
          <h3 className='p-3 font-bold rounded-md bg-gray-100 dark:bg-gray-900 text-xl w-full dark:text-white '>
            No Personal Projects
          </h3>
        )}
      </div>
    </Fragment>
  );
};

export default PersonalProjectsForm;
