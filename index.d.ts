/// <reference path="ts/typings/main.d.ts" />
declare module SmartfilePlugins {
    var init: () => {
        beautylog: any;
        fs: any;
        path: any;
        vinyl: any;
        vinylFile: any;
        yaml: any;
        requireReload: any;
    };
}
declare module SmartfileSimple {
    var init: (objectArg: any) => void;
}
declare module SmartfileVinyl {
    var init: (objectArg: any) => void;
}
declare module SmartfileRequire {
    var init: (objectArg: any) => void;
}
declare var plugins: {
    beautylog: any;
    fs: any;
    path: any;
    vinyl: any;
    vinylFile: any;
    yaml: any;
    requireReload: any;
};
declare var smartfile: any;
