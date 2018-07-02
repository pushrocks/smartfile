"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmludGVycHJldGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmludGVycHJldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQStDO0FBRXBDLFFBQUEsUUFBUSxHQUFHLENBQUMsT0FBZSxFQUFVLEVBQUU7SUFDOUMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDM0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyx5QkFBeUI7SUFDM0UsT0FBTyxRQUFRLENBQUE7QUFDbkIsQ0FBQyxDQUFBO0FBRVUsUUFBQSxVQUFVLEdBQUcsQ0FBQyxhQUFxQixFQUFFLFdBQVcsRUFBRSxFQUFFO0lBQzNELFFBQVEsV0FBVyxFQUFFO1FBQ2pCLEtBQUssS0FBSyxDQUFFO1FBQ1osS0FBSyxNQUFNO1lBQ1AsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUMvQyxLQUFLLE1BQU07WUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDcEM7WUFDSSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLENBQUE7WUFDakUsTUFBSztLQUNaO0FBQ0wsQ0FBQyxDQUFBIn0=