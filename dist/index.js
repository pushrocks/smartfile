/// <reference path="./typings/main.d.ts" />
"use strict";
var plugins = require("./smartfile.plugins");
var SmartfileChecks = require("./smartfile.checks");
var SmartfileFsaction = require("./smartfile.fsaction");
var SmartfileGet = require("./smartfile.get");
var SmartfileLocal = require("./smartfile.local");
var SmartfileMemory = require("./smartfile.memory");
var SmartfileRemote = require("./smartfile.remote");
var smartfile = {
    fsaction: SmartfileFsaction,
    fs: plugins.fs,
    checks: SmartfileChecks,
    get: SmartfileGet,
    local: SmartfileLocal,
    memory: SmartfileMemory,
    remote: SmartfileRemote,
    requireReload: SmartfileLocal.requireReload
};
module.exports = smartfile;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRDQUE0Qzs7QUFFNUMsSUFBWSxPQUFPLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQUMvQyxJQUFZLGVBQWUsV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3RELElBQVksaUJBQWlCLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQUMxRCxJQUFZLFlBQVksV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELElBQVksY0FBYyxXQUFNLG1CQUFtQixDQUFDLENBQUE7QUFDcEQsSUFBWSxlQUFlLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUN0RCxJQUFZLGVBQWUsV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBR3RELElBQUksU0FBUyxHQUFHO0lBQ1osUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7SUFDZCxNQUFNLEVBQUUsZUFBZTtJQUN2QixHQUFHLEVBQUUsWUFBWTtJQUNqQixLQUFLLEVBQUUsY0FBYztJQUNyQixNQUFNLEVBQUUsZUFBZTtJQUN2QixNQUFNLEVBQUUsZUFBZTtJQUN2QixhQUFhLEVBQUUsY0FBYyxDQUFDLGFBQWE7Q0FDOUMsQ0FBQztBQUVGLGlCQUFTLFNBQVMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cblxuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9zbWFydGZpbGUucGx1Z2luc1wiO1xuaW1wb3J0ICogYXMgU21hcnRmaWxlQ2hlY2tzIGZyb20gXCIuL3NtYXJ0ZmlsZS5jaGVja3NcIjtcbmltcG9ydCAqIGFzIFNtYXJ0ZmlsZUZzYWN0aW9uIGZyb20gXCIuL3NtYXJ0ZmlsZS5mc2FjdGlvblwiO1xuaW1wb3J0ICogYXMgU21hcnRmaWxlR2V0IGZyb20gXCIuL3NtYXJ0ZmlsZS5nZXRcIjtcbmltcG9ydCAqIGFzIFNtYXJ0ZmlsZUxvY2FsIGZyb20gXCIuL3NtYXJ0ZmlsZS5sb2NhbFwiO1xuaW1wb3J0ICogYXMgU21hcnRmaWxlTWVtb3J5IGZyb20gXCIuL3NtYXJ0ZmlsZS5tZW1vcnlcIjtcbmltcG9ydCAqIGFzIFNtYXJ0ZmlsZVJlbW90ZSBmcm9tIFwiLi9zbWFydGZpbGUucmVtb3RlXCI7XG5cblxudmFyIHNtYXJ0ZmlsZSA9IHtcbiAgICBmc2FjdGlvbjogU21hcnRmaWxlRnNhY3Rpb24sXG4gICAgZnM6IHBsdWdpbnMuZnMsXG4gICAgY2hlY2tzOiBTbWFydGZpbGVDaGVja3MsXG4gICAgZ2V0OiBTbWFydGZpbGVHZXQsXG4gICAgbG9jYWw6IFNtYXJ0ZmlsZUxvY2FsLFxuICAgIG1lbW9yeTogU21hcnRmaWxlTWVtb3J5LFxuICAgIHJlbW90ZTogU21hcnRmaWxlUmVtb3RlLFxuICAgIHJlcXVpcmVSZWxvYWQ6IFNtYXJ0ZmlsZUxvY2FsLnJlcXVpcmVSZWxvYWRcbn07XG5cbmV4cG9ydCA9IHNtYXJ0ZmlsZTtcbiJdfQ==
