import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

function ThemeContextProvider(props) {
  const [theme, setTheme] = useState({
    isLightTheme: true,
  });
  function toggleTheme() {
    setTheme((prevValues) => ({
      ...prevValues,
      isLightTheme: !prevValues.isLightTheme,
    }));
  }
  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
