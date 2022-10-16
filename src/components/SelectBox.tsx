import React, { useState, useRef, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  title: string;
  option: Array<string>;
  handleCategory?: (event: string) => void;
  handleTime?: (event: string) => void;
  category?: string;
  time?: string;
}

const SelectBox = ({
  title,
  option,
  handleCategory,
  handleTime,
  category,
  time,
}: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const showOption = (event: React.MouseEvent<HTMLElement>, title: string) => {
    event.stopPropagation();
    event.preventDefault();
    const e = String(event.currentTarget.innerText);
    if (handleCategory) {
      handleCategory(e);
    }
    if (handleTime) {
      handleTime(e);
    }
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
        {title === '예약 종류' && (
          <Title>{category !== '' ? category : title}</Title>
        )}
        {title === '시간 선택' && <Title>{time !== '' ? time : title}</Title>}
        <FaCaretDown />
      </TitleContent>
      <OptionContent isShow={!toggle}>
        {option.map(data => (
          <Option
            key={data}
            onClick={event => {
              showOption(event, title);
            }}
            name={data}
          >
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

  /* :nth-child(1) {
    height: 195px;
    overflow-y: scroll;
  }
  :nth-child(2) {
    z-index: 50;
  } */
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
