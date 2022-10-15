import React, { useState, useRef, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import theme from '../styles/theme';
import styled from 'styled-components';

interface Props {
  title: string;
  option: Array<string>;
}

const SelectBox = ({ title, option }: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [clickedButton, setClickedButton] = useState<string>('');
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton(button.name);
    setToggle(!toggle);
  };

  const outsideRef = useRef<HTMLDivElement>(null);
  const handleClose = (event: Event) => {
    if (!outsideRef.current?.contains(event.target as Node)) setToggle(toggle);
  };
  useEffect(() => {
    document.addEventListener('click', handleClose, true);
    return () => {
      document.removeEventListener('click', handleClose, true);
    };
  }, []);

  return (
    <Continer ref={outsideRef}>
      <TitleContent onClick={handleToggle}>
        <Title>{clickedButton !== '' ? clickedButton : title}</Title>
        <FaCaretDown />
      </TitleContent>
      <OptionContent isShow={!toggle}>
        {option.map(data => (
          <Option key={data} onClick={handleClick} name={data}>
            {data}
          </Option>
        ))}
      </OptionContent>
    </Continer>
  );
};

export default SelectBox;

const Continer = styled.div`
  width: 100%;
  ${({ theme }) => theme.inputStyle};
  z-index: 10;
`;
const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  text-indent: 10px;
  cursor: pointer;
`;
const OptionContent = styled.div<{ isShow: boolean }>`
  display: ${props => (props.isShow ? 'none' : 'block')};
  width: 100%;
  border-radius: 4px;
  line-height: 45px;
  box-shadow: 0 10px 30px rgba(30, 30, 30, 0.1);
  background-color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.div``;
const Option = styled.button`
  width: 100%;
  height: 50px;
  line-height: 50px;
  outline: none;
  cursor: pointer;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightblue};
  background-color: ${({ theme }) => theme.colors.white};
  :hover {
    background-color: ${({ theme }) => theme.colors.lightblue};
  }
  :last-child {
    border-bottom: none;
  }
`;
