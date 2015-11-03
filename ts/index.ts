/// <reference path="typings/tsd.d.ts" />
var path = require("path");
var fs = require("fs");

var smartfile:any = {
    //read File to  string
    readFileToString: (filePath) => {
        var fileString;
        fileString = fs.readFileSync(filePath, "utf8");
        return fileString;
    }
};


module.exports = smartfile;
