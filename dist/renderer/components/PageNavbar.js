"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNavbar = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const PageNavbar = ({ children, ...rest }) => {
    return (react_2.default.createElement(react_1.Flex, { className: "pgnavbar", height: "20%", width: "90%", 
        //top="calc(20%)"
        bgColor: "white", zIndex: 4, fill: "white", position: "fixed", borderBottom: "solid 6px black", borderLeft: "solid 6px black", borderTop: "solid 6px black", ...rest }, children));
};
exports.PageNavbar = PageNavbar;
//# sourceMappingURL=PageNavbar.js.map