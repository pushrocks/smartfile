/// <reference path="typings/tsd.d.ts" />
var smartfile = require("./index.js");
var pr = require("pushrocks")
pr.beautylog.info(smartfile.readFileToString("./test/mytest.txt"));