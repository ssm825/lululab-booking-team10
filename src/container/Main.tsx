import React from 'react';
import styled from 'styled-components';

import Calendar from './Calendar';

const Main = () => {
  return (
    <Wapper>
      <Calendar />
    </Wapper>
  );
};

export default Main;

const Wapper = styled.div`
  max-width: 1256px;
`;
