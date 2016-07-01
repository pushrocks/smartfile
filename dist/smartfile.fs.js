"use strict";
require("typings-global");
var plugins = require("./smartfile.plugins");
var SmartfileInterpreter = require("./smartfile.interpreter");
/*===============================================================
============================ Checks =============================
===============================================================*/
/**
 *
 * @param filePath
 * @returns {boolean}
 */
exports.fileExistsSync = function (filePath) {
    var fileExistsBool = false;
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
    var done = plugins.Q.defer();
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
exports.ensureDir = function (dirPathArg) {
    var done = plugins.Q.defer();
    plugins.fs.ensureDir(dirPathArg, done.resolve);
    return done.promise;
};
/**
 * ensures that a directory is in place
 */
exports.ensureDirSync = function (dirPathArg) {
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
    var stream = plugins.gulp.src(filePathArg);
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
    var fileString = plugins.fs.readFileSync(filePathArg, 'utf8');
    var fileType;
    fileTypeArg ? fileType = fileTypeArg : fileType = SmartfileInterpreter.filetype(filePathArg);
    return SmartfileInterpreter.objectFile(fileString, fileType);
};
/**
 * reads a file content to a String
 * @param filePath
 * @returns {string|Buffer|any}
 */
exports.toStringSync = function (filePath) {
    var fileString;
    fileString = plugins.fs.readFileSync(filePath, "utf8");
    return fileString;
};
/**
 *
 * @param filePathArg
 * @param options
 * @returns {number}
 */
exports.toVinylSync = function (filePathArg, options) {
    if (options === void 0) { options = {}; }
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
    var done = plugins.Q.defer();
    var folderArray = plugins.fs.readdirSync(pathArg).filter(function (file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isDirectory();
    });
    if (regexFilter) {
        folderArray = folderArray.filter(function (fileItem) {
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
    var folderArray = plugins.fs.readdirSync(pathArg).filter(function (file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isDirectory();
    });
    if (regexFilter) {
        folderArray = folderArray.filter(function (fileItem) {
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
    var done = plugins.Q.defer();
    var fileArray = plugins.fs.readdirSync(pathArg).filter(function (file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isFile();
    });
    if (regexFilter) {
        fileArray = fileArray.filter(function (fileItem) {
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
    var fileArray = plugins.fs.readdirSync(pathArg).filter(function (file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isFile();
    });
    if (regexFilter) {
        fileArray = fileArray.filter(function (fileItem) {
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
    var done = plugins.Q.defer();
    var allItmesArray = plugins.fs.readdirSync(pathArg);
    if (regexFilter) {
        allItmesArray = allItmesArray.filter(function (fileItem) {
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
    var allItmesArray = plugins.fs.readdirSync(pathArg).filter(function (file) {
        return plugins.fs.statSync(plugins.path.join(pathArg, file)).isFile();
    });
    if (regexFilter) {
        allItmesArray = allItmesArray.filter(function (fileItem) {
            return regexFilter.test(fileItem);
        });
    }
    ;
    return allItmesArray;
};
exports.listFileTree = function (dirPath, miniMatchFilter) {
    var done = plugins.Q.defer();
    var options = {
        cwd: dirPath
    };
    plugins.glob(miniMatchFilter, options, function (err, files) {
        if (err) {
            console.log(err);
            done.reject(err);
        }
        ;
        done.resolve(files);
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmZzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFPLGdCQUFnQixDQUFDLENBQUE7QUFFeEIsSUFBTyxPQUFPLFdBQVcscUJBQXFCLENBQUMsQ0FBQztBQUNoRCxJQUFPLG9CQUFvQixXQUFXLHlCQUF5QixDQUFDLENBQUM7QUFFakU7O2lFQUVpRTtBQUVqRTs7OztHQUlHO0FBQ1Esc0JBQWMsR0FBRyxVQUFTLFFBQVE7SUFDekMsSUFBSSxjQUFjLEdBQVcsS0FBSyxDQUFDO0lBQ25DLElBQUksQ0FBQztRQUNELE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLGNBQWMsR0FBRyxJQUFJLENBQUE7SUFDekIsQ0FDQTtJQUFBLEtBQUssQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7UUFDUCxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDO0FBQzFCLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDUSxrQkFBVSxHQUFHLFVBQVMsUUFBUTtJQUNyQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7UUFDdEQsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDUSxtQkFBVyxHQUFHLFVBQVMsT0FBTztJQUNyQyxNQUFN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