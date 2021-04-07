import React, { useContext } from 'react';
import { JobContext } from '../JobContextProvider';
import { PageContext } from '../PageContextProvider';
import '../Styles/pagination.css';
import { SearchParamsContext } from '../SearchParamsContex';

function Pagination() {
  const { hasNextPage, fetchJobs } = useContext(JobContext);
  const { page, setPage } = useContext(PageContext);
  const { savedParams } = useContext(SearchParamsContext);

  function handleChange(value) {
    setPage(page + value);
  }

  return (
    <div className='pagination'>
      {page !== 1 && (
        <button
          className='btn'
          onClick={() => {
            fetchJobs(savedParams, page - 1);
            handleChange(-1);
          }}
        >
          Prev Page
        </button>
      )}
      {hasNextPage && (
        <button
          className='btn'
          onClick={() => {
            fetchJobs(savedParams, page + 1);
            handleChange(1);
          }}
        >
          Next Page
        </button>
      )}
    </div>
  );
}

export default Pagination;
