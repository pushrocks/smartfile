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
            this.contents = optionsArg.contentBuffer;
        }
        else if (optionsArg.contentsString) {
            this.contents = new Buffer(optionsArg.contentsString);
        }
        this.path = optionsArg.path;
    }
    /**
     * return relative path of file
     * ->
     */
    get relative() {
        return '';
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
}
exports.Smartfile = Smartfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmNsYXNzZXMuc21hcnRmaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmNsYXNzZXMuc21hcnRmaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFRQTs7O0dBR0c7QUFDSDtJQXFCRTs7O09BR0c7SUFDSCxZQUFhLFVBQXdDO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQTtRQUMxQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQ3ZELENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUE7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxFQUFFLENBQUE7SUFDWCxDQUFDO0lBR0Q7OztPQUdHO0lBQ0gscUJBQXFCLENBQUMsYUFBcUI7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDRyxLQUFLOztRQUVYLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0csSUFBSTs7UUFDVixDQUFDO0tBQUE7Q0FDRjtBQS9ERCw4QkErREMifQ==