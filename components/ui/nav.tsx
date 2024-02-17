import React from "react";
import Title from "./title";
import Points from "../Points";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between w-full p-12 fixed top-0 left-0">
      <Title />
      <Points />
    </nav>
  );
};

export default Nav;
