/// <reference types="q" />
import 'typings-global';
import plugins = require('./smartfile.plugins');
export declare let toFs: (from: string, toPath: string) => plugins.q.Promise<{}>;
/**
 *
 * @param fromArg
 * @returns {any}
 */
export declare let toObject: (fromArg: string) => plugins.q.Promise<{}>;
/**
 *
 * @param fromArg
 * @returns {any}
 */
export declare let toString: (fromArg: string) => plugins.q.Promise<{}>;
