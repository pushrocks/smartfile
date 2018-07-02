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
    let done = plugins.smartpromise.defer();
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
    let done = plugins.smartpromise.defer();
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
    let done = plugins.smartpromise.defer();
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
    let done = plugins.smartpromise.defer();
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
    let done = plugins.smartpromise.defer();
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
    let done = plugins.smartpromise.defer();
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
    let done = plugins.smartpromise.defer();
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
    let done = plugins.smartpromise.defer();
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
    let done = plugins.smartpromise.defer();
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
    let done = plugins.smartpromise.defer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmZzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBK0M7QUFDL0MsZ0VBQWdFO0FBRWhFLCtFQUF5RDtBQUV6RCw2Q0FBNEM7QUFDNUM7O2lFQUVpRTtBQUVqRTs7OztHQUlHO0FBQ1EsUUFBQSxjQUFjLEdBQUcsVUFBVSxRQUFRO0lBQzVDLElBQUksY0FBYyxHQUFZLEtBQUssQ0FBQTtJQUNuQyxJQUFJO1FBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdEMsY0FBYyxHQUFHLElBQUksQ0FBQTtLQUN0QjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osY0FBYyxHQUFHLEtBQUssQ0FBQTtLQUN2QjtJQUNELE9BQU8sY0FBYyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQTtBQUVEOzs7O0dBSUc7QUFDUSxRQUFBLFVBQVUsR0FBRyxVQUFVLFFBQVE7SUFDeEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUN2QyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsR0FBRztRQUMxQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN6QyxDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsV0FBVyxHQUFHLFVBQVUsT0FBTztJQUN4QyxJQUFJO1FBQ0YsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtLQUN2RDtJ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