import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import './styles/style.css';
import Views from './views/Views';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Views />
      </HashRouter>
    </ChakraProvider>
  );
}
