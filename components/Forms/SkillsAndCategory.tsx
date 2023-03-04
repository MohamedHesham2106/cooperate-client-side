import Multiselect from 'multiselect-react-dropdown';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useState } from 'react';
import useSWR from 'swr';

import Button from '../UI/Button';
import Error from '../UI/Error';
import Form from '../UI/Form';
import Spinner from '../UI/Spinner';
import Success from '../UI/Success';
import axiosInstance from '../../utils/axios';

interface IProps {
  user: IUser;
}

const SkillsAndCategory: FC<IProps> = ({ user }) => {
  const { categories, first_name, _id } = user;

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [userCategories, setUserCategories] = useState<string[]>(
    categories?.map((category) => category.name) || []
  );
  const router = useRouter();
  const handleSelect = (selectedList: any, _selectedItem: any) => {
    setSelectedSkills(selectedList);
  };
  const handleRemove = (selectedList: any, _removedItem: any) => {
    setSelectedSkills(selectedList);
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setUserCategories([...userCategories, value]);
    } else {
      setUserCategories(
        userCategories.filter((category) => category !== value)
      );
    }
    console.log(userCategories);
  };
  // Define the fetcher function
  const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
  };
  const clearMessages = () => {
    setSuccess('');
    setError('');
  };
  // Use the useSWR hook to fetch the categories data
  const { data, error: categoriesError } = useSWR('/api/category', fetcher);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Promise.all([
      await axiosInstance.put(`/api/user/${_id}/updateSkills`, {
        skills: selectedSkills,
      }),
      axiosInstance.put(`/api/user/${_id}/updateCategories`, {
        categories: userCategories,
      }),
    ])
      .then((_response) => {
        setSuccess('Updated Account Successfully.');
        setTimeout(clearMessages, 5000);
        router.reload();
      })
      .catch((error) => {
        const err = error as IError;
        const { message } = err.response.data;
        setError(message);
        setTimeout(clearMessages, 5000);
      });
  };

  // Render the categories data with pagination
  const categoriesPerPage = 4;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = data
    ? data.categories.slice(indexOfFirstCategory, indexOfLastCategory)
    : undefined;

  const renderCategories = () => {
    if (!currentCategories) {
      return (
        <div className='flex items-center justify-center'>
          <Spinner />
        </div>
      );
    }

    if (currentCategories.length === 0) {
      return <div>No categories found.</div>;
    }

    return (
      <ul className='grid w-full gap-6 grid-cols-1'>
        {currentCategories.map((category: Category) => {
          const skills = category.skills.map((skill) => skill.name);
          const user_skills = user.skills
            ?.filter((skill) => skills.includes(skill.name))
            .map((skill) => skill.name);
          const isChecked =
            user.categories &&
            user.categories.some((cat) => cat.name === category.name);
          return (
            <li key={category._id}>
              <input
                type='checkbox'
                name={category.name}
                value={category.name}
                className='hidden peer'
                multiple
                id={category._id}
                defaultChecked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor={category._id}
                className='inline-flex items-center w-full p-2 text-black bg-white border-2 rounded-lg cursor-pointer  peer-checked:border-blue-500 hover:text-gray-600  peer-checked:text-white peer-checked:bg-blue-500 hover:bg-gray-50 '
              >
                <div className='block'>
                  <div className='w-full text-lg font-semibold'>
                    {category.name}
                  </div>
                </div>
              </label>

              <div className='mt-2'>
                <Multiselect
                  isObject={false}
                  options={skills}
                  selectedValues={user_skills}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                  placeholder={`${category.name} Skills`}
                  avoidHighlightFirstOption={true}
                />
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const pageNumbers: number[] = [];
  if (data?.categories) {
    for (
      let i = 1;
      i <= Math.ceil(data.categories.length / categoriesPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
  }

  const renderPageNumbers = () => {
    if (!data?.categories) {
      return null;
    }
    return (
      <ul className='flex pl-0 list-none rounded my-5'>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              type='button'
              className={`px-3 py-1 border border-gray-500 mx-1 rounded-full ${
                number === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='p-1 flex flex-col gap-2'>
      <h2 className='text-2xl font-semibold'>Skills &amp; Categories</h2>
      <span className='w-1/2 border-t-2 border-black my-2 '></span>
      {!error && !success && (
        <p>
          Hi {first_name}, please select the skills and category that best
          describe you.
        </p>
      )}
      {error && <Error message={error} />}
      {success && <Success message={success} />}
      <Form OnSubmit={submitHandler} className='flex flex-col h-full'>
        <div>
          {categoriesError && (
            <Error message='Error loading categories. Please try again later.' />
          )}
          {renderCategories()}
          {renderPageNumbers()}
        </div>
        <div className='flex justify-end'>
          <Button type='submit' width='lg:w-1/3 w-full'>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SkillsAndCategory;
