import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { Photo } from './views/BasePage';

declare global {
  interface Window {
    send: any;
    receive: any;
    electronAPI: {
      rootFolderSelect: () => Promise<any>;
      walkFs: (path: string) => Promise<any>;
      getPhotos: (hash: string) => Promise<Photo[]>;
      deleteDuplicates: (toBeDeleted: string[]) => number;
    };
  }
}

const container = document.getElementById('root');
const root = container && ReactDOMClient.createRoot(container);

if (root)
  root.render(
    <React.StrictMode>
      <ColorModeScript />
      <App />
    </React.StrictMode>
  );
