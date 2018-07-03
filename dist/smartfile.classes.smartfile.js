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
const memory = require("./smartfile.memory");
/**
 * class Smartfile
 * -> is vinyl file compatible
 */
class Smartfile {
    /**
     * the constructor of Smartfile
     * @param optionsArg
     */
    constructor(optionsArg) {
        if (optionsArg.contentBuffer) {
            this.contentBuffer = optionsArg.contentBuffer;
        }
        else if (optionsArg.contentString) {
            this.setContentsFromString(optionsArg.contentString);
        }
        else {
            console.log('created empty Smartfile?');
        }
        this.path = optionsArg.path;
        this.parsedPath = plugins.path.parse(this.path);
        this.base = optionsArg.base;
    }
    /**
     * set contents from string
     * @param contentString
     */
    setContentsFromString(contentString) {
        this.contents = new Buffer(contentString);
    }
    /**
     * write file to disk
     * Behaviours:
     * - no argument write to exactly where the file was picked up
     */
    write(pathArg) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringToWrite = this.contentBuffer.toString();
            yield memory.toFs(stringToWrite, this.path);
        });
    }
    /**
     * read file from disk
     */
    read() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // -----------------------------------------------
    // vinyl compatibility
    // -----------------------------------------------
    /**
     * vinyl-compatibility: alias of this.contentBuffer
     */
    get contents() {
        return this.contentBuffer;
    }
    set contents(contentsArg) {
        this.contentBuffer = contentsArg;
    }
    /**
     * vinyl-compatibility
     */
    get cwd() {
        return process.cwd();
    }
    /**
     * return relative path of file
     */
    get relative() {
        return plugins.path.relative(this.base, this.path);
    }
    /**
     * return truw when the file has content
     */
    isNull() {
        if (!this.contentBuffer) {
            return true;
        }
        return false;
    }
    /**
     * return true if contents are Buffer
     */
    isBuffer() {
        if (this.contents instanceof Buffer) {
            return true;
        }
        return false;
    }
    isDirectory() {
        return false;
    }
    isStream() {
        return false;
    }
    isSymbolic() {
        return false;
    }
    // update things
    updateFileName(fileNameArg) {
        let oldFileName = this.parsedPath.base;
        this.path = this.path.replace(new RegExp(oldFileName + '$'), fileNameArg);
    }
}
exports.Smartfile = Smartfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmNsYXNzZXMuc21hcnRmaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmNsYXNzZXMuc21hcnRmaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBK0M7QUFFL0MsNkNBQTZDO0FBUzdDOzs7R0FHRztBQUNIO0lBMkJFOzs7T0FHRztJQUVILFlBQVksVUFBd0M7UUFDbEQsSUFBSSxVQUFVLENBQUMsYUFBYSxFQUFFO1lBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztTQUMvQzthQUFNLElBQUksVUFBVSxDQUFDLGFBQWEsRUFBRTtZQUNuQyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDekM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxxQkFBcUIsQ0FBQyxhQUFxQjtRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0csS0FBSyxDQUFDLE9BQWdCOztZQUMxQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BELE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0csSUFBSTs4REFBSSxDQUFDO0tBQUE7SUFFZixrREFBa0Q7SUFDbEQsc0JBQXNCO0lBQ3RCLGtEQUFrRDtJQUNsRDs7T0FFRztJQUNILElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsV0FBVztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLEdBQUc7UUFDTCxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFFBQVE7UUFDVixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxZQUFZLE1BQU0sRUFBRTtZQUNuQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLGNBQWMsQ0FBQyxXQUFtQjtRQUNoQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM1RSxDQUFDO0NBQ0Y7QUFwSUQsOEJBb0lDIn0=