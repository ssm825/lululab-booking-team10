import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import globalState from '../recoil/atom';
import Reservation from './Reservation';
import Review from './Review';

const Calendar: React.FC = () => {
  const [check, setCheck] = useState<boolean>(false);
  const [reserve, setReserve] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<string>();
  const reserved = useRecoilValue(globalState);
  const Data = reserved.map(function (item) {
    const obj = {
      title: `${item.booking_time} ${item.user_name} ${item.categories}`,
      start: item.booking_date,
      end: item.booking_date,
    };
    return obj;
  });

  const checkHandler = () => {
    setCheck(prev => !prev);
  };

  const reserveHandler = () => {
    setReserve(prev => !prev);
  };
  return (
    <DashboardContainer>
      <ModalWapper>
        {reserve && selectDate && (
          <Reservation
            selectDate={selectDate}
            reserveHandler={reserveHandler}
          />
        )}
        {check && <Review checkHandler={checkHandler} />}
      </ModalWapper>
      <FullCalendar
        locale={'ko'}
        plugins={[dayGridPlugin, interactionPlugin]}
        dayMaxEventRows={true}
        events={Data}
        eventColor="#EFB33F"
        selectable={true}
        dateClick={(info: DateClickArg) => {
          setSelectDate(info.dateStr);
          reserveHandler();
        }}
      />
      <ButtonWrapper>
        <CheckReservationButton onClick={checkHandler}>
          예약조회
        </CheckReservationButton>
      </ButtonWrapper>
    </DashboardContainer>
  );
};
export default Calendar;
const DashboardContainer = styled.div`
  margin-top: 10px;
`;

const ModalWapper = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
`;

const ButtonWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const CheckReservationButton = styled.div`
  width: 100px;
  height: 35px;
  margin: 5px auto;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 35px;
  background-color: rgb(44, 62, 80);
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;

  :hover {
    color: rgb(44, 62, 80);
    background-color: #ffffff;
    border: 1px solid rgb(44, 62, 80);
  }
`;
