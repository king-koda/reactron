// import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// contextBridge.exposeInMainWorld('electron', {
//   ipcRenderer: {
//     myPing() {
//       ipcRenderer.send('ipc-example', 'ping');
//     },
//     on(channel: string, func: (...args: unknown[]) => void) {
//       const validChannels = ['ipc-example'];
//       if (validChannels.includes(channel)) {
//         const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
//           func(...args);
//         // Deliberately strip event as it includes `sender`
//         ipcRenderer.on(channel, subscription);

//         return () => ipcRenderer.removeListener(channel, subscription);
//       }

//       return undefined;
//     },
//     once(channel: string, func: (...args: unknown[]) => void) {
//       const validChannels = ['ipc-example'];
//       if (validChannels.includes(channel)) {
//         // Deliberately strip event as it includes `sender`
//         ipcRenderer.once(channel, (_event, ...args) => func(...args));
//       }
//     },
//   },
// });

const { default: Logger } = require('js-logger');

// const { ipcRenderer, contextBridge } = require("electron");
window.ipcRenderer = require('electron').ipcRenderer;
window.contextBridge = require('electron').contextBridge;

window.contextBridge.exposeInMainWorld('electronAPI', {
  rootFolderSelect: async () =>
    await ipcRenderer
      .invoke('dialog:rootFolderSelect')
      .then()
      .catch((err) => Logger.debug('root folder select err', err)),

  walkFs: async (path) =>
    await ipcRenderer
      .invoke('run:walkFs', path)
      .then()
      .catch((err) => Logger.debug('walkFs err', err)),
  getPhotos: async (hash) =>
    await ipcRenderer
      .invoke('run:getPhotos', hash)
      .then()
      .catch((err) => Logger.debug('getPhotos err', err)),
  deleteDuplicates: async (toBeDeleted) =>
    await ipcRenderer
      .invoke('run:deleteDuplicates', toBeDeleted)
      .then()
      .catch((err) => Logger.debug('delete duplicates err', err)),
});
