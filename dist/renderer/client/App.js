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
exports.App = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importStar(require("react"));
// const { ipcRenderer } = require("electron");
const App = () => {
    // ipcRenderer.on("asynReply", (event: any, args: any) => {
    //   // const reply = document.getElementById("#reply");
    //   // if (reply) reply.innerHTML = args;
    //   console.log(args);
    // });
    const [image, setImage] = (0, react_2.useState)();
    const [file, setFile] = (0, react_2.useState)();
    // const file = createRef<HTMLInputElement>();
    // const file: any = useRef(null);
    // useEffect(() => {
    //   console.log("useeffect", file);
    //   if (file?.current?.files?.length > 0)
    // }, [file?.current?.files]);
    // // console.log("file:", file);
    // const handleChange = (event: any) => {
    //   console.log(event?.target?.files);
    //   // window.open(event?.target?.files[0]?.path);
    //   // setImage(URL.createObjectURL(event.target.files[0]));
    //   // ipcRenderer.send("fs", {
    //   //   command: "GET_FILE",
    //   //   path: event?.target?.files[0]?.path,
    //   // });
    // };
    // console.log("file:", file?.current?.files);
    (0, react_2.useEffect)(() => {
        if (file)
            console.log("file", file);
    }, [file]);
    return (react_2.default.createElement(react_1.Flex, { width: "100vw", height: "100vh", bgColor: "blue" },
        react_2.default.createElement(react_1.Flex, { height: "100%", width: "15%", bgColor: "darkblue", 
            // align={"flex-end"}
            alignSelf: "flex-end" })));
};
exports.App = App;
//# sourceMappingURL=App.js.map