import React from 'react';

import Modal from '../components/Modal';
import ReviewBox from '../components/ReviewBox';
import useSearch from '../hooks/useSearch';

const Review = () => {
  const { searchResult, handleInput, handleSerch } = useSearch();

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
