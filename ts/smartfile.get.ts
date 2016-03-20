/// <reference path="./typings/main.d.ts" />
import plugins = require("./smartfile.plugins");

export let filetype = function(pathArg:string):string {
    let extName = plugins.path.extname(pathArg);
    let fileType = extName.replace(/\.([a-z]*)/,"$1"); //remove . form fileType
    return fileType;
};