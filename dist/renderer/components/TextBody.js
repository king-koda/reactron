"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBody = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const TextBody = ({ children, ...rest }) => {
    return (react_2.default.createElement(react_1.Text, { fontSize: '20px', width: '25%', textOverflow: 'ellipsis', overflow: 'auto', fontWeight: 'bold', height: '100%', ...rest }, children));
};
exports.TextBody = TextBody;
//# sourceMappingURL=TextBody.js.map