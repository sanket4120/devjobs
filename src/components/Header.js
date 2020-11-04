import React, { useContext } from "react";
import "../Styles/header.css";
import { ThemeContext } from "../ThemeContextProvider";

function Header() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="container header-container">
        <div className="h-left">
          <p>devjobs</p>
        </div>
        <div className="h-right">
          <i className="fas fa-sun"></i>
          <input
            type="checkbox"
            id="mode"
            onChange={toggleTheme}
          />
          <i className="fas fa-moon"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
