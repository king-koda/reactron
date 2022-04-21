"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
// import { App } from ".";
// import reportWebVitals from "./reportWebVitals";
// import * as serviceWorker from "./serviceWorker";
const react_2 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const App_1 = require("./renderer/client/App");
// console.log('hi');
// const container = document.getElementById('root');
// const root = container && ReactDOMClient.createRoot(container);
// root &&
//   root.render(
//     <React.StrictMode>
//       <ColorModeScript />
//       <App />
//     </React.StrictMode>
//   );
react_dom_1.default.render(react_2.default.createElement(react_2.default.StrictMode, null,
    react_2.default.createElement(react_1.ColorModeScript, null),
    react_2.default.createElement(App_1.App, null)), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorker.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
//# sourceMappingURL=index.js.map