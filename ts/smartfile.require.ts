/// <reference path="./index.ts" />
module SmartfileRequire {
    var requireReload = function(path:string){
        return plugins.requireReload(path);
    };

    export var init = function(objectArg){
        objectArg.requireReload = requireReload;
    }
}