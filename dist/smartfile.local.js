/// <reference path="./typings/main.d.ts" />
"use strict";
var plugins = require("./smartfile.plugins");
exports.toFS = function (options, cb) {
    if (cb === void 0) { cb = undefined; }
};
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
 * @param filePath
 * @param fileTypeArg
 * @returns {any}
 */
exports.toObjectSync = function (filePath, fileTypeArg) {
    if (fileTypeArg === void 0) { fileTypeArg = undefined; }
    var fileType;
    if (typeof fileTypeArg == "undefined") {
        fileType = plugins.path.extname(filePath);
    }
    else {
        fileType = fileTypeArg;
    }
    fileType = fileType.replace(/\.([a-z]*)/, "$1"); //remove . form fileType
    switch (fileType) {
        case "yml":
        case "yaml":
            try {
                return plugins.yaml.safeLoad(plugins.fs.readFileSync(filePath, 'utf8'));
            }
            catch (e) {
                plugins.beautylog.error("check that " + filePath.blue + " points to a valid file");
            }
            break;
        case "json":
            return plugins.fs.readJsonSync(filePath, {});
        default:
            plugins.beautylog.error("file type " + fileType.blue + " not supported");
            break;
    }
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

//# sourceMappingURL=data:application/json;base64,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QyxDQUFDIiwiZmlsZSI6InNtYXJ0ZmlsZS5sb2NhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cblxuaW1wb3J0IHBsdWdpbnMgPSByZXF1aXJlKFwiLi9zbWFydGZpbGUucGx1Z2luc1wiKTtcblxuZXhwb3J0IGxldCB0b0ZTID0gZnVuY3Rpb24ob3B0aW9uczp7ZnJvbTpzdHJpbmcsdG9QYXRoOnN0cmluZ30sIGNiPXVuZGVmaW5lZCl7XG4gICAgXG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gZmlsZVBhdGhBcmdcbiAqIEByZXR1cm5zIHsqfVxuICovXG5leHBvcnQgbGV0IHRvR3VscFN0cmVhbVN5bmMgPSBmdW5jdGlvbihmaWxlUGF0aEFyZzpzdHJpbmcpe1xuICAgIGxldCBzdHJlYW0gPSBwbHVnaW5zLmd1bHAuc3JjKGZpbGVQYXRoQXJnKTtcbiAgICByZXR1cm4gc3RyZWFtO1xufTtcblxuZXhwb3J0IGxldCB0b0d1bHBEZXN0U3luYyA9IGZ1bmN0aW9uKGZvbGRlclBhdGhBcmc6c3RyaW5nKXtcbiAgICByZXR1cm4gcGx1Z2lucy5ndWxwLmRlc3QoZm9sZGVyUGF0aEFyZyk7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gZmlsZVBhdGhcbiAqIEBwYXJhbSBmaWxlVHlwZUFyZ1xuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGxldCB0b09iamVjdFN5bmMgPSBmdW5jdGlvbihmaWxlUGF0aCxmaWxlVHlwZUFyZyA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBmaWxlVHlwZTtcbiAgICBpZiAodHlwZW9mIGZpbGVUeXBlQXJnID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgZmlsZVR5cGUgPSBwbHVnaW5zLnBhdGguZXh0bmFtZShmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZmlsZVR5cGUgPSBmaWxlVHlwZUFyZztcbiAgICB9XG4gICAgZmlsZVR5cGUgPSBmaWxlVHlwZS5yZXBsYWNlKC9cXC4oW2Etel0qKS8sXCIkMVwiKTsgLy9yZW1vdmUgLiBmb3JtIGZpbGVUeXBlXG4gICAgc3dpdGNoIChmaWxlVHlwZSkge1xuICAgICAgICBjYXNlIFwieW1sXCIgOlxuICAgICAgICBjYXNlIFwieWFtbFwiOlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2lucy55YW1sLnNhZmVMb2FkKHBsdWdpbnMuZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmVycm9yKFwiY2hlY2sgdGhhdCBcIiArIGZpbGVQYXRoLmJsdWUgKyBcIiBwb2ludHMgdG8gYSB2YWxpZCBmaWxlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJqc29uXCI6XG4gICAgICAgICAgICByZXR1cm4gcGx1Z2lucy5mcy5yZWFkSnNvblN5bmMoZmlsZVBhdGgse30pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cuZXJyb3IoXCJmaWxlIHR5cGUgXCIgKyBmaWxlVHlwZS5ibHVlICsgXCIgbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn07XG5cbi8qKlxuICogcmVhZHMgYSBmaWxlIGNvbnRlbnQgdG8gYSBTdHJpbmdcbiAqIEBwYXJhbSBmaWxlUGF0aFxuICogQHJldHVybnMge3N0cmluZ3xCdWZmZXJ8YW55fVxuICovXG5leHBvcnQgbGV0IHRvU3RyaW5nU3luYyA9IGZ1bmN0aW9uKGZpbGVQYXRoKSB7XG4gICAgbGV0IGZpbGVTdHJpbmc7XG4gICAgZmlsZVN0cmluZyA9IHBsdWdpbnMuZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCBcInV0ZjhcIik7XG4gICAgcmV0dXJuIGZpbGVTdHJpbmc7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gZmlsZVBhdGhBcmdcbiAqIEBwYXJhbSBvcHRpb25zXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgbGV0IHRvVmlueWxTeW5jID0gZnVuY3Rpb24oZmlsZVBhdGhBcmcsb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIHBsdWdpbnMudmlueWxGaWxlLnJlYWRTeW5jKGZpbGVQYXRoQXJnLG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBsZXRzIHlvdSByZWxvYWQgZmlsZXMgaG90LlxuICogQHBhcmFtIHBhdGhcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmV4cG9ydCBsZXQgcmVxdWlyZVJlbG9hZCA9IGZ1bmN0aW9uKHBhdGg6c3RyaW5nKXtcbiAgICByZXR1cm4gcGx1Z2lucy5yZXF1aXJlUmVsb2FkKHBhdGgpO1xufTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
