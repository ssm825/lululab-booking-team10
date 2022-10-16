import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import globalState from '../recoil/atom';

interface reservationInfo {
  id: number;
  user_name: string;
  user_phone: string;
  booking_date: string;
  booking_time: string;
  categories: Array<string>;
}

const Calendar: React.FC = () => {
  const [reserved, setReserved] = useRecoilState(globalState);

  console.log(reserved);

  return (
    <DashboardContainer>
      <FullCalendar
        locale={'ko'}
        plugins={[dayGridPlugin, interactionPlugin]}
        dayMaxEventRows={true}
        moreLinkClick="popover"
        // events={reserved?.user_name}
        eventColor="#efb33f"
      />
    </DashboardContainer>
  );
};

export default Calendar;

const DashboardContainer = styled.div`
  margin-top: 20px;
`;
