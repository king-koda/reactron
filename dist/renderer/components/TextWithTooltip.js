"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextWithTooltip = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const TextWithTooltip = ({ tooltipProps, children, ...rest }) => {
    return (react_2.default.createElement(react_1.Tooltip, { placement: 'top', openDelay: 500, ...tooltipProps },
        react_2.default.createElement(react_1.Text, { width: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', ...rest }, children)));
};
exports.TextWithTooltip = TextWithTooltip;
//# sourceMappingURL=TextWithTooltip.js.map