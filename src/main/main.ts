// Modules to control application life and create native browser window
import { app, BrowserWindow, dialog, ipcMain, Menu } from 'electron';
import Logger from 'js-logger';
import NodeCache from 'node-cache';
import * as path from 'path';
import {
  deleteDuplicates,
  getFilesFromHashKey,
  rootFolderSelect,
  walkFs,
} from './hasher';
const url = require('url');

const isDev = true;
const gNodeCache = new NodeCache();
Logger.setLevel(Logger.DEBUG);

let mainWindow: BrowserWindow;

function getMenuConfig() {
  return Menu.buildFromTemplate([
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
  mainWindow = new BrowserWindow({
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
app.whenReady().then(() => {
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

  ipcMain.handle('dialog:rootFolderSelect', async (event) => {
    return await rootFolderSelect(mainWindow)
      .then()
      .catch((err) => console.log('root folder select error:', err));
  });

  ipcMain.handle('run:getPhotos', async (event, hash) => {
    return await getFilesFromHashKey(gNodeCache, hash)
      .then()
      .catch((err) => console.log('get files from hash error:', err));
  });

  ipcMain.handle('run:walkFs', async (event, path) => {
    const result = await walkFs(gNodeCache, path)
      .then((result) => result)
      .catch((err) => Logger.debug('walkFs main error'));
    if (!!result) {
      return result;
    }
    return false;
  });

  ipcMain.handle('run:deleteDuplicates', async (event, toBeDeleted) => {
    const result = await deleteDuplicates(toBeDeleted)
      .then((result) => result)
      .catch((err) => Logger.debug('deleteDuplicates error'));

    if (!!result) {
      return result;
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
