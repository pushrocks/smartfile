"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-global");
const plugins = require("./smartfile.plugins");
exports.filetype = (pathArg) => {
    let extName = plugins.path.extname(pathArg);
    let fileType = extName.replace(/\.([a-z]*)/, '$1'); // remove . form fileType
    return fileType;
};
exports.objectFile = (fileStringArg, fileTypeArg) => {
    switch (fileTypeArg) {
        case 'yml':
        case 'yaml':
            return plugins.yaml.safeLoad(fileStringArg);
        case 'json':
            return JSON.parse(fileStringArg);
        default:
            console.error('file type ' + fileTypeArg.blue + ' not supported');
            break;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmludGVycHJldGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmludGVycHJldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQXVCO0FBRXZCLCtDQUErQztBQUVwQyxRQUFBLFFBQVEsR0FBRyxDQUFDLE9BQWU7SUFDbEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDM0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyx5QkFBeUI7SUFDM0UsTUFBTSxDQUFDLFFBQVEsQ0FBQTtBQUNuQixDQUFDLENBQUE7QUFFVSxRQUFBLFVBQVUsR0FBRyxDQUFDLGFBQXFCLEVBQUUsV0FBVztJQUN2RCxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssS0FBSyxDQUFFO1FBQ1osS0FBSyxNQUFNO1lBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQy9DLEtBQUssTUFBTTtZQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3BDO1lBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ2pFLEtBQUssQ0FBQTtJQUNiLENBQUM7QUFDTCxDQUFDLENBQUEifQ==