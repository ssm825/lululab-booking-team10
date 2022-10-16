import React from 'react';
import Button from '../components/Button';
import InputBox from '../components/InputBox';
import styled from 'styled-components';
import Modal from '../components/Modal';
import SelectBox from '../components/SelectBox';
import useRegistration from '../hooks/useRegistration';
import { useRecoilValue } from 'recoil';
import globalState from '../recoil/atom';

interface ReservationProp {
  selectDate: string;
  reserveHandler: () => void;
}

const Reservation = ({ selectDate, reserveHandler }: ReservationProp) => {
  const {
    handleInput,
    handleCategory,
    handleTime,
    handleReservation,
    category,
    time,
  } = useRegistration();

  const globalAtom = useRecoilValue(globalState);

  return (
    <Modal>
      <Form
        onSubmit={event =>
          handleReservation(event, globalAtom, selectDate, reserveHandler)
        }
      >
        <Title>예약</Title>
        {INPUT_DATA.map(item => (
          <InputBox
            key={item.placeholder}
            type={item.type}
            placeholder={item.placeholder}
            name={item.name}
            handleInput={handleInput}
          />
        ))}
        <SelectBox
          title="예약 종류"
          option={['진료', '검진', '기타']}
          handleCategory={handleCategory}
          category={category}
        />
        <SubTitle>시간 설정</SubTitle>
        <DateBox>
          <SelectedDate>
            {`${selectDate?.split('-')[1]}월 ${selectDate?.split('-')[2]}일`}
          </SelectedDate>
          <SelectedTime>
            <SelectBox
              title="시간 선택"
              option={TIME_DATA}
              handleTime={handleTime}
              time={time}
            />
          </SelectedTime>
        </DateBox>
        <ButtonWapper>
          <Button title="예약" />
          <Button title="취소" reserveHandler={reserveHandler} />
        </ButtonWapper>
      </Form>
    </Modal>
  );
};

export default Reservation;

const INPUT_DATA = [
  {
    type: 'text',
    placeholder: '이름을 입력해주세요.',
    name: 'name',
  },
  {
    type: 'tel',
    placeholder: '휴대폰 번호를 입력해주세요.',
    name: 'phone',
  },
  {
    type: 'email',
    placeholder: '이메일을 입력해주세요.',
    name: 'email',
  },
];

const TIME_DATA = [
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  width: 350px;
  height: 25px;

  font-weight: 500;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
`;

const SubTitle = styled(Title)`
  font-size: 14px;
`;

const DateBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray};

  div {
    text-align: center;
  }
`;

const SelectedDate = styled.div`
  width: 27%;
  cursor: default;
  ${({ theme }) => theme.inputStyle};
`;
const SelectedTime = styled.div`
  width: 70%;
  z-index: 1;
`;

const ButtonWapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 150px;
  padding: 10px 0;

  button {
    margin: 0 5px;
  }
`;
