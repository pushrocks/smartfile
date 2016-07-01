"use strict";
require("typings-global");
var plugins = require("./smartfile.plugins");
var SmartfileInterpreter = require("./smartfile.interpreter");
var Readable = require("stream").Readable;
/**
 * allows you to create a gulp stream
 * from String, from an Array of Strings, from Vinyl File, from an Array of VinylFiles
 * @param fileArg
 * @returns stream.Readable
 * @TODO: make it async;
 */
exports.toGulpStream = function (fileArg, baseArg) {
    if (baseArg === void 0) { baseArg = "/"; }
    var fileArray = [];
    if (typeof fileArg === "string" || fileArg instanceof plugins.vinyl) {
        fileArray.push(fileArg);
    }
    else if (Array.isArray(fileArg)) {
        fileArray = fileArg;
    }
    else {
        throw new Error("fileArg has unknown format");
    }
    var vinylFileArray = []; //we want to have an array of vinylFiles
    for (var fileIndexArg in fileArray) {
        var file = fileArray[fileIndexArg];
        file instanceof plugins.vinyl ?
            vinylFileArray.push(file) :
            vinylFileArray.push(exports.toVinylFileSync(file, { filename: fileIndexArg, base: baseArg }));
    }
    ;
    var stream = new Readable({ objectMode: true });
    for (var vinylFileIndexArg in vinylFileArray) {
        var vinylFile = vinylFileArray[vinylFileIndexArg];
        stream.push(vinylFile);
    }
    ;
    stream.push(null); //signal end of stream;
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
    optionsArg ? void (0) : optionsArg = { filename: "vinylfile", base: "/" };
    optionsArg.filename ? void (0) : optionsArg.filename = "vinylfile";
    optionsArg.base ? void (0) : optionsArg.base = "/";
    optionsArg.relPath ? void ("0") : optionsArg.relPath = "";
    var vinylFile = new plugins.vinyl({
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
    var vinylArray = [];
    for (var stringIndexArg in arrayArg) {
        var myString = arrayArg[stringIndexArg];
        vinylArray.push(exports.toVinylFileSync(myString, optionsArg));
    }
    return vinylArray;
};
/**
 * takes a vinylFile object and converts it to String
 */
exports.toStringSync = function (fileArg) {
    return fileArg.contents.toString("utf8");
};
/**
 * writes string or vinyl file to disk.
 * @param fileArg
 * @param fileNameArg
 * @param fileBaseArg
 */
exports.toFs = function (fileContentArg, filePathArg) {
    var done = plugins.Q.defer();
    //function checks to abort if needed
    if (!fileContentArg || !filePathArg)
        throw new Error("expected valid arguments");
    // prepare actual write action
    var fileString;
    var filePath = filePathArg;
    if (fileContentArg instanceof plugins.vinyl) {
        fileString = exports.toStringSync(fileContentArg);
    }
    else if (typeof fileContentArg === "string") {
        fileString = fileContentArg;
    }
    plugins.fs.writeFile(filePath, fileString, "utf8", done.resolve);
    return done.promise;
};
exports.toFsSync = function (fileArg, filePathArg) {
    //function checks to abort if needed
    if (!fileArg || !filePathArg)
        throw new Error("expected a valid arguments");
    // prepare actual write action
    var fileString;
    var filePath = filePathArg;
    if (fileArg instanceof plugins.vinyl) {
        fileString = exports.toStringSync(fileArg);
    }
    else if (typeof fileArg === "string") {
        fileString = fileArg;
    }
    plugins.fs.writeFileSync(filePath, fileString, "utf8");
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLm1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUV4QixJQUFPLE9BQU8sV0FBVyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ2hELElBQU8sb0JBQW9CLFdBQVcseUJBQXlCLENBQUMsQ0FBQztBQUVqRSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQzFDOzs7Ozs7R0FNRztBQUNRLG9CQUFZLEdBQUcsVUFBUyxPQUFxRCxFQUFDLE9BQW9CO0lBQXBCLHVCQUFvQixHQUFwQixhQUFvQjtJQUN6RyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFbkIsRUFBRSxDQUFBLENBQUMsT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sWUFBWSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQztRQUNoRSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDL0IsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUksY0FBYyxHQUFtQixFQUFFLENBQUMsQ0FBQyx3Q0FBd0M7SUFFakYsR0FBRyxDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkMsSUFBSSxZQUFZLE9BQU8sQ0FBQyxLQUFLO1lBQ3pCLGNB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