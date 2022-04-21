import { fileTypeFromFile } from 'file-type';
import path from 'path';
import { promises } from 'fs';
import fs from 'fs';
import dir from 'node-dir';
import cloneDeep from 'lodash';
import cache from 'node-cache';
import imgHash from 'imghash';
import { json } from 'stream/consumers';
import NodeCache from 'node-cache';
import Logger from 'js-logger';
import sizeOf from 'image-size';
import { dialog } from 'electron';
export function findDuplicates() {}

export function saveJSON2File(cache: NodeCache) {
  const cacheKeyList: string[] = cache.keys();
  const cachedHt = cache.mget(cacheKeyList);

  Logger.debug('cachedHt: ', cachedHt);

  fs.writeFileSync(
    'C:\\Users\\Christian\\Documents\\dev\\reactron\\src\\main\\ht.json',
    JSON.stringify(cachedHt, null, 2)
  );
}

export async function getFilesFromHashKey(cache: NodeCache, hashKey: string) {
  const cachedValues: string[] | undefined = cache.get(hashKey);
  let imageBufferArray: {}[] = [];

  if (cachedValues) {
    for (const value of cachedValues) {
      const result = await promises
        .readFile(value, 'base64')
        .then()
        .catch((err) => console.log('read file error', err));

      const fileStats = await promises
        .stat(value)
        .then()
        .catch((err) => console.log('file stats error', err));

      const fileRes = sizeOf(value);

      imageBufferArray?.push({
        value: value,
        image: result,
        stats: { ...fileStats, ...fileRes },
      });
    }
  }

  return imageBufferArray;
}

export async function rootFolderSelect(mainWindow) {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  });

  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}

export async function walkFs(gNodeCache, path) {
  return await walk(gNodeCache, path)
    .then(() => {
      Logger.debug('walkFs done');
      saveJSON2File(gNodeCache); // need to manually convert to json string because the formatting in file is fucked
    })
    .then(() => getStrigifiedHtKeys(gNodeCache))
    .catch((err) => {
      Logger.debug('walkFs error', err);
    });
}

export function getStrigifiedHtKeys(cache: NodeCache) {
  let cacheHashKeys: {}[] = [];
  let totalFiles: number | undefined = cache.get('totalFiles');
  cache.del('totalFiles');

  let cacheKeys = cache.keys();
  cacheKeys.map((value, index) => {
    cacheHashKeys[index] = value;
  });
  cache.set('totalFiles', totalFiles);

  return JSON.stringify(
    {
      htKeys: cacheHashKeys,
      extra: { totalFiles: totalFiles },
    },
    null,
    2
  ); //TODO: is this actually being received by FE?
}

export async function deleteDuplicates(toBeDeleted: string[]) {
  if (toBeDeleted?.length === 0) return 0;

  let filesDeleted: number = 0;

  for (const fileToDelete of toBeDeleted) {
    console.log('fileToDelete', fileToDelete);
    // fs.rename
    filesDeleted++;
  }
  return filesDeleted;
}

export function getJSONFromFile() {
  return fs.readFileSync(
    'C:\\Users\\Christian\\Documents\\dev\\reactron\\src\\main\\ht.json'
  );
}

export async function walk(cache: NodeCache, rootPath: string) {
  const folderSignature = rootPath; //path.join(__dirname, '..', '..', 'test_images');

  if (!folderSignature) {
    return false;
  }

  const files = dir.files(folderSignature, { sync: true });

  //TODO: handle if walk is done multiple times- check file location
  cache.set('totalFiles', files?.length);
  // go through all files in the directory

  if (files) {
    // if we have files to process
    for (const [index, file] of files.entries()) {
      // loop through each file

      await imgHash
        .hash(file, 16, 'hex')
        .then((hash) => {
          const cachedValues: string[] | undefined | null = cache.get(hash); //get values for that hash value if exists, could be an array or some other return type

          //if hash already exists
          if (!!cachedValues && Array.isArray(cachedValues)) {
            if (!cachedValues.includes(file)) {
              // console.log('cachedValues', cachedValues);
              cachedValues?.push(file); // add new value to the value array
              cache.set(hash, cachedValues, 360000); // put values back at that hash key
            }
          } else {
            cache.set(hash, [file], 360000); // add new hash- value array pair
          }
        })
        .catch((err) => Logger.debug('imagehash error:', err));
    }
  }

  //clean up of non dupes
  cache.keys().map((key) => {
    const cachedValues = cache?.get(key);
    console.log(key, cachedValues);
    if (Array.isArray(cachedValues) && cachedValues?.length === 1) {
      cache.del(key);
    }
  });
  return true;
}
