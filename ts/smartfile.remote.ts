/// <reference path="./typings/main.d.ts" />
import plugins = require("./smartfile.plugins");

export let toVar = (options:{from:string,parseJson?:boolean}, cb):any => {
    var bodyString:string;
    request.get(options.from, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bodyString = body;
            console.log('successfully requested' + options.from);
            if (options.parseJson = true) {
                var jsonObject = JSON.parse(bodyString);
                return jsonObject;
            };
        } else {
            console.log('could not get get remote file from ' + options.from);
            return bodyString = 'could not get file'
        };
    });

    return bodyString;
},

export let toFS = function(options:{from:string,toPath:string}, cb=undefined) {
    var stream = request(options.from).pipe(fs.createWriteStream(options.toPath));
    if (cb != undefined) stream.on('finish',cb);
}