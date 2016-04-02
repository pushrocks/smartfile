/// <reference path="./typings/main.d.ts" />

import plugins = require("./smartfile.plugins");
let Readable = require("stream").Readable;
/**
 * allows you to create a gulp stream from filestring
 * @param fileArg
 * @returns stream.Readable
 * @TODO: make it async;
 */
export let toGulpStream = function(fileArg:string|string[]|plugins.vinyl|plugins.vinyl[],baseArg?:string){
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
            vinylFileArray.push(toVinylFileSync(file,{filename:fileIndexArg,base:"/"}));
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
export let toVinylFileSync = function(fileArg:string,optionsArg?:{filename:string,base:string,relPath?:string}){
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
export let toVinylArraySync = function(arrayArg:string[],optionsArg?:{filename:string,base:string,relPath?:string}){
    let vinylArray = [];
    for(let stringIndexArg in arrayArg){
        let myString = arrayArg[stringIndexArg];
        vinylArray.push(toVinylFileSync(myString,optionsArg));
    }
    return vinylArray;
};


export let toFs = function(fileArg:string|plugins.vinyl,fileNameArg?:string,fileBaseArg?:string){
    if (fileArg instanceof plugins.vinyl){

    }
};

export let toFsSync = function(){
    
};

