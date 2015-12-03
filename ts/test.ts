/// <reference path="typings/tsd.d.ts" />
var smartfile = require("./index.js");
var beautylog = require("beautylog")("os");
beautylog.info(smartfile.readFileToString("./test/mytest.txt"));
console.log(smartfile.readFileToObject("./test/mytest.yaml"));
console.log(smartfile.readFileToObject("./test/mytest.json"));
console.log(smartfile.readFileToVinyl("./test/mytest.json"));
//var thisIsAnError = smartfile.readFileToObject("./test/mytestDoesNotExist.json");