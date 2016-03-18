/// <reference path="./typings/main.d.ts" />

import plugins = require("./smartfile.plugins");

export let copy = function(fromArg:string,toArg:string){
    plugins.shelljs.cp("-r",fromArg,toArg);
};