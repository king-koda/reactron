"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const react_1 = require("@chakra-ui/react");
const BasePage_1 = require("./BasePage");
const react_2 = __importStar(require("react"));
const Main = () => {
    const [hashIndex, setHashIndex] = (0, react_2.useState)(0);
    const [ht, setHt] = (0, react_2.useState)(undefined);
    console.log("ht", ht);
    return (react_2.default.createElement(BasePage_1.BasePage, null,
        react_2.default.createElement(react_1.Flex, { bgColor: "black" }),
        react_2.default.createElement(react_1.Button, { id: "syncBtn", size: "200px", onClick: async () => {
                await window.electronAPI
                    .walkFs()
                    .then((result) => {
                    console.log("hi", result);
                    setHt(result);
                })
                    .catch((err) => console.log("merr", err));
            } }, "FUCK"),
        react_2.default.createElement(react_1.Button, { id: "syncBtn", size: "200px", onClick: () => { } }, "NEXT HASH"),
        ht && (react_2.default.createElement(react_1.Flex, { mt: "200px", fontSize: "50px" },
            "Hash: ",
            ht[hashIndex]))));
};
exports.Main = Main;
//# sourceMappingURL=Main.js.map