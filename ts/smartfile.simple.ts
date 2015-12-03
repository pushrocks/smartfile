/// <reference path="./index.ts" />
module SmartfileSimple {
    /**
     * reads a file content to a String
     * @param filePath
     * @returns {string|Buffer|any}
     */
    var readFileToString = function(filePath) {
        var fileString;
        fileString = plugins.fs.readFileSync(filePath, "utf8");
        return fileString;
    };
    var readFileToObject = function(filePath,fileTypeArg = "undefined") {
        var fileType;
        if (fileTypeArg == "undefined") {
            fileType = plugins.path.extname(filePath);
        } else {
            fileType = fileTypeArg;
        }
        fileType = fileType.replace(/\.([a-z]*)/,"$1"); //remove . form fileType
        switch (fileType) {
            case "yml" :
            case "yaml":
                try {
                    return plugins.yaml.safeLoad(plugins.fs.readFileSync(filePath, 'utf8'));
                } catch (e){
                    plugins.beautylog.error("check that " + filePath.blue + " points to a valid file");
                }
                break;
            case "json":
                return plugins.fs.readJsonSync(filePath,{});
                break;
        }
    };
    export var init = function(objectArg) {
        objectArg.readFileToString = readFileToString;
        objectArg.readFileToObject = readFileToObject;
    };
}