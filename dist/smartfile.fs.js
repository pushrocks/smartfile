"use strict";
require("typings-global");
const plugins = require("./smartfile.plugins");
const SmartfileInterpreter = require("./smartfile.interpreter");
const memory = require("./smartfile.memory");
/*===============================================================
============================ Checks =============================
===============================================================*/
/**
 *
 * @param filePath
 * @returns {boolean}
 */
exports.fileExistsSync = function (filePath) {
    let fileExistsBool = false;
    try {
        plugins.fsExtra.readFileSync(filePath);
        fileExistsBool = true;
    }
    catch (err) {
        fileExistsBool = false;
    }
    return fileExistsBool;
};
/**
 *
 * @param filePath
 * @returns {any}
 */
exports.fileExists = function (filePath) {
    let done = plugins.q.defer();
    plugins.fs.access(filePath, plugins.fs.R_OK, function (err) {
        err ? done.reject(err) : done.resolve();
    });
    return done.promise;
};
/**
 * Checks if given path points to an existing directory
 */
exports.isDirectory = function (pathArg) {
    return plugins.fsExtra.statSync(pathArg).isDirectory();
};
/**
 * Checks if a given path points to an existing file
 */
exports.isFile = function (pathArg) {
    return plugins.fsExtra.statSync(pathArg).isFile();
};
/*===============================================================
============================ FS ACTIONS =========================
===============================================================*/
/**
 * copies a file from A to B on the local disk
 */
exports.copy = function (fromArg, toArg) {
    let done = plugins.q.defer();
    plugins.fsExtra.copy(fromArg, toArg, {}, function () {
        done.resolve();
    });
    return done.promise;
};
/**
 * copies a file SYNCHRONOUSLY from A to B on the local disk
 */
exports.copySync = function (fromArg, toArg) {
    plugins.fsExtra.copySync(fromArg, toArg);
    return true;
};
/**
 * ensures that a directory is in place
 */
exports.ensureDir = (dirPathArg) => {
    let done = plugins.q.defer();
    plugins.fsExtra.ensureDir(dirPathArg, done.resolve);
    return done.promise;
};
/**
 * ensures that a directory is in place
 */
exports.ensureDirSync = (dirPathArg) => {
    plugins.fsExtra.ensureDirSync(dirPathArg);
};
/**
 * ensures that a file is on disk
 * @param filePath the filePath to ensureDir
 * @param the fileContent to place into a new file in case it doesn't exist yet
 * @returns Promise<void>
 * @exec ASYNC
 */
exports.ensureFile = (filePathArg, initFileStringArg) => {
    let done = plugins.q.defer();
    exports.ensureFileSync(filePathArg, initFileStringArg);
    done.resolve();
    return done.promise;
};
/**
 * ensures that a file is on disk
 * @param filePath the filePath to ensureDir
 * @param the fileContent to place into a new file in case it doesn't exist yet
 * @returns Promise<void>
 * @exec SYNC
 */
exports.ensureFileSync = (filePathArg, initFileStringArg) => {
    if (exports.fileExistsSync(filePathArg)) {
        return null;
    }
    else {
        memory.toFsSync(initFileStringArg, filePathArg);
    }
};
/**
 * removes a file or folder from local disk
 */
exports.remove = function (pathArg) {
    let done = plugins.q.defer();
    plugins.fsExtra.remove(pathArg, function () {
        done.resolve();
    });
    return done.promise;
};
/**
 * removes a file SYNCHRONOUSLY from local disk
 */
exports.removeSync = function (pathArg) {
    plugins.fsExtra.removeSync(pathArg);
    return true;
};
/**
 * removes an array of filePaths from disk
 */
exports.removeMany = function (filePathArrayArg) {
    let promiseArray = [];
    for (let filePath of filePathArrayArg) {
        promiseArray.push(exports.remove(filePath));
    }
    return plugins.q.all(promiseArray);
};
/**
 * like removeFilePathArray but SYNCHRONOUSLY
 */
exports.removeManySync = function (filePathArrayArg) {
    for (let filePath of filePathArrayArg) {
        exports.removeSync(filePath);
    }
};
/*===============================================================
============================ Write/Read =========================
===============================================================*/
/**
 *
 * @param filePathArg
 * @returns {*}
 */
exports.toGulpStreamSync = function (filePathArg) {
    let stream = plugins.gulp.src(filePathArg);
    return stream;
};
exports.toGulpDestSync = function (folderPathArg) {
    return plugins.gulp.dest(folderPathArg);
};
/**
 *
 * @param filePathArg
 * @param fileTypeArg
 * @returns {any}
 */
exports.toObjectSync = function (filePathArg, fileTypeArg) {
    let fileString = plugins.fsExtra.readFileSync(filePathArg, 'utf8');
    let fileType;
    fileTypeArg ? fileType = fileTypeArg : fileType = SmartfileInterpreter.filetype(filePathArg);
    return SmartfileInterpreter.objectFile(fileString, fileType);
};
/**
 * reads a file content to a String
 * @param filePath
 * @returns {string|Buffer|any}
 */
exports.toStringSync = function (filePath) {
    let fileString;
    fileString = plugins.fsExtra.readFileSync(filePath, 'utf8');
    return fileString;
};
/**
 *
 * @param filePathArg
 * @param options
 * @returns {number}
 */
