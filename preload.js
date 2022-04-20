const { default: Logger } = require('js-logger');

// const { ipcRenderer, contextBridge } = require("electron");
window.ipcRenderer = require('electron').ipcRenderer;
window.contextBridge = require('electron').contextBridge;

window.contextBridge.exposeInMainWorld('electronAPI', {
  rootFolderSelect: () => ipcRenderer.invoke('dialog:rootFolderSelect'),
  walkFs: async (path) => {
    return await ipcRenderer
      .invoke('run:walkFs', path)
      .then()
      .catch((err) => Logger.debug('walkFs err', err));
  },
  getHtKeys: () => ipcRenderer.invoke('run:getHtKeys'),
  getPhotos: (hash) => ipcRenderer.invoke('run:getPhotos', hash),
});
// /* eslint-disable @typescript-eslint/no-explicit-any */
// window.ipcRenderer = ipcRenderer;
// /* eslint-enable */

// // All of the Node.js APIs are available in the preload process.
// // It has the same sandbox as a Chrome extension.
// window.addEventListener("DOMContentLoaded", () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector);
//     if (element) element.innerText = text;
//   };

//   for (const type of ["chrome", "node", "electron"]) {
//     replaceText(`${type}-version`, process.versions[type]);
//   }
// });

// contextBridge.exposeInMainWorld("api", {
//   send: (channel, data) => {
//     // whitelist channels
//     let validChannels = ["toMain"];
//     if (validChannels.includes(channel)) {
//       ipcRenderer.send(channel, data);
//     }
//   },
//   receive: (channel, func) => {
//     let validChannels = ["fromMain"];
//     if (validChannels.includes(channel)) {
//       // Deliberately strip event as it includes `sender`
//       ipcRenderer.on(channel, (event, ...args) => fn(...args));
//     }
//   },
// });

// contextBridge.exposeInMainWorld("electron", {
//   notificationApi: {
//     sendNotification(message) {
//       ipcRenderer.send("notify", message);
//     },
//   },
// });
