import { Route, Routes } from "react-router";
import { Home } from "./Home";
import React from "react";

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
    </Routes>
  );
};
