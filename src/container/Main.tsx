import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import useFetch from 'hooks/useFetch';
import globalState from 'recoil/atom';
import Loader from 'components/Loader';
import Calendar from './Calendar';

const Main = () => {
  const { results, loading } = useFetch();
  const setGlobalAtom = useSetRecoilState(globalState);

  useEffect(() => {
    setGlobalAtom(results);
  }, [loading]);

  return (
    <Wapper>
      {loading && results.length === 0 ? <Loader /> : <Calendar />}
    </Wapper>
  );
};

export default Main;

const Wapper = styled.div`
  max-width: 1256px;
`;
