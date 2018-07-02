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
        return __awaiter(this, void 0, void 0, function* () {
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmNsYXNzZXMuc21hcnRmaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmNsYXNzZXMuc21hcnRmaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFFOUMsNkNBQTRDO0FBUzVDOzs7R0FHRztBQUNIO0lBMkJFOzs7T0FHRztJQUdILFlBQWEsVUFBd0M7UUFDbkQsSUFBSSxVQUFVLENBQUMsYUFBYSxFQUFFO1lBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQTtTQUM5QzthQUFNLElBQUksVUFBVSxDQUFDLGFBQWEsRUFBRTtZQUNuQyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1NBQ3JEO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUE7U0FDeEM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUE7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFBO0lBQzdCLENBQUM7SUFHRDs7O09BR0c7SUFDSCxxQkFBcUIsQ0FBQyxhQUFxQjtRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0csS0FBSyxDQUFFLE9BQWdCOztZQUMzQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQ25ELE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdDLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0csSUFBSTs7UUFDVixDQUFDO0tBQUE7SUFFRCxrREFBa0Q7SUFDbEQsc0JBQXNCO0lBQ3RCLGtEQUFrRDtJQUNsRDs7T0FFRztJQUNILElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQTtJQUMzQixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUUsV0FBVztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQTtJQUNsQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLEdBQUc7UUFDTCxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFFBQVE7UUFDVixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQTtTQUNaO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxZQUFZLE1BQU0sRUFBRTtZQUNuQyxPQUFPLElBQUksQ0FBQTtTQUNaO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLGNBQWMsQ0FBRSxXQUFtQjtRQUNqQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQTtRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsRUFBQyxXQUFXLENBQUMsQ0FBQTtJQUMxRSxDQUFDO0NBQ0Y7QUF2SUQsOEJBdUlDIn0=