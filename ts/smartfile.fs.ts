import "typings-global";

import plugins = require("./smartfile.plugins");
import SmartfileInterpreter = require("./smartfile.interpreter");

/*===============================================================
============================ FS ACTIONS =========================
===============================================================*/

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


/*===============================================================
============================ Write/Read =========================
===============================================================*/


export let toFS = function(options:{from:string,toPath:string}, cb=undefined){
    
};

/**
 *
 * @param filePathArg
 * @returns {*}
 */
export let toGulpStreamSync = function(filePathArg:string){
    let stream = plugins.gulp.src(filePathArg);
    return stream;
};

export let toGulpDestSync = function(folderPathArg:string){
    return plugins.gulp.dest(folderPathArg);
};

/**
 *
 * @param filePathArg
 * @param fileTypeArg
 * @returns {any}
 */
export let toObjectSync = function(filePathArg,fileTypeArg?) {
    let fileString = plugins.fs.readFileSync(filePathArg, 'utf8');
    let fileType;
    fileTypeArg ? fileType = fileTypeArg : fileType = filetype(filePathArg);
    return SmartfileInterpreter(fileString,fileType);
};

/**
 * reads a file content to a String
 * @param filePath
 * @returns {string|Buffer|any}
 */
export let toStringSync = function(filePath) {
    let fileString;
    fileString = plugins.fs.readFileSync(filePath, "utf8");
    return fileString;
};

/**
 *
 * @param filePathArg
 * @param options
 * @returns {number}
 */
export let toVinylSync = function(filePathArg,options = {}) {
    return plugins.vinylFile.readSync(filePathArg,options);
};

/**
 * lets you reload files hot.
 * @param path
 * @returns {any}
 */
export let requireReload = function(path:string){
    return plugins.requireReload(path);
};

export let filetype = function(pathArg:string):string {
    let extName = plugins.path.extname(pathArg);
    let fileType = extName.replace(/\.([a-z]*)/,"$1"); //remove . form fileType
    return fileType;
};

export let foldersSync = function(pathArg){
    return plugins.fs.readdirSync(pathArg).filter(function(file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isDirectory();
    });
};

export let folders = function(pathArg:string){
    let done = plugins.q.defer();
    let folderArray = plugins.fs.readdirSync(pathArg).filter(function(file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isDirectory();
    });
    done.resolve(folderArray);
    return done.promise;
};


/**
 *
 * @param filePath
 * @returns {boolean}
 */
export let fileExistsSync = function(filePath):boolean {
    let fileExistsBool:boolean = false;
    try {
        plugins.fs.readFileSync(filePath);
        fileExistsBool = true
    }
    catch(err){
        fileExistsBool = false;
    }
    return fileExistsBool;
};

/**
 *
 * @param filePath
 * @returns {any}
 */
export let fileExists = function(filePath){
    let done = plugins.q.defer();
    plugins.fs.access(filePath, plugins.fs.R_OK, function (err) {
        err ? done.reject() : done.resolve();
    });
    return done.promise;
};

export let isDirectory = function(pathArg):boolean{
    return plugins.fs.statSync(pathArg).isDirectory();
};

export let isFile = function(pathArg):boolean{
    return plugins.fs.statSync(pathArg).isFile();
};