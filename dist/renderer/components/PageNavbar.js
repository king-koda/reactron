"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNavbar = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const PageNavbar = ({ ...rest }) => {
    return (react_2.default.createElement(react_1.Flex, { className: "pgnavbar", height: "10%", width: "100%", top: "calc(20%)", bgColor: "white", zIndex: 2, fill: "white", position: "fixed", borderBottom: "solid 6px black", borderRight: "solid 6px black", borderLeft: "solid 6px black", ...rest },
        react_2.default.createElement(react_1.Tabs, { width: "100%", height: "100%" },
            react_2.default.createElement(react_1.TabPanels, null,
                react_2.default.createElement(react_1.TabPanel, { tabIndex: 0 },
                    react_2.default.createElement(react_1.Text, { color: "black" }, "dawdawd")),
                react_2.default.createElement(react_1.TabPanel, { tabIndex: 1 },
                    react_2.default.createElement(react_1.Text, { color: "black" }, "dawdawd")),
                react_2.default.createElement(react_1.TabPanel, { tabIndex: 2 },
                    react_2.default.createElement(react_1.Text, { color: "black" }, "dawdawd")),
                react_2.default.createElement(react_1.TabPanel, { tabIndex: 3 },
                    react_2.default.createElement(react_1.Text, { color: "black" }, "dawdawd"))))));
};
exports.PageNavbar = PageNavbar;
//# sourceMappingURL=PageNavbar.js.map