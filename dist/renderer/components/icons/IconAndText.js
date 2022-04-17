"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const IconAndText = ({ icon, text, flex, onClick, iconProps, textProps, flexProps, ...rest }) => {
    return (react_2.default.createElement(react_1.Flex, { width: "100px", height: "100px", display: "block", align: "center", textAlign: "center", onClick: onClick, userSelect: "none", _hover: { cursor: "pointer", border: "solid 2px blue" }, ...flexProps },
        react_2.default.createElement(react_1.Icon, { paddingTop: 3, alignSelf: "center", as: icon, type: "button", textAlign: "center", fontSize: "50px", color: "yellow", ...iconProps }),
        react_2.default.createElement(react_1.Text, { fontWeight: "bold", fontSize: "15px", width: "100px", marginTop: -1, textAlign: "center", textColor: "black", ...textProps }, text)));
};
exports.default = IconAndText;
//# sourceMappingURL=IconAndText.js.map