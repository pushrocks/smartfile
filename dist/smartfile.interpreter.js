/// <reference path="./typings/main.d.ts" />
"use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNtYXJ0ZmlsZS5pbnRlcnByZXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0Q0FBNEM7O0FBRTVDLElBQU8sT0FBTyxXQUFXLHFCQUFxQixDQUFDLENBQUM7QUFFaEQsaUJBQVMsVUFBUyxhQUFvQixFQUFFLFdBQVc7SUFDL0MsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFLLEtBQUssQ0FBRTtRQUNaLEtBQUssTUFBTTtZQUNQLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxLQUFLLE1BQU07WUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQztZQUNJLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLENBQUM7WUFDNUUsS0FBSyxDQUFDO0lBQ2QsQ0FBQztBQUNMLENBQUMsQ0FBQSIsImZpbGUiOiJzbWFydGZpbGUuaW50ZXJwcmV0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL21haW4uZC50c1wiIC8+XG5cbmltcG9ydCBwbHVnaW5zID0gcmVxdWlyZShcIi4vc21hcnRmaWxlLnBsdWdpbnNcIik7XG5cbmV4cG9ydCA9IGZ1bmN0aW9uKGZpbGVTdHJpbmdBcmc6c3RyaW5nLCBmaWxlVHlwZUFyZyl7XG4gICAgc3dpdGNoIChmaWxlVHlwZUFyZykge1xuICAgICAgICBjYXNlIFwieW1sXCIgOlxuICAgICAgICBjYXNlIFwieWFtbFwiOlxuICAgICAgICAgICAgcmV0dXJuIHBsdWdpbnMueWFtbC5zYWZlTG9hZChmaWxlU3RyaW5nQXJnKTtcbiAgICAgICAgY2FzZSBcImpzb25cIjpcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGZpbGVTdHJpbmdBcmcpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cuZXJyb3IoXCJmaWxlIHR5cGUgXCIgKyBmaWxlVHlwZUFyZy5ibHVlICsgXCIgbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn0iXX0=
