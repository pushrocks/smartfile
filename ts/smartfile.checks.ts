/// <reference path="./typings/main.d.ts" />
import plugins = require("./smartfile.plugins");

/**
 *
 * @param filePath
 * @returns {boolean}
 */
export let fileExistsSync = function(filePath):boolean {
    let fileExistsBool:boolean = false;
    try {
        plugins.fs.readFileSync(filePath);
        fileExistsBool = true
    }
    catch(err){
        fileExistsBool = false;
    }
    return fileExistsBool;
};

/**
 *
 * @param filePath
 * @returns {any}
 */
export let fileExists = function(filePath){
    let done = plugins.q.defer();
    plugins.fs.access(filePath, plugins.fs.R_OK, function (err) {
        err ? done.reject() : done.resolve();
    });
    return done.promise;
};

export let isDirectory = function(pathArg):boolean{
    return plugins.fs.statSync(pathArg).isDirectory();
};

export let isFile = function(pathArg):boolean{
    return plugins.fs.statSync(pathArg).isFile();
};
