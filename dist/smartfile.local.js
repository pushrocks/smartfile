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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNtYXJ0ZmlsZS5sb2NhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0Q0FBNEM7O0FBRTVDLElBQU8sT0FBTyxXQUFXLHFCQUFxQixDQUFDLENBQUM7QUFFckMsWUFBSSxHQUFHLFVBQVMsT0FBbUMsRUFBRSxFQUFZO0lBQVosa0JBQVksR0FBWixjQUFZO0FBRTVFLENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ1Esb0JBQVksR0FBRyxVQUFTLFFBQVEsRUFBQyxXQUF1QjtJQUF2QiwyQkFBdUIsR0FBdkIsdUJBQXVCO0lBQy9ELElBQUksUUFBUSxDQUFDO0lBQ2IsRUFBRSxDQUFDLENBQUMsT0FBTyxXQUFXLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osUUFBUSxHQUFHLFdBQVcsQ0FBQztJQUMzQixDQUFDO0lBQ0QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsd0JBQXdCO0lBQ3hFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDZixLQUFLLEtBQUssQ0FBRTtRQUNaLEtBQUssTUFBTTtZQUNQLElBQUksQ0FBQztnQkFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUUsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ1IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcseUJBQXlCLENBQUMsQ0FBQztZQUN2RixDQUFDO1lBQ0QsS0FBSyxDQUFDO1FBQ1YsS0FBSyxNQUFNO1lBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNoRDtZQUNJLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLENBQUM7WUFDekUsS0FBSyxDQUFDO0lBQ2QsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDUSxvQkFBWSxHQUFHLFVBQVMsUUFBUTtJQUN2QyxJQUFJLFVBQVUsQ0FBQztJQUNmLFVBQVUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkQsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUN0QixDQUFDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNRLG1CQUFXLEdBQUcsVUFBUyxXQUFXLEVBQUMsT0FBWTtJQUFaLHVCQUFZLEdBQVosWUFBWTtJQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNELENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDUSxxQkFBYSxHQUFHLFVBQVMsSUFBVztJQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUMiLCJmaWxlIjoic21hcnRmaWxlLmxvY2FsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdHlwaW5ncy9tYWluLmQudHNcIiAvPlxuXG5pbXBvcnQgcGx1Z2lucyA9IHJlcXVpcmUoXCIuL3NtYXJ0ZmlsZS5wbHVnaW5zXCIpO1xuXG5leHBvcnQgbGV0IHRvRlMgPSBmdW5jdGlvbihvcHRpb25zOntmcm9tOnN0cmluZyx0b1BhdGg6c3RyaW5nfSwgY2I9dW5kZWZpbmVkKXtcbiAgICBcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBmaWxlUGF0aFxuICogQHBhcmFtIGZpbGVUeXBlQXJnXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgbGV0IHRvT2JqZWN0U3luYyA9IGZ1bmN0aW9uKGZpbGVQYXRoLGZpbGVUeXBlQXJnID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IGZpbGVUeXBlO1xuICAgIGlmICh0eXBlb2YgZmlsZVR5cGVBcmcgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBmaWxlVHlwZSA9IHBsdWdpbnMucGF0aC5leHRuYW1lKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmaWxlVHlwZSA9IGZpbGVUeXBlQXJnO1xuICAgIH1cbiAgICBmaWxlVHlwZSA9IGZpbGVUeXBlLnJlcGxhY2UoL1xcLihbYS16XSopLyxcIiQxXCIpOyAvL3JlbW92ZSAuIGZvcm0gZmlsZVR5cGVcbiAgICBzd2l0Y2ggKGZpbGVUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJ5bWxcIiA6XG4gICAgICAgIGNhc2UgXCJ5YW1sXCI6XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW5zLnlhbWwuc2FmZUxvYWQocGx1Z2lucy5mcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4JykpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cuZXJyb3IoXCJjaGVjayB0aGF0IFwiICsgZmlsZVBhdGguYmx1ZSArIFwiIHBvaW50cyB0byBhIHZhbGlkIGZpbGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImpzb25cIjpcbiAgICAgICAgICAgIHJldHVybiBwbHVnaW5zLmZzLnJlYWRKc29uU3luYyhmaWxlUGF0aCx7fSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5lcnJvcihcImZpbGUgdHlwZSBcIiArIGZpbGVUeXBlLmJsdWUgKyBcIiBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufTtcblxuLyoqXG4gKiByZWFkcyBhIGZpbGUgY29udGVudCB0byBhIFN0cmluZ1xuICogQHBhcmFtIGZpbGVQYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfEJ1ZmZlcnxhbnl9XG4gKi9cbmV4cG9ydCBsZXQgdG9TdHJpbmdTeW5jID0gZnVuY3Rpb24oZmlsZVBhdGgpIHtcbiAgICBsZXQgZmlsZVN0cmluZztcbiAgICBmaWxlU3RyaW5nID0gcGx1Z2lucy5mcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsIFwidXRmOFwiKTtcbiAgICByZXR1cm4gZmlsZVN0cmluZztcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBmaWxlUGF0aEFyZ1xuICogQHBhcmFtIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBsZXQgdG9WaW55bFN5bmMgPSBmdW5jdGlvbihmaWxlUGF0aEFyZyxvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gcGx1Z2lucy52aW55bEZpbGUucmVhZFN5bmMoZmlsZVBhdGhBcmcsb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIGxldHMgeW91IHJlbG9hZCBmaWxlcyBob3QuXG4gKiBAcGFyYW0gcGF0aFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGxldCByZXF1aXJlUmVsb2FkID0gZnVuY3Rpb24ocGF0aDpzdHJpbmcpe1xuICAgIHJldHVybiBwbHVnaW5zLnJlcXVpcmVSZWxvYWQocGF0aCk7XG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
