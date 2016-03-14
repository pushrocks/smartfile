/// <reference path="./typings/main.d.ts" />

import plugins = require("./smartfile.plugins");

export let copy = function(fromArg:string,toArg:string){
    plugins.shelljs.cp("-r",fromArg,toArg);
};

/**
 * reads a file content to a String
 * @param filePath
 * @returns {string|Buffer|any}
 */
export let readFileToString = function(filePath) {
    let fileString;
    fileString = plugins.fs.readFileSync(filePath, "utf8");
    return fileString;
};

/**
 *
 * @param filePath
 * @param fileTypeArg
 * @returns {any}
 */
export let readFileToObject = function(filePath,fileTypeArg = undefined) {
    let fileType;
    if (typeof fileTypeArg == "undefined") {
        fileType = plugins.path.extname(filePath);
    } else {
        fileType = fileTypeArg;
    }
    fileType = fileType.replace(/\.([a-z]*)/,"$1"); //remove . form fileType
    switch (fileType) {
        case "yml" :
        case "yaml":
            try {
                return plugins.yaml.safeLoad(plugins.fs.readFileSync(filePath, 'utf8'));
            } catch (e){
                plugins.beautylog.error("check that " + filePath.blue + " points to a valid file");
            }
            break;
        case "json":
            return plugins.fs.readJsonSync(filePath,{});
        default:
            plugins.beautylog.error("file type " + fileType.blue + " not supported");
            break;
    }
};

/**
 *
 * @param filePathArg
 * @param options
 * @returns {number}
 */
export let readFileToVinyl = function(filePathArg,options = {}) {
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