import { useState } from 'react';
import { DefaultType, SearchType } from './../types/index';

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

const categoryState = {
  name: '',
};

const timeState = {
  name: '',
};

const useRegistration = () => {
  const [values, setValues] = useState(valueState);
  const [category, setCategory] = useState(categoryState);
  const [time, setTime] = useState(timeState);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };
  const handleButton = (event: React.FormEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    setCategory({ ...category, name });
    setTime({ ...time, name });
  };

  return { handleInput, handleButton };
};

export default useRegistration;
