import React, { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';
import globalState from '../recoil/atom';

import Modal from '../components/Modal';
import ReviewBox from '../components/ReviewBox';
import useSearch from '../hooks/useSearch';

import { DefaultType } from '../types';

const Review = ({ results }: { results: DefaultType[] }) => {
  const setGlobalResult = useSetRecoilState(globalState);
  const { searchResult, handleInput, handleSerch } = useSearch();

  useEffect(() => setGlobalResult(results), []);

  return (
    <Modal>
      <ReviewBox
        searchResult={searchResult}
        handleInput={handleInput}
        handleSerch={handleSerch}
      />
    </Modal>
  );
};

export default Review;
