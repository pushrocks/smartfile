"use strict";
require("typings-global");
const plugins = require("./smartfile.plugins");
const SmartfileInterpreter = require("./smartfile.interpreter");
let Readable = require("stream").Readable;
/**
 * allows you to create a gulp stream
 * from String, from an Array of Strings, from Vinyl File, from an Array of VinylFiles
 * @param fileArg
 * @returns stream.Readable
 * @TODO: make it async;
 */
exports.toGulpStream = function (fileArg, baseArg = "/") {
    let fileArray = [];
    if (typeof fileArg === "string" || fileArg instanceof plugins.vinyl) {
        fileArray.push(fileArg);
    }
    else if (Array.isArray(fileArg)) {
        fileArray = fileArg;
    }
    else {
        throw new Error("fileArg has unknown format");
    }
    let vinylFileArray = []; //we want to have an array of vinylFiles
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
    return fileArg.contents.toString("utf8");
};
/**
 * writes string or vinyl file to disk.
 * @param fileArg
 * @param fileNameArg
 * @param fileBaseArg
 */
exports.toFs = function (fileContentArg, filePathArg) {
    let done = plugins.q.defer();
    //function checks to abort if needed
    if (!fileContentArg || !filePathArg)
        throw new Error("expected valid arguments");
    // prepare actual write action
    let fileString;
    let filePath = filePathArg;
    if (fileContentArg instanceof plugins.vinyl) {
        fileString = exports.toStringSync(fileContentArg);
    }
    else if (typeof fileContentArg === "string") {
        fileString = fileContentArg;
    }
    plugins.fsExtra.writeFile(filePath, fileString, "utf8", done.resolve);
    return done.promise;
};
exports.toFsSync = function (fileArg, filePathArg) {
    //function checks to abort if needed
    if (!fileArg || !filePathArg)
        throw new Error("expected a valid arguments");
    // prepare actual write action
    let fileString;
    let filePath = filePathArg;
    if (fileArg instanceof plugins.vinyl) {
        fileString = exports.toStringSync(fileArg);
    }
    else if (typeof fileArg === "string") {
        fileString = fileArg;
    }
    plugins.fsExtra.writeFileSync(filePath, fileString, "utf8");
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLm1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUF3QjtBQUV4QiwrQ0FBZ0Q7QUFDaEQsZ0VBQWlFO0FBRWpFLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDMUM7Ozs7OztHQU1HO0FBQ1EsUUFBQSxZQUFZLEdBQUcsVUFBUyxPQUFxRCxFQUFDLE9BQU8sR0FBVSxHQUFHO0lBQ3pHLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUVuQixFQUFFLENBQUEsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxZQUFZLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO1FBQ2hFLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsQ0FBQztRQUMvQixTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSSxjQUFjLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLHdDQUF3QztJQUVqRixHQUFHLENBQUMsQ0FBQyxJQUFJLFlBQVksSUFBSSxTQUFTLENBQUMsQ0FBQSxDQUFDO1FBQ2hDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuQyxJQUFJLFlBQVksT0FBTyxDQUFDLEtBQUs7WUFDekIsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDekIsY0FBYyxDQUFDLElBQUksQ0FBQyx1QkFBZSxDQUFDLElBQUksRUFBQyxFQUFD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