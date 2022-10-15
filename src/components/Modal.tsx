import React from 'react';
import styled from 'styled-components';

import InputBox from './InputBox';
import Button from './Button';

const Modal = () => {
  return (
    <Overlay>
      <Wapper>
        <Content>
          <Form>
            <Title>예약</Title>
            <InputBox type="text" placeholder="이름을 입력해주세요" />
            <InputBox type="number" placeholder="핸드폰 번호를 입력해주세요" />
            <InputBox type="email" placeholder="이메일을 입력해주세요" />
            <SubTitle>시간 설정</SubTitle>
            <InputBox type="email" placeholder="시간을 선택해주세요" />
            <ButtonWapper>
              <Button title="예약" />
            </ButtonWapper>
          </Form>
          <ButtonWapper>
            <Button title="취소" />
          </ButtonWapper>
        </Content>
      </Wapper>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  width: 100%;
  height: 100%;
  top: 0;
  backdrop-filter: blur(2px);
  z-index: 999;
`;

const Wapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: fixed;
  width: 100%;
  bottom: 50;

  animation: fadeIn 0.9s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translate3d(0, 50%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;

const Content = styled.div`
  width: 434px;
  height: 469px;
  padding: 30px;
  border-radius: 3px;

  background-color: white;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
`;

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
