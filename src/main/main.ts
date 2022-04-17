// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import electronReload from 'electron-reload';
import {
  getFilesFromHashKey,
  getStrigifiedHtKeys,
  saveJSON2File,
  walk,
} from './hasher';
import NodeCache from 'node-cache';
import Logger from 'js-logger';

const isDev = true;
const gNodeCache = new NodeCache();
Logger.setLevel(Logger.DEBUG);

if (isDev) {
  electronReload(__dirname, {});
}

let mainWindow;

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow);
  if (canceled) {
    return;
  } else {
    // return fs.createFileStream(filePaths[0]);
  }
}

function getMenuConfig() {
  return Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment',
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement',
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment',
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement',
        },
      ],
    },
    {
      label: 'Preferences',
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment',
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement',
        },
      ],
    },
  ]);
}

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, '..', '..', 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  const window = BrowserWindow.getFocusedWindow();

  if (window) {
    const [width, height] = window.getSize();
    mainWindow.height = height;
    mainWindow.width = width;
  }

  const menu = getMenuConfig();

  mainWindow
    .loadURL('http://localhost:3000')
    .catch((error) => Logger.debug('main window load url error', error));
  // mainWindow
  //   .loadFile(path.join(__dirname, "/index.html"))
  //   .catch((error) => Logger.debug(error));
  // Open the DevTools.
  isDev ? mainWindow.webContents.openDevTools() : null;
}

async function walkFs() {
  return await walk(gNodeCache)
    .then(() => {
      Logger.debug('walkFs done');
      saveJSON2File(gNodeCache); // need to manually convert to json string because the formatting in file is fucked
    })
    .then(() => getStrigifiedHtKeys(gNodeCache))
    .catch((err) => {
      Logger.debug('walkFs error', err);
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log('app ready');
  createWindow()
    .then(() => {
      isDev ? Logger.debug('initial window created') : null;
    })
    .catch((error) =>
      isDev ? Logger.debug('error on initial create window') : null
    );

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
        .then(() =>
          isDev ? Logger.debug('window created on app activate') : null
        )
        .catch((error) =>
          isDev ? Logger.debug('error on create window activate') : null
        );
  });

  // ipcMain.handle("run:getHtKeys", () => gNodeCache.keys() as any);
  ipcMain.handle('dialog:openFile', handleFileOpen);
  ipcMain.handle('run:getPhotos', async (event, hash) => {
    return await getFilesFromHashKey(gNodeCache, hash)
      .then()
      .catch((err) => console.log('get files from hash error:', err));
  });

  ipcMain.handle('run:walkFs', async (event) => {
    const result = await walkFs()
      .then((result) => result)
      .catch((err) => Logger.debug('walkFs main error'));
    if (!!result) {
      return result;
    }
    return false;
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
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// ipcMain.on("invokeAction", (event, args) => {
//   var result = "test result!";
//   mainWindow.webContents.send("fromMain", console.log("efsefesfefsw"));
// });
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
