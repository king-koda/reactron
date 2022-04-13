"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Views = void 0;
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
const Main_1 = require("./Main");
const Views = () => {
    return (react_1.default.createElement(react_router_1.Routes, null,
        react_1.default.createElement(react_router_1.Route, { path: "/", element: react_1.default.createElement(Main_1.Main, null) })));
};
exports.Views = Views;
//# sourceMappingURL=Views.js.map