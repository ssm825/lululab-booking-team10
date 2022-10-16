import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <Container>
      <Load />
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: black;
  opacity: 0.7;
  z-index: 9;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Load = styled.div`
  border: 0.685946vh solid #f3f3f3;
  border-top: 0.685946vh solid black;
  border-radius: 50%;
  width: 6.161838vh;
  height: 6.161838vh;
  animation: spin 1.3s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
