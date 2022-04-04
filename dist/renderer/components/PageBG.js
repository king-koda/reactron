"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageBG = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const PageBG = ({ children, ...rest }) => {
    return (react_2.default.createElement(react_1.Flex, { height: "100vh", width: "100vw", bgColor: "white", ...rest }, children));
};
exports.PageBG = PageBG;
//# sourceMappingURL=PageBG.js.map