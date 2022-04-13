"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashTable = exports.walk = exports.getJSONFromFile = exports.getStrigifiedHtKeys = exports.saveJSON2File = exports.findDuplicates = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const node_dir_1 = __importDefault(require("node-dir"));
const imghash_1 = __importDefault(require("imghash"));
function findDuplicates() { }
exports.findDuplicates = findDuplicates;
function saveJSON2File(cache) {
    const cacheKeyList = cache.keys();
    const cachedHt = cache.mget(cacheKeyList);
    console.log(cachedHt);
    // jsonHt;
    fs_1.default.writeFileSync("C:\\Users\\Christian\\Documents\\dev\\reactron\\src\\main\\ht.json", JSON.stringify(cachedHt, null, 2));
}
exports.saveJSON2File = saveJSON2File;
function getStrigifiedHtKeys(cache) {
    return JSON.stringify(cache.keys(), null, 2);
}
exports.getStrigifiedHtKeys = getStrigifiedHtKeys;
function getJSONFromFile() {
    return fs_1.default.readFileSync("C:\\Users\\Christian\\Documents\\dev\\reactron\\src\\main\\ht.json");
}
exports.getJSONFromFile = getJSONFromFile;
async function walk(cache) {
    const folderSignature = path_1.default.join(__dirname, "..", "..", "test_images");
    const files = node_dir_1.default.files(folderSignature, { sync: true });
    // go through all files in the directory
    if (files) {
        // if we have files to process
        for (const [index, file] of files.entries()) {
            // loop through each file
            await imghash_1.default
                .hash(file, 16, "hex")
                .then((hash) => {
                const cachedValue = cache.get(hash); //get values for that hash value if exists, could be an array or some other return type
                if (!!cachedValue && Array.isArray(cachedValue)) {
                    cachedValue?.push(file); // add new value to the value array
                    cache.set(hash, cachedValue, 360000); // put values back at that hash key
                }
                else {
                    cache.set(hash, [file], 360000); // add new hash- value array pair
                }
            })
                .catch((err) => console.log("imagehash error:", err));
        }
    }
}
exports.walk = walk;
class HashTable {
    // ht;
    // hashCount: number = 0;
    constructor() {
        // ht = require("./ht.json");
        // return this.getFile();
    }
    getFile() {
        let ht = {};
        const data = fs_1.default.readFileSync("C:\\Users\\Christian\\Documents\\dev\\reactron\\src\\main\\ht.json", "utf8");
        try {
            ht = JSON.parse(data);
        }
        catch (e) {
            console.log("errorrrrr", e);
        }
        return ht;
    }
    setItem(value, key, ht) {
        // let ht = this.getFile();
        // if (Object.keys(ht).length !== 0 && ht[key]) {
        //   // console.log("shouldnt be here");
        //   console.log("this fucking key:", key);
        //   // console.log(" innn ht[key]", JSON.stringify(ht[key]));
        //   // console.log("innn value", value);
        //   ht[key] = [value]; // if key exists, push new value into value array
        // } else {
        if (ht) {
            // console.log("before", ht);
            ht[key] = value; //[...ht[key], ...value];
            // console.log("after", ht);
            // }
            // this.saveTable(ht);
            return ht;
            //   }
            // );
        }
        return false;
    }
    getItem(key, ht) {
        if (ht[key]) {
            return ht[key];
        }
    }
    // public getTable() {
    //   return ht;
    // }
    saveTable(ht) {
        if (ht) {
            const htStringified = JSON.stringify(ht, null, 2);
            console.log("ht @ save", ht);
        }
    }
}
exports.HashTable = HashTable;
//# sourceMappingURL=hasher.js.map