/// <reference path="typings/tsd.d.ts" />
var path = require("path");
var pr = require("pushrocks");
var fs = require("fs");
var smartfile = {
    //read File to  string
    readFileToString: function (filePath) {
        var fileString;
        fileString = fs.readFileSync(filePath, "utf8");
        return fileString;
    }
};
module.exports = smartfile;
