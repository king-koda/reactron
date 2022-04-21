"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walk = exports.getJSONFromFile = exports.deleteDuplicates = exports.getStrigifiedHtKeys = exports.walkFs = exports.rootFolderSelect = exports.getFilesFromHashKey = exports.saveJSON2File = exports.findDuplicates = void 0;
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
const node_dir_1 = __importDefault(require("node-dir"));
const imghash_1 = __importDefault(require("imghash"));
const js_logger_1 = __importDefault(require("js-logger"));
const image_size_1 = __importDefault(require("image-size"));
const electron_1 = require("electron");
function findDuplicates() { }
exports.findDuplicates = findDuplicates;
function saveJSON2File(cache) {
    const cacheKeyList = cache.keys();
    const cachedHt = cache.mget(cacheKeyList);
    js_logger_1.default.debug('cachedHt: ', cachedHt);
    fs_2.default.writeFileSync('C:\\Users\\Christian\\Documents\\dev\\reactron\\src\\main\\ht.json', JSON.stringify(cachedHt, null, 2));
}
exports.saveJSON2File = saveJSON2File;
async function getFilesFromHashKey(cache, hashKey) {
    const cachedValues = cache.get(hashKey);
    let imageBufferArray = [];
    if (cachedValues) {
        for (const value of cachedValues) {
            const result = await fs_1.promises
                .readFile(value, 'base64')
                .then()
                .catch((err) => console.log('read file error', err));
            const fileStats = await fs_1.promises
                .stat(value)
                .then()
                .catch((err) => console.log('file stats error', err));
            const fileRes = (0, image_size_1.default)(value);
            imageBufferArray?.push({
                value: value,
                image: result,
                stats: { ...fileStats, ...fileRes },
            });
        }
    }
    return imageBufferArray;
}
exports.getFilesFromHashKey = getFilesFromHashKey;
async function rootFolderSelect(mainWindow) {
    const { canceled, filePaths } = await electron_1.dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
    });
    if (canceled) {
        return;
    }
    else {
        return filePaths[0];
    }
}
exports.rootFolderSelect = rootFolderSelect;
async function walkFs(gNodeCache, path) {
    return await walk(gNodeCache, path)
        .then(() => {
        js_logger_1.default.debug('walkFs done');
        saveJSON2File(gNodeCache); // need to manually convert to json string because the formatting in file is fucked
    })
        .then(() => getStrigifiedHtKeys(gNodeCache))
        .catch((err) => {
        js_logger_1.default.debug('walkFs error', err);
    });
}
exports.walkFs = walkFs;
function getStrigifiedHtKeys(cache) {
    let cacheHashKeys = [];
    let totalFiles = cache.get('totalFiles');
    cache.del('totalFiles');
    let cacheKeys = cache.keys();
    cacheKeys.map((value, index) => {
        cacheHashKeys[index] = value;
    });
    cache.set('totalFiles', totalFiles);
    return JSON.stringify({
        htKeys: cacheHashKeys,
        extra: { totalFiles: totalFiles },
    }, null, 2); //TODO: is this actually being received by FE?
}
exports.getStrigifiedHtKeys = getStrigifiedHtKeys;
async function deleteDuplicates(toBeDeleted) {
    if (toBeDeleted?.length === 0)
        return 0;
    let filesDeleted = 0;
    for (const fileToDelete of toBeDeleted) {
        console.log('fileToDelete', fileToDelete);
        // fs.rename
        filesDeleted++;
    }
    return filesDeleted;
}
exports.deleteDuplicates = deleteDuplicates;
function getJSONFromFile() {
    return fs_2.default.readFileSync('C:\\Users\\Christian\\Documents\\dev\\reactron\\src\\main\\ht.json');
}
exports.getJSONFromFile = getJSONFromFile;
async function walk(cache, rootPath) {
    const folderSignature = rootPath; //path.join(__dirname, '..', '..', 'test_images');
    if (!folderSignature) {
        return false;
    }
    const files = node_dir_1.default.files(folderSignature, { sync: true });
    //TODO: handle if walk is done multiple times- check file location
    cache.set('totalFiles', files?.length);
    // go through all files in the directory
    if (files) {
        // if we have files to process
        for (const [index, file] of files.entries()) {
            // loop through each file
            await imghash_1.default
                .hash(file, 16, 'hex')
                .then((hash) => {
                const cachedValues = cache.get(hash); //get values for that hash value if exists, could be an array or some other return type
                //if hash already exists
                if (!!cachedValues && Array.isArray(cachedValues)) {
                    if (!cachedValues.includes(file)) {
                        // console.log('cachedValues', cachedValues);
                        cachedValues?.push(file); // add new value to the value array
                        cache.set(hash, cachedValues, 360000); // put values back at that hash key
                    }
                }
                else {
                    cache.set(hash, [file], 360000); // add new hash- value array pair
                }
            })
                .catch((err) => js_logger_1.default.debug('imagehash error:', err));
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
exports.walk = walk;
//# sourceMappingURL=hasher.js.map