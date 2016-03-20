/// <reference path="./typings/main.d.ts" />

import plugins = require("./smartfile.plugins");
import SmartfileGet = require("./smartfile.get");
import SmartfileInterpreter = require("./smartfile.interpreter");
export let toFS = function(options:{from:string,toPath:string}, cb=undefined){
    
};

/**
 *
 * @param filePathArg
 * @returns {*}
 */
export let toGulpStreamSync = function(filePathArg:string){
    let stream = plugins.gulp.src(filePathArg);
    return stream;
};

export let toGulpDestSync = function(folderPathArg:string){
    return plugins.gulp.dest(folderPathArg);
};

/**
 *
 * @param filePathArg
 * @param fileTypeArg
 * @returns {any}
 */
export let toObjectSync = function(filePathArg,fileTypeArg?) {
    let fileString = plugins.fs.readFileSync(filePathArg, 'utf8');
    let fileType;
    fileTypeArg ? fileType = fileTypeArg : fileType = SmartfileGet.filetype(filePathArg);
    return SmartfileInterpreter(fileString,fileType);
};

/**
 * reads a file content to a String
 * @param filePath
 * @returns {string|Buffer|any}
 */
export let toStringSync = function(filePath) {
    let fileString;
    fileString = plugins.fs.readFileSync(filePath, "utf8");
    return fileString;
};

/**
 *
 * @param filePathArg
 * @param options
 * @returns {number}
 */
export let toVinylSync = function(filePathArg,options = {}) {
    return plugins.vinylFile.readSync(filePathArg,options);
};

/**
 * lets you reload files hot.
 * @param path
 * @returns {any}
 */
export let requireReload = function(path:string){
    return plugins.requireReload(path);
};