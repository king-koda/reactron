import { imageHash } from "image-hash";
import { fileTypeFromFile } from "file-type";
import path from "path";

const dir = require("node-dir");

export function findDuplicates() {}

export function walk() {
  console.log("suck me off");
  const folderSignature = path.join(__dirname, "..", "..", "test_images");
  dir.files(folderSignature, function (err, files) {
    if (err) throw err;
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
export function hash() {}
