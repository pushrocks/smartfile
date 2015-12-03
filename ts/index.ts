/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./smartfile.plugins.ts" />
/// <reference path="./smartfile.simple.ts" />
/// <reference path="./smartfile.vinyl.ts" />
var plugins = SmartfilePlugins.init();


var smartfile:any = {};
SmartfileSimple.init(smartfile);
SmartfileVinyl.init(smartfile);




module.exports = smartfile;
