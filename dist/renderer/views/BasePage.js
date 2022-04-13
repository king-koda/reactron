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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const react_1 = require("@chakra-ui/react");
const js_logger_1 = __importDefault(require("js-logger"));
const react_2 = __importStar(require("react"));
const gr_1 = require("react-icons/gr");
const IconAndText_1 = __importDefault(require("../components/icons/IconAndText"));
const PageBG_1 = require("../components/PageBG");
const PageBody_1 = require("../components/PageBody");
const PageNavbar_1 = require("../components/PageNavbar");
const BasePage = ({ children }) => {
    const [hashIndex, setHashIndex] = (0, react_2.useState)(0);
    const [ht, setHt] = (0, react_2.useState)(undefined);
    js_logger_1.default.debug("ht", ht);
    return (react_2.default.createElement(PageBG_1.PageBG, null,
        react_2.default.createElement(react_1.Flex, null,
            react_2.default.createElement(PageNavbar_1.PageNavbar, null,
                react_2.default.createElement(react_1.ButtonGroup, null,
                    react_2.default.createElement(react_1.Flex, { justifyContent: "space-between" },
                        react_2.default.createElement(IconAndText_1.default, { icon: gr_1.GrSelect, text: "Select Root Folder" }),
                        react_2.default.createElement(IconAndText_1.default, { icon: gr_1.GrScan, text: "Scan for Duplicates", flexProps: {
                                onClick: async () => {
                                    await window.electronAPI
                                        .walkFs()
                                        .then((result) => {
                                        js_logger_1.default.debug("walkFs FE result:", result);
                                        setHt(result);
                                    })
                                        .catch((err) => js_logger_1.default.debug("fuck button error: ", err));
                                },
                            } }),
                        react_2.default.createElement(IconAndText_1.default, { icon: gr_1.GrCaretPrevious, text: "Previous Duplicate" }),
                        react_2.default.createElement(IconAndText_1.default, { icon: gr_1.GrCaretNext, text: "Next Duplicate" })))),
            react_2.default.createElement(react_1.Text, null, "Hash:"),
            ht && react_2.default.createElement(react_1.Flex, null, ht[hashIndex]),
            react_2.default.createElement(PageBody_1.PageBody, { left: "0%" }, children))));
};
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map