import "typings-global";
/**
 * copies a file from A to B on the local disk
 */
export declare let copy: (fromArg: string, toArg: string) => any;
/**
 * copies a file SYNCHRONOUSLY from A to B on the local disk
 */
export declare let copySync: (fromArg: string, toArg: string) => boolean;
/**
 * removes a file or folder from local disk
 */
export declare let remove: (pathArg: string) => any;
/**
 * removes a file SYNCHRONOUSLY from local disk
 */
export declare let removeSync: (pathArg: string) => boolean;
export declare let toFS: (options: {
    from: string;
    toPath: string;
}, cb?: any) => void;
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
 */
export declare let listFolders: (pathArg: string) => any;
/**
 * lists Folders SYNCHRONOUSLY in a directory on local disk
 */
export declare let listFoldersSync: (pathArg: any) => any;
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
export declare let fileExists: (filePath: any) => any;
export declare let isDirectory: (pathArg: any) => boolean;
export declare let isFile: (pathArg: any) => boolean;
