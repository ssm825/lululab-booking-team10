import React from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import globalState from '../recoil/atom';

import InputBox from './InputBox';
import Button from './Button';
import Result from './Result';
import { SearchType, DefaultType } from '../types';

interface Props {
  searchResult: SearchType;
  handleInput: React.ChangeEventHandler<HTMLInputElement>;
  handleSerch: (
    event: React.FormEvent<HTMLFormElement>,
    globalAtom: DefaultType[]
  ) => void;
}

const ReviewBox = ({ searchResult, handleInput, handleSerch }: Props) => {
  const globalAtom = useRecoilValue(globalState);
  return (
    <>
      <Form onSubmit={event => handleSerch(event, globalAtom)}>
        <Title>조회</Title>
        {INPUT_DATA.map(item => (
          <InputBox
            key={item.placeholder}
            type={item.type}
            placeholder={item.placeholder}
            name={item.name}
            handleInput={handleInput}
          />
        ))}
        <ButtonWapper>
          <Button title="조회" />
        </ButtonWapper>
        <SubTitle>예약 내역</SubTitle>
        <Result searchResult={searchResult} />
      </Form>
    </>
  );
};

export default ReviewBox;

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

const ButtonWapper = styled.div`
  position: absolute;
  bottom: 20px;
`;

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
