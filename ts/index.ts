/// <reference path="./typings/main.d.ts" />

import plugins = require("./smartfile.plugins");
import SmartfileChecks = require("./smartfile.checks");
import SmartfileFsaction = require("./smartfile.fsaction");
import SmartfileLocal = require("./smartfile.local");
import SmartfileRemote = require("./smartfile.remote");


var smartfile:any = {
    fsaction: SmartfileFsaction,
    checks: SmartfileChecks,
    local: SmartfileLocal,
    remote: SmartfileRemote,
    requireReload: SmartfileLocal.requireReload
};

export = smartfile;
