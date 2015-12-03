/// <reference path="./index.ts" />
module SmartfilePlugins {
    export var init = function() {
        var plugins = {
            beautylog: require("beautylog")("os"),
            fs: require("fs-extra"),
            path: require("path"),
            vinyl: require("vinyl"),
            vinylFile: require("vinyl-file"),
            yaml: require("js-yaml")
        };
        return plugins;
    }
}