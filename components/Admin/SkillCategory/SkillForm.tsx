import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IoRemoveCircleSharp } from 'react-icons/io5';
import useSWR from 'swr';

import Button from '../../UI/Button';
import CustomSelect from '../../UI/CustomSelect';
import Form from '../../UI/Form';
import Input from '../../UI/Input';
import axiosInstance, { fetcher } from '../../../utils/axios';

const SkillForm = () => {
  const { data: categories } = useSWR('/api/category', fetcher, {
    refreshInterval: 5000,
  });

  const [selects, setSelects] = useState([{ id: 0, selected: '', skill: '' }]);

  const handleSelectChange = useCallback(
    (id: number, selected: string) => {
      setSelects((prevSelects) =>
        prevSelects.map((select) =>
          select.id === id ? { ...select, selected } : select
        )
      );
      console.log(selects);
    },
    [selects]
  );

  const handleAddSelect = () => {
    setSelects((prevSelects) => [
      ...prevSelects,
      { id: prevSelects.length, selected: '', skill: '' },
    ]);
  };

  const handleChangeSkill = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setSelects((prevSelects) =>
      prevSelects.map((select) =>
        select.id === index ? { ...select, skill: value } : select
      )
    );
  };

  const handleRemoveSelect = (id: number) => {
    setSelects((prevSelects) =>
      prevSelects.filter((select) => select.id !== id)
    );
    console.log(selects);
  };

  const categoryList = categories?.categories.map((c: ICategory) => ({
    name: c.name,
    id: c._id,
  }));
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isEmpty = false;
    for (const select of selects) {
      if (select.skill.trim() === '' || select.selected.trim() === '') {
        isEmpty = true;
        break;
      }
    }
    if (isEmpty) {
      toast.error("You can't submit an empty category or skill");
      return;
    }
    // all categories are not empty, you can proceed with the form submission
    for (const select of selects) {
      await axiosInstance
        .post('/api/skill', {
          skill: select.skill,
          category: select.selected,
        })
        .then(() => {
          toast.success(
            `${selects.length === 1 ? 'Skill' : 'Skills'} Added Successfully.`
          );
        })
        .catch((_error) => {
          toast.error('Something went wrong.');
        });
    }
  };
  return (
    <div className='border p-5 shadow bg-white rounded text-black dark:border-gray-800 dark:bg-gray-700 dark:text-white dark:shadow-gray-900 '>
      <h3 className='text-3xl font-black'>Add Skills</h3>
      <Form className='mt-10' OnSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          {selects.map((select, index) => (
            <div key={index} className='flex justify-between items-start gap-3'>
              <div className='w-full flex flex-col gap-2'>
                <CustomSelect
                  key={index}
                  label='Category'
                  onSelect={(value) => handleSelectChange(index, value)}
                  options={categoryList}
                />
                <Input
                  name='skill'
                  type='text'
                  placeholder='Please Fill Input with Skill Name'
                  value={selects[index].skill}
                  onChange={(e) => handleChangeSkill(e, index)}
                />
              </div>
              {selects.length > 1 && (
                <Button
                  type='button'
                  className='px-2 py-2.5 rounded bg-red-500 text-white text-lg flex items-center justify-center'
                  onClick={() => handleRemoveSelect(select.id)}
                >
                  <IoRemoveCircleSharp />
                </Button>
              )}
            </div>
          ))}
          <div className='flex items-center justify-end gap-5'>
            <Button
              className='w-1/3 focus:outline-none font-medium rounded-2xl text-base bg-gray-200 hover:bg-gray-300  px-5 py-2.5 text-center dark:text-gray-900'
              type='button'
              onClick={handleAddSelect}
            >
              Add Fields
            </Button>
            <Button width='w-1/3' type='submit'>
              Add Skills
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SkillForm;
