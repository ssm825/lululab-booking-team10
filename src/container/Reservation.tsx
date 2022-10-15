import React from 'react';
import Button from '../components/Button';
import InputBox from '../components/InputBox';
import styled from 'styled-components';
import Modal from '../components/Modal';
import theme from '../styles/theme';
import SelectBox from '../components/SelectBox';

const Reservation = () => {
  return (
    <Modal>
      <Form>
        <Title>예약</Title>
        <InputBox type="text" placeholder="이름을 입력해주세요" />
        <InputBox type="number" placeholder="핸드폰 번호를 입력해주세요" />
        <InputBox type="email" placeholder="이메일을 입력해주세요" />
        <SelectBox title="예약 종류" option={['진료', '검진', '기타']} />
        <SubTitle>시간 설정</SubTitle>
        <DateBox>
          <SelectedDate>10.15 (토)</SelectedDate>
          <SelectedTime>
            <SelectBox
              title="시간 선택"
              option={['11:00', '13:00', '14:00', '15:00']}
            />
          </SelectedTime>
        </DateBox>
      </Form>
      <ButtonWapper>
        <Button title="예약" />
        <Button title="취소" />
      </ButtonWapper>
    </Modal>
  );
};

export default Reservation;

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
  width: 25%;
  cursor: default;
  ${({ theme }) => theme.inputStyle};
`;
const SelectedTime = styled.div`
  width: 70%;
`;

const ButtonWapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 120px;
  padding: 10px 0;

  button {
    margin: 0 5px;
  }
`;
