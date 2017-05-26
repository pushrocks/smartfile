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
 * writes string or vinyl file to disk.
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
        optionsArg.respectRelative ? filePath = plugins.path.join(filePath, fileContentArg.path) : null;
    }
    else if (typeof fileContentArg === 'string') {
        fileString = fileContentArg;
    }
    else {
        throw new Error('fileContent is neither string nor Smartfile');
    }
    plugins.fsExtra.writeFile(filePath, fileString, 'utf8', done.resolve);
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
    plugins.fsExtra.writeFileSync(filePath, fileString, 'utf8');
};
exports.smartfileArrayToFs = (smartfileArrayArg, dirArg) => __awaiter(this, void 0, void 0, function* () {
    yield smartfileFs.ensureDir(dirArg);
    for (let smartfile of smartfileArrayArg) {
        yield exports.toFs(smartfile, dirArg, {
            respectRelative: true
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLm1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDBCQUF1QjtBQUV2QiwrQ0FBK0M7QUFDL0MsK0VBQXlEO0FBQ3pELDhDQUE2QztBQUc3QyxnRUFBZ0U7QUFFaEU7Ozs7O0dBS0c7QUFDUSxRQUFBLFFBQVEsR0FBRyxVQUFVLGFBQXFCLEVBQUUsV0FBbUI7SUFDeEUsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUE7QUFDcEUsQ0FBQyxDQUFBO0FBTUQ7Ozs7O0dBS0c7QUFDUSxRQUFBLElBQUksR0FBRyxDQUFPLGNBQWtDLEVBQUUsV0FBVyxFQUFFLGFBQTJCLEVBQUU7SUFDckcsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUU1QixhQUFhO0lBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBRUQsOEJBQThCO0lBQzlCLElBQUksVUFBa0IsQ0FBQTtJQUN0QixJQUFJLFFBQVEsR0FBVyxXQUFXLENBQUE7SUFFbEMsbUJBQW1CO0lBQ25CLEVBQUUsQ0FBQyxDQUFDLGNBQWMsWUFBWSx1Q0FBUyxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFJLGVBQWUsR0FBUSxjQUFjLENBQUE7UUFDekMsVUFBVSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFcEQsaUJBQWlCO1FBQ2pCLFVBQVUsQ0FBQyxlQUFlLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFBO0lBQ2pHLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFjLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM5QyxVQUFVLEdBQUcsY0FBYyxDQUFBO0lBQzdCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3JFLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDM0IsQ0FBQyxDQUFBLENBQUE7QUFFRDs7OztHQUlHO0FBQ1EsUUFBQSxRQUFRLEdBQUcsVUFBVSxPQUFlLEVBQUUsV0FBbUI7SUFDbEUscUNBQXFDO0lBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUVELDhCQUE4QjtJQUM5QixJQUFJLFVBQWtCLENBQUE7SUFDdEIsSUFBSSxRQUFRLEdBQVcsV0FBVyxDQUFBO0lBRWxDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN2QyxVQUFVLEdBQUcsT0FBTyxDQUFBO0lBQ3RCLENBQUM7SUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQzdELENBQUMsQ0FBQTtBQUVVLFFBQUEsa0JBQWtCLEdBQUcsQ0FBTyxpQkFBOEIsRUFBRSxNQUFjO0lBQ25GLE1BQU0sV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNuQyxHQUFHLENBQUEsQ0FBQyxJQUFJLFNBQVMsSUFBSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDdkMsTUFBTSxZQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRTtZQUM1QixlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUEifQ==