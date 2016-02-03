#!/usr/bin/env node

/// <reference path="./index.ts" />
var SmartfilePlugins;
(function (SmartfilePlugins) {
    SmartfilePlugins.init = function () {
        var plugins = {
            beautylog: require("beautylog"),
            fs: require("fs-extra"),
            path: require("path"),
            vinyl: require("vinyl"),
            vinylFile: require("vinyl-file"),
            yaml: require("js-yaml"),
            requireReload: require("require-reload")
        };
        return plugins;
    };
})(SmartfilePlugins || (SmartfilePlugins = {}));
/// <reference path="./index.ts" />
var SmartfileSimple;
(function (SmartfileSimple) {
    /**
     * reads a file content to a String
     * @param filePath
     * @returns {string|Buffer|any}
     */
    var readFileToString = function (filePath) {
        var fileString;
        fileString = plugins.fs.readFileSync(filePath, "utf8");
        return fileString;
    };
    var readFileToObject = function (filePath, fileTypeArg) {
        if (fileTypeArg === void 0) { fileTypeArg = "undefined"; }
        var fileType;
        if (fileTypeArg == "undefined") {
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
                break;
        }
    };
    SmartfileSimple.init = function (objectArg) {
        objectArg.readFileToString = readFileToString;
        objectArg.readFileToObject = readFileToObject;
    };
})(SmartfileSimple || (SmartfileSimple = {}));
/// <reference path="./index.ts" />
var SmartfileVinyl;
(function (SmartfileVinyl) {
    var readFileToVinyl = function (filePathArg, options) {
        if (options === void 0) { options = {}; }
        return plugins.vinylFile.readSync(filePathArg, options);
    };
    SmartfileVinyl.init = function (objectArg) {
        objectArg.readFileToVinyl = readFileToVinyl;
    };
})(SmartfileVinyl || (SmartfileVinyl = {}));
/// <reference path="./index.ts" />
var SmartfileRequire;
(function (SmartfileRequire) {
    var requireReload = function (path) {
        return plugins.requireReload(path);
    };
    SmartfileRequire.init = function (objectArg) {
        objectArg.requireReload = requireReload;
    };
})(SmartfileRequire || (SmartfileRequire = {}));
/// <reference path="./typings/main.d.ts" />
/// <reference path="./smartfile.plugins.ts" />
/// <reference path="./smartfile.simple.ts" />
/// <reference path="./smartfile.vinyl.ts" />
/// <reference path="./smartfile.require.ts" />
var plugins = SmartfilePlugins.init();
var smartfile = {};
SmartfileSimple.init(smartfile);
SmartfileVinyl.init(smartfile);
SmartfileRequire.init(smartfile);
module.exports = smartfile;
