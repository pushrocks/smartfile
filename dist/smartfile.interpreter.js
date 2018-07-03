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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmludGVycHJldGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmludGVycHJldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQWdEO0FBRXJDLFFBQUEsUUFBUSxHQUFHLENBQUMsT0FBZSxFQUFVLEVBQUU7SUFDaEQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7SUFDN0UsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBRVMsUUFBQSxVQUFVLEdBQUcsQ0FBQyxhQUFxQixFQUFFLFdBQVcsRUFBRSxFQUFFO0lBQzdELFFBQVEsV0FBVyxFQUFFO1FBQ25CLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxNQUFNO1lBQ1QsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QyxLQUFLLE1BQU07WUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkM7WUFDRSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLENBQUM7WUFDbEUsTUFBTTtLQUNUO0FBQ0gsQ0FBQyxDQUFDIn0=