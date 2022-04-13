"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const index_1 = require("react-icons/bs/index");
const PreviousFolderIcon = ({ ...rest }) => {
    return (react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement(react_1.Flex, { display: "block", align: "center", paddingX: "40px" },
            react_2.default.createElement(index_1.BsArrowLeftCircleFill, { size: "200px" }),
            react_2.default.createElement(react_1.Text, { fontWeight: "bold", fontSize: "40px" }, "Prev Folder"))));
};
exports.default = PreviousFolderIcon;
//# sourceMappingURL=PreviousFolderIcon.js.map