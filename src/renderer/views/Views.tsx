import React from 'react';
import { Route, Routes } from 'react-router';
import BasePage from './BasePage';

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<BasePage />} />
    </Routes>
  );
};

export default Views;
