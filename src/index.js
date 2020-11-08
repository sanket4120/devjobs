import React from 'react';
import ReactDOM from 'react-dom';
import ThemeContextProvider from './ThemeContextProvider';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>,
  rootElement
);
