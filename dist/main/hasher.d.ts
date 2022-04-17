/// <reference types="node" />
import NodeCache from 'node-cache';
export declare function findDuplicates(): void;
export declare function saveJSON2File(cache: NodeCache): void;
export declare function getFilesFromHashKey(cache: NodeCache, hashKey: string): Promise<{}[]>;
export declare function getStrigifiedHtKeys(cache: NodeCache): string;
export declare function getJSONFromFile(): Buffer;
export declare function walk(cache: NodeCache): Promise<void>;
