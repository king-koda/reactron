import { fileTypeFromFile } from "file-type";
import path from "path";
import fs from "fs";
import dir from "node-dir";
import cloneDeep from "lodash";
import cache from "node-cache";
import imgHash from "imghash";
import { json } from "stream/consumers";
import NodeCache from "node-cache";
import Logger from "js-logger";

export function findDuplicates() {}

export function saveJSON2File(cache: NodeCache) {
  const cacheKeyList: string[] = cache.keys();
  const cachedHt = cache.mget(cacheKeyList);

  Logger.debug("cachedHt: ", cachedHt);

  fs.writeFileSync(
    "C:\\Users\\Christian\\Documents\\dev\\reactron\\src\\main\\ht.json",
    JSON.stringify(cachedHt, null, 2)
  );
}

export function getStrigifiedHtKeys(cache: NodeCache) {
  return JSON.stringify(cache.keys(), null, 2);
}

export function getJSONFromFile() {
  return fs.readFileSync(
    "C:\\Users\\Christian\\Documents\\dev\\reactron\\src\\main\\ht.json"
  );
}

export async function walk(cache: NodeCache) {
  const folderSignature = path.join(__dirname, "..", "..", "test_images");
  const files = dir.files(folderSignature, { sync: true });

  // go through all files in the directory

  if (files) {
    // if we have files to process
    for (const [index, file] of files.entries()) {
      // loop through each file

      await imgHash
        .hash(file, 16, "hex")
        .then((hash) => {
          const cachedValue: string[] | undefined | null = cache.get(hash); //get values for that hash value if exists, could be an array or some other return type

          if (!!cachedValue && Array.isArray(cachedValue)) {
            cachedValue?.push(file); // add new value to the value array
            cache.set(hash, cachedValue, 360000); // put values back at that hash key
          } else {
            cache.set(hash, [file], 360000); // add new hash- value array pair
          }
        })
        .catch((err) => Logger.debug("imagehash error:", err));
    }
  }
}
