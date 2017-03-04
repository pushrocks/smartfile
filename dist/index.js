"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUF1QjtBQUd2Qiw4Q0FBNkM7QUFDN0MsZ0VBQStEO0FBQy9ELHNEQUFxRDtBQUNyRCxzREFBcUQ7QUFFckQsNkVBQXVEO0FBQS9DLGtEQUFBLFNBQVMsQ0FBQTtBQUVOLFFBQUEsRUFBRSxHQUFHLFdBQVcsQ0FBQTtBQUNoQixRQUFBLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQTtBQUNsQyxRQUFBLE1BQU0sR0FBRyxlQUFlLENBQUE7QUFDeEIsUUFBQSxNQUFNLEdBQUcsZUFBZSxDQUFBO0FBQ3hCLFFBQUEsYUFBYSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUEifQ==