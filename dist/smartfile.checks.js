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
exports.isDirectory = function (pathArg) {
    return plugins.fs.statSync(pathArg).isDirectory();
};
exports.isFile = function (pathArg) {
    return plugins.fs.statSync(pathArg).isFile();
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNtYXJ0ZmlsZS5jaGVja3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDRDQUE0QztBQUM1QyxJQUFPLE9BQU8sV0FBVyxxQkFBcUIsQ0FBQyxDQUFDO0FBRWhEOzs7O0dBSUc7QUFDUSxzQkFBYyxHQUFHLFVBQVMsUUFBUTtJQUN6QyxJQUFJLGNBQWMsR0FBVyxLQUFLLENBQUM7SUFDbkMsSUFBSSxDQUFDO1FBQ0QsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsY0FBYyxHQUFHLElBQUksQ0FBQTtJQUN6QixDQUNBO0lBQUEsS0FBSyxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQztRQUNQLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUNELE1BQU0sQ0FBQyxjQUFjLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNRLGtCQUFVLEdBQUcsVUFBUyxRQUFRO0lBQ3JDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztRQUN0RCxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVTLG1CQUFXLEdBQUcsVUFBUyxPQUFPO0lBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN0RCxDQUFDLENBQUM7QUFFUyxjQUFNLEdBQUcsVUFBUyxPQUFPO0lBQ2hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNqRCxDQUFDLENBQUMiLCJmaWxlIjoic21hcnRmaWxlLmNoZWNrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cbmltcG9ydCBwbHVnaW5zID0gcmVxdWlyZShcIi4vc21hcnRmaWxlLnBsdWdpbnNcIik7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBmaWxlUGF0aFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBsZXQgZmlsZUV4aXN0c1N5bmMgPSBmdW5jdGlvbihmaWxlUGF0aCk6Ym9vbGVhbiB7XG4gICAgbGV0IGZpbGVFeGlzdHNCb29sOmJvb2xlYW4gPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBwbHVnaW5zLmZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCk7XG4gICAgICAgIGZpbGVFeGlzdHNCb29sID0gdHJ1ZVxuICAgIH1cbiAgICBjYXRjaChlcnIpe1xuICAgICAgICBmaWxlRXhpc3RzQm9vbCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZUV4aXN0c0Jvb2w7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gZmlsZVBhdGhcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmV4cG9ydCBsZXQgZmlsZUV4aXN0cyA9IGZ1bmN0aW9uKGZpbGVQYXRoKXtcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xuICAgIHBsdWdpbnMuZnMuYWNjZXNzKGZpbGVQYXRoLCBwbHVnaW5zLmZzLlJfT0ssIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgZXJyID8gZG9uZS5yZWplY3QoKSA6IGRvbmUucmVzb2x2ZSgpO1xuICAgIH0pO1xuICAgIHJldHVybiBkb25lLnByb21pc2U7XG59O1xuXG5leHBvcnQgbGV0IGlzRGlyZWN0b3J5ID0gZnVuY3Rpb24ocGF0aEFyZyk6Ym9vbGVhbntcbiAgICByZXR1cm4gcGx1Z2lucy5mcy5zdGF0U3luYyhwYXRoQXJnKS5pc0RpcmVjdG9yeSgpO1xufTtcblxuZXhwb3J0IGxldCBpc0ZpbGUgPSBmdW5jdGlvbihwYXRoQXJnKTpib29sZWFue1xuICAgIHJldHVybiBwbHVnaW5zLmZzLnN0YXRTeW5jKHBhdGhBcmcpLmlzRmlsZSgpO1xufTtcbiJdfQ==
