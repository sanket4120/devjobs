import React, { useContext } from 'react';
import { JobContext } from '../JobContextProvider';
import { PageContext } from '../PageContextProvider';
import '../Styles/searchbar.css';
import { SearchParamsContext } from '../SearchParamsContex';
import { ThemeContext } from '../ThemeContextProvider';

function SearchBar() {
  const { fetchJobs } = useContext(JobContext);
  const { setPage } = useContext(PageContext);
  const { savedParams, setSavedParams } = useContext(SearchParamsContext);

  const { description, location, full_time } = savedParams;

  function handleSubmit(e) {
    e.preventDefault();
    fetchJobs(savedParams, 1);
    setPage(1);
  }

  function handleParamsChange(e) {
    const param = e.target.name;
    const value =
      param === 'full_time' ? !savedParams.full_time : e.target.value;
    setSavedParams({ ...savedParams, [param]: value });
  }

  const { isLightTheme } = useContext(ThemeContext);

  return (
    <div className='container searchbar-container'>
      <div className='searchbar'>
        <form className={isLightTheme ? 'search' : 'search bg-dark'}>
          <div className={isLightTheme ? 's-left' : 's-left content-bg-dark'}>
            <i className='fas fa-search'></i>
            <input
              type='text'
              placeholder='Filter by title..'
              onChange={handleParamsChange}
              value={description}
              name='description'
            />
          </div>

          <div
            className={isLightTheme ? 's-middle' : 's-middle content-bg-dark'}
          >
            <i className='fas fa-map-marker-alt'></i>
            <input
              type='text'
              placeholder='Filter by location..'
              onChange={handleParamsChange}
              value={location}
              name='location'
            />
          </div>

          <div className={isLightTheme ? 's-right' : 's-right content-bg-dark'}>
            <span>
              <input
                type='checkbox'
                checked={full_time}
                onChange={handleParamsChange}
                name='full_time'
              />
              <label>Full Time</label>
            </span>
            <button className='btn' onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
