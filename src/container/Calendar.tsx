import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import globalState from '../recoil/atom';
import Reservation from './Reservation';

const Calendar: React.FC = () => {
  const [check, setCheck] = useState<boolean>(false);
  const [reserve, setReserve] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<string>();
  const reserved = useRecoilValue(globalState);
  const Data = reserved.map(function (item) {
    const obj = {
      title: `${item.user_name} ${item.booking_time} ${item.categories}`,
      start: item.booking_date,
      end: item.booking_date,
    };
    return obj;
  });

  const CheckHandler = () => {
    setCheck(true);
  };

  const ReserveHandler = () => {
    setReserve(prev => !prev);
  };
  return (
    <DashboardContainer>
      {reserve && (
        <Reservation selectDate={selectDate} ReserveHandler={ReserveHandler} />
      )}
      <FullCalendar
        locale={'ko'}
        plugins={[dayGridPlugin, interactionPlugin]}
        dayMaxEventRows={true}
        moreLinkClick="popover"
        events={Data}
        eventColor="#EFB33F"
        selectable={true}
        editable={true}
        dateClick={(info: DateClickArg) => {
          setSelectDate(info.dateStr);
          ReserveHandler();
        }}
      />
      <ButtonWrapper>
        <CheckReservationButton onClick={CheckHandler}>
          예약조회
        </CheckReservationButton>
        <ReserveButton onClick={ReserveHandler}>예약하기</ReserveButton>
      </ButtonWrapper>
    </DashboardContainer>
  );
};
export default Calendar;
const DashboardContainer = styled.div`
  margin-top: 20px;
`;

const ButtonWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;

const CheckReservationButton = styled.div`
  width: 50px;
  height: 25px;
  border-radius: 25px;
`;

const ReserveButton = styled.div`
  width: 50px;
  height: 25px;
  border-radius: 25px;
`;
