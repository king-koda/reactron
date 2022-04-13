"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const react_1 = require("@chakra-ui/react");
const BasePage_1 = require("./BasePage");
const react_2 = __importDefault(require("react"));
const Main = () => {
    return (react_2.default.createElement(BasePage_1.BasePage, null,
        react_2.default.createElement(react_1.Flex, { bgColor: "black" }),
        react_2.default.createElement(react_1.Button, { id: "syncBtn", size: "200px" }, "FUCK"),
        react_2.default.createElement(react_1.Button, { id: "syncBtn", size: "200px", onClick: () => { } }, "NEXT HASH")));
};
exports.Main = Main;
//# sourceMappingURL=Main.js.map