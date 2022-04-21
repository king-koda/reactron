"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTooltip = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const CustomTooltip = (children, label) => {
    return (react_1.default.createElement(react_2.Tooltip, { label: label, placement: 'top' },
        react_1.default.createElement("span", null,
            react_1.default.createElement(react_2.Text, { fontSize: '20px', fontWeight: 'bold', paddingX: '6px', "text-overflow": 'ellipsis', overflow: 'hidden', width: `100%`, "white-space": 'nowrap' }, children))));
};
exports.CustomTooltip = CustomTooltip;
//# sourceMappingURL=CustomTooltip.js.map