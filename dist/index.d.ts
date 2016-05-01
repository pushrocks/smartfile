import * as SmartfileChecks from "./smartfile.checks";
import * as SmartfileFsaction from "./smartfile.fsaction";
import * as SmartfileGet from "./smartfile.get";
import * as SmartfileLocal from "./smartfile.local";
import * as SmartfileMemory from "./smartfile.memory";
import * as SmartfileRemote from "./smartfile.remote";
declare var smartfile: {
    fsaction: typeof SmartfileFsaction;
    fs: any;
    checks: typeof SmartfileChecks;
    get: typeof SmartfileGet;
    local: typeof SmartfileLocal;
    memory: typeof SmartfileMemory;
    remote: typeof SmartfileRemote;
    requireReload: (path: string) => any;
};
export = smartfile;
