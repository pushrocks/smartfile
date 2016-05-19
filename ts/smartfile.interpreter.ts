/// <reference path="./typings/index.d.ts" />

import plugins = require("./smartfile.plugins");

export = function(fileStringArg:string, fileTypeArg){
    switch (fileTypeArg) {
        case "yml" :
        case "yaml":
            return plugins.yaml.safeLoad(fileStringArg);
        case "json":
            return JSON.parse(fileStringArg);
        default:
            plugins.beautylog.error("file type " + fileTypeArg.blue + " not supported");
            break;
    }
}