import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}

const Button = ({ title }: Props) => {
  return (
    <Wapper>
      <Content>
        <Title>{title}</Title>
      </Content>
    </Wapper>
  );
};

export default Button;

const Wapper = styled.div`
  opacity: 0.7;
`;

const Content = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #333848;
  background-color: white;
  cursor: pointer;

  transition: 0.3s;

  :hover {
    background-color: #ebeff5;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 55px;
  height: 34px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.4px;
  color: #333840;
`;
