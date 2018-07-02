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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLm1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUErQztBQUMvQywrRUFBeUQ7QUFDekQsOENBQTZDO0FBRzdDLGdFQUFnRTtBQUVoRTs7Ozs7R0FLRztBQUNRLFFBQUEsUUFBUSxHQUFHLFVBQVUsYUFBcUIsRUFBRSxXQUFtQjtJQUN4RSxPQUFPLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUE7QUFDcEUsQ0FBQyxDQUFBO0FBTUQ7Ozs7O0dBS0c7QUFDUSxRQUFBLElBQUksR0FBRyxDQUFPLGNBQWtDLEVBQUUsV0FBVyxFQUFFLGFBQTJCLEVBQUUsRUFBRyxFQUFFO0lBQzFHLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUE7SUFFdkMsYUFBYTtJQUNiLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0tBQzVDO0lBRUQsOEJBQThCO0lBQzlCLElBQUksVUFBa0IsQ0FBQTtJQUN0QixJQUFJLFFBQVEsR0FBVyxXQUFXLENBQUE7SUFFbEMsbUJBQW1CO0lBQ25CLElBQUksY0FBYyxZQUFZLHVDQUFTLEVBQUU7UUFDdkMsSUFBSSxlQUFlLEdBQVEsY0FBYyxDQUFBO1FBQ3pDLFVBQVUsR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3BELGlCQUFpQjtRQUNqQixJQUFJLFVBQVUsQ0FBQyxlQUFlLEVBQUU7WUFDOUIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDNUQ7S0FDRjtTQUFNLElBQUksT0FBTyxjQUFjLEtBQUssUUFBUSxFQUFFO1FBQzdDLFVBQVUsR0FBRyxjQUFjLENBQUE7S0FDNUI7U0FBTTtRQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtLQUMvRDtJQUNELE1BQU0sV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM3RCxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNqRixPQUFPLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUMzQixDQUFDLENBQUEsQ0FBQTtBQUVEOzs7O0dBSUc7QUFDUSxRQUFBLFFBQVEsR0FBRyxVQUFVLE9BQWUsRUFBRSxXQUFtQjtJQUNsRSxxQ0FBcUM7SUFDckMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUE7S0FDOUM7SUFFRCw4QkFBOEI7SUFDOUIsSUFBSSxVQUFrQixDQUFBO0lBQ3RCLElBQUksUUFBUSxHQUFXLFdBQVcsQ0FBQTtJQUVsQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUE7S0FDbEQ7U0FBTSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUN0QyxVQUFVLEdBQUcsT0FBTyxDQUFBO0tBQ3JCO0lBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFBO0FBQ3pFLENBQUMsQ0FBQTtBQUVVLFFBQUEsa0JBQWtCLEdBQUcsQ0FBTyxpQkFBOEIsRUFBRSxNQUFjLEVBQUUsRUFBRTtJQUN2RixNQUFNLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbkMsS0FBSyxJQUFJLFNBQVMsSUFBSSxpQkFBaUIsRUFBRTtRQUN2QyxNQUFNLFlBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFO1lBQzVCLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQTtLQUNIO0FBQ0gsQ0FBQyxDQUFBLENBQUEifQ==