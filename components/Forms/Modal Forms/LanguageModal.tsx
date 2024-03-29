import { useRouter } from 'next/router';
import { FC, FormEvent, MouseEvent, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import Button from '../../UI/Button';
import CustomSelect from '../../UI/CustomSelect';
import Form from '../../UI/Form';
import Modal from '../../UI/Modal';
import axiosInstance from '../../../utils/axios';

interface IProps {
  onClose: (event?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  user?: string;
}

interface ILanguage {
  altSpellings: string[];
  languages: {
    [key: string]: string;
  };
  // add any other required properties here
}

interface IOption {
  id: string;
  name: string;
}

const LanguageModal: FC<IProps> = ({ onClose, user }) => {
  const [selectedLang, setSelectedLang] = useState<string>('');
  const [selectedProf, setSelectProf] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [action, setAction] = useState<'edit' | 'remove'>('edit');

  const selectLanguageHandler = useCallback((selected: string) => {
    setSelectedLang(selected);
  }, []);

  const selectProfHandler = useCallback((selected: string) => {
    setSelectProf(selected);
  }, []);

  const router = useRouter();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axiosInstance
      .patch(`/api/user/${user}`, {
        language: [
          { language: selectedLang, level: selectedProf.toLowerCase() },
        ],
      })
      .catch((error) => {
        const err = error as IError;
        const { message } = err.response.data;
        toast.error(message, {
          style: {
            border: '1px solid #ce1500',
            padding: '16px',
          },
        });
      })
      .finally(() => {
        setFormSubmitted(true);
        onClose();
        setTimeout(() => {
          router.reload();
        }, 2000);
      });
    setFormSubmitted(true);
  };

  const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);

  const { data } = useSWR(
    'https://restcountries.com/v3/all?fields=languages',
    fetcher
  );

  // Retrieve languages
  const languages: IOption[] = [];
  if (data) {
    for (const key in data) {
      const country: ILanguage = data[key];
      for (const languageCode in country.languages) {
        const languageName = country.languages[languageCode];
        const languageOption: IOption = {
          id: languages.length.toString(),
          name: languageName,
        };
        const exists = languages.some(
          (option) => option.name === languageOption.name
        );
        if (!exists) {
          languages.push(languageOption);
        }
      }
    }
  }

  // Sort Languages Alphabetical
  const sortedLanguage = languages.sort((a, b) => (a.name < b.name ? -1 : 1));

  const profLevel: IOption[] = [
    { id: '0', name: 'Basic' },
    { id: '1', name: 'Conversational' },
    { id: '2', name: 'Fluent' },
    { id: '3', name: 'Native' },
  ];

  return (
    <Modal
      onClose={onClose}
      className='p-2 flex flex-col gap-5 justify-center '
    >
      <h1 className='text-2xl font-bold'>Add/Edit language</h1>
      <div className='flex gap-2'>
        <Button
          type='button'
          className={`${
            action === 'edit'
              ? 'bg-gray-700 text-white dark:bg-gray-900 '
              : 'bg-gray-50 text-gray-900  dark:bg-gray-500 dark:text-white'
          } text-sm rounded-lg text-center font-medium  block w-full p-2.5`}
          onClick={() => setAction('edit')}
        >
          Add/Edit Language
        </Button>
        <Button
          type='button'
          onClick={() => setAction('remove')}
          className={`${
            action === 'remove'
              ? 'bg-gray-700 text-white dark:bg-gray-900 '
              : 'bg-gray-50 text-gray-900  dark:bg-gray-500  dark:text-white'
          } text-sm rounded-lg text-center font-medium  block w-full p-2.5`}
        >
          Remove Language
        </Button>
      </div>

      <Form OnSubmit={submitHandler} className='flex flex-col gap-2'>
        <div className='flex flex-col justify-between gap-2'>
          <h1 className='text-sm font-semibold'>Language</h1>
          <CustomSelect
            label='Language'
            onSelect={selectLanguageHandler}
            options={sortedLanguage}
          />
        </div>
        {action === 'edit' && (
          <div className='flex flex-col justify-between gap-2 mb-5'>
            <h1 className='text-sm font-semibold'>Proficiency level</h1>
            <CustomSelect
              label='Proficiency level'
              onSelect={selectProfHandler}
              options={profLevel}
            />
          </div>
        )}

        <Button type='submit' onClick={formSubmitted ? onClose : undefined}>
          {action === 'edit' ? 'Update' : 'Remove'}
        </Button>
      </Form>
    </Modal>
  );
};
export default LanguageModal;
