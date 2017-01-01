"use strict";
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
    if (typeof fileArg === 'string' || fileArg instanceof vinyl) {
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
    if (fileContentArg instanceof vinyl) {
        fileString = exports.vinylToStringSync(fileContentArg);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLm1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUF1QjtBQUV2QiwrQ0FBK0M7QUFDL0MsZ0VBQWdFO0FBQ2hFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQVE1QixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFBO0FBRXpDOzs7Ozs7R0FNRztBQUNRLFFBQUEsWUFBWSxHQUFHLFVBQVMsT0FBc0MsRUFBQyxVQUFrQixHQUFHO0lBQzNGLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUVsQixFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUQsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLFNBQVMsR0FBRyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFRCxJQUFJLGNBQWMsR0FBWSxFQUFFLENBQUEsQ0FBQyx5Q0FBeUM7SUFFMUUsR0FBRyxDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDbEMsSUFBSSxZQUFZLEtBQUs7WUFDakIsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDekIsY0FBYyxDQUFDLElBQUksQ0FBQyx1QkFB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