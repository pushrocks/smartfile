"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-global");
const plugins = require("./smartfile.plugins");
const SmartfileInterpreter = require("./smartfile.interpreter");
const smartfile_classes_smartfile_1 = require("./smartfile.classes.smartfile");
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
    plugins.fs.access(filePath, 4, function (err) {
        err ? done.reject(err) : done.resolve();
    });
    return done.promise;
};
/**
 * Checks if given path points to an existing directory
 */
exports.isDirectory = function (pathArg) {
    try {
        return plugins.fsExtra.statSync(pathArg).isDirectory();
    }
    catch (err) {
        return false;
    }
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
 * ensure an empty directory
 * @executes ASYNC
 */
exports.ensureEmptyDir = (dirPathArg) => {
    let done = plugins.q.defer();
    plugins.fsExtra.ensureDir(dirPathArg, () => {
        plugins.fsExtra.emptyDir(dirPathArg, done.resolve);
    });
    return done.promise;
};
/**
 * ensure an empty directory
 * @executes SYNC
 */
exports.ensureEmptyDirSync = (dirPathArg) => {
    plugins.fsExtra.ensureDirSync(dirPathArg);
    plugins.fsExtra.emptyDirSync(dirPathArg);
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
    return Promise.all(promiseArray);
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
    let fileString = plugins.fsExtra.readFileSync(filePath, 'utf8');
    return fileString;
};
exports.fileTreeToObject = (dirPathArg, miniMatchFilter) => __awaiter(this, void 0, void 0, function* () {
    // handle absolute miniMatchFilter
    let dirPath;
    if (plugins.path.isAbsolute(miniMatchFilter)) {
        dirPath = '/';
    }
    else {
        dirPath = dirPathArg;
    }
    let fileTree = yield exports.listFileTree(dirPath, miniMatchFilter);
    let smartfileArray = [];
    for (let filePath of fileTree) {
        let readPath = (() => {
            if (!plugins.path.isAbsolute(filePath)) {
                return plugins.path.join(dirPath, filePath);
            }
            else {
                return filePath;
            }
        })();
        let fileContentString = exports.toStringSync(readPath);
        // push a read file as Smartfile
        smartfileArray.push(new smartfile_classes_smartfile_1.Smartfile({
            contentBuffer: new Buffer(fileContentString),
            base: dirPath,
            path: filePath
        }));
    }
    return smartfileArray;
});
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
        cwd: dirPath,
        nodir: true,
        dot: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmZzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwwQkFBdUI7QUFFdkIsK0NBQStDO0FBQy9DLGdFQUFnRTtBQUVoRSwrRUFBeUQ7QUFFekQsNkNBQTRDO0FBQzVDOztpRUFFaUU7QUFFakU7Ozs7R0FJRztBQUNRLFFBQUEsY0FBYyxHQUFHLFVBQVUsUUFBUTtJQUM1QyxJQUFJLGNBQWMsR0FBWSxLQUFLLENBQUE7SUFDbkMsSUFBSSxDQUFDO1FBQ0gsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdEMsY0FBYyxHQUFHLElBQUksQ0FBQTtJQUN2QixDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNiLGNBQWMsR0FBRyxLQUFLLENBQUE7SUFDeEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxjQUFjLENBQUE7QUFDdkIsQ0FBQyxDQUFBO0FBRUQ7Ozs7R0FJRztBQUNRLFFBQUEsVUFBVSxHQUFHLFVBQVUsUUFBUTtJQUN4QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsVUFBVSxHQUFHO1FBQzFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDUSxRQUFBLFdBQVcsR0FBRyxVQUFVLE9BQU87SUFDeEMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxDQUFD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