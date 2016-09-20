"use strict";
require("typings-global");
exports.beautylog = require("beautylog");
exports.fs = require("fs");
exports.fsExtra = require("fs-extra");
exports.gulp = require('gulp');
exports.glob = require('glob');
exports.g = {
    remoteSrc: require('gulp-remote-src')
};
exports.path = require("path");
exports.q = require("q");
exports.vinyl = require("vinyl");
exports.vinylFile = require('vinyl-file');
exports.yaml = require('js-yaml');
exports.request = require('request');
exports.requireReload = require('require-reload');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLnBsdWdpbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGZpbGUucGx1Z2lucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXVCO0FBQ3ZCLHlDQUE4QztBQUM5QywyQkFBZ0M7QUFDaEMsc0NBQTJDO0FBQ2hDLFFBQUEsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUN0QixRQUFBLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDdEIsUUFBQSxDQUFDLEdBQUc7SUFDWCxTQUFTLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0NBQ3hDLENBQUE7QUFDRCwrQkFBb0M7QUFDcEMseUJBQThCO0FBQzlCLGlDQUFzQztBQUMzQixRQUFBLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDakMsUUFBQSxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQ3pCLFFBQUEsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUM1QixRQUFBLGFBQWEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQSJ9