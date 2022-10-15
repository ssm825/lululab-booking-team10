import React from 'react';
import styled from 'styled-components';

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  return (
    <Main>
      <Content>{children}</Content>
    </Main>
  );
};

export default Layout;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  max-width: 1256px;
  width: 100%;
  overflow: hidden;
`;
