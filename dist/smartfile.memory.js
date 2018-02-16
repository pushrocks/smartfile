"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-global");
const plugins = require("./smartfile.plugins");
const smartfile_classes_smartfile_1 = require("./smartfile.classes.smartfile");
const smartfileFs = require("./smartfile.fs");
const SmartfileInterpreter = require("./smartfile.interpreter");
/**
 * converts file to Object
 * @param fileStringArg
 * @param fileTypeArg
 * @returns {any|any}
 */
exports.toObject = function (fileStringArg, fileTypeArg) {
    return SmartfileInterpreter.objectFile(fileStringArg, fileTypeArg);
};
/**
 * writes string or Smartfile to disk.
 * @param fileArg
 * @param fileNameArg
 * @param fileBaseArg
 */
exports.toFs = (fileContentArg, filePathArg, optionsArg = {}) => __awaiter(this, void 0, void 0, function* () {
    let done = plugins.q.defer();
    // check args
    if (!fileContentArg || !filePathArg) {
        throw new Error('expected valid arguments');
    }
    // prepare actual write action
    let fileString;
    let filePath = filePathArg;
    // handle Smartfile
    if (fileContentArg instanceof smartfile_classes_smartfile_1.Smartfile) {
        let fileContentArg2 = fileContentArg;
        fileString = fileContentArg.contentBuffer.toString();
        // handle options
        if (optionsArg.respectRelative) {
            filePath = plugins.path.join(filePath, fileContentArg.path);
        }
    }
    else if (typeof fileContentArg === 'string') {
        fileString = fileContentArg;
    }
    else {
        throw new Error('fileContent is neither string nor Smartfile');
    }
    yield smartfileFs.ensureDir(plugins.path.parse(filePath).dir);
    plugins.fsExtra.writeFile(filePath, fileString, { encoding: 'utf8' }, done.resolve);
    return yield done.promise;
});
/**
 * writes a string or a Smartfile to disk synchronously, only supports string
 * @param fileArg
 * @param filePathArg
 */
exports.toFsSync = function (fileArg, filePathArg) {
    // function checks to abort if needed
    if (!fileArg || !filePathArg) {
        throw new Error('expected a valid arguments');
    }
    // prepare actual write action
    let fileString;
    let filePath = filePathArg;
    if (typeof fileArg !== 'string') {
        throw new Error('fileArg is not of type String.');
    }
    else if (typeof fileArg === 'string') {
        fileString = fileArg;
    }
    plugins.fsExtra.writeFileSync(filePath, fileString, { encoding: 'utf8' });
};
exports.smartfileArrayToFs = (smartfileArrayArg, dirArg) => __awaiter(this, void 0, void 0, function* () {
    yield smartfileFs.ensureDir(dirArg);
    for (let smartfile of smartfileArrayArg) {
        yield exports.toFs(smartfile, dirArg, {
            respectRelative: true
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLm1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDBCQUF1QjtBQUV2QiwrQ0FBK0M7QUFDL0MsK0VBQXlEO0FBQ3pELDhDQUE2QztBQUc3QyxnRUFBZ0U7QUFFaEU7Ozs7O0dBS0c7QUFDUSxRQUFBLFFBQVEsR0FBRyxVQUFVLGFBQXFCLEVBQUUsV0FBbUI7SUFDeEUsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUE7QUFDcEUsQ0FBQyxDQUFBO0FBTUQ7Ozs7O0dBS0c7QUFDUSxRQUFBLElBQUksR0FBRyxDQUFPLGNBQWtDLEVBQUUsV0FBVyxFQUFFLGFBQTJCLEVBQUUsRUFBRyxFQUFFO0lBQzFHLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFFNUIsYUFBYTtJQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUE7SUFDN0MsQ0FBQztJQUVELDhCQUE4QjtJQUM5QixJQUFJLFVBQWtCLENBQUE7SUFDdEIsSUFBSSxRQUFRLEdBQVcsV0FBVyxDQUFBO0lBRWxDLG1CQUFtQjtJQUNuQixFQUFFLENBQUMsQ0FBQyxjQUFjLFlBQVksdUNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsSUFBSSxlQUFlLEdBQVEsY0FBYyxDQUFBO1FBQ3pDLFVBQVUsR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3BELGlCQUFpQjtRQUNqQixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMvQixRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3RCxDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLGNBQWMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzlDLFVBQVUsR0FBRyxjQUFjLENBQUE7SUFDN0IsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFDRCxNQUFNLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDN0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDakYsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUMzQixDQUFDLENBQUEsQ0FBQTtBQUVEOzs7O0dBSUc7QUFDUSxRQUFBLFFBQVEsR0FBRyxVQUFVLE9BQWUsRUFBRSxXQUFtQjtJQUNsRSxxQ0FBcUM7SUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0lBRUQsOEJBQThCO0lBQzlCLElBQUksVUFBa0IsQ0FBQTtJQUN0QixJQUFJLFFBQVEsR0FBVyxXQUFXLENBQUE7SUFFbEMsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFVBQVUsR0FBRyxPQUFPLENBQUE7SUFDdEIsQ0FBQztJQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQTtBQUN6RSxDQUFDLENBQUE7QUFFVSxRQUFBLGtCQUFrQixHQUFHLENBQU8saUJBQThCLEVBQUUsTUFBYyxFQUFFLEVBQUU7SUFDdkYsTUFBTSxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksU0FBUyxJQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUN4QyxNQUFNLFlBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFO1lBQzVCLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQSJ9