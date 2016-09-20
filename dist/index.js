"use strict";
require("typings-global");
const SmartfileFs = require("./smartfile.fs");
const SmartfileInterpreter = require("./smartfile.interpreter");
const SmartfileMemory = require("./smartfile.memory");
const SmartfileRemote = require("./smartfile.remote");
var smartfile_classes_smartfile_1 = require("./smartfile.classes.smartfile");
exports.Smartfile = smartfile_classes_smartfile_1.Smartfile;
exports.fs = SmartfileFs;
exports.interpreter = SmartfileInterpreter;
exports.memory = SmartfileMemory;
exports.remote = SmartfileRemote;
exports.requireReload = SmartfileFs.requireReload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXdCO0FBR3hCLDhDQUE4QztBQUM5QyxnRUFBK0Q7QUFDL0Qsc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUV0RCw2RUFBd0Q7QUFBaEQsa0RBQUEsU0FBUyxDQUFBO0FBRU4sUUFBQSxFQUFFLEdBQUcsV0FBVyxDQUFDO0FBQ2pCLFFBQUEsV0FBVyxHQUFHLG9CQUFvQixDQUFDO0FBQ25DLFFBQUEsTUFBTSxHQUFHLGVBQWUsQ0FBQztBQUN6QixRQUFBLE1BQU0sR0FBRyxlQUFlLENBQUM7QUFDekIsUUFBQSxhQUFhLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyJ9