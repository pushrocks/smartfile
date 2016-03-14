"use strict";
/// <reference path="./typings/main.d.ts" />
var plugins = require("./smartfile.plugins");
/**
 *
 * @param filePath
 * @returns {boolean}
 */
exports.fileExistsSync = function (filePath) {
    var fileExistsBool = false;
    try {
        plugins.fs.readFileSync(filePath);
        fileExistsBool = true;
    }
    catch (err) {
        fileExistsBool = false;
    }
    return fileExistsBool;
};
/**
 *
 * @param filePath
 * @returns {any}
 */
exports.fileExists = function (filePath) {
    var done = plugins.q.defer();
    plugins.fs.access(filePath, plugins.fs.R_OK, function (err) {
        err ? done.reject() : done.resolve();
    });
    return done.promise;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNtYXJ0ZmlsZS5jaGVja3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDRDQUE0QztBQUM1QyxJQUFPLE9BQU8sV0FBVyxxQkFBcUIsQ0FBQyxDQUFDO0FBRWhEOzs7O0dBSUc7QUFDUSxzQkFBYyxHQUFHLFVBQVMsUUFBUTtJQUN6QyxJQUFJLGNBQWMsR0FBVyxLQUFLLENBQUM7SUFDbkMsSUFBSSxDQUFDO1FBQ0QsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsY0FBYyxHQUFHLElBQUksQ0FBQTtJQUN6QixDQUNBO0lBQUEsS0FBSyxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQztRQUNQLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUNELE1BQU0sQ0FBQyxjQUFjLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNRLGtCQUFVLEdBQUcsVUFBUyxRQUFRO0lBQ3JDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztRQUN0RCxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyIsImZpbGUiOiJzbWFydGZpbGUuY2hlY2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdHlwaW5ncy9tYWluLmQudHNcIiAvPlxuaW1wb3J0IHBsdWdpbnMgPSByZXF1aXJlKFwiLi9zbWFydGZpbGUucGx1Z2luc1wiKTtcblxuLyoqXG4gKlxuICogQHBhcmFtIGZpbGVQYXRoXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGxldCBmaWxlRXhpc3RzU3luYyA9IGZ1bmN0aW9uKGZpbGVQYXRoKTpib29sZWFuIHtcbiAgICBsZXQgZmlsZUV4aXN0c0Jvb2w6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIHBsdWdpbnMuZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoKTtcbiAgICAgICAgZmlsZUV4aXN0c0Jvb2wgPSB0cnVlXG4gICAgfVxuICAgIGNhdGNoKGVycil7XG4gICAgICAgIGZpbGVFeGlzdHNCb29sID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmaWxlRXhpc3RzQm9vbDtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBmaWxlUGF0aFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZXhwb3J0IGxldCBmaWxlRXhpc3RzID0gZnVuY3Rpb24oZmlsZVBhdGgpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgcGx1Z2lucy5mcy5hY2Nlc3MoZmlsZVBhdGgsIHBsdWdpbnMuZnMuUl9PSywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBlcnIgPyBkb25lLnJlamVjdCgpIDogZG9uZS5yZXNvbHZlKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
