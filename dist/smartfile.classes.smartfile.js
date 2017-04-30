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
        return this.base;
    }
    /**
     * return relative path of file
     */
    get relative() {
        return this.path;
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
}
exports.Smartfile = Smartfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmNsYXNzZXMuc21hcnRmaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmNsYXNzZXMuc21hcnRmaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFTQTs7O0dBR0c7QUFDSDtJQXFCRTs7O09BR0c7SUFDSCxZQUFhLFVBQXdDO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQTtRQUMvQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDdEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO1FBQ3pDLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUE7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFBO0lBQzdCLENBQUM7SUFHRDs7O09BR0c7SUFDSCxxQkFBcUIsQ0FBQyxhQUFxQjtRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNHLEtBQUs7O1FBRVgsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDRyxJQUFJOztRQUNWLENBQUM7S0FBQTtJQUVELGtEQUFrRDtJQUNsRCxzQkFBc0I7SUFDdEIsa0RBQWtEO0lBQ2xEOztPQUVHO0lBQ0gsSUFBSSxRQUFRO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUE7SUFDM0IsQ0FBQztJQUNELElBQUksUUFBUSxDQUFFLFdBQVc7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUE7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxHQUFHO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxRQUFRO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNKLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLFlBQVksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBRUQsV0FBVztRQUNULE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFDZCxDQUFDO0NBQ0Y7QUFqSEQsOEJBaUhDIn0=