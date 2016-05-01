/// <reference path="./typings/main.d.ts" />

import * as plugins from "./smartfile.plugins";
import * as SmartfileChecks from "./smartfile.checks";
import * as SmartfileFsaction from "./smartfile.fsaction";
import * as SmartfileGet from "./smartfile.get";
import * as SmartfileLocal from "./smartfile.local";
import * as SmartfileMemory from "./smartfile.memory";
import * as SmartfileRemote from "./smartfile.remote";


var smartfile = {
    fsaction: SmartfileFsaction,
    fs: plugins.fs,
    checks: SmartfileChecks,
    get: SmartfileGet,
    local: SmartfileLocal,
    memory: SmartfileMemory,
    remote: SmartfileRemote,
    requireReload: SmartfileLocal.requireReload
};

export = smartfile;
