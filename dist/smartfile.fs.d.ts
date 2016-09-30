/// <reference types="q" />
import 'typings-global';
import plugins = require('./smartfile.plugins');
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
export declare let fileExists: (filePath: any) => plugins.q.Promise<{}>;
/**
 * Checks if given path points to an existing directory
 */
export declare let isDirectory: (pathArg: any) => boolean;
/**
 * Checks if a given path points to an existing file
 */
export declare let isFile: (pathArg: any) => boolean;
/**
 * copies a file from A to B on the local disk
 */
export declare let copy: (fromArg: string, toArg: string) => plugins.q.Promise<{}>;
/**
 * copies a file SYNCHRONOUSLY from A to B on the local disk
 */
export declare let copySync: (fromArg: string, toArg: string) => boolean;
/**
 * ensures that a directory is in place
 */
export declare let ensureDir: (dirPathArg: string) => plugins.q.Promise<{}>;
/**
 * ensures that a directory is in place
 */
export declare let ensureDirSync: (dirPathArg: string) => void;
/**
 * ensures that a file is on disk
 * @param filePath the filePath to ensureDir
 * @param the fileContent to place into a new file in case it doesn't exist yet
 * @returns Promise<void>
 * @exec ASYNC
 */
export declare let ensureFile: (filePathArg: any, initFileStringArg: any) => plugins.q.Promise<void>;
/**
 * ensures that a file is on disk
 * @param filePath the filePath to ensureDir
 * @param the fileContent to place into a new file in case it doesn't exist yet
 * @returns Promise<void>
 * @exec SYNC
 */
export declare let ensureFileSync: (filePathArg: string, initFileStringArg: string) => void;
/**
 * removes a file or folder from local disk
 */
export declare let remove: (pathArg: string) => plugins.q.Promise<void>;
/**
 * removes a file SYNCHRONOUSLY from local disk
 */
export declare let removeSync: (pathArg: string) => boolean;
/**
 * removes an array of filePaths from disk
 */
export declare let removeMany: (filePathArrayArg: string[]) => plugins.q.Promise<void[]>;
/**
 * like removeFilePathArray but SYNCHRONOUSLY
 */
export declare let removeManySync: (filePathArrayArg: string[]) => void;
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
export declare let listFolders: (pathArg: string, regexFilter?: RegExp) => plugins.q.Promise<{}>;
/**
 * lists Folders SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
export declare let listFoldersSync: (pathArg: string, regexFilter?: RegExp) => string[];
/**
 * lists Files in a directory on local disk
 * @returns Promise
 */
export declare let listFiles: (pathArg: string, regexFilter?: RegExp) => plugins.q.Promise<{}>;
/**
 * lists Files SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
export declare let listFilesSync: (pathArg: string, regexFilter?: RegExp) => string[];
/**
 * lists all items (folders AND files) in a directory on local disk
 * @returns Promise<string[]>
 */
export declare let listAllItems: (pathArg: string, regexFilter?: RegExp) => plugins.q.Promise<string[]>;
/**
 * lists all items (folders AND files) in a directory on local disk
 * @returns an array with the folder names as strings
 * @executes SYNC
 */
export declare let listAllItemsSync: (pathArg: string, regexFilter?: RegExp) => string[];
/**
 * lists a file tree using a miniMatch filter
 * note: if the miniMatch Filter is an absolute path, the cwdArg will be omitted
 * @returns Promise<string[]> string array with the absolute paths of all matching files
 */
export declare let listFileTree: (dirPathArg: string, miniMatchFilter: string) => plugins.q.Promise<string[]>;
