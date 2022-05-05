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
