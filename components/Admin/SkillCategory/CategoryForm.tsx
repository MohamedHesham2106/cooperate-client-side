import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { IoRemoveCircleSharp } from 'react-icons/io5';

import Button from '../../UI/Button';
import Form from '../../UI/Form';
import Input from '../../UI/Input';
import axiosInstance from '../../../utils/axios';

const CategoryForm: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(['']);

  const handleAddCategory = () => {
    setCategories([...categories, '']);
  };

  const handleCategoryChange = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleRemoveCategory = (index: number) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isEmpty = false;
    for (const category of categories) {
      if (category.trim() === '') {
        isEmpty = true;
        break;
      }
    }
    if (isEmpty) {
      toast.error("You can't submit an empty category");
      return;
    }
    // all categories are not empty, you can proceed with the form submission
    for (const category of categories) {
      await axiosInstance
        .post('/api/category', {
          category,
        })
        .then(() => {
          toast.success(
            `${
              categories.length === 1 ? 'Category' : 'Categories'
            } Added Successfully.`
          );
        })
        .catch((error) => {
          toast.error('Something went wrong.');
        });
    }
  };
  return (
    <div className='border p-5 shadow bg-white rounded text-black dark:border-gray-800 dark:bg-gray-700 dark:text-white dark:shadow-gray-900 '>
      <h3 className='text-3xl font-black'>Add Categories</h3>
      <Form className='mt-10' OnSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          {categories.map((category, index) => (
            <div
              key={index}
              className='flex justify-between items-center gap-3'
            >
              <div className='w-full'>
                <Input
                  name='category'
                  type='text'
                  placeholder='Please Fill Input with Category Name'
                  value={category}
                  onChange={(event) =>
                    handleCategoryChange(index, event.target.value)
                  }
                />
              </div>

              {categories.length > 1 && (
                <button
                  className='px-2 py-2.5 rounded bg-red-500 text-white text-lg flex items-center justify-center'
                  type='button'
                  onClick={() => handleRemoveCategory(index)}
                >
                  <IoRemoveCircleSharp />
                </button>
              )}
            </div>
          ))}
          <div className='flex items-center justify-end gap-5'>
            <Button
              type='button'
              onClick={handleAddCategory}
              className=' w-1/3 focus:outline-none font-medium rounded-2xl text-base  bg-gray-200 hover:bg-gray-300  px-5 py-2.5 text-center dark:text-gray-900'
            >
              Add Fields
            </Button>
            <Button width='w-1/3' type='submit'>
              Add Categories
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CategoryForm;
