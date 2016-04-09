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
 * converts file to Object
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

//# sourceMappingURL=data:application/json;base64,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QyxDQUFDLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQztRQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBRTFFLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLElBQUksVUFBaUIsQ0FBQztJQUV0QixFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUM7UUFDbEMsVUFBVSxHQUFHLG9CQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLFVBQVUsR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUNELE9BQU8sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsTUFBTSxDQUFDLENBQUM7QUFDekQsQ0FBQyxDQUFDIiwiZmlsZSI6InNtYXJ0ZmlsZS5tZW1vcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL21haW4uZC50c1wiIC8+XG5cbmltcG9ydCBwbHVnaW5zID0gcmVxdWlyZShcIi4vc21hcnRmaWxlLnBsdWdpbnNcIik7XG5pbXBvcnQgU21hcnRmaWxlSW50ZXJwcmV0ZXIgPSByZXF1aXJlKFwiLi9zbWFydGZpbGUuaW50ZXJwcmV0ZXJcIik7XG5sZXQgUmVhZGFibGUgPSByZXF1aXJlKFwic3RyZWFtXCIpLlJlYWRhYmxlO1xuLyoqXG4gKiBhbGxvd3MgeW91IHRvIGNyZWF0ZSBhIGd1bHAgc3RyZWFtXG4gKiBmcm9tIFN0cmluZywgZnJvbSBhbiBBcnJheSBvZiBTdHJpbmdzLCBmcm9tIFZpbnlsIEZpbGUsIGZyb20gYW4gQXJyYXkgb2YgVmlueWxGaWxlc1xuICogQHBhcmFtIGZpbGVBcmdcbiAqIEByZXR1cm5zIHN0cmVhbS5SZWFkYWJsZVxuICogQFRPRE86IG1ha2UgaXQgYXN5bmM7XG4gKi9cbmV4cG9ydCBsZXQgdG9HdWxwU3RyZWFtID0gZnVuY3Rpb24oZmlsZUFyZzpzdHJpbmd8c3RyaW5nW118cGx1Z2lucy52aW55bHxwbHVnaW5zLnZpbnlsW10sYmFzZUFyZzpzdHJpbmcgPSBcIi9cIil7XG4gICAgbGV0IGZpbGVBcnJheSA9IFtdO1xuXG4gICAgaWYodHlwZW9mIGZpbGVBcmcgPT09IFwic3RyaW5nXCIgfHwgZmlsZUFyZyBpbnN0YW5jZW9mIHBsdWdpbnMudmlueWwpeyAvLyBtYWtlIHN1cmUgd2Ugd29yayB3aXRoIGFuIGFycmF5IGxhdGVyIG9uXG4gICAgICAgIGZpbGVBcnJheS5wdXNoKGZpbGVBcmcpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShmaWxlQXJnKSl7XG4gICAgICAgIGZpbGVBcnJheSA9IGZpbGVBcmc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZmlsZUFyZyBoYXMgdW5rbm93biBmb3JtYXRcIik7XG4gICAgfVxuXG4gICAgbGV0IHZpbnlsRmlsZUFycmF5OnBsdWdpbnMudmlueWxbXSA9IFtdOyAvL3dlIHdhbnQgdG8gaGF2ZSBhbiBhcnJheSBvZiB2aW55bEZpbGVzXG5cbiAgICBmb3IgKGxldCBmaWxlSW5kZXhBcmcgaW4gZmlsZUFycmF5KXsgLy9jb252ZXJ0IGZpbGVBcnJheSBpbiB2aW55bEFycmF5XG4gICAgICAgIGxldCBmaWxlID0gZmlsZUFycmF5W2ZpbGVJbmRleEFyZ107XG4gICAgICAgIGZpbGUgaW5zdGFuY2VvZiBwbHVnaW5zLnZpbnlsID9cbiAgICAgICAgICAgIHZpbnlsRmlsZUFycmF5LnB1c2goZmlsZSkgOlxuICAgICAgICAgICAgdmlueWxGaWxlQXJyYXkucHVzaCh0b1ZpbnlsRmlsZVN5bmMoZmlsZSx7ZmlsZW5hbWU6ZmlsZUluZGV4QXJnLGJhc2U6YmFzZUFyZ30pKTtcbiAgICB9O1xuXG4gICAgbGV0IHN0cmVhbSA9IG5ldyBSZWFkYWJsZSh7IG9iamVjdE1vZGU6IHRydWUgfSk7XG4gICAgZm9yKGxldCB2aW55bEZpbGVJbmRleEFyZyBpbiB2aW55bEZpbGVBcnJheSl7XG4gICAgICAgIGxldCB2aW55bEZpbGUgPSB2aW55bEZpbGVBcnJheVt2aW55bEZpbGVJbmRleEFyZ107XG4gICAgICAgIHN0cmVhbS5wdXNoKHZpbnlsRmlsZSk7XG4gICAgfTtcbiAgICBzdHJlYW0ucHVzaChudWxsKTsgLy9zaWduYWwgZW5kIG9mIHN0cmVhbTtcbiAgICByZXR1cm4gc3RyZWFtO1xufTtcblxuLyoqXG4gKiBjb252ZXJ0cyBmaWxlIHRvIE9iamVjdFxuICogQHBhcmFtIGZpbGVTdHJpbmdBcmdcbiAqIEBwYXJhbSBmaWxlVHlwZUFyZ1xuICogQHJldHVybnMge2FueXxhbnl9XG4gKi9cbmV4cG9ydCBsZXQgdG9PYmplY3QgPSBmdW5jdGlvbihmaWxlU3RyaW5nQXJnOnN0cmluZyxmaWxlVHlwZUFyZzpzdHJpbmcpe1xuICAgIHJldHVybiBTbWFydGZpbGVJbnRlcnByZXRlcihmaWxlU3RyaW5nQXJnLGZpbGVUeXBlQXJnKTtcbn07XG5cbi8qKlxuICogdGFrZXMgYSBzdHJpbmcgYW5kIGNvbnZlcnRzIGl0IHRvIHZpbnlsIGZpbGVcbiAqIEBwYXJhbSBmaWxlQXJnXG4gKiBAcGFyYW0gb3B0aW9uc0FyZ1xuICovXG5leHBvcnQgbGV0IHRvVmlueWxGaWxlU3luYyA9IGZ1bmN0aW9uKGZpbGVBcmc6c3RyaW5nLG9wdGlvbnNBcmc/OntmaWxlbmFtZT86c3RyaW5nLGJhc2U/OnN0cmluZyxyZWxQYXRoPzpzdHJpbmd9KXtcbiAgICBvcHRpb25zQXJnPyB2b2lkKDApIDogb3B0aW9uc0FyZyA9IHtmaWxlbmFtZTogXCJ2aW55bGZpbGVcIiwgYmFzZTogXCIvXCJ9O1xuICAgIG9wdGlvbnNBcmcuZmlsZW5hbWUgPyB2b2lkKDApIDogb3B0aW9uc0FyZy5maWxlbmFtZSA9IFwidmlueWxmaWxlXCI7XG4gICAgb3B0aW9uc0FyZy5iYXNlID8gdm9pZCgwKSA6IG9wdGlvbnNBcmcuYmFzZSA9IFwiL1wiO1xuICAgIG9wdGlvbnNBcmcucmVsUGF0aCA/IHZvaWQoXCIwXCIpIDogb3B0aW9uc0FyZy5yZWxQYXRoID0gXCJcIjtcbiAgICBsZXQgdmlueWxGaWxlID0gbmV3IHBsdWdpbnMudmlueWwoe1xuICAgICAgICBiYXNlOiBvcHRpb25zQXJnLmJhc2UsXG4gICAgICAgIHBhdGg6IHBsdWdpbnMucGF0aC5qb2luKG9wdGlvbnNBcmcuYmFzZSxvcHRpb25zQXJnLnJlbFBhdGgsb3B0aW9uc0FyZy5maWxlbmFtZSksXG4gICAgICAgIGNvbnRlbnRzOiBuZXcgQnVmZmVyKGZpbGVBcmcpXG4gICAgfSk7XG4gICAgcmV0dXJuIHZpbnlsRmlsZTtcbn07XG5cbi8qKlxuICogdGFrZXMgYSBzdHJpbmcgYXJyYXkgYW5kIHNvbWUgb3B0aW9ucyBhbmQgcmV0dXJucyBhIHZpbnlsZmlsZSBhcnJheVxuICogQHBhcmFtIGFycmF5QXJnXG4gKiBAcGFyYW0gb3B0aW9uc0FyZ1xuICovXG5leHBvcnQgbGV0IHRvVmlueWxBcnJheVN5bmMgPSBmdW5jdGlvbihhcnJheUFyZzpzdHJpbmdbXSxvcHRpb25zQXJnPzp7ZmlsZW5hbWU/OnN0cmluZyxiYXNlPzpzdHJpbmcscmVsUGF0aD86c3RyaW5nfSl7XG4gICAgbGV0IHZpbnlsQXJyYXkgPSBbXTtcbiAgICBmb3IobGV0IHN0cmluZ0luZGV4QXJnIGluIGFycmF5QXJnKXtcbiAgICAgICAgbGV0IG15U3RyaW5nID0gYXJyYXlBcmdbc3RyaW5nSW5kZXhBcmddO1xuICAgICAgICB2aW55bEFycmF5LnB1c2godG9WaW55bEZpbGVTeW5jKG15U3RyaW5nLG9wdGlvbnNBcmcpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZpbnlsQXJyYXk7XG59O1xuXG5cbi8qKlxuICogdGFrZXMgYSB2aW55bEZpbGUgb2JqZWN0IGFuZCBjb252ZXJ0cyBpdCB0byBTdHJpbmdcbiAqL1xuZXhwb3J0IGxldCB0b1N0cmluZ1N5bmMgPSBmdW5jdGlvbihmaWxlQXJnOnBsdWdpbnMudmlueWwpe1xuICAgIHJldHVybiBmaWxlQXJnLmNvbnRlbnRzLnRvU3RyaW5nKFwidXRmOFwiKTtcbn07XG5cblxuLyoqXG4gKiB3cml0ZXMgc3RyaW5nIG9yIHZpbnlsIGZpbGUgdG8gZGlzay5cbiAqIEBwYXJhbSBmaWxlQXJnXG4gKiBAcGFyYW0gZmlsZU5hbWVBcmdcbiAqIEBwYXJhbSBmaWxlQmFzZUFyZ1xuICovXG5leHBvcnQgbGV0IHRvRnMgPSBmdW5jdGlvbihmaWxlQXJnLG9wdGlvbnNBcmc6e2ZpbGVOYW1lOnN0cmluZyxmaWxlUGF0aDpzdHJpbmd9KXtcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xuXG4gICAgLy9mdW5jdGlvbiBjaGVja3MgdG8gYWJvcnQgaWYgbmVlZGVkXG4gICAgaWYgKCFmaWxlQXJnIHx8ICFvcHRpb25zQXJnIHx8ICEodHlwZW9mIG9wdGlvbnNBcmcuZmlsZU5hbWUgPT09IFwic3RyaW5nXCIpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJleHBlY3RlZCBhIHZhbGlkIGFyZ3VtZW50c1wiKTtcbiAgICBpZiAoISh0eXBlb2Ygb3B0aW9uc0FyZy5maWxlUGF0aCA9PT0gXCJzdHJpbmdcIikpIG9wdGlvbnNBcmcuZmlsZVBhdGggPSBcIi9cIjtcblxuICAgIGxldCBmaWxlUGF0aDpzdHJpbmcgPSBwbHVnaW5zLnBhdGguam9pbihvcHRpb25zQXJnLmZpbGVQYXRoLG9wdGlvbnNBcmcuZmlsZU5hbWUpO1xuICAgIGxldCBmaWxlU3RyaW5nOnN0cmluZztcbiAgICBpZiAoZmlsZUFyZyBpbnN0YW5jZW9mIHBsdWdpbnMudmlueWwpe1xuICAgICAgICBmaWxlU3RyaW5nID0gdG9TdHJpbmdTeW5jKGZpbGVBcmcpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpbGVBcmcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZmlsZVN0cmluZyA9IGZpbGVBcmc7XG4gICAgfVxuICAgIHBsdWdpbnMuZnMud3JpdGVGaWxlKGZpbGVQYXRoLGZpbGVTdHJpbmcsXCJ1dGY4XCIsZG9uZS5yZXNvbHZlKTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufTtcblxuZXhwb3J0IGxldCB0b0ZzU3luYyA9IGZ1bmN0aW9uKGZpbGVBcmcsb3B0aW9uc0FyZzp7ZmlsZU5hbWU6c3RyaW5nLGZpbGVQYXRoOnN0cmluZ30pe1xuICAgIC8vZnVuY3Rpb24gY2hlY2tzIHRvIGFib3J0IGlmIG5lZWRlZFxuICAgIGlmICghZmlsZUFyZyB8fCAhb3B0aW9uc0FyZyB8fCAhKHR5cGVvZiBvcHRpb25zQXJnLmZpbGVOYW1lID09PSBcInN0cmluZ1wiKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXhwZWN0ZWQgYSB2YWxpZCBhcmd1bWVudHNcIik7XG4gICAgaWYgKCEodHlwZW9mIG9wdGlvbnNBcmcuZmlsZVBhdGggPT09IFwic3RyaW5nXCIpKSBvcHRpb25zQXJnLmZpbGVQYXRoID0gXCIvXCI7XG5cbiAgICBsZXQgZmlsZVBhdGggPSBwbHVnaW5zLnBhdGguam9pbihvcHRpb25zQXJnLmZpbGVQYXRoLG9wdGlvbnNBcmcuZmlsZU5hbWUpO1xuICAgIGxldCBmaWxlU3RyaW5nOnN0cmluZztcblxuICAgIGlmIChmaWxlQXJnIGluc3RhbmNlb2YgcGx1Z2lucy52aW55bCl7XG4gICAgICAgIGZpbGVTdHJpbmcgPSB0b1N0cmluZ1N5bmMoZmlsZUFyZyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlsZUFyZyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBmaWxlU3RyaW5nID0gZmlsZUFyZztcbiAgICB9XG4gICAgcGx1Z2lucy5mcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLGZpbGVTdHJpbmcsXCJ1dGY4XCIpO1xufTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9