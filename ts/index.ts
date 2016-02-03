/// <reference path="./typings/main.d.ts" />
/// <reference path="./smartfile.plugins.ts" />
/// <reference path="./smartfile.simple.ts" />
/// <reference path="./smartfile.vinyl.ts" />
/// <reference path="./smartfile.require.ts" />
var plugins = SmartfilePlugins.init();


var smartfile:any = {};
SmartfileSimple.init(smartfile);
SmartfileVinyl.init(smartfile);
SmartfileRequire.init(smartfile);




module.exports = smartfile;
