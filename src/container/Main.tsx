import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import useFetch from '../hooks/useFetch';
import globalState from '../recoil/atom';

import Loader from '../components/Loader';
import Review from './Review';
import Reservation from './Reservation';

const Main = () => {
  const { results, loading } = useFetch();
  const setGlobalAtom = useSetRecoilState(globalState);

  useEffect(() => {
    setGlobalAtom(results);
  }, [loading]);

  return (
    <Wapper>{loading && results.length === 0 ? <Loader /> : <Review />}</Wapper>
  );
};

export default Main;

const Wapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
