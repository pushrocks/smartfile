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
    let done = plugins.smartpromise.defer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLm1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUFnRDtBQUNoRCwrRUFBMEQ7QUFDMUQsOENBQThDO0FBRTlDLGdFQUFpRTtBQUVqRTs7Ozs7R0FLRztBQUNRLFFBQUEsUUFBUSxHQUFHLFVBQVMsYUFBcUIsRUFBRSxXQUFtQjtJQUN2RSxPQUFPLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDckUsQ0FBQyxDQUFDO0FBTUY7Ozs7O0dBS0c7QUFDUSxRQUFBLElBQUksR0FBRyxDQUNoQixjQUFrQyxFQUNsQyxXQUFXLEVBQ1gsYUFBMkIsRUFBRSxFQUM3QixFQUFFO0lBQ0YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUV4QyxhQUFhO0lBQ2IsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7S0FDN0M7SUFFRCw4QkFBOEI7SUFDOUIsSUFBSSxVQUFrQixDQUFDO0lBQ3ZCLElBQUksUUFBUSxHQUFXLFdBQVcsQ0FBQztJQUVuQyxtQkFBbUI7SUFDbkIsSUFBSSxjQUFjLFlBQVksdUNBQVMsRUFBRTtRQUN2QyxJQUFJLGVBQWUsR0FBUSxjQUFjLENBQUM7UUFDMUMsVUFBVSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckQsaUJBQWlCO1FBQ2pCLElBQUksVUFBVSxDQUFDLGVBQWUsRUFBRTtZQUM5QixRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3RDtLQUNGO1NBQU0sSUFBSSxPQUFPLGNBQWMsS0FBSyxRQUFRLEVBQUU7UUFDN0MsVUFBVSxHQUFHLGNBQWMsQ0FBQztLQUM3QjtTQUFNO1FBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0tBQ2hFO0lBQ0QsTUFBTSxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlELE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BGLE9BQU8sTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzVCLENBQUMsQ0FBQSxDQUFDO0FBRUY7Ozs7R0FJRztBQUNRLFFBQUEsUUFBUSxHQUFHLFVBQVMsT0FBZSxFQUFFLFdBQW1CO0lBQ2pFLHFDQUFxQztJQUNyQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztLQUMvQztJQUVELDhCQUE4QjtJQUM5QixJQUFJLFVBQWtCLENBQUM7SUFDdkIsSUFBSSxRQUFRLEdBQVcsV0FBVyxDQUFDO0lBRW5DLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztLQUNuRDtTQUFNLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQ3RDLFVBQVUsR0FBRyxPQUFPLENBQUM7S0FDdEI7SUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDNUUsQ0FBQyxDQUFDO0FBRVMsUUFBQSxrQkFBa0IsR0FBRyxDQUFPLGlCQUE4QixFQUFFLE1BQWMsRUFBRSxFQUFFO0lBQ3ZGLE1BQU0sV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxLQUFLLElBQUksU0FBUyxJQUFJLGlCQUFpQixFQUFFO1FBQ3ZDLE1BQU0sWUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUU7WUFDNUIsZUFBZSxFQUFFLElBQUk7U0FDdEIsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDLENBQUEsQ0FBQyJ9