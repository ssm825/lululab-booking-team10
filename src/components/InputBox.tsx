import React from 'react';
import styled from 'styled-components';

interface Props {
  type: string;
  placeholder: string;
  name: string;
  handleInput?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputBox = ({ type, placeholder, name, handleInput }: Props) => {
  return (
    <Wapper>
      <Content
        type={type}
        placeholder={placeholder}
        name={name}
        required
        onChange={handleInput}
      />
    </Wapper>
  );
};

export default InputBox;

const Wapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 55px;
  border-radius: 4px;
  background-color: #ebeff5;
`;

const Content = styled.input`
  outline: none;
  border: none;
  margin-left: 10px;
  background-color: #ebeff5;
`;
