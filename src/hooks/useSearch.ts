import { useState } from 'react';
import { DefaultType, SearchType } from '../types';

const initializeState: SearchType = {
  isResult: false,
  result: {
    id: 0,
    user_name: '',
    user_phone: '',
    booking_date: '',
    booking_time: '',
    categories: '',
  },
};

const valueState = {
  name: '',
  phone: '',
  email: '',
};

const useSearch = () => {
  const [searchResult, setSearchResult] = useState(initializeState);
  const [values, setValues] = useState(valueState);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  const handleSerch = (
    event: React.FormEvent<HTMLFormElement>,
    globalAtom: DefaultType[]
  ) => {
    event.preventDefault();
    globalAtom.some(
      ({
        id,
        user_name,
        user_phone,
        booking_date,
        booking_time,
        categories,
      }) => {
        if (user_name === values.name && user_phone === values.phone) {
          return setSearchResult(() => ({
            isResult: true,
            result: {
              id,
              user_name,
              user_phone,
              booking_date,
              booking_time,
              categories,
            },
          }));
        }
      }
    );
    return setSearchResult(initializeState);
  };

  return { searchResult, handleInput, handleSerch };
};

export default useSearch;
