"use strict";
require("typings-global");
const plugins = require("./smartfile.plugins");
const SmartfileInterpreter = require("./smartfile.interpreter");
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
 * copies a file from A to B on the local disk
 */
exports.copy = function (fromArg, toArg) {
    var done = plugins.q.defer();
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
 * removes a file or folder from local disk
 */
exports.remove = function (pathArg) {
    var done = plugins.q.defer();
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
    fileString = plugins.fsExtra.readFileSync(filePath, "utf8");
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
    ;
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
    ;
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
    ;
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
    ;
    return allItmesArray;
};
/**
 * lists a file tree using a miniMatch filter
 * @returns Promise<string[]> string array with the absolute paths of all matching files
 */
exports.listFileTree = (dirPath, miniMatchFilter) => {
    let done = plugins.q.defer();
    let options = {
        cwd: dirPath
    };
    plugins.glob(miniMatchFilter, options, (err, files) => {
        if (err) {
            console.log(err);
            done.reject(err);
        }
        ;
        done.resolve(files);
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmZzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFPLGdCQUFnQixDQUFDLENBQUE7QUFFeEIsTUFBTyxPQUFPLFdBQVcscUJBQXFCLENBQUMsQ0FBQztBQUNoRCxNQUFPLG9CQUFvQixXQUFXLHlCQUF5QixDQUFDLENBQUM7QUFFakU7O2lFQUVpRTtBQUVqRTs7OztHQUlHO0FBQ1Esc0JBQWMsR0FBRyxVQUFTLFFBQVE7SUFDekMsSUFBSSxjQUFjLEdBQVcsS0FBSyxDQUFDO0lBQ25DLElBQUksQ0FBQztRQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLGNBQWMsR0FBRyxJQUFJLENBQUE7SUFDekIsQ0FDQTtJQUFBLEtBQUssQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7UUFDUCxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDO0FBQzFCLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDUSxrQkFBVSxHQUFHLFVBQVMsUUFBUTtJQUNyQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7UUFDdEQsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDUSxtQkFBVyxHQUFHLFVBQVMsT0FBTztJQUNyQyxNQUFN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