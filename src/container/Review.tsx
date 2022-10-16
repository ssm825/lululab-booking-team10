import React from 'react';

import Modal from 'components/Modal';
import ReviewBox from 'components/ReviewBox';
import useSearch from 'hooks/useSearch';

interface ReviewProps {
  checkHandler: () => void;
}

const Review = ({ checkHandler }: ReviewProps) => {
  const { searchResult, handleInput, handleSerch } = useSearch();

  return (
    <Modal>
      <ReviewBox
        searchResult={searchResult}
        handleInput={handleInput}
        handleSerch={handleSerch}
        checkHandler={checkHandler}
      />
    </Modal>
  );
};

export default Review;
