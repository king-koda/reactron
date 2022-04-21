"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const IconAndText = ({ icon, text, flex, onClick, iconProps, textProps, isDisabled = false, isButton = true, ...rest }) => {
    return (react_2.default.createElement(react_1.Flex, { display: 'block', align: 'center', textAlign: 'center', opacity: !isDisabled ? 1 : 0.3, onClick: isButton && !isDisabled ? onClick : undefined, userSelect: isButton && !isDisabled ? 'none' : undefined, ...rest },
        react_2.default.createElement(react_1.Icon, { margin: 3, alignSelf: 'center', as: icon, width: '60px', height: '60px', type: 'button', textAlign: 'center', fontSize: '50px', _hover: isButton && !isDisabled
                ? { cursor: 'pointer', border: 'solid 2px blue' }
                : undefined, ...iconProps }),
        react_2.default.createElement(react_1.Text, { fontWeight: 'bold', fontSize: '15px', width: '100px', marginTop: -1, textAlign: 'center', textColor: 'black', ...textProps }, text)));
};
exports.default = IconAndText;
//# sourceMappingURL=IconAndText.js.map