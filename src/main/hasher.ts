import fs, { promises } from 'fs';
import sizeOf from 'image-size';
import { ISize, ISizeCalculationResult } from 'image-size/dist/types/interface';
import Logger from 'js-logger';
import NodeCache from 'node-cache';
import dir from 'node-dir';
// import * as imgHash from 'imghash';

const imgHash = require('imghash');

interface ExtendedStats
  extends fs.Stats,
    Pick<ISizeCalculationResult, 'height' | 'width' | 'type'> {}

type Photo = {
  value: string | undefined;
  image: string | undefined;
  stats: ExtendedStats | undefined;
};

export function getStrigifiedHtKeys(cache: NodeCache) {
  const cacheHashKeys: string[] = [];
  const totalFiles: number | undefined = cache.get('totalFiles');
  cache.del('totalFiles');

  const cacheKeys: string[] = cache.keys();
  cacheKeys.map((value, index) => {
    cacheHashKeys[index] = value;
    return cacheHashKeys[index];
  });

  cache.set('totalFiles', totalFiles);

  return JSON.stringify(
    {
      htKeys: cacheHashKeys,
      extra: { totalFiles },
    },
    null,
    2
  );
}

export function saveJSON2File(cache: NodeCache) {
  const cacheKeyList: string[] = cache.keys();
  const cachedHt = cache.mget(cacheKeyList);

  fs.writeFileSync(
    'C:\\Users\\Christian\\Documents\\dev\\reactron\\src\\main\\ht.json',
    JSON.stringify(cachedHt, null, 2)
  );
  return true;
}

export async function walk(cache: NodeCache, rootPath: string) {
  const folderSignature = rootPath;

  if (!folderSignature) {
    return false;
  }

  const files: string[] = dir.files(folderSignature, { sync: true });

  // TODO: handle if walk is done multiple times- check file location
  cache.set('totalFiles', files?.length);
  // go through all files in the directory

  if (files) {
    // if we have files to process
    const result = await Promise.all(
      files.map(async (file: string) => {
        const hash = await imgHash.hash(file, 16, 'hex');

        const cachedValues: string[] | undefined | null = cache.get(hash);
        if (!!cachedValues && Array.isArray(cachedValues)) {
          if (!cachedValues.includes(file)) {
            // console.log('shissshhh', cachedValues);
            cachedValues?.push(file); // add new value to the value array
            cache.set(hash, cachedValues, 360000); // put values back at that hash key
          }
        } else {
          cache.set(hash, [file], 360000); // add new hash- value array pair
        }
      })
    );

    if (result) {
      // clean up of non dupes
      cache.keys().map((key) => {
        const cachedValues = cache?.get(key);
        if (Array.isArray(cachedValues) && cachedValues?.length === 1) {
          cache.del(key);
        }
        return true;
      });
      return true;
    }
  }
  return false;
}

export async function getPhotos(cache: NodeCache, hashKey: string) {
  const cachedValues: string[] | undefined = cache.get(hashKey);
  const imageBufferArray: Photo[] = [];

  if (cachedValues) {
    await Promise.all(
      cachedValues?.map(async (cachedValue) => {
        const imageBuffer: string | undefined = await promises.readFile(
          cachedValue,
          'base64'
        );

        const fileStats: fs.Stats | undefined = await promises.stat(
          cachedValue
        );

        const fileRes: ISizeCalculationResult | ISize | undefined =
          sizeOf(cachedValue);

        imageBufferArray?.push({
          value: cachedValue,
          image: imageBuffer,
          stats: { ...fileStats, ...fileRes } as ExtendedStats,
        });
      })
    );
  }

  return imageBufferArray;
}

// export async function rootFolderSelect(mainWindow: BrowserWindow) {
//   const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
//     properties: ['openDirectory'],
//   });

//   if (canceled) {
//     return {};
//   }

//   return filePaths[0];
// }

export async function deleteDuplicates(toBeDeleted: string[]) {
  if (toBeDeleted?.length === 0) return 0;

  let filesDeleted = 0;

  toBeDeleted.map((fileToDelete: string) => {
    console.log('fileToDelete', fileToDelete);
    // fs.rename

    filesDeleted += 1;
    return fileToDelete;
  });

  return filesDeleted;
}

export function getJSONFromFile() {
  return fs.readFileSync(
    'C:\\Users\\Christian\\Documents\\dev\\reactron\\src\\main\\ht.json'
  );
}
