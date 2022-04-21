import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import '../styles/style.css';
import { Views } from '../views/Views';
// const { ipcRenderer } = require("electron");

export const App = () => {
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
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Views></Views>
      </HashRouter>
    </ChakraProvider>
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
