import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import globalState from 'recoil/atom';
import { DefaultType } from 'types';

const valueState = {
  name: '',
  phone: '',
  email: '',
};

const useRegistration = () => {
  const setUser = useSetRecoilState(globalState);

  const [values, setValues] = useState(valueState);
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  const handleCategory = (event: string) => {
    setCategory(event);
  };

  const handleTime = (event: string) => {
    setTime(event);
  };

  const handleReservation = (
    event: React.FormEvent<HTMLFormElement>,
    globalAtom: DefaultType[],
    selectDate: string,
    reserveHandler: () => void
  ) => {
    event.preventDefault();
    for (let i = 0; i < globalAtom.length; i++) {
      const { user_name, user_phone, booking_date, booking_time } =
        globalAtom[i];

      if (booking_date === selectDate && booking_time === time) {
        alert(`${time}에는 예약할 수 없습니다. \n다른 시간을 선택해 주세요.`);
        return;
      }
      if (user_name === values.name && user_phone === values.phone) {
        alert(`${values.name}님은 중복 예약입니다.`);
        return;
      }
    }
    const userInfo = {
      id: 220181,
      user_name: values.name,
      user_phone: values.phone,
      booking_date: selectDate,
      booking_time: time,
      categories: category,
    };
    setUser(prev => [...prev, userInfo]);
    reserveHandler();
  };

  return {
    handleInput,
    handleCategory,
    handleTime,
    handleReservation,
    category,
    time,
  };
};

export default useRegistration;
