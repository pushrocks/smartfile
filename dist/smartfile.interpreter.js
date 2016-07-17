"use strict";
require("typings-global");
const plugins = require("./smartfile.plugins");
exports.filetype = (pathArg) => {
    let extName = plugins.path.extname(pathArg);
    let fileType = extName.replace(/\.([a-z]*)/, "$1"); //remove . form fileType
    return fileType;
};
exports.objectFile = (fileStringArg, fileTypeArg) => {
    switch (fileTypeArg) {
        case "yml":
        case "yaml":
            return plugins.yaml.safeLoad(fileStringArg);
        case "json":
            return JSON.parse(fileStringArg);
        default:
            plugins.beautylog.error("file type " + fileTypeArg.blue + " not supported");
            break;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLmludGVycHJldGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRmaWxlLmludGVycHJldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFPLGdCQUFnQixDQUFDLENBQUE7QUFFeEIsTUFBTyxPQUFPLFdBQVcscUJBQXFCLENBQUMsQ0FBQztBQUVyQyxnQkFBUSxHQUFHLENBQUMsT0FBYztJQUNqQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtJQUMzRSxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVTLGtCQUFVLEdBQUcsQ0FBQyxhQUFvQixFQUFFLFdBQVc7SUFDdEQsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFLLEtBQUssQ0FBRTtRQUNaLEtBQUssTUFBTTtZQUNQLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxLQUFLLE1BQU07WUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQztZQUNJLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLENBQUM7WUFDNUUsS0FBSyxDQUFDO0lBQ2QsQ0FBQztBQUNMLENBQUMsQ0FBQSJ9