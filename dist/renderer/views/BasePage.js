"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const NextFolderIcon_1 = __importDefault(require("../components/icons/NextFolderIcon"));
const PreviousFolderIcon_1 = __importDefault(require("../components/icons/PreviousFolderIcon"));
const PageBG_1 = require("../components/PageBG");
const PageBody_1 = require("../components/PageBody");
const PageNavbar_1 = require("../components/PageNavbar");
const PageSidebar_1 = require("../components/PageSidebar");
const BasePage = ({ children }) => {
    return (react_2.default.createElement(PageBG_1.PageBG, null,
        react_2.default.createElement(react_1.Flex, null,
            react_2.default.createElement(PageNavbar_1.PageNavbar, null,
                react_2.default.createElement(react_1.ButtonGroup, null,
                    react_2.default.createElement(react_1.Flex, { justifyContent: "space-between" },
                        react_2.default.createElement(PreviousFolderIcon_1.default, null),
                        react_2.default.createElement(NextFolderIcon_1.default, null)))),
            react_2.default.createElement(PageSidebar_1.PageSidebar, { left: "90%" }),
            react_2.default.createElement(PageBody_1.PageBody, { left: "0%" }, children))));
};
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map