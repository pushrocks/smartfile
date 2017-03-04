"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-global");
const plugins = require("./smartfile.plugins");
const SmartfileInterpreter = require("./smartfile.interpreter");
let vinyl = require('vinyl');
let Readable = require('stream').Readable;
/**
 * allows you to create a gulp stream
 * from String, from an Array of Strings, from Vinyl File, from an Array of VinylFiles
 * @param fileArg
 * @returns stream.Readable
 * @TODO: make it async;
 */
exports.toGulpStream = function (fileArg, baseArg = '/') {
    let fileArray = [];
    if (typeof fileArg === 'string' || vinyl.isVinyl(fileArg)) {
        fileArray.push(fileArg);
    }
    else if (Array.isArray(fileArg)) {
        fileArray = fileArg;
    }
    else {
        throw new Error('fileArg has unknown format');
    }
    let vinylFileArray = []; // we want to have an array of vinylFiles
    for (let fileIndexArg in fileArray) {
        let file = fileArray[fileIndexArg];
        file instanceof vinyl ?
            vinylFileArray.push(file) :
            vinylFileArray.push(exports.toVinylFileSync(file, { filename: fileIndexArg, base: baseArg }));
    }
    ;
    let stream = new Readable({ objectMode: true });
    for (let vinylFileIndexArg in vinylFileArray) {
        let vinylFile = vinylFileArray[vinylFileIndexArg];
        stream.push(vinylFile);
    }
    ;
    stream.push(null); // signal end of stream;
    return stream;
};
/**
 * converts file to Object
 * @param fileStringArg
 * @param fileTypeArg
 * @returns {any|any}
 */
exports.toObject = function (fileStringArg, fileTypeArg) {
    return SmartfileInterpreter.objectFile(fileStringArg, fileTypeArg);
};
/**
 * takes a string and converts it to vinyl file
 * @param fileArg
 * @param optionsArg
 */
exports.toVinylFileSync = function (fileArg, optionsArg) {
    optionsArg ? void (0) : optionsArg = { filename: 'vinylfile', base: '/' };
    optionsArg.filename ? void (0) : optionsArg.filename = 'vinylfile';
    optionsArg.base ? void (0) : optionsArg.base = '/';
    optionsArg.relPath ? void ('0') : optionsArg.relPath = '';
    let vinylFile = new vinyl({
        base: optionsArg.base,
        path: plugins.path.join(optionsArg.base, optionsArg.relPath, optionsArg.filename),
        contents: new Buffer(fileArg)
    });
    return vinylFile;
};
/**
 * takes a string array and some options and returns a vinylfile array
 * @param arrayArg
 * @param optionsArg
 */
exports.toVinylArraySync = function (arrayArg, optionsArg) {
    let vinylArray = [];
    for (let stringIndexArg in arrayArg) {
        let myString = arrayArg[stringIndexArg];
        vinylArray.push(exports.toVinylFileSync(myString, optionsArg));
    }
    return vinylArray;
};
/**
 * takes a vinylFile object and converts it to String
 */
exports.vinylToStringSync = function (fileArg) {
    return fileArg.contents.toString('utf8');
};
/**
 * writes string or vinyl file to disk.
 * @param fileArg
 * @param fileNameArg
 * @param fileBaseArg
 */
exports.toFs = function (fileContentArg, filePathArg) {
    let done = plugins.q.defer();
    // function checks to abort if needed
    if (!fileContentArg || !filePathArg) {
        throw new Error('expected valid arguments');
    }
    // prepare actual write action
    let fileString;
    let filePath = filePathArg;
    if (vinyl.isVinyl(fileContentArg)) {
        let fileContentArg2 = fileContentArg;
        fileString = exports.vinylToStringSync(fileContentArg2);
    }
    else if (typeof fileContentArg === 'string') {
        fileString = fileContentArg;
    }
    plugins.fsExtra.writeFile(filePath, fileString, 'utf8', done.resolve);
    return done.promise;
};
exports.toFsSync = function (fileArg, filePathArg) {
    // function checks to abort if needed
    if (!fileArg || !filePathArg) {
        throw new Error('expected a valid arguments');
    }
    // prepare actual write action
    let fileString;
    let filePath = filePathArg;
    if (typeof fileArg !== 'string') {
        fileString = exports.vinylToStringSync(fileArg);
    }
    else if (typeof fileArg === 'string') {
        fileString = fileArg;
    }
    plugins.fsExtra.writeFileSync(filePath, fileString, 'utf8');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLm1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQkFBdUI7QUFFdkIsK0NBQStDO0FBQy9DLGdFQUFnRTtBQUNoRSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7QUFRNUIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtBQUV6Qzs7Ozs7O0dBTUc7QUFDUSxRQUFBLFlBQVksR0FBRyxVQUFTLE9BQWdELEVBQUMsVUFBa0IsR0FBRztJQUNyRyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFFbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxTQUFTLEdBQUcsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBRUQsSUFBSSxjQUFjLEdBQWlCLEVBQUUsQ0FBQSxDQUFDLHlDQUF5QztJQUUvRSxHQUFHLENBQUMsQ0FBQyxJQUFJLFlBQVksSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNsQyxJQUFJLFlBQVksS0FBSztZQUNqQixjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN6QixjQUFjLENB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