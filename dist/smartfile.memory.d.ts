/// <reference types="node" />
/// <reference types="q" />
import 'typings-global';
import plugins = require('./smartfile.plugins');
export interface vinyl {
    contents: Buffer;
    base: string;
    path: string;
}
/**
 * allows you to create a gulp stream
 * from String, from an Array of Strings, from Vinyl File, from an Array of VinylFiles
 * @param fileArg
 * @returns stream.Readable
 * @TODO: make it async;
 */
export declare let toGulpStream: (fileArg: string | string[] | vinyl | vinyl[], baseArg?: string) => any;
/**
 * converts file to Object
 * @param fileStringArg
 * @param fileTypeArg
 * @returns {any|any}
 */
export declare let toObject: (fileStringArg: string, fileTypeArg: string) => any;
/**
 * takes a string and converts it to vinyl file
 * @param fileArg
 * @param optionsArg
 */
export declare let toVinylFileSync: (fileArg: string, optionsArg?: {
    filename?: string;
    base?: string;
    relPath?: string;
}) => any;
/**
 * takes a string array and some options and returns a vinylfile array
 * @param arrayArg
 * @param optionsArg
 */
export declare let toVinylArraySync: (arrayArg: string[], optionsArg?: {
    filename?: string;
    base?: string;
    relPath?: string;
}) => any[];
/**
 * takes a vinylFile object and converts it to String
 */
export declare let vinylToStringSync: (fileArg: vinyl) => string;
/**
 * writes string or vinyl file to disk.
 * @param fileArg
 * @param fileNameArg
 * @param fileBaseArg
 */
export declare let toFs: (fileContentArg: string | vinyl, filePathArg: any) => plugins.q.Promise<{}>;
export declare let toFsSync: (fileArg: any, filePathArg: string) => void;
