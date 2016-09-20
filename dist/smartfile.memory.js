"use strict";
require("typings-global");
const plugins = require("./smartfile.plugins");
const SmartfileInterpreter = require("./smartfile.interpreter");
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
    if (typeof fileArg === 'string' || fileArg instanceof plugins.vinyl) {
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
        file instanceof plugins.vinyl ?
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
    let vinylFile = new plugins.vinyl({
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
exports.toStringSync = function (fileArg) {
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
    if (fileContentArg instanceof plugins.vinyl) {
        fileString = exports.toStringSync(fileContentArg);
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
    if (fileArg instanceof plugins.vinyl) {
        fileString = exports.toStringSync(fileArg);
    }
    else if (typeof fileArg === 'string') {
        fileString = fileArg;
    }
    plugins.fsExtra.writeFileSync(filePath, fileString, 'utf8');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLm1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUF1QjtBQUV2QiwrQ0FBK0M7QUFDL0MsZ0VBQWdFO0FBRWhFLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUE7QUFHekM7Ozs7OztHQU1HO0FBQ1EsUUFBQSxZQUFZLEdBQUcsVUFBUyxPQUFzRCxFQUFDLE9BQU8sR0FBVyxHQUFHO0lBQzNHLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUVsQixFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxZQUFZLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxTQUFTLEdBQUcsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBRUQsSUFBSSxjQUFjLEdBQW9CLEVBQUUsQ0FBQSxDQUFDLHlDQUF5QztJQUVsRixHQUFHLENBQUMsQ0FBQyxJQUFJLFlBQVksSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNsQyxJQUFJLFlBQVksT0FBTyxDQUFDLEtBQUs7WUFDekIsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDekIsY0FBYyxDQUFDLElBQUksQ0FBQyx1QkFBZSxDQUFDLElBQUksRUFBQyxFQUFD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