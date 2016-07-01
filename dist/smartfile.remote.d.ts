/// <reference types="q" />
import "typings-global";
import plugins = require("./smartfile.plugins");
export declare let toFs: (from: string, toPath: string) => plugins.Q.Promise<{}>;
/**
 *
 * @param filePathArg
 * @returns {*}
 */
export declare let toGulpStreamSync: (filePathArg: string, baseArg: string) => any;
/**
 *
 * @param fromArg
 * @returns {any}
 */
export declare let toObject: (fromArg: string) => plugins.Q.Promise<{}>;
/**
 *
 * @param fromArg
 * @returns {any}
 */
export declare let toString: (fromArg: string) => plugins.Q.Promise<{}>;
