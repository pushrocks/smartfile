"use strict";
require("typings-global");
var plugins = require("./smartfile.plugins");
module.exports = function (fileStringArg, fileTypeArg) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNtYXJ0ZmlsZS5pbnRlcnByZXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsUUFBTyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRXhCLElBQU8sT0FBTyxXQUFXLHFCQUFxQixDQUFDLENBQUM7QUFFaEQsaUJBQVMsVUFBUyxhQUFvQixFQUFFLFdBQVc7SUFDL0MsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFLLEtBQUssQ0FBRTtRQUNaLEtBQUssTUFBTTtZQUNQLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxLQUFLLE1BQU07WUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQztZQUNJLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLENBQUM7WUFDNUUsS0FBSyxDQUFDO0lBQ2QsQ0FBQztBQUNMLENBQUMsQ0FBQSIsImZpbGUiOiJzbWFydGZpbGUuaW50ZXJwcmV0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xyXG5cclxuaW1wb3J0IHBsdWdpbnMgPSByZXF1aXJlKFwiLi9zbWFydGZpbGUucGx1Z2luc1wiKTtcclxuXHJcbmV4cG9ydCA9IGZ1bmN0aW9uKGZpbGVTdHJpbmdBcmc6c3RyaW5nLCBmaWxlVHlwZUFyZyl7XHJcbiAgICBzd2l0Y2ggKGZpbGVUeXBlQXJnKSB7XHJcbiAgICAgICAgY2FzZSBcInltbFwiIDpcclxuICAgICAgICBjYXNlIFwieWFtbFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gcGx1Z2lucy55YW1sLnNhZmVMb2FkKGZpbGVTdHJpbmdBcmcpO1xyXG4gICAgICAgIGNhc2UgXCJqc29uXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGZpbGVTdHJpbmdBcmcpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmVycm9yKFwiZmlsZSB0eXBlIFwiICsgZmlsZVR5cGVBcmcuYmx1ZSArIFwiIG5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59Il19
