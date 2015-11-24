/// <reference path="typings/tsd.d.ts" />
var plugins = {
    path: require("path"),
    fs: require("fs-extra"),
    yaml: require("js-yaml"),
    beautylog: require("beautylog")("os")
};
var smartfile = {
    //read File to  string
    readFileToString: function (filePath) {
        var fileString;
        fileString = plugins.fs.readFileSync(filePath, "utf8");
        return fileString;
    },
    readFileToObject: function (filePath, fileTypeArg) {
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
                return require(filePath);
                break;
        }
    }
};
module.exports = smartfile;
