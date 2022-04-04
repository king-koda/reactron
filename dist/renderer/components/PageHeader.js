"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHeader = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const PageHeader = ({ ...rest }) => {
    return (react_2.default.createElement(react_1.Flex, { className: "pgheader", height: "20%", width: "100vw", bgColor: "white", zIndex: 2, position: "fixed", border: "solid 6px black", ...rest }));
};
exports.PageHeader = PageHeader;
//# sourceMappingURL=PageHeader.js.map