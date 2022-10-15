import { useState } from 'react';
import { SearchType } from '../types';

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

  const handleSerch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const serchValue = () => {
    const test = {
      name: '정훈조',
      phone: '010-4355-2450',
      email: 'hoonjo1@gmail.com',
    };
    console.log('123');
  };

  return { searchResult, handleInput, handleSerch };
};

export default useSearch;
