/// <reference path="./typings/main.d.ts" />
import plugins = require("./smartfile.plugins");

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
        let jsonObject;
        if (!error && response.statusCode == 200) {
            jsonObject = JSON.parse(bodyString);
            done.resolve(jsonObject);
        } else {
            console.log('could not get remote file from ' + fromArg);
            jsonObject = undefined;
            done.reject(jsonObject);
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
            plugins.beautylog.error('could not get get remote file from ' + fromArg);
            bodyString = undefined;
            done.reject(bodyString);
        };
    });
    return done.promise;
};