exports.toVinylSync = function (filePathArg, options = {}) {
    return plugins.vinylFile.readSync(filePathArg, options);
};
/**
 * lets you reload files hot.
 * @param path
 * @returns {any}
 */
exports.requireReload = function (path) {
    return plugins.requireReload(path);
};
/**
 * lists Folders in a directory on local disk
 * @returns Promise
 */
exports.listFolders = function (pathArg, regexFilter) {
    let done = plugins.q.defer();
    let folderArray = plugins.fsExtra.readdirSync(pathArg).filter(function (file) {
        return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isDirectory();
    });
    if (regexFilter) {
        folderArray = folderArray.filter((fileItem) => {
            return regexFilter.test(fileItem);
        });
    }
    done.resolve(folderArray);
    return done.promise;
};
/**
 * lists Folders SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
exports.listFoldersSync = function (pathArg, regexFilter) {
    let folderArray = plugins.fsExtra.readdirSync(pathArg).filter(function (file) {
        return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isDirectory();
    });
    if (regexFilter) {
        folderArray = folderArray.filter((fileItem) => {
            return regexFilter.test(fileItem);
        });
    }
    return folderArray;
};
/**
 * lists Files in a directory on local disk
 * @returns Promise
 */
exports.listFiles = function (pathArg, regexFilter) {
    let done = plugins.q.defer();
    let fileArray = plugins.fsExtra.readdirSync(pathArg).filter(function (file) {
        return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isFile();
    });
    if (regexFilter) {
        fileArray = fileArray.filter((fileItem) => {
            return regexFilter.test(fileItem);
        });
    }
    done.resolve(fileArray);
    return done.promise;
};
/**
 * lists Files SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
exports.listFilesSync = function (pathArg, regexFilter) {
    let fileArray = plugins.fsExtra.readdirSync(pathArg).filter(function (file) {
        return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isFile();
    });
    if (regexFilter) {
        fileArray = fileArray.filter((fileItem) => {
            return regexFilter.test(fileItem);
        });
    }
    return fileArray;
};
/**
 * lists all items (folders AND files) in a directory on local disk
 * @returns Promise<string[]>
 */
exports.listAllItems = function (pathArg, regexFilter) {
    let done = plugins.q.defer();
    let allItmesArray = plugins.fsExtra.readdirSync(pathArg);
    if (regexFilter) {
        allItmesArray = allItmesArray.filter((fileItem) => {
            return regexFilter.test(fileItem);
        });
    }
    ;
    done.resolve(allItmesArray);
    return done.promise;
};
/**
 * lists all items (folders AND files) in a directory on local disk
 * @returns an array with the folder names as strings
 * @executes SYNC
 */
exports.listAllItemsSync = function (pathArg, regexFilter) {
    let allItmesArray = plugins.fsExtra.readdirSync(pathArg).filter(function (file) {
        return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isFile();
    });
    if (regexFilter) {
        allItmesArray = allItmesArray.filter((fileItem) => {
            return regexFilter.test(fileItem);
        });
    }
    return allItmesArray;
};
/**
 * lists a file tree using a miniMatch filter
 * note: if the miniMatch Filter is an absolute path, the cwdArg will be omitted
 * @returns Promise<string[]> string array with the absolute paths of all matching files
 */
exports.listFileTree = (dirPathArg, miniMatchFilter) => {
    let done = plugins.q.defer();
    // handle absolute miniMatchFilter
    let dirPath;
    if (plugins.path.isAbsolute(miniMatchFilter)) {
        dirPath = '/';
    }
    else {
        dirPath = dirPathArg;
    }
    let options = {
        cwd: dirPath
    };
    plugins.glob(miniMatchFilter, options, (err, files) => {
        if (err) {
            console.log(err);
            done.reject(err);
        }
        done.resolve(files);
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmZzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQkFBdUI7QUFFdkIsK0NBQStDO0FBQy9DLGdFQUFnRTtBQUNoRSw2Q0FBNEM7QUFDNUM7O2lFQUVpRTtBQUVqRTs7OztHQUlHO0FBQ1EsUUFBQSxjQUFjLEdBQUcsVUFBUyxRQUFRO0lBQ3pDLElBQUksY0FBYyxHQUFZLEtBQUssQ0FBQTtJQUNuQyxJQUFJLENBQUM7UUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN0QyxjQUFjLEdBQUcsSUFBSSxDQUFBO0lBQ3pCLENBQUU7SUFBQSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1gsY0FBYyxHQUFHLEtBQUssQ0FBQTtJQUMxQixDQUFDO0lBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQTtBQUN6QixDQUFDLENBQUE7QUFFRDs7OztHQUlHO0FBQ1EsUUFBQSxVQUFVLEdBQUcsVUFBUyxRQUFRO0lBQ3JDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztRQUN0RCxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDM0MsQ0FBQyxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUN2QixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsV0FBVyxHQUFHLFVBQVMsT0FBTztJQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxD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QU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVMsSUFBSTtRQUNyRSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDOUUsQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2QsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRO1lBQ2xDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDdkIsQ0FBQyxDQUFBO0FBRUQ7OztHQUdHO0FBQ1EsUUFBQSxhQUFhLEdBQUcsVUFBUyxPQUFlLEVBQUUsV0FBb0I7SUFDckUsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVMsSUFBSTtRQUNyRSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDOUUsQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2QsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRO1lBQ2xDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FB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