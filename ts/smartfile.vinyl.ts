/// <reference path="./index.ts" />
module SmartfileVinyl {
    var readFileToVinyl = function(filePathArg,options = {}) {
        return plugins.vinylFile.readSync(filePathArg,options);
    };
    export var init = function(objectArg) {
        objectArg.readFileToVinyl = readFileToVinyl;
    };
}