import { useState } from 'react';
import { DefaultType, SearchType } from 'types';

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
    for (let i = 0; i < globalAtom.length; i++) {
      const {
        id,
        user_name,
        user_phone,
        booking_date,
        booking_time,
        categories,
      } = globalAtom[i];
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
    alert(
      `${values.name}님 예약 내역이 존재하지 않습니다 \n이름 또는 핸드폰 번호를 확인해주세요.`
    );
    setSearchResult(initializeState);
  };

  return { searchResult, handleInput, handleSerch };
};

export default useSearch;
