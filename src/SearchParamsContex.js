import React, { createContext, useState } from 'react';

export const SearchParamsContext = createContext();

const SearchParamsProvider = (props) => {
  const [searchParams, setSearchParams] = useState({
    description: '',
    location: '',
    full_time: false,
  });
  return (
    <SearchParamsContext.Provider value={{ searchParams, setSearchParams }}>
      {props.children}
    </SearchParamsContext.Provider>
  );
};

export default SearchParamsProvider;
