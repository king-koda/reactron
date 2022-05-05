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
// Modules to control application life and create native browser window
const electron_1 = require("electron");
const js_logger_1 = __importDefault(require("js-logger"));
const node_cache_1 = __importDefault(require("node-cache"));
const path = __importStar(require("path"));
const hasher_1 = require("./hasher");
const isDev = true;
const gNodeCache = new node_cache_1.default();
js_logger_1.default.setLevel(js_logger_1.default.DEBUG);
let mainWindow;
function getMenuConfig() {
    return electron_1.Menu.buildFromTemplate([
    // {
    //   label: 'File',
    //   submenu: [
    //     {
    //       click: () => mainWindow.webContents.send('update-counter', 1),
    //       label: 'Increment',
    //     },
    //     {
    //       click: () => mainWindow.webContents.send('update-counter', -1),
    //       label: 'Decrement',
    //     },
    //   ],
    // },
    // {
    //   label: 'Edit',
    //   submenu: [
    //     {
    //       click: () => mainWindow.webContents.send('update-counter', 1),
    //       label: 'Increment',
    //     },
    //     {
    //       click: () => mainWindow.webContents.send('update-counter', -1),
    //       label: 'Decrement',
    //     },
    //   ],
    // },
    // {
    //   label: 'Preferences',
    //   submenu: [
    //     {
    //       click: () => mainWindow.webContents.send('update-counter', 1),
    //       label: 'Increment',
    //     },
    //     {
    //       click: () => mainWindow.webContents.send('update-counter', -1),
    //       label: 'Decrement',
    //     },
    //   ],
    // },
    ]);
}
async function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, '..', '..', 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
        },
    });
    // const window = BrowserWindow.getFocusedWindow();
    // if (window) {
    //   const [width, height] = window.getSize();
    //   mainWindow.height = height;
    //   mainWindow.width = width;
    // }
    // const menu = getMenuConfig();
    // console.log(path.join(__dirname, '..', '..', 'public', 'index.html'));
    // mainWindow.loadURL(
    //   url.format({
    //     pathname: path.join(__dirname, '..', '..', 'build', 'index.html'),
    //     protocol: 'file:',
    //     slashes: true,
    //   })
    // );
    mainWindow.setMenu(null);
    // mainWindow
    //   .loadURL('http://localhost:3000')
    //   .catch((error) => Logger.debug('main window load url error', error));
    // mainWindow
    //   .loadURL(
    //     `file://${path.join(__dirname, '..', '..', 'public', 'index.html')}`
    //   )
    //   .catch((error) => Logger.debug('main window load url error', error));
    mainWindow
        .loadFile(path.join(__dirname, '..', '..', 'build', 'index.html'))
        .catch((error) => console.log(error));
    // Open the DevTools.
    isDev ? mainWindow.webContents.openDevTools() : null;
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
    createWindow()
        .then(() => {
        isDev ? js_logger_1.default.debug('initial window created') : null;
    })
        .catch((error) => isDev ? js_logger_1.default.debug('error on initial create window') : null);
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow()
                .then(() => isDev ? js_logger_1.default.debug('window created on app activate') : null)
                .catch((error) => isDev ? js_logger_1.default.debug('error on create window activate') : null);
    });
    electron_1.ipcMain.handle('dialog:rootFolderSelect', async (event) => {
        return await (0, hasher_1.rootFolderSelect)(mainWindow)
            .then()
            .catch((err) => console.log('root folder select error:', err));
    });
    electron_1.ipcMain.handle('run:getPhotos', async (event, hash) => {
        return await (0, hasher_1.getFilesFromHashKey)(gNodeCache, hash)
            .then()
            .catch((err) => console.log('get files from hash error:', err));
    });
    electron_1.ipcMain.handle('run:walkFs', async (event, path) => {
        const result = await (0, hasher_1.walkFs)(gNodeCache, path)
            .then((result) => result)
            .catch((err) => js_logger_1.default.debug('walkFs main error'));
        if (!!result) {
            return result;
        }
        return false;
    });
    electron_1.ipcMain.handle('run:deleteDuplicates', async (event, toBeDeleted) => {
        const result = await (0, hasher_1.deleteDuplicates)(toBeDeleted)
            .then((result) => result)
            .catch((err) => js_logger_1.default.debug('deleteDuplicates error'));
        if (!!result) {
            return result;
        }
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
//# sourceMappingURL=main.js.map