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

// let replyDiv = document.querySelector("#reply");

// syncBtn.addEventListener("click", () => {
//   let reply = ipc.sendSync("synMessage", "A sync message to main");
//   replyDiv.innerHTML = reply;
// });

// asyncBtn.addEventListener("click", () => {
//   ipc.send("aSynMessage", "A async message to main");
// });
