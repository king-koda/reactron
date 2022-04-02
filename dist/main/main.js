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
// Modules to control application life and create native browser window
const electron_1 = require("electron");
const path = __importStar(require("path"));
const hasher = require("./hasher.js");
const isDev = true;
let mainWindow;
async function handleFileOpen() {
    const { canceled, filePaths } = await electron_1.dialog.showOpenDialog(mainWindow);
    if (canceled) {
        return;
    }
    else {
        // return fs.createFileStream(filePaths[0]);
    }
}
function getMenuConfig() {
    return electron_1.Menu.buildFromTemplate([
        {
            label: "File",
            submenu: [
                {
                    click: () => mainWindow.webContents.send("update-counter", 1),
                    label: "Increment",
                },
                {
                    click: () => mainWindow.webContents.send("update-counter", -1),
                    label: "Decrement",
                },
            ],
        },
        {
            label: "Edit",
            submenu: [
                {
                    click: () => mainWindow.webContents.send("update-counter", 1),
                    label: "Increment",
                },
                {
                    click: () => mainWindow.webContents.send("update-counter", -1),
                    label: "Decrement",
                },
            ],
        },
        {
            label: "Preferences",
            submenu: [
                {
                    click: () => mainWindow.webContents.send("update-counter", 1),
                    label: "Increment",
                },
                {
                    click: () => mainWindow.webContents.send("update-counter", -1),
                    label: "Decrement",
                },
            ],
        },
    ]);
}
async function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, "..", "..", "preload.js"),
            nodeIntegration: true,
            contextIsolation: true,
        },
    });
    const window = electron_1.BrowserWindow.getFocusedWindow();
    if (window) {
        const [width, height] = window.getSize();
        mainWindow.height = height;
        mainWindow.width = width;
    }
    const menu = getMenuConfig();
    mainWindow
        .loadURL("http://localhost:3000")
        .catch((error) => console.log(error));
    // mainWindow
    //   .loadFile(path.join(__dirname, "/index.html"))
    //   .catch((error) => console.log(error));
    // Open the DevTools.
    isDev ? mainWindow.webContents.openDevTools() : null;
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
    electron_1.ipcMain.handle("dialog:openFile", handleFileOpen);
    console.log("app ready");
    createWindow()
        .then(() => hasher.walk() && (isDev ? console.log("initial window created") : null))
        .catch((error) => isDev ? console.log("error on initial create window") : null);
    electron_1.app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow()
                .then(() => isDev ? console.log("window created on app activate") : null)
                .catch((error) => isDev ? console.log("error on create window activate") : null);
    });
    // ipcMain.on("deeznutz", (event, arg) => {
    //   mainWindow.webContents.send("deeznutz", "hi");
    //   // event.sender.send("deeznutz", "hi");
    //   mainWindow.send("deeznutz", "hi");
    //   mainWindow.webContents.send("hello");
    // });
    // ipcMain.on("asynchronous-message", (event, arg) => {
    //   event.sender.send("asynReply", "Hi, asyn reply");
    //   // event.returnValue = "Hi, sync reply";
    // });
    // ipcMain.on("synMessage", (event, args) => {
    //   console.log(args);
    //   event.returnValue = "Main said I received your Sync message";
    // });
    // ipcMain.on("aSynMessage", (event, args) => {
    //   console.log(args);
    //   event.sender.send("asynReply", "Main said: Async message received");
    // });
    // const { PathLike, ReadStream } = require("original-fs");
    // type fsArgs = {
    //   command: fsCommands;
    //   path: PathLike;
    // };
    // type fsCommands = "GET_FILE";
    // ipcMain.on("fs", (event, args: fsArgs) => {
    //   console.log("args", args);
    //   if (args.command === "GET_FILE") {
    //     const { createReadStream } = require("fs");
    //     const readStream: ReadStream = createReadStream(path);
    //     event.sender.send("fsReply", readStream.pipe());
    //   }
    // });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
// ipcMain.on("invokeAction", (event, args) => {
//   var result = "test result!";
//   mainWindow.webContents.send("fromMain", console.log("efsefesfefsw"));
// });
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//# sourceMappingURL=main.js.map