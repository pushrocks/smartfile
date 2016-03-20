/// <reference path="./typings/main.d.ts" />

import plugins = require("./smartfile.plugins");
import SmartfileChecks = require("./smartfile.checks");
import SmartfileFsaction = require("./smartfile.fsaction");
import SmartfileGet = require("./smartfile.get");
import SmartfileLocal = require("./smartfile.local");
import SmartfileRemote = require("./smartfile.remote");


var smartfile:any = {
    fsaction: SmartfileFsaction,
    fs: plugins.fs,
    checks: SmartfileChecks,
    get: SmartfileGet,
    local: SmartfileLocal,
    remote: SmartfileRemote,
    requireReload: SmartfileLocal.requireReload
};

export = smartfile;
