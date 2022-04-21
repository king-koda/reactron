"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconAndTextWithTooltip = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const IconAndText_1 = __importDefault(require("./icons/IconAndText"));
const IconAndTextWithTooltip = ({ tooltipProps, ...rest }) => {
    return (react_2.default.createElement(react_1.Tooltip, { placement: 'top', openDelay: 500, ...tooltipProps },
        react_2.default.createElement("span", null,
            react_2.default.createElement(IconAndText_1.default, { ...rest }))));
};
exports.IconAndTextWithTooltip = IconAndTextWithTooltip;
//# sourceMappingURL=IconAndTextWithTooltip.js.map