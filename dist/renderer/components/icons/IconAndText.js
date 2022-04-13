"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const IconAndText = ({ icon, text, flex, iconProps, textProps, flexProps, ...rest }) => {
    return (react_2.default.createElement(react_1.Flex, { as: react_1.Button, display: "block", align: "center", width: "150px", textAlign: "center", ...flexProps },
        react_2.default.createElement(react_1.Icon, { as: icon, type: "button", fontSize: "100px", ...iconProps }),
        react_2.default.createElement(react_1.Text, { fontWeight: "bold", alignSelf: "center", fontSize: "20px", textColor: "black", lineHeight: 8, ...textProps }, text)));
};
exports.default = IconAndText;
//# sourceMappingURL=IconAndText.js.map