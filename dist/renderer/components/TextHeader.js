"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeader = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const TextHeader = ({ children, ...rest }) => {
    return (react_2.default.createElement(react_1.Text, { fontSize: '24px', width: 'auto', whiteSpace: 'nowrap', fontWeight: 'bold', ...rest }, children));
};
exports.TextHeader = TextHeader;
//# sourceMappingURL=TextHeader.js.map