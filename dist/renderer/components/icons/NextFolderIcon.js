"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const index_1 = require("react-icons/bs/index");
const NextFolderIcon = ({ ...rest }) => {
    return (react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement(react_1.Flex, { display: "block", align: "center", width: "150px", textAlign: "center" },
            react_2.default.createElement(index_1.BsArrowRightCircleFill, { size: "150px" }),
            react_2.default.createElement(react_1.Text, { fontWeight: "bold", overflowWrap: "normal", alignSelf: "center", fontSize: "30px", lineHeight: 8 }, "Next Folder"))));
};
exports.default = NextFolderIcon;
//# sourceMappingURL=NextFolderIcon.js.map