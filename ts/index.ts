/// <reference path="./typings/main.d.ts" />

import plugins = require("./smartfile.plugins");
import SmartfileChecks = require("./smartfile.checks");
import SmartfileFsaction = require("./smartfile.fsaction");
import SmartfileRead = require("./smartfile.read");
import SmartfileRemote = require("./smartfile.remote");


var smartfile:any = {
    copy: SmartfileSimple.copy,
    checks: SmartfileChecks,
    read: SmartfileRead,
    remote: SmartfileRemote,
    requireReload: SmartfileSimple.requireReload
};

export = smartfile;
