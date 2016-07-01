/// <reference types="q" />
import "typings-global";
import plugins = require("./smartfile.plugins");
/**
 *
 * @param filePath
 * @returns {boolean}
 */
export declare let fileExistsSync: (filePath: any) => boolean;
/**
 *
 * @param filePath
 * @returns {any}
 */
export declare let fileExists: (filePath: any) => plugins.Q.Promise<{}>;
/**
 * Checks if given path points to an existing directory
 */
export declare let isDirectory: (pathArg: any) => boolean;
/**
 * Checks if a given path points to an existing file
 */
export declare let isFile: (pathArg: any) => boolean;
/**
 * ensures that a directory is in place
 */
export declare let ensureDir: (dirPathArg: string) => plugins.Q.Promise<{}>;
/**
 * ensures that a directory is in place
 */
export declare let ensureDirSync: (dirPathArg: string) => void;
/**
 * copies a file from A to B on the local disk
 */
export declare let copy: (fromArg: string, toArg: string) => plugins.Q.Promise<{}>;
/**
 * copies a file SYNCHRONOUSLY from A to B on the local disk
 */
export declare let copySync: (fromArg: string, toArg: string) => boolean;
/**
 * removes a file or folder from local disk
 */
export declare let remove: (pathArg: string) => plugins.Q.Promise<{}>;
/**
 * removes a file SYNCHRONOUSLY from local disk
 */
export declare let removeSync: (pathArg: string) => boolean;
/**
 *
 * @param filePathArg
 * @returns {*}
 */
export declare let toGulpStreamSync: (filePathArg: string) => any;
export declare let toGulpDestSync: (folderPathArg: string) => any;
/**
 *
 * @param filePathArg
 * @param fileTypeArg
 * @returns {any}
 */
export declare let toObjectSync: (filePathArg: any, fileTypeArg?: any) => any;
/**
 * reads a file content to a String
 * @param filePath
 * @returns {string|Buffer|any}
 */
export declare let toStringSync: (filePath: any) => any;
/**
 *
 * @param filePathArg
 * @param options
 * @returns {number}
 */
export declare let toVinylSync: (filePathArg: any, options?: {}) => any;
/**
 * lets you reload files hot.
 * @param path
 * @returns {any}
 */
export declare let requireReload: (path: string) => any;
/**
 * lists Folders in a directory on local disk
 * @returns Promise
 */
export declare let listFolders: (pathArg: string, regexFilter?: RegExp) => plugins.Q.Promise<{}>;
/**
 * lists Folders SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
export declare let listFoldersSync: (pathArg: string, regexFilter?: RegExp) => string[];
/**
 * lists Files in a directory on local disk
 * @returns Promise
 */
export declare let listFiles: (pathArg: string, regexFilter?: RegExp) => plugins.Q.Promise<{}>;
/**
 * lists Files SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
export declare let listFilesSync: (pathArg: string, regexFilter?: RegExp) => string[];
/**
 * lists all items (folders AND files) in a directory on local disk
 * @returns Promise
 */
export declare let listAllItems: (pathArg: string, regexFilter?: RegExp) => plugins.Q.Promise<{}>;
/**
 * lists all items (folders AND files) SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
export declare let listAllItemsSync: (pathArg: string, regexFilter?: RegExp) => string[];
export declare let listFileTree: (dirPath: string, miniMatchFilter: string) => plugins.Q.Promise<{}>;
