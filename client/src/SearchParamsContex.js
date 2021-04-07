import React, { createContext, useState } from 'react';

export const SearchParamsContext = createContext();

const SearchParamsProvider = (props) => {
  const [savedParams, setSavedParams] = useState({
    description: '',
    location: '',
    full_time: false,
  });

  return (
    <SearchParamsContext.Provider value={{ savedParams, setSavedParams }}>
      {props.children}
    </SearchParamsContext.Provider>
  );
};

export default SearchParamsProvider;
