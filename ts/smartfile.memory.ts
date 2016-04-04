/// <reference path="./typings/main.d.ts" />

import plugins = require("./smartfile.plugins");
let Readable = require("stream").Readable;
/**
 * allows you to create a gulp stream from filestring
 * @param fileArg
 * @returns stream.Readable
 * @TODO: make it async;
 */
export let toGulpStream = function(fileArg:string|string[]|plugins.vinyl|plugins.vinyl[],baseArg:string = "/"){
    let fileArray = [];

    if(typeof fileArg === "string" || fileArg instanceof plugins.vinyl){ // make sure we work with an array later on
        fileArray.push(fileArg);
    } else if (Array.isArray(fileArg)){
        fileArray = fileArg;
    } else {
        throw new Error("fileArg has unknown format");
    }

    let vinylFileArray:plugins.vinyl[] = []; //we want to have an array of vinylFiles

    for (let fileIndexArg in fileArray){ //convert fileArray in vinylArray
        let file = fileArray[fileIndexArg];
        file instanceof plugins.vinyl ?
            vinylFileArray.push(file) :
            vinylFileArray.push(toVinylFileSync(file,{filename:fileIndexArg,base:baseArg}));
    };

    let stream = new Readable({ objectMode: true });
    for(let vinylFileIndexArg in vinylFileArray){
        let vinylFile = vinylFileArray[vinylFileIndexArg];
        stream.push(vinylFile);
    };
    stream.push(null); //signal end of stream;
    return stream;
};

/**
 * takes a string and converts it to vinyl file
 * @param fileArg
 * @param optionsArg
 */
export let toVinylFileSync = function(fileArg:string,optionsArg?:{filename?:string,base?:string,relPath?:string}){
    optionsArg? void(0) : optionsArg = {filename: "vinylfile", base: "/"};
    optionsArg.filename ? void(0) : optionsArg.filename = "vinylfile";
    optionsArg.base ? void(0) : optionsArg.base = "/";
    optionsArg.relPath ? void("0") : optionsArg.relPath = "";
    let vinylFile = new plugins.vinyl({
        base: optionsArg.base,
        path: plugins.path.join(optionsArg.base,optionsArg.relPath,optionsArg.filename),
        contents: new Buffer(fileArg)
    });
    return vinylFile;
};

/**
 * takes a string array and some options and returns a vinylfile array
 * @param arrayArg
 * @param optionsArg
 */
export let toVinylArraySync = function(arrayArg:string[],optionsArg?:{filename?:string,base?:string,relPath?:string}){
    let vinylArray = [];
    for(let stringIndexArg in arrayArg){
        let myString = arrayArg[stringIndexArg];
        vinylArray.push(toVinylFileSync(myString,optionsArg));
    }
    return vinylArray;
};

/**
 * takes a vinylFile object and converts it to String
 */
export let toStringSync = function(fileArg:plugins.vinyl){
    return fileArg.contents.toString("utf8");
};


/**
 * writes string or vinyl file to disk.
 * @param fileArg
 * @param fileNameArg
 * @param fileBaseArg
 */
export let toFs = function(fileArg,optionsArg:{fileName:string,filePath:string}){
    let done = plugins.q.defer();

    //function checks to abort if needed
    if (!fileArg || !optionsArg || !(typeof optionsArg.fileName === "string"))
        throw new Error("expected a valid arguments");
    if (!(typeof optionsArg.filePath === "string")) optionsArg.filePath = "/";

    let filePath:string = plugins.path.join(optionsArg.filePath,optionsArg.fileName);
    let fileString:string;
    if (fileArg instanceof plugins.vinyl){
        fileString = toStringSync(fileArg);
    } else if (typeof fileArg === "string") {
        fileString = fileArg;
    }
    plugins.fs.writeFile(filePath,fileString,"utf8",done.resolve);
    return done.promise;
};

export let toFsSync = function(fileArg,optionsArg:{fileName:string,filePath:string}){
    //function checks to abort if needed
    if (!fileArg || !optionsArg || !(typeof optionsArg.fileName === "string"))
        throw new Error("expected a valid arguments");
    if (!(typeof optionsArg.filePath === "string")) optionsArg.filePath = "/";

    let filePath = plugins.path.join(optionsArg.filePath,optionsArg.fileName);
    let fileString:string;

    if (fileArg instanceof plugins.vinyl){
        fileString = toStringSync(fileArg);
    } else if (typeof fileArg === "string") {
        fileString = fileArg;
    }
    plugins.fs.writeFileSync(filePath,fileString,"utf8");
};

