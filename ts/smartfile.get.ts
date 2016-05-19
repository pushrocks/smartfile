/// <reference path="./typings/index.d.ts" />
import plugins = require("./smartfile.plugins");

export let filetype = function(pathArg:string):string {
    let extName = plugins.path.extname(pathArg);
    let fileType = extName.replace(/\.([a-z]*)/,"$1"); //remove . form fileType
    return fileType;
};

export let foldersSync = function(pathArg){
    return plugins.fs.readdirSync(pathArg).filter(function(file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isDirectory();
    });
};

export let folders = function(pathArg:string){
    let done = plugins.q.defer();
    let folderArray = plugins.fs.readdirSync(pathArg).filter(function(file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isDirectory();
    });
    done.resolve(folderArray);
    return done.promise;
};