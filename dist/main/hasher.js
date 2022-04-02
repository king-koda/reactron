"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.walk = exports.findDuplicates = void 0;
const path_1 = __importDefault(require("path"));
const dir = require("node-dir");
function findDuplicates() { }
exports.findDuplicates = findDuplicates;
function walk() {
    console.log("suck me off");
    const folderSignature = path_1.default.join(__dirname, "..", "..", "test_images");
    dir.files(folderSignature, function (err, files) {
        if (err)
            throw err;
        console.log("files", files);
        files.forEach((file) => {
            const path = require("path");
            const fs = require("fs");
            // imageHash(file, 16, true, (error, hash) => {
            //   if (error) throw error;
            //   // console.log("file", file);
            //   console.log("hash", hash);
            //   //path.basename(file);
            //   fs.mkdir(
            //     folderSignature + hash,
            //     {
            //       recursive: false,
            //     },
            //     (error, dir) => {
            //       if (error) {
            //         if (!!error.message.match(/.*file already exists.*/)) {
            //           //for inserting duplicates into the already created folder
            //           fs.rename(
            //             file,
            //             folderSignature + hash + "/" + path.basename(file),
            //             (error, renamedFile) => {}
            //           );
            //         }
            //       }
            //       if (dir) {
            //         //for creating new folders for new hash image signatures
            //         fs.rename(
            //           file,
            //           folderSignature + hash + "/" + path.basename(file),
            //           (error, renamedFile) => {}
            //         );
            //       }
            //       // console.log("file", file);
            //       // console.log("dir", dir);
            //     }
            //   );
            // });
            console.log(path.basename(file));
        });
    });
}
exports.walk = walk;
function hash() { }
exports.hash = hash;
//# sourceMappingURL=hasher.js.map