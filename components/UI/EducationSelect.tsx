import axios from 'axios';
import { FC, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';

interface IProps {
  onSelect: (selected: string) => void;
  defaultValue?: string;
}

const EducationSelect: FC<IProps> = ({ onSelect, defaultValue }) => {
  const [selected, setSelected] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [optionValue, setOptionValue] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);

  const selectedText =
    selected?.length > 25 ? selected?.substring(0, 25) + '...' : selected;
  const defaultValueAvailable = defaultValue
    ? defaultValue
    : `Select University`;
  const displayText = selected ? selectedText : defaultValueAvailable;

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    setOptionValue(inputValue);

    // Send request to retrieve universities based on inputValue
    const response = await axios(
      `http://universities.hipolabs.com/search?name=${inputValue}`
    );
    const data = await response.data;

    // Extract university names from the response and update options
    const universityNames = data.map((university: any) => university.name);
    setOptions(universityNames);
  };

  return (
    <div>
      <div className='bg-gray-50 border border-gray-300 dark:bg-gray-900 dark:border-gray-900 dark:text-white text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
        <div
          onClick={() => setOpen(!open)}
          className={`bg-gray-50 w-full capitalize  flex items-center justify-between rounded dark:bg-gray-900 dark:border:gray-900 dark:text-white ${
            !selected && 'text-gray-700'
          }`}
        >
          {displayText}
          <BiChevronDown size={20} />
        </div>
        <ul
          className={`bg-gray-50 dark:bg-gray-900 overflow-y-auto scrollbar-hide ${
            open ? 'max-h-40 mt-3' : 'max-h-0'
          } `}
        >
          <div className='flex items-center gap-2 px-2 sticky top-0  bg-gray-300  dark:bg-gray-600 rounded-full '>
            <AiOutlineSearch
              size={18}
              className='text-gray-700  dark:text-white'
            />
            <input
              defaultValue={defaultValue}
              type='text'
              onChange={handleInputChange}
              className='placeholder:text-gray-700 p-2 outline-none w-full rounded-full bg-gray-300 dark:bg-gray-600  '
            />
          </div>
          {options.map((option, index) => (
            <li
              key={index}
              className={`capitalize cursor-pointer p-2 text-sm hover:bg-blue-500 hover:text-white dark:bg-gray-900 dark:hover:bg-blue-500 
                ${
                  option.toLowerCase() === selected?.toLowerCase() &&
                  'bg-blue-500 text-white'
                }
                ${
                  option.toLowerCase().startsWith(optionValue)
                    ? 'block'
                    : 'hidden'
                }`}
              onClick={() => {
                if (option.toLowerCase() !== selected?.toLowerCase()) {
                  onSelect(option);
                  setSelected(option);
                  setOpen(false);
                  setOptionValue('');
                } else {
                  onSelect('');
                  setSelected('');
                  setOpen(false);
                  setOptionValue('');
                }
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EducationSelect;
