/// <reference path="./typings/main.d.ts" />
"use strict";
var plugins = require("./smartfile.plugins");
exports.toFS = function (options, cb) {
    if (cb === void 0) { cb = undefined; }
};
/**
 *
 * @param filePath
 * @param fileTypeArg
 * @returns {any}
 */
exports.toObject = function (filePath, fileTypeArg) {
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
exports.toString = function (filePath) {
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
exports.toVinyl = function (filePathArg, options) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNtYXJ0ZmlsZS5yZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRDQUE0Qzs7QUFFNUMsSUFBTyxPQUFPLFdBQVcscUJBQXFCLENBQUMsQ0FBQztBQUVyQyxZQUFJLEdBQUcsVUFBUyxPQUFtQyxFQUFFLEVBQVk7SUFBWixrQkFBWSxHQUFaLGNBQVk7QUFFNUUsQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDUSxnQkFBUSxHQUFHLFVBQVMsUUFBUSxFQUFDLFdBQXVCO0lBQXZCLDJCQUF1QixHQUF2Qix1QkFBdUI7SUFDM0QsSUFBSSxRQUFRLENBQUM7SUFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixRQUFRLEdBQUcsV0FBVyxDQUFDO0lBQzNCLENBQUM7SUFDRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7SUFDeEUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNmLEtBQUssS0FBSyxDQUFFO1FBQ1osS0FBSyxNQUFNO1lBQ1AsSUFBSSxDQUFDO2dCQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1RSxDQUFFO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDUixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksR0FBRyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3ZGLENBQUM7WUFDRCxLQUFLLENBQUM7UUFDVixLQUFLLE1BQU07WUFDUCxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hEO1lBQ0ksT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztZQUN6RSxLQUFLLENBQUM7SUFDZCxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNRLGdCQUFRLEdBQUcsVUFBUyxRQUFRO0lBQ25DLElBQUksVUFBVSxDQUFDO0lBQ2YsVUFBVSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3RCLENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ1EsZUFBTyxHQUFHLFVBQVMsV0FBVyxFQUFDLE9BQVk7SUFBWix1QkFBWSxHQUFaLFlBQVk7SUFDbEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ1EscUJBQWEsR0FBRyxVQUFTLElBQVc7SUFDM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDIiwiZmlsZSI6InNtYXJ0ZmlsZS5yZWFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdHlwaW5ncy9tYWluLmQudHNcIiAvPlxuXG5pbXBvcnQgcGx1Z2lucyA9IHJlcXVpcmUoXCIuL3NtYXJ0ZmlsZS5wbHVnaW5zXCIpO1xuXG5leHBvcnQgbGV0IHRvRlMgPSBmdW5jdGlvbihvcHRpb25zOntmcm9tOnN0cmluZyx0b1BhdGg6c3RyaW5nfSwgY2I9dW5kZWZpbmVkKXtcbiAgICBcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBmaWxlUGF0aFxuICogQHBhcmFtIGZpbGVUeXBlQXJnXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgbGV0IHRvT2JqZWN0ID0gZnVuY3Rpb24oZmlsZVBhdGgsZmlsZVR5cGVBcmcgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgZmlsZVR5cGU7XG4gICAgaWYgKHR5cGVvZiBmaWxlVHlwZUFyZyA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGZpbGVUeXBlID0gcGx1Z2lucy5wYXRoLmV4dG5hbWUoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbGVUeXBlID0gZmlsZVR5cGVBcmc7XG4gICAgfVxuICAgIGZpbGVUeXBlID0gZmlsZVR5cGUucmVwbGFjZSgvXFwuKFthLXpdKikvLFwiJDFcIik7IC8vcmVtb3ZlIC4gZm9ybSBmaWxlVHlwZVxuICAgIHN3aXRjaCAoZmlsZVR5cGUpIHtcbiAgICAgICAgY2FzZSBcInltbFwiIDpcbiAgICAgICAgY2FzZSBcInlhbWxcIjpcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbnMueWFtbC5zYWZlTG9hZChwbHVnaW5zLmZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5lcnJvcihcImNoZWNrIHRoYXQgXCIgKyBmaWxlUGF0aC5ibHVlICsgXCIgcG9pbnRzIHRvIGEgdmFsaWQgZmlsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwianNvblwiOlxuICAgICAgICAgICAgcmV0dXJuIHBsdWdpbnMuZnMucmVhZEpzb25TeW5jKGZpbGVQYXRoLHt9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmVycm9yKFwiZmlsZSB0eXBlIFwiICsgZmlsZVR5cGUuYmx1ZSArIFwiIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG4vKipcbiAqIHJlYWRzIGEgZmlsZSBjb250ZW50IHRvIGEgU3RyaW5nXG4gKiBAcGFyYW0gZmlsZVBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd8QnVmZmVyfGFueX1cbiAqL1xuZXhwb3J0IGxldCB0b1N0cmluZyA9IGZ1bmN0aW9uKGZpbGVQYXRoKSB7XG4gICAgbGV0IGZpbGVTdHJpbmc7XG4gICAgZmlsZVN0cmluZyA9IHBsdWdpbnMuZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCBcInV0ZjhcIik7XG4gICAgcmV0dXJuIGZpbGVTdHJpbmc7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gZmlsZVBhdGhBcmdcbiAqIEBwYXJhbSBvcHRpb25zXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgbGV0IHRvVmlueWwgPSBmdW5jdGlvbihmaWxlUGF0aEFyZyxvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gcGx1Z2lucy52aW55bEZpbGUucmVhZFN5bmMoZmlsZVBhdGhBcmcsb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIGxldHMgeW91IHJlbG9hZCBmaWxlcyBob3QuXG4gKiBAcGFyYW0gcGF0aFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGxldCByZXF1aXJlUmVsb2FkID0gZnVuY3Rpb24ocGF0aDpzdHJpbmcpe1xuICAgIHJldHVybiBwbHVnaW5zLnJlcXVpcmVSZWxvYWQocGF0aCk7XG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
