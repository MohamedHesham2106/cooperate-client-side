import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';

interface Props {
  countryList: ICountry[] | undefined;
  onSelect: (selected: string) => void;
}

const CountrySelect = ({ countryList, onSelect }: Props) => {
  const [selected, setSelected] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [countryValue, setCountryValue] = useState<string>('');

  const selectedText =
    selected?.length > 25 ? selected?.substring(0, 25) + '...' : selected;
  const displayText = selected ? selectedText : 'Select Country';

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
          className={`bg-gray-50 overflow-y-auto ${
            open ? 'max-h-40 mt-3' : 'max-h-0'
          } `}
        >
          <div className='flex items-center px-2 sticky top-0 rounded-full bg-gray-300 mb-3'>
            <AiOutlineSearch size={18} className='text-gray-700' />
            <input
              type='text'
              value={countryValue}
              onChange={(e) => setCountryValue(e.target.value.toLowerCase())}
              className='placeholder:text-gray-700 p-2 outline-none w-full rounded-full bg-gray-300'
            />
          </div>
          {countryList?.map((country) => (
            <li
              key={country?.name}
              className={`p-2 text-sm hover:bg-blue-500 hover:text-white
          ${
            country?.name?.toLowerCase() === selected?.toLowerCase() &&
            'bg-blue-500 text-white'
          }
          ${
            country?.name?.toLowerCase().startsWith(countryValue)
              ? 'block'
              : 'hidden'
          }`}
              onClick={() => {
                if (country?.name?.toLowerCase() !== selected?.toLowerCase()) {
                  onSelect(country.name);
                  setSelected(country?.name);
                  setOpen(false);
                  setCountryValue('');
                }
              }}
            >
              {country?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default CountrySelect;
