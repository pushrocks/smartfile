/// <reference path="./typings/main.d.ts" />
"use strict";
var plugins = require("./smartfile.plugins");
exports.copy = function (fromArg, toArg) {
    plugins.shelljs.cp("-r", fromArg, toArg);
};
/**
 * reads a file content to a String
 * @param filePath
 * @returns {string|Buffer|any}
 */
exports.readFileToString = function (filePath) {
    var fileString;
    fileString = plugins.fs.readFileSync(filePath, "utf8");
    return fileString;
};
/**
 *
 * @param filePath
 * @param fileTypeArg
 * @returns {any}
 */
exports.readFileToObject = function (filePath, fileTypeArg) {
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
 *
 * @param filePathArg
 * @param options
 * @returns {number}
 */
exports.readFileToVinyl = function (filePathArg, options) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNtYXJ0ZmlsZS5zaW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNENBQTRDOztBQUU1QyxJQUFPLE9BQU8sV0FBVyxxQkFBcUIsQ0FBQyxDQUFDO0FBRXJDLFlBQUksR0FBRyxVQUFTLE9BQWMsRUFBQyxLQUFZO0lBQ2xELE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNRLHdCQUFnQixHQUFHLFVBQVMsUUFBUTtJQUMzQyxJQUFJLFVBQVUsQ0FBQztJQUNmLFVBQVUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkQsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUN0QixDQUFDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNRLHdCQUFnQixHQUFHLFVBQVMsUUFBUSxFQUFDLFdBQXVCO0lBQXZCLDJCQUF1QixHQUF2Qix1QkFBdUI7SUFDbkUsSUFBSSxRQUFRLENBQUM7SUFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixRQUFRLEdBQUcsV0FBVyxDQUFDO0lBQzNCLENBQUM7SUFDRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7SUFDeEUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNmLEtBQUssS0FBSyxDQUFFO1FBQ1osS0FBSyxNQUFNO1lBQ1AsSUFBSSxDQUFDO2dCQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1RSxDQUFFO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDUixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksR0FBRyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3ZGLENBQUM7WUFDRCxLQUFLLENBQUM7UUFDVixLQUFLLE1BQU07WUFDUCxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hEO1lBQ0ksT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztZQUN6RSxLQUFLLENBQUM7SUFDZCxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDUSx1QkFBZSxHQUFHLFVBQVMsV0FBVyxFQUFDLE9BQVk7SUFBWix1QkFBWSxHQUFaLFlBQVk7SUFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ1EscUJBQWEsR0FBRyxVQUFTLElBQVc7SUFDM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDIiwiZmlsZSI6InNtYXJ0ZmlsZS5zaW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL21haW4uZC50c1wiIC8+XG5cbmltcG9ydCBwbHVnaW5zID0gcmVxdWlyZShcIi4vc21hcnRmaWxlLnBsdWdpbnNcIik7XG5cbmV4cG9ydCBsZXQgY29weSA9IGZ1bmN0aW9uKGZyb21Bcmc6c3RyaW5nLHRvQXJnOnN0cmluZyl7XG4gICAgcGx1Z2lucy5zaGVsbGpzLmNwKFwiLXJcIixmcm9tQXJnLHRvQXJnKTtcbn07XG5cbi8qKlxuICogcmVhZHMgYSBmaWxlIGNvbnRlbnQgdG8gYSBTdHJpbmdcbiAqIEBwYXJhbSBmaWxlUGF0aFxuICogQHJldHVybnMge3N0cmluZ3xCdWZmZXJ8YW55fVxuICovXG5leHBvcnQgbGV0IHJlYWRGaWxlVG9TdHJpbmcgPSBmdW5jdGlvbihmaWxlUGF0aCkge1xuICAgIGxldCBmaWxlU3RyaW5nO1xuICAgIGZpbGVTdHJpbmcgPSBwbHVnaW5zLmZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgXCJ1dGY4XCIpO1xuICAgIHJldHVybiBmaWxlU3RyaW5nO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIGZpbGVQYXRoXG4gKiBAcGFyYW0gZmlsZVR5cGVBcmdcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmV4cG9ydCBsZXQgcmVhZEZpbGVUb09iamVjdCA9IGZ1bmN0aW9uKGZpbGVQYXRoLGZpbGVUeXBlQXJnID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IGZpbGVUeXBlO1xuICAgIGlmICh0eXBlb2YgZmlsZVR5cGVBcmcgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBmaWxlVHlwZSA9IHBsdWdpbnMucGF0aC5leHRuYW1lKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmaWxlVHlwZSA9IGZpbGVUeXBlQXJnO1xuICAgIH1cbiAgICBmaWxlVHlwZSA9IGZpbGVUeXBlLnJlcGxhY2UoL1xcLihbYS16XSopLyxcIiQxXCIpOyAvL3JlbW92ZSAuIGZvcm0gZmlsZVR5cGVcbiAgICBzd2l0Y2ggKGZpbGVUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJ5bWxcIiA6XG4gICAgICAgIGNhc2UgXCJ5YW1sXCI6XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW5zLnlhbWwuc2FmZUxvYWQocGx1Z2lucy5mcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4JykpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cuZXJyb3IoXCJjaGVjayB0aGF0IFwiICsgZmlsZVBhdGguYmx1ZSArIFwiIHBvaW50cyB0byBhIHZhbGlkIGZpbGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImpzb25cIjpcbiAgICAgICAgICAgIHJldHVybiBwbHVnaW5zLmZzLnJlYWRKc29uU3luYyhmaWxlUGF0aCx7fSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5lcnJvcihcImZpbGUgdHlwZSBcIiArIGZpbGVUeXBlLmJsdWUgKyBcIiBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIGZpbGVQYXRoQXJnXG4gKiBAcGFyYW0gb3B0aW9uc1xuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGxldCByZWFkRmlsZVRvVmlueWwgPSBmdW5jdGlvbihmaWxlUGF0aEFyZyxvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gcGx1Z2lucy52aW55bEZpbGUucmVhZFN5bmMoZmlsZVBhdGhBcmcsb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIGxldHMgeW91IHJlbG9hZCBmaWxlcyBob3QuXG4gKiBAcGFyYW0gcGF0aFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGxldCByZXF1aXJlUmVsb2FkID0gZnVuY3Rpb24ocGF0aDpzdHJpbmcpe1xuICAgIHJldHVybiBwbHVnaW5zLnJlcXVpcmVSZWxvYWQocGF0aCk7XG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
