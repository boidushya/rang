import React from "react";
import Title from "./title";
import Timer from "../Timer";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between w-full p-4 py-6 md:py-12 md:p-12 fixed top-0 left-0">
      <Title />
      <Timer />
    </nav>
  );
};

export default Nav;
