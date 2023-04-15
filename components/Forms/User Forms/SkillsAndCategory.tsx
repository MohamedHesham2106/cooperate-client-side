import Multiselect from 'multiselect-react-dropdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import Button from '../../UI/Button';
import Form from '../../UI/Form';
import Spinner from '../../UI/Spinner';
import axiosInstance from '../../../utils/axios';

interface IProps {
  user: IUser;
}

const SkillsAndCategory: FC<IProps> = ({ user }) => {
  const { theme } = useTheme();
  const { categories, skills, first_name, _id } = user;

  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    skills?.map((skill) => skill.name) || []
  );

  const [userCategories, setUserCategories] = useState<string[]>(
    categories?.map((category) => category.name) || []
  );
  const [checkedCategories, setCheckedCategories] =
    useState<string[]>(userCategories);

  const router = useRouter();
  const { query } = router;
  const page_number = query.page_number
    ? parseInt(query.page_number as string)
    : 1;

  useEffect(() => {
    setCurrentPage(page_number);
  }, [page_number]);

  const handleSelect = (selectedList: string[], _selectedItem: unknown) => {
    setSelectedSkills((prevState) => {
      const newSkills = selectedList.filter(
        (skill) => !prevState.includes(skill)
      );
      return [...prevState, ...newSkills];
    });
  };

  const handleRemove = (selectedList: string[], removedItem: unknown) => {
    setSelectedSkills((prevState) => {
      return prevState.filter((skill) => skill !== removedItem);
    });
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setUserCategories([...userCategories, value]);
      setCheckedCategories([...checkedCategories, value]);
    } else {
      setUserCategories(
        userCategories.filter((category) => category !== value)
      );
      setCheckedCategories(
        checkedCategories.filter((category) => category !== value)
      );
      setSelectedSkills((prevState) =>
        prevState.filter(
          (skill) =>
            !currentCategories
              .find((cat: ICategory) => cat.name === value)
              ?.skills?.map((s: ISkill) => s.name)
              .includes(skill)
        )
      );
    }
  };
  // Define the fetcher function
  const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
  };

  // Use the useSWR hook to fetch the categories data
  const { data } = useSWR('/api/category', fetcher);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.preventDefault();
    const [updateSkillsResponse, _updateCategoriesResponse] = await Promise.all(
      [
        await axiosInstance.put(`/api/user/${_id}/updateSkills`, {
          skills: selectedSkills,
        }),
        axiosInstance.put(`/api/user/${_id}/updateCategories`, {
          categories: userCategories,
        }),
      ]
    );
    await toast.promise(Promise.resolve(updateSkillsResponse), {
      success: 'Updated Account Successfully.',
      loading: 'Loading..',
      error: 'Failed to update account.',
    });
    setTimeout(() => {
      router.reload();
    }, 2000);
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
    return (
      <ul
        className={`w-full  ${
          currentCategories || currentCategories?.length === 0
            ? 'grid gap-6 grid-cols-1   md:grid-cols-2 '
            : 'flex items-center justify-center'
        }`}
      >
        {!currentCategories || (currentCategories?.length === 0 && <Spinner />)}
        {currentCategories &&
          currentCategories.map((category: ICategory) => {
            const skills = category.skills?.map((skill) => skill.name);
            const user_skills = user.skills
              ?.filter((skill) => skills?.includes(skill.name))
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
                  className='shadow inline-flex items-center justify-center w-full p-2 text-black bg-white border rounded-2xl cursor-pointer  peer-checked:border-blue-500 hover:text-gray-600  peer-checked:text-white peer-checked:bg-blue-500 hover:bg-gray-50 '
                >
                  <div className='block'>
                    <div className='w-full md:text-lg font-semibold'>
                      {category.name}
                    </div>
                  </div>
                </label>

                <Multiselect
                  id={category._id}
                  className='mt-2'
                  disable={!checkedCategories.includes(category.name)}
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
                      color: ` ${theme === 'dark' ? 'rgb(17,24,39)' : '#000'}`,
                    },
                  }}
                  selectionLimit={7}
                  selectedValues={user_skills}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                  placeholder={
                    user_skills && user_skills?.length > 0
                      ? ''
                      : `${category.name} Skills`
                  }
                  avoidHighlightFirstOption={true}
                />
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
            <Link
              href={{
                pathname: `/freelancer/~${user._id}/settings`,
                query: {
                  tab: 'skills&categories',
                  page_number: `${number}`,
                },
              }}
              scroll={false}
              className={`px-2 py-1 border-2 mx-1 text-xs rounded-full ${
                number === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='p-1 flex flex-col gap-2'>
      <h2 className='text-2xl font-semibold w-full text-center md:text-start'>
        Skills &amp; Categories
      </h2>
      <span className='md:w-1/2 border-t-2 border-black my-2 '></span>
      <p>
        Hi {first_name}, please select the skills and category that best
        describe you.
      </p>
      <Form OnSubmit={submitHandler} className='flex flex-col h-full'>
        <div>
          {renderCategories()}
          {renderPageNumbers()}
        </div>
        <div className='flex justify-end'>
          <Button type='submit' width='lg:w-1/3 w-full'>
            Update Skills &amp; Categories
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SkillsAndCategory;
