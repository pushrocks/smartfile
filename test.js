/// <reference path="typings/tsd.d.ts" />
var smartfile = require("./index.js");
var beautylog = require("beautylog")("os");
beautylog.info(smartfile.readFileToString("./test/mytest.txt"));
