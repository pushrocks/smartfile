import "typings-global";
import plugins = require("./smartfile.plugins");
import SmartfileInterpreter = require("./smartfile.interpreter");
import SmartfileGet = require("./smartfile.get");

export let toFs = function(from:string,toPath:string) {
    var done = plugins.q.defer();
    var stream = plugins.request(from).pipe(plugins.fs.createWriteStream(toPath));
    stream.on('finish',function(){
        done.resolve(toPath);
    });
    return done.promise;
};

/**
 *
 * @param filePathArg
 * @returns {*}
 */
export let toGulpStreamSync = function(filePathArg:string,baseArg:string){
    let stream = plugins.g.remoteSrc(filePathArg, {
        base: baseArg
    });
    return stream;
};

/**
 *
 * @param fromArg
 * @returns {any}
 */
export let toObject = function(fromArg:string){
    let done = plugins.q.defer();
    plugins.request.get(fromArg, function (error, response, bodyString) {
        let returnObject;
        if (!error && response.statusCode == 200) {
            returnObject = SmartfileInterpreter(bodyString,SmartfileGet.filetype(fromArg));
            done.resolve(returnObject);
        } else {
            console.log('could not get remote file from ' + fromArg);
            returnObject = undefined;
            done.reject(returnObject);
        };
    });
    return done.promise;
};

/**
 *
 * @param fromArg
 * @returns {any}
 */
export let toString = (fromArg:string) => {
    let done = plugins.q.defer();
    plugins.request.get(fromArg, function (error, response, bodyString) {
        if (!error && response.statusCode == 200) {
            done.resolve(bodyString);
        } else {
            plugins.beautylog.error('could not get remote file from ' + fromArg);
            bodyString = undefined;
            done.reject(bodyString);
        };
    });
    return done.promise;
};

