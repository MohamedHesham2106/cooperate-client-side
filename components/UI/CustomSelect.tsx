import { FC, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';

interface IProps {
  options?: IOption[];
  onSelect: (selected: string) => void;
  label: string;
}

const CustomSelect: FC<IProps> = ({ options, onSelect, label }) => {
  const [selected, setSelected] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [optionValue, setOptionValue] = useState<string>('');

  const selectedText =
    selected?.length > 25 ? selected?.substring(0, 25) + '...' : selected;
  const displayText = selected ? selectedText : `Select ${label}`;

  return (
    <div className='mb-6'>
      <div className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
        <div
          onClick={() => setOpen(!open)}
          className={`bg-gray-50 w-full  flex items-center justify-between rounded ${
            !selected && 'text-gray-700'
          }`}
        >
          {displayText}
          <BiChevronDown size={20} />
        </div>
        <ul
          className={`bg-gray-50 overflow-y-auto scrollbar-hide ${
            open ? 'max-h-40 mt-3' : 'max-h-0'
          } `}
        >
          <div className='flex items-center px-2 sticky top-0 rounded-full bg-gray-300 mb-3'>
            <AiOutlineSearch size={18} className='text-gray-700' />
            <input
              type='text'
              value={optionValue}
              onChange={(e) => setOptionValue(e.target.value.toLowerCase())}
              className='placeholder:text-gray-700 p-2 outline-none w-full rounded-full bg-gray-300'
            />
          </div>
          {options?.map((option) => (
            <li
              key={option?.id}
              className={`capitalize cursor-pointer p-2 text-sm hover:bg-blue-500 hover:text-white
          ${
            option?.name?.toLowerCase() === selected?.toLowerCase() &&
            'bg-blue-500 text-white'
          }
          ${
            option?.name?.toLowerCase().startsWith(optionValue)
              ? 'block'
              : 'hidden'
          }`}
              onClick={() => {
                if (option?.name?.toLowerCase() !== selected?.toLowerCase()) {
                  onSelect(option.name);
                  setSelected(option?.name);
                  setOpen(false);
                  setOptionValue('');
                }
              }}
            >
              {option?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default CustomSelect;
