/// <reference types="node" />
import NodeCache from "node-cache";
export declare function findDuplicates(): void;
export declare function saveJSON2File(cache: NodeCache): void;
export declare function getStrigifiedHtKeys(cache: NodeCache): string;
export declare function getJSONFromFile(): Buffer;
export declare function walk(cache: NodeCache): Promise<void>;
export declare class HashTable {
    constructor();
    getFile(): {};
    setItem(value: any, key: any, ht: any): any;
    getItem(key: any, ht: any): any;
    saveTable(ht: any): void;
}
