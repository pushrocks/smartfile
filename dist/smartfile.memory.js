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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLm1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUF1QjtBQUV2QiwrQ0FBK0M7QUFDL0MsZ0VBQWdFO0FBRWhFLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUE7QUFHekM7Ozs7OztHQU1HO0FBQ1EsUUFBQSxZQUFZLEdBQUcsVUFBUyxPQUFzRCxFQUFDLFVBQWtCLEdBQUc7SUFDM0csSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBRWxCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLFlBQVksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEUsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLFNBQVMsR0FBRyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFRCxJQUFJLGNBQWMsR0FBb0IsRUFBRSxDQUFBLENBQUMseUNBQXlDO0lBRWxGLEdBQUcsQ0FBQyxDQUFDLElBQUksWUFBWSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ2xDLElBQUksWUFBWSxPQUFPLENBQUMsS0FBSztZQUN6QixjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN6QixjQUFjLENBQUMsSUFBSSxDQUFDLHVCQUFlLENBQUMsSUFBSSxFQUFDLEVBQUMsUUFB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