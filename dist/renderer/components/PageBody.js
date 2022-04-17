"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageBody = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const PageBody = ({ children, ...rest }) => {
    return (react_2.default.createElement(react_1.Flex, { className: 'pg-body', height: '100%', width: '100%', bgColor: 'rgba(0, 0, 0, 0.0)', 
        // top='20%'
        left: '10%', zIndex: 3, position: 'fixed', borderBottom: 'solid 6px black', borderLeft: 'solid 6px black', borderRight: 'solid 6px black', ...rest }, children));
};
exports.PageBody = PageBody;
//# sourceMappingURL=PageBody.js.map