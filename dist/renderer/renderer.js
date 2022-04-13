"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
//renderer.js
// const ipc = require("electron").ipcRenderer,
//   asyncBtn = document.querySelector("#syncBtn");
// asyncBtn = document.querySelector("#asyncBtn");
// (async () => {
//   const response = await window.electronAPI.walkFs();
//   console.log("hiya", response); // we now have the response from the main thread without exposing
//   // ipcRenderer, leaving the app less vulnerable to attack
// })();
// let replyDiv = document.querySelector("#reply");
// syncBtn.addEventListener("click", () => {
//   let reply = ipc.sendSync("synMessage", "A sync message to main");
//   replyDiv.innerHTML = reply;
// });
// asyncBtn.addEventListener("click", () => {
//   ipc.send("aSynMessage", "A async message to main");
// });
//# sourceMappingURL=renderer.js.map