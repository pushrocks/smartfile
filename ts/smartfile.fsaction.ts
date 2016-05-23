import "typings-global";

import plugins = require("./smartfile.plugins");
import SmartfileChecks = require("./smartfile.checks");

export let copy = function(fromArg:string, toArg:string){
    var done = plugins.q.defer();
    plugins.fs.copy(fromArg,toArg,{},function(){
        done.resolve();
    });
    return done.promise;
};

export let copySync = function(fromArg:string,toArg:string):boolean{
    plugins.fs.copySync(fromArg,toArg);
    return true;
};

export let remove = function(pathArg:string){
    var done = plugins.q.defer();
    plugins.fs.remove(pathArg,function(){
        done.resolve();
    });
    return done.promise;
};

export let removeSync = function(pathArg:string):boolean{
    plugins.fs.removeSync(pathArg);
    return true;
};