import React, { createContext, useState } from 'react';

export const PageContext = createContext();

function PageContextProvider(props) {
  const [page, setPage] = useState(1);
  return (
    <PageContext.Provider value={{ page, setPage }}>
      {props.children}
    </PageContext.Provider>
  );
}

export default PageContextProvider;
