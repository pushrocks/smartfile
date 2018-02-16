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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmludGVycHJldGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmludGVycHJldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQXVCO0FBRXZCLCtDQUErQztBQUVwQyxRQUFBLFFBQVEsR0FBRyxDQUFDLE9BQWUsRUFBVSxFQUFFO0lBQzlDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzNDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxDQUFBLENBQUMseUJBQXlCO0lBQzNFLE1BQU0sQ0FBQyxRQUFRLENBQUE7QUFDbkIsQ0FBQyxDQUFBO0FBRVUsUUFBQSxVQUFVLEdBQUcsQ0FBQyxhQUFxQixFQUFFLFdBQVcsRUFBRSxFQUFFO0lBQzNELE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDbEIsS0FBSyxLQUFLLENBQUU7UUFDWixLQUFLLE1BQU07WUFDUCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDL0MsS0FBSyxNQUFNO1lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDcEM7WUFDSSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLENBQUE7WUFDakUsS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNMLENBQUMsQ0FBQSJ9