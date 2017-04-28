/// <reference types="node" />
export interface ISmartfileConstructorOptions {
    path?: string;
    contentsString?: string;
    contentBuffer?: Buffer;
}
/**
 * class Smartfile
 * -> is vinyl file compatible
 */
export declare class Smartfile {
    /**
     * the full path of the file on disk
     */
    path: string;
    /**
     * The contents of the file as Buffer
     */
    contents: Buffer;
    /**
     * The current working directory of the file
     */
    cwd: string;
    /**
     * sync the file with disk
     */
    sync: boolean;
    /**
     * the constructor of Smartfile
     * @param optionsArg
     */
    constructor(optionsArg: ISmartfileConstructorOptions);
    /**
     * return relative path of file
     * ->
     */
    readonly relative: string;
    /**
     * set contents from string
     * @param contentString
     */
    setContentsFromString(contentString: string): void;
    /**
     * write file to disk
     */
    write(): Promise<void>;
    /**
     * read file from disk
     */
    read(): Promise<void>;
}
