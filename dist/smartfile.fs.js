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
        plugins.fs.readFileSync(filePath);
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
    let done = plugins.Q.defer();
    plugins.fs.access(filePath, plugins.fs.R_OK, function (err) {
        err ? done.reject(err) : done.resolve();
    });
    return done.promise;
};
/**
 * Checks if given path points to an existing directory
 */
exports.isDirectory = function (pathArg) {
    return plugins.fs.statSync(pathArg).isDirectory();
};
/**
 * Checks if a given path points to an existing file
 */
exports.isFile = function (pathArg) {
    return plugins.fs.statSync(pathArg).isFile();
};
/*===============================================================
============================ FS ACTIONS =========================
===============================================================*/
/**
 * ensures that a directory is in place
 */
exports.ensureDir = (dirPathArg) => {
    let done = plugins.Q.defer();
    plugins.fs.ensureDir(dirPathArg, done.resolve);
    return done.promise;
};
/**
 * ensures that a directory is in place
 */
exports.ensureDirSync = (dirPathArg) => {
    plugins.fs.ensureDirSync(dirPathArg);
};
/**
 * copies a file from A to B on the local disk
 */
exports.copy = function (fromArg, toArg) {
    var done = plugins.Q.defer();
    plugins.fs.copy(fromArg, toArg, {}, function () {
        done.resolve();
    });
    return done.promise;
};
/**
 * copies a file SYNCHRONOUSLY from A to B on the local disk
 */
exports.copySync = function (fromArg, toArg) {
    plugins.fs.copySync(fromArg, toArg);
    return true;
};
/**
 * removes a file or folder from local disk
 */
exports.remove = function (pathArg) {
    var done = plugins.Q.defer();
    plugins.fs.remove(pathArg, function () {
        done.resolve();
    });
    return done.promise;
};
/**
 * removes a file SYNCHRONOUSLY from local disk
 */
exports.removeSync = function (pathArg) {
    plugins.fs.removeSync(pathArg);
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
    let fileString = plugins.fs.readFileSync(filePathArg, 'utf8');
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
    fileString = plugins.fs.readFileSync(filePath, "utf8");
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
    let done = plugins.Q.defer();
    let folderArray = plugins.fs.readdirSync(pathArg).filter(function (file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isDirectory();
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
    let folderArray = plugins.fs.readdirSync(pathArg).filter(function (file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isDirectory();
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
    let done = plugins.Q.defer();
    let fileArray = plugins.fs.readdirSync(pathArg).filter(function (file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isFile();
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
    let fileArray = plugins.fs.readdirSync(pathArg).filter(function (file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isFile();
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
 * @returns Promise
 */
exports.listAllItems = function (pathArg, regexFilter) {
    let done = plugins.Q.defer();
    let allItmesArray = plugins.fs.readdirSync(pathArg);
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
 * lists all items (folders AND files) SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
exports.listAllItemsSync = function (pathArg, regexFilter) {
    let allItmesArray = plugins.fs.readdirSync(pathArg).filter(function (file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isFile();
    });
    if (regexFilter) {
        allItmesArray = allItmesArray.filter((fileItem) => {
            return regexFilter.test(fileItem);
        });
    }
    ;
    return allItmesArray;
};
exports.listFileTree = (dirPath, miniMatchFilter) => {
    let done = plugins.Q.defer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmZzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFPLGdCQUFnQixDQUFDLENBQUE7QUFFeEIsTUFBTyxPQUFPLFdBQVcscUJBQXFCLENBQUMsQ0FBQztBQUNoRCxNQUFPLG9CQUFvQixXQUFXLHlCQUF5QixDQUFDLENBQUM7QUFFakU7O2lFQUVpRTtBQUVqRTs7OztHQUlHO0FBQ1Esc0JBQWMsR0FBRyxVQUFTLFFBQVE7SUFDekMsSUFBSSxjQUFjLEdBQVcsS0FBSyxDQUFDO0lBQ25DLElBQUksQ0FBQztRQUNELE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLGNBQWMsR0FBRyxJQUFJLENBQUE7SUFDekIsQ0FDQTtJQUFBLEtBQUssQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7UUFDUCxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDO0FBQzFCLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDUSxrQkFBVSxHQUFHLFVBQVMsUUFBUTtJQUNyQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7UUFDdEQsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDUSxtQkFBVyxHQUFHLFVBQVMsT0FBTztJQUNyQyxNQUFN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