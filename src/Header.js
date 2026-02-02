import React from "react";
import Navbar from "./Navbar";

const Header = ({ theme, toggleTheme }) => {
  return <Navbar theme={theme} toggleTheme={toggleTheme} />;
};

export default Header;
