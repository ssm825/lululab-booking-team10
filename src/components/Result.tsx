import React from 'react';
import styled from 'styled-components';

import { SearchType } from 'types';

const Result = ({ searchResult }: { searchResult: SearchType }) => {
  const { isResult, result } = searchResult;
  return (
    <Wapper>
      <Content>
        <Description>
          {!isResult ? (
            <>
              <p>이름, 핸드폰번호, 이메일을 입력한 뒤</p>
              <p>조회 버튼을 클릭해주세요.</p>
            </>
          ) : (
            <>
              <p>예약 이름 : {result?.user_name}</p>
              <p>
                예약 시간 : {result?.booking_date} 일 {result?.booking_time}
              </p>
              <p>예약 내용 : {result?.categories}</p>
              <p>예약 번호 : {result?.id}</p>
            </>
          )}
        </Description>
      </Content>
    </Wapper>
  );
};

export default Result;

const Wapper = styled.div`
  width: 100%;
  height: 85px;
  background-color: #ebeff5;
`;

const Content = styled.div`
  padding: 10px;
`;

const Description = styled.span`
  display: flex;
  flex-direction: column;
  gap: 6px;

  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;
