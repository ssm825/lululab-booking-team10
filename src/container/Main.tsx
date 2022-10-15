import React from 'react';
import styled from 'styled-components';
import useFetch from '../hooks/useFetch';

import Loader from '../components/Loader';
import Review from './Review';

const Main = () => {
  const { results, loading } = useFetch();
  return (
    <Wapper>
      {loading && results.length === 0 ? (
        <Loader />
      ) : (
        <Review results={results} />
      )}
    </Wapper>
  );
};

export default Main;

const Wapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
