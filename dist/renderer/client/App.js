"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("../styles/style.css");
const Views_1 = require("../views/Views");
// const { ipcRenderer } = require("electron");
const App = () => {
    // ipcRenderer.on("asynReply", (event: any, args: any) => {
    //   // const reply = document.getElementById("#reply");
    //   // if (reply) reply.innerHTML = args;
    // });
    // const [image, setImage] = useState<any>();
    // const [file, setFile] = useState<any>();
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
    // useEffect(() => {
    //   if (file) console.log("file", file);
    // }, [file]);
    console.log('hisaddw');
    return (react_2.default.createElement(react_1.ChakraProvider, { theme: react_1.theme },
        react_2.default.createElement(react_router_dom_1.HashRouter, null,
            react_2.default.createElement(Views_1.Views, null)))
    // <Flex width="100vw" height="100vh" bgColor={"blue"}>
    /* <Button>Potato</Button>
      <Button
        id="syncBtn"
        onClick={async () => {
          setFile(await window.electronAPI.rootFolderSelect());
        }}
        //   // window.api.receive("fromMain", (data: any) => {
        //   //   console.log(`Received ${data} from main process`);
        //   // });
        //   // window.api.send("toMain", "some data");
        //   // ipcRenderer.send("deeznutz", "ping");
        //   // ipcRenderer.send("asynchronous-message", "ping");
        // }}
      >
        FUCK
      </Button> */
    /* <Flex
        height="100%"
        width="15%"
        bgColor="darkblue"
        // align={"flex-end"}
        alignSelf="flex-end"
      ></Flex> */
    /* <Input ref={file} type="file" onChange={handleChange} /> */
    /* <Image src={image}></Image> */
    // </Flex>
    );
};
exports.App = App;
//# sourceMappingURL=App.js.map