/// <reference types="node" />
export interface ISmartfileConstructorOptions {
    path?: string;
    contentsString?: string;
    contentBuffer?: Buffer;
}
export declare class Smartfile {
    path: string;
    contents: Buffer;
    constructor(optionsArg: ISmartfileConstructorOptions);
    /**
     * set contents from string
     * @param contentString
     */
    setContentFromString(contentString: string): void;
}
