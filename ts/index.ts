import * as plugins from './smartfile.plugins';
import * as SmartfileFs from './smartfile.fs';
import * as SmartfileInterpreter from './smartfile.interpreter';
import * as SmartfileMemory from './smartfile.memory';
import * as SmartfileRemote from './smartfile.remote';

export { Smartfile, ISmartfileConstructorOptions } from './smartfile.classes.smartfile';
export { VirtualDirectory } from './smartfile.classes.virtualdirectory';

export let fs = SmartfileFs;
export let interpreter = SmartfileInterpreter;
export let memory = SmartfileMemory;
export let remote = SmartfileRemote;
