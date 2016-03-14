/// <reference path="./typings/main.d.ts" />

import plugins = require("./smartfile.plugins");
import SmartfileChecks = require("./smartfile.checks");
import SmartfileSimple = require("./smartfile.simple");


var smartfile:any = {
    copy: SmartfileSimple.copy,
    checks: SmartfileChecks,
    readFileToString: SmartfileSimple.readFileToString,
    readFileToObject: SmartfileSimple.readFileToObject,
    readFileToVinyl: SmartfileSimple.readFileToVinyl,
    requireReload: SmartfileSimple.requireReload
};

export = smartfile;
