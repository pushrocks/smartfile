"use strict";
/// <reference path="./typings/index.d.ts" />
exports.beautylog = require("beautylog");
exports.fs = require("fs-extra");
exports.gulp = require("gulp");
exports.g = {
    remoteSrc: require("gulp-remote-src")
};
exports.path = require("path");
exports.q = require("q");
exports.vinyl = require("vinyl");
exports.vinylFile = require("vinyl-file");
exports.yaml = require("js-yaml");
exports.request = require("request");
exports.requireReload = require("require-reload");

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNtYXJ0ZmlsZS5wbHVnaW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2Q0FBNkM7QUFDbEMsaUJBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDakMsVUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN6QixZQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZCLFNBQUMsR0FBRztJQUNYLFNBQVMsRUFBRSxPQUFPLENBQUMsaUJBQWlCLENBQUM7Q0FDeEMsQ0FBQztBQUNZLFlBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUMxQixTQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsYUFBSyxXQUFXLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLGlCQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2xDLFlBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUIsZUFBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixxQkFBYSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDIiwiZmlsZSI6InNtYXJ0ZmlsZS5wbHVnaW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cclxuZXhwb3J0IGxldCBiZWF1dHlsb2cgPSByZXF1aXJlKFwiYmVhdXR5bG9nXCIpO1xyXG5leHBvcnQgbGV0IGZzID0gcmVxdWlyZShcImZzLWV4dHJhXCIpO1xyXG5leHBvcnQgbGV0IGd1bHAgPSByZXF1aXJlKFwiZ3VscFwiKTtcclxuZXhwb3J0IGxldCBnID0ge1xyXG4gICAgcmVtb3RlU3JjOiByZXF1aXJlKFwiZ3VscC1yZW1vdGUtc3JjXCIpXHJcbn07XHJcbmV4cG9ydCBpbXBvcnQgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5leHBvcnQgbGV0IHEgPSByZXF1aXJlKFwicVwiKTtcclxuZXhwb3J0IGltcG9ydCB2aW55bCA9IHJlcXVpcmUoXCJ2aW55bFwiKTtcclxuZXhwb3J0IGxldCB2aW55bEZpbGUgPSByZXF1aXJlKFwidmlueWwtZmlsZVwiKTtcclxuZXhwb3J0IGxldCB5YW1sID0gcmVxdWlyZShcImpzLXlhbWxcIik7XHJcbmV4cG9ydCBsZXQgcmVxdWVzdCA9IHJlcXVpcmUoXCJyZXF1ZXN0XCIpO1xyXG5leHBvcnQgbGV0IHJlcXVpcmVSZWxvYWQgPSByZXF1aXJlKFwicmVxdWlyZS1yZWxvYWRcIik7XHJcbiJdfQ==
