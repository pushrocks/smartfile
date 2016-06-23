import "typings-global";

import * as plugins from "./smartfile.plugins";
import * as SmartfileLocal from "./smartfile.fs";
import * as SmartfileMemory from "./smartfile.memory";
import * as SmartfileRemote from "./smartfile.remote";

export {Smartfile} from "./smartfile.classes.smartfile";

export let fs = plugins.fs;
export let local = SmartfileLocal;
export let memory = SmartfileMemory;
export let remote = SmartfileRemote;
export let requireReload = SmartfileLocal.requireReload;
