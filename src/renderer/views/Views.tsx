import React from "react";
import { Route, Routes } from "react-router";
import { Main } from "./Main";

export const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>}></Route>
    </Routes>
  );
};
