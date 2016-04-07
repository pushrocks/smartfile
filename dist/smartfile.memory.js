/// <reference path="./typings/main.d.ts" />
"use strict";
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
 *
 * @param fileStringArg
 * @param fileTypeArg
 * @returns {any|any}
 */
exports.toObject = function (fileStringArg, fileTypeArg) {
    return SmartfileInterpreter(fileStringArg, fileTypeArg);
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
exports.toFs = function (fileArg, optionsArg) {
    var done = plugins.q.defer();
    //function checks to abort if needed
    if (!fileArg || !optionsArg || !(typeof optionsArg.fileName === "string"))
        throw new Error("expected a valid arguments");
    if (!(typeof optionsArg.filePath === "string"))
        optionsArg.filePath = "/";
    var filePath = plugins.path.join(optionsArg.filePath, optionsArg.fileName);
    var fileString;
    if (fileArg instanceof plugins.vinyl) {
        fileString = exports.toStringSync(fileArg);
    }
    else if (typeof fileArg === "string") {
        fileString = fileArg;
    }
    plugins.fs.writeFile(filePath, fileString, "utf8", done.resolve);
    return done.promise;
};
exports.toFsSync = function (fileArg, optionsArg) {
    //function checks to abort if needed
    if (!fileArg || !optionsArg || !(typeof optionsArg.fileName === "string"))
        throw new Error("expected a valid arguments");
    if (!(typeof optionsArg.filePath === "string"))
        optionsArg.filePath = "/";
    var filePath = plugins.path.join(optionsArg.filePath, optionsArg.fileName);
    var fileString;
    if (fileArg instanceof plugins.vinyl) {
        fileString = exports.toStringSync(fileArg);
    }
    else if (typeof fileArg === "string") {
        fileString = fileArg;
    }
    plugins.fs.writeFileSync(filePath, fileString, "utf8");
};

//# sourceMappingURL=data:application/json;base64,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QyxDQUFDLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQztRQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBRTFFLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLElBQUksVUFBaUIsQ0FBQztJQUV0QixFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUM7UUFDbEMsVUFBVSxHQUFHLG9CQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLFVBQVUsR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUNELE9BQU8sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsTUFBTSxDQUFDLENBQUM7QUFDekQsQ0FBQyxDQUFDIiwiZmlsZSI6InNtYXJ0ZmlsZS5tZW1vcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL21haW4uZC50c1wiIC8+XG5cbmltcG9ydCBwbHVnaW5zID0gcmVxdWlyZShcIi4vc21hcnRmaWxlLnBsdWdpbnNcIik7XG5pbXBvcnQgU21hcnRmaWxlSW50ZXJwcmV0ZXIgPSByZXF1aXJlKFwiLi9zbWFydGZpbGUuaW50ZXJwcmV0ZXJcIik7XG5sZXQgUmVhZGFibGUgPSByZXF1aXJlKFwic3RyZWFtXCIpLlJlYWRhYmxlO1xuLyoqXG4gKiBhbGxvd3MgeW91IHRvIGNyZWF0ZSBhIGd1bHAgc3RyZWFtXG4gKiBmcm9tIFN0cmluZywgZnJvbSBhbiBBcnJheSBvZiBTdHJpbmdzLCBmcm9tIFZpbnlsIEZpbGUsIGZyb20gYW4gQXJyYXkgb2YgVmlueWxGaWxlc1xuICogQHBhcmFtIGZpbGVBcmdcbiAqIEByZXR1cm5zIHN0cmVhbS5SZWFkYWJsZVxuICogQFRPRE86IG1ha2UgaXQgYXN5bmM7XG4gKi9cbmV4cG9ydCBsZXQgdG9HdWxwU3RyZWFtID0gZnVuY3Rpb24oZmlsZUFyZzpzdHJpbmd8c3RyaW5nW118cGx1Z2lucy52aW55bHxwbHVnaW5zLnZpbnlsW10sYmFzZUFyZzpzdHJpbmcgPSBcIi9cIil7XG4gICAgbGV0IGZpbGVBcnJheSA9IFtdO1xuXG4gICAgaWYodHlwZW9mIGZpbGVBcmcgPT09IFwic3RyaW5nXCIgfHwgZmlsZUFyZyBpbnN0YW5jZW9mIHBsdWdpbnMudmlueWwpeyAvLyBtYWtlIHN1cmUgd2Ugd29yayB3aXRoIGFuIGFycmF5IGxhdGVyIG9uXG4gICAgICAgIGZpbGVBcnJheS5wdXNoKGZpbGVBcmcpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShmaWxlQXJnKSl7XG4gICAgICAgIGZpbGVBcnJheSA9IGZpbGVBcmc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZmlsZUFyZyBoYXMgdW5rbm93biBmb3JtYXRcIik7XG4gICAgfVxuXG4gICAgbGV0IHZpbnlsRmlsZUFycmF5OnBsdWdpbnMudmlueWxbXSA9IFtdOyAvL3dlIHdhbnQgdG8gaGF2ZSBhbiBhcnJheSBvZiB2aW55bEZpbGVzXG5cbiAgICBmb3IgKGxldCBmaWxlSW5kZXhBcmcgaW4gZmlsZUFycmF5KXsgLy9jb252ZXJ0IGZpbGVBcnJheSBpbiB2aW55bEFycmF5XG4gICAgICAgIGxldCBmaWxlID0gZmlsZUFycmF5W2ZpbGVJbmRleEFyZ107XG4gICAgICAgIGZpbGUgaW5zdGFuY2VvZiBwbHVnaW5zLnZpbnlsID9cbiAgICAgICAgICAgIHZpbnlsRmlsZUFycmF5LnB1c2goZmlsZSkgOlxuICAgICAgICAgICAgdmlueWxGaWxlQXJyYXkucHVzaCh0b1ZpbnlsRmlsZVN5bmMoZmlsZSx7ZmlsZW5hbWU6ZmlsZUluZGV4QXJnLGJhc2U6YmFzZUFyZ30pKTtcbiAgICB9O1xuXG4gICAgbGV0IHN0cmVhbSA9IG5ldyBSZWFkYWJsZSh7IG9iamVjdE1vZGU6IHRydWUgfSk7XG4gICAgZm9yKGxldCB2aW55bEZpbGVJbmRleEFyZyBpbiB2aW55bEZpbGVBcnJheSl7XG4gICAgICAgIGxldCB2aW55bEZpbGUgPSB2aW55bEZpbGVBcnJheVt2aW55bEZpbGVJbmRleEFyZ107XG4gICAgICAgIHN0cmVhbS5wdXNoKHZpbnlsRmlsZSk7XG4gICAgfTtcbiAgICBzdHJlYW0ucHVzaChudWxsKTsgLy9zaWduYWwgZW5kIG9mIHN0cmVhbTtcbiAgICByZXR1cm4gc3RyZWFtO1xufTtcblxuLyoqXG4gKiBcbiAqIEBwYXJhbSBmaWxlU3RyaW5nQXJnXG4gKiBAcGFyYW0gZmlsZVR5cGVBcmdcbiAqIEByZXR1cm5zIHthbnl8YW55fVxuICovXG5leHBvcnQgbGV0IHRvT2JqZWN0ID0gZnVuY3Rpb24oZmlsZVN0cmluZ0FyZzpzdHJpbmcsZmlsZVR5cGVBcmc6c3RyaW5nKXtcbiAgICByZXR1cm4gU21hcnRmaWxlSW50ZXJwcmV0ZXIoZmlsZVN0cmluZ0FyZyxmaWxlVHlwZUFyZyk7XG59O1xuXG4vKipcbiAqIHRha2VzIGEgc3RyaW5nIGFuZCBjb252ZXJ0cyBpdCB0byB2aW55bCBmaWxlXG4gKiBAcGFyYW0gZmlsZUFyZ1xuICogQHBhcmFtIG9wdGlvbnNBcmdcbiAqL1xuZXhwb3J0IGxldCB0b1ZpbnlsRmlsZVN5bmMgPSBmdW5jdGlvbihmaWxlQXJnOnN0cmluZyxvcHRpb25zQXJnPzp7ZmlsZW5hbWU/OnN0cmluZyxiYXNlPzpzdHJpbmcscmVsUGF0aD86c3RyaW5nfSl7XG4gICAgb3B0aW9uc0FyZz8gdm9pZCgwKSA6IG9wdGlvbnNBcmcgPSB7ZmlsZW5hbWU6IFwidmlueWxmaWxlXCIsIGJhc2U6IFwiL1wifTtcbiAgICBvcHRpb25zQXJnLmZpbGVuYW1lID8gdm9pZCgwKSA6IG9wdGlvbnNBcmcuZmlsZW5hbWUgPSBcInZpbnlsZmlsZVwiO1xuICAgIG9wdGlvbnNBcmcuYmFzZSA/IHZvaWQoMCkgOiBvcHRpb25zQXJnLmJhc2UgPSBcIi9cIjtcbiAgICBvcHRpb25zQXJnLnJlbFBhdGggPyB2b2lkKFwiMFwiKSA6IG9wdGlvbnNBcmcucmVsUGF0aCA9IFwiXCI7XG4gICAgbGV0IHZpbnlsRmlsZSA9IG5ldyBwbHVnaW5zLnZpbnlsKHtcbiAgICAgICAgYmFzZTogb3B0aW9uc0FyZy5iYXNlLFxuICAgICAgICBwYXRoOiBwbHVnaW5zLnBhdGguam9pbihvcHRpb25zQXJnLmJhc2Usb3B0aW9uc0FyZy5yZWxQYXRoLG9wdGlvbnNBcmcuZmlsZW5hbWUpLFxuICAgICAgICBjb250ZW50czogbmV3IEJ1ZmZlcihmaWxlQXJnKVxuICAgIH0pO1xuICAgIHJldHVybiB2aW55bEZpbGU7XG59O1xuXG4vKipcbiAqIHRha2VzIGEgc3RyaW5nIGFycmF5IGFuZCBzb21lIG9wdGlvbnMgYW5kIHJldHVybnMgYSB2aW55bGZpbGUgYXJyYXlcbiAqIEBwYXJhbSBhcnJheUFyZ1xuICogQHBhcmFtIG9wdGlvbnNBcmdcbiAqL1xuZXhwb3J0IGxldCB0b1ZpbnlsQXJyYXlTeW5jID0gZnVuY3Rpb24oYXJyYXlBcmc6c3RyaW5nW10sb3B0aW9uc0FyZz86e2ZpbGVuYW1lPzpzdHJpbmcsYmFzZT86c3RyaW5nLHJlbFBhdGg/OnN0cmluZ30pe1xuICAgIGxldCB2aW55bEFycmF5ID0gW107XG4gICAgZm9yKGxldCBzdHJpbmdJbmRleEFyZyBpbiBhcnJheUFyZyl7XG4gICAgICAgIGxldCBteVN0cmluZyA9IGFycmF5QXJnW3N0cmluZ0luZGV4QXJnXTtcbiAgICAgICAgdmlueWxBcnJheS5wdXNoKHRvVmlueWxGaWxlU3luYyhteVN0cmluZyxvcHRpb25zQXJnKSk7XG4gICAgfVxuICAgIHJldHVybiB2aW55bEFycmF5O1xufTtcblxuXG4vKipcbiAqIHRha2VzIGEgdmlueWxGaWxlIG9iamVjdCBhbmQgY29udmVydHMgaXQgdG8gU3RyaW5nXG4gKi9cbmV4cG9ydCBsZXQgdG9TdHJpbmdTeW5jID0gZnVuY3Rpb24oZmlsZUFyZzpwbHVnaW5zLnZpbnlsKXtcbiAgICByZXR1cm4gZmlsZUFyZy5jb250ZW50cy50b1N0cmluZyhcInV0ZjhcIik7XG59O1xuXG5cbi8qKlxuICogd3JpdGVzIHN0cmluZyBvciB2aW55bCBmaWxlIHRvIGRpc2suXG4gKiBAcGFyYW0gZmlsZUFyZ1xuICogQHBhcmFtIGZpbGVOYW1lQXJnXG4gKiBAcGFyYW0gZmlsZUJhc2VBcmdcbiAqL1xuZXhwb3J0IGxldCB0b0ZzID0gZnVuY3Rpb24oZmlsZUFyZyxvcHRpb25zQXJnOntmaWxlTmFtZTpzdHJpbmcsZmlsZVBhdGg6c3RyaW5nfSl7XG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcblxuICAgIC8vZnVuY3Rpb24gY2hlY2tzIHRvIGFib3J0IGlmIG5lZWRlZFxuICAgIGlmICghZmlsZUFyZyB8fCAhb3B0aW9uc0FyZyB8fCAhKHR5cGVvZiBvcHRpb25zQXJnLmZpbGVOYW1lID09PSBcInN0cmluZ1wiKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXhwZWN0ZWQgYSB2YWxpZCBhcmd1bWVudHNcIik7XG4gICAgaWYgKCEodHlwZW9mIG9wdGlvbnNBcmcuZmlsZVBhdGggPT09IFwic3RyaW5nXCIpKSBvcHRpb25zQXJnLmZpbGVQYXRoID0gXCIvXCI7XG5cbiAgICBsZXQgZmlsZVBhdGg6c3RyaW5nID0gcGx1Z2lucy5wYXRoLmpvaW4ob3B0aW9uc0FyZy5maWxlUGF0aCxvcHRpb25zQXJnLmZpbGVOYW1lKTtcbiAgICBsZXQgZmlsZVN0cmluZzpzdHJpbmc7XG4gICAgaWYgKGZpbGVBcmcgaW5zdGFuY2VvZiBwbHVnaW5zLnZpbnlsKXtcbiAgICAgICAgZmlsZVN0cmluZyA9IHRvU3RyaW5nU3luYyhmaWxlQXJnKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaWxlQXJnID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGZpbGVTdHJpbmcgPSBmaWxlQXJnO1xuICAgIH1cbiAgICBwbHVnaW5zLmZzLndyaXRlRmlsZShmaWxlUGF0aCxmaWxlU3RyaW5nLFwidXRmOFwiLGRvbmUucmVzb2x2ZSk7XG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcbn07XG5cbmV4cG9ydCBsZXQgdG9Gc1N5bmMgPSBmdW5jdGlvbihmaWxlQXJnLG9wdGlvbnNBcmc6e2ZpbGVOYW1lOnN0cmluZyxmaWxlUGF0aDpzdHJpbmd9KXtcbiAgICAvL2Z1bmN0aW9uIGNoZWNrcyB0byBhYm9ydCBpZiBuZWVkZWRcbiAgICBpZiAoIWZpbGVBcmcgfHwgIW9wdGlvbnNBcmcgfHwgISh0eXBlb2Ygb3B0aW9uc0FyZy5maWxlTmFtZSA9PT0gXCJzdHJpbmdcIikpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImV4cGVjdGVkIGEgdmFsaWQgYXJndW1lbnRzXCIpO1xuICAgIGlmICghKHR5cGVvZiBvcHRpb25zQXJnLmZpbGVQYXRoID09PSBcInN0cmluZ1wiKSkgb3B0aW9uc0FyZy5maWxlUGF0aCA9IFwiL1wiO1xuXG4gICAgbGV0IGZpbGVQYXRoID0gcGx1Z2lucy5wYXRoLmpvaW4ob3B0aW9uc0FyZy5maWxlUGF0aCxvcHRpb25zQXJnLmZpbGVOYW1lKTtcbiAgICBsZXQgZmlsZVN0cmluZzpzdHJpbmc7XG5cbiAgICBpZiAoZmlsZUFyZyBpbnN0YW5jZW9mIHBsdWdpbnMudmlueWwpe1xuICAgICAgICBmaWxlU3RyaW5nID0gdG9TdHJpbmdTeW5jKGZpbGVBcmcpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpbGVBcmcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZmlsZVN0cmluZyA9IGZpbGVBcmc7XG4gICAgfVxuICAgIHBsdWdpbnMuZnMud3JpdGVGaWxlU3luYyhmaWxlUGF0aCxmaWxlU3RyaW5nLFwidXRmOFwiKTtcbn07XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
