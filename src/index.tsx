import { ColorModeScript } from "@chakra-ui/react";
// import { App } from ".";
// import reportWebVitals from "./reportWebVitals";
// import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";
import { App } from "./renderer/client/App";

declare global {
  interface Window {
    send: any;
    receive: any;
    electronAPI: { openFile: () => any };
    // ipcRenderer: any;
  }
}
//
//

// interface Window {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   ipcRenderer: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// }
const container = document.getElementById("root");
const root = container && ReactDOMClient.createRoot(container);

root &&
  root.render(
    <React.StrictMode>
      <ColorModeScript />
      <App />
    </React.StrictMode>
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
