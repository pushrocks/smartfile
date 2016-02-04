/// <reference path="./index.ts" />
module SmartfileCheck {
    var checks = {
        fileExistsSync: function(filePath):boolean {
            var fileExistsBool:boolean = false;
            try {
                plugins.fs.readFileSync(filePath)
                fileExistsBool = true
            }
            catch(err){
                fileExistsBool = false;
            }
            return fileExistsBool;
        },
        fileExists: function(filePath){
            var done = plugins.q.defer();
            plugins.fs.access(filePath, plugins.fs.R_OK, function (err) {
                err ? done.reject() : done.resolve();
            });
            return done.promise;
        }
    };
    export var init = function(objectArg){
        objectArg.checks = checks;
    }
}