/// <reference types="node" />
import NodeCache from 'node-cache';
export declare function findDuplicates(): void;
export declare function saveJSON2File(cache: NodeCache): void;
export declare function getFilesFromHashKey(cache: NodeCache, hashKey: string): Promise<{}[]>;
export declare function rootFolderSelect(mainWindow: any): Promise<string | undefined>;
export declare function walkFs(gNodeCache: any, path: any): Promise<string | void>;
export declare function getStrigifiedHtKeys(cache: NodeCache): string;
export declare function deleteDuplicates(toBeDeleted: string[]): Promise<number>;
export declare function getJSONFromFile(): Buffer;
export declare function walk(cache: NodeCache, rootPath: string): Promise<boolean>;
