import React from 'react';
import styled from 'styled-components';

interface Props {
  children: JSX.Element;
}

const Modal = ({ children }: Props) => {
  return (
    <Overlay>
      <Wapper>
        <Content>{children}</Content>
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
