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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLm1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUV4QixNQUFPLE9BQU8sV0FBVyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ2hELE1BQU8sb0JBQW9CLFdBQVcseUJBQXlCLENBQUMsQ0FBQztBQUVqRSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQzFDOzs7Ozs7R0FNRztBQUNRLG9CQUFZLEdBQUcsVUFBUyxPQUFxRCxFQUFDLE9BQU8sR0FBVSxHQUFHO0lBQ3pHLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUVuQixFQUFFLENBQUEsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxZQUFZLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO1FBQ2hFLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsQ0FBQztRQUMvQixTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSSxjQUFjLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLHdDQUF3QztJQUVqRixHQUFHLENBQUMsQ0FBQyxJQUFJLFlBQVksSUFBSSxTQUFTLENBQUMsQ0FBQSxDQUFDO1FBQ2hDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuQyxJQUFJLFlBQVksT0FBTyxDQUFDLEtBQUs7WUFDekIsY0FBYyxDQUFDLElBQUksQ0FB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