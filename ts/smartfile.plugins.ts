import "typings-global";
export import beautylog = require("beautylog");
export let fs = require("fs-extra");
export let gulp = require("gulp");
export import glob = require("glob");
export let g = {
    remoteSrc: require("gulp-remote-src")
};
export import path = require("path");
export import Q = require("q");
export import vinyl = require("vinyl");
export let vinylFile = require("vinyl-file");
export let yaml = require("js-yaml");
export let request = require("request");
export let requireReload = require("require-reload");
