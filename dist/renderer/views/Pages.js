"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pages = void 0;
const react_router_1 = require("react-router");
const Home_1 = require("./Home");
const react_1 = __importDefault(require("react"));
const Pages = () => {
    return (react_1.default.createElement(react_router_1.Routes, null,
        react_1.default.createElement(react_router_1.Route, { path: "/", element: react_1.default.createElement(Home_1.Home, null) })));
};
exports.Pages = Pages;
//# sourceMappingURL=Pages.js.map