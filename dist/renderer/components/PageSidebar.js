"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageSidebar = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const PageSidebar = ({ ...rest }) => {
    return (react_2.default.createElement(react_1.Flex, { className: "pgsidebar", height: "100%", width: "10%", position: "fixed", justifySelf: "flex-end", bgColor: "white", fill: "white", zIndex: 1, borderRight: "solid 6px black", borderLeft: "solid 6px black", borderBottom: "solid 6px black", ...rest }));
};
exports.PageSidebar = PageSidebar;
//# sourceMappingURL=PageSidebar.js.map