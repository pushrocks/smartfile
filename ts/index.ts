/// <reference path="./typings/index.d.ts" />

import * as plugins from "./smartfile.plugins";
import * as SmartfileChecks from "./smartfile.checks";
import * as SmartfileFsaction from "./smartfile.fsaction";
import * as SmartfileGet from "./smartfile.get";
import * as SmartfileLocal from "./smartfile.local";
import * as SmartfileMemory from "./smartfile.memory";
import * as SmartfileRemote from "./smartfile.remote";

export {Smartfile} from "./smartfile.classes.smartfile";

export let fsaction = SmartfileFsaction;
export let fs = plugins.fs;
export let checks = SmartfileChecks;
export let get = SmartfileGet;
export let local = SmartfileLocal;
export let memory = SmartfileMemory;
export let remote = SmartfileRemote;
export let requireReload = SmartfileLocal.requireReload;
