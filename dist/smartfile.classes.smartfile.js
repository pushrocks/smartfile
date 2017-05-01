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
     */
    write() {
        return __awaiter(this, void 0, void 0, function* () {
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
}
exports.Smartfile = Smartfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmNsYXNzZXMuc21hcnRmaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmNsYXNzZXMuc21hcnRmaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFTOUM7OztHQUdHO0FBQ0g7SUFxQkU7OztPQUdHO0lBQ0gsWUFBYSxVQUF3QztRQUNuRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUE7UUFDL0MsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3RELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtRQUN6QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFBO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQTtJQUM3QixDQUFDO0lBR0Q7OztPQUdHO0lBQ0gscUJBQXFCLENBQUMsYUFBcUI7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDRyxLQUFLOztRQUVYLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0csSUFBSTs7UUFDVixDQUFDO0tBQUE7SUFFRCxrREFBa0Q7SUFDbEQsc0JBQXNCO0lBQ3RCLGtEQUFrRDtJQUNsRDs7T0FFRztJQUNILElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFBO0lBQzNCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBRSxXQUFXO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFBO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksR0FBRztRQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxRQUFRO1FBQ1YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFDSixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQTtJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVE7UUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxZQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2QsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2QsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2QsQ0FBQztJQUVELFVBQVU7UUFDUixNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2QsQ0FBQztDQUNGO0FBckhELDhCQXFIQyJ9