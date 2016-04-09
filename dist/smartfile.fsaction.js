/// <reference path="./typings/main.d.ts" />
"use strict";
var plugins = require("./smartfile.plugins");
exports.copy = function (fromArg, toArg) {
    var done = plugins.q.defer();
    plugins.fs.copy(fromArg, toArg, {}, function () {
        done.resolve();
    });
    return done.promise;
};
exports.copySync = function (fromArg, toArg) {
    plugins.fs.copySync(fromArg, toArg);
    return true;
};
exports.remove = function (pathArg) {
    var done = plugins.q.defer();
    plugins.fs.remove(pathArg, function () {
        done.resolve();
    });
    return done.promise;
};
exports.removeSync = function (pathArg) {
    plugins.fs.removeSync(pathArg);
    return true;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNtYXJ0ZmlsZS5mc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0Q0FBNEM7O0FBRTVDLElBQU8sT0FBTyxXQUFXLHFCQUFxQixDQUFDLENBQUM7QUFHckMsWUFBSSxHQUFHLFVBQVMsT0FBYyxFQUFFLEtBQVk7SUFDbkQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQztRQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFUyxnQkFBUSxHQUFHLFVBQVMsT0FBYyxFQUFDLEtBQVk7SUFDdEQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBRVMsY0FBTSxHQUFHLFVBQVMsT0FBYztJQUN2QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQztRQUN0QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFUyxrQkFBVSxHQUFHLFVBQVMsT0FBYztJQUMzQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyIsImZpbGUiOiJzbWFydGZpbGUuZnNhY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL21haW4uZC50c1wiIC8+XG5cbmltcG9ydCBwbHVnaW5zID0gcmVxdWlyZShcIi4vc21hcnRmaWxlLnBsdWdpbnNcIik7XG5pbXBvcnQgU21hcnRmaWxlQ2hlY2tzID0gcmVxdWlyZShcIi4vc21hcnRmaWxlLmNoZWNrc1wiKTtcblxuZXhwb3J0IGxldCBjb3B5ID0gZnVuY3Rpb24oZnJvbUFyZzpzdHJpbmcsIHRvQXJnOnN0cmluZyl7XG4gICAgdmFyIGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcbiAgICBwbHVnaW5zLmZzLmNvcHkoZnJvbUFyZyx0b0FyZyx7fSxmdW5jdGlvbigpe1xuICAgICAgICBkb25lLnJlc29sdmUoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufTtcblxuZXhwb3J0IGxldCBjb3B5U3luYyA9IGZ1bmN0aW9uKGZyb21Bcmc6c3RyaW5nLHRvQXJnOnN0cmluZyk6Ym9vbGVhbntcbiAgICBwbHVnaW5zLmZzLmNvcHlTeW5jKGZyb21BcmcsdG9BcmcpO1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGxldCByZW1vdmUgPSBmdW5jdGlvbihwYXRoQXJnOnN0cmluZyl7XG4gICAgdmFyIGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcbiAgICBwbHVnaW5zLmZzLnJlbW92ZShwYXRoQXJnLGZ1bmN0aW9uKCl7XG4gICAgICAgIGRvbmUucmVzb2x2ZSgpO1xuICAgIH0pO1xuICAgIHJldHVybiBkb25lLnByb21pc2U7XG59O1xuXG5leHBvcnQgbGV0IHJlbW92ZVN5bmMgPSBmdW5jdGlvbihwYXRoQXJnOnN0cmluZyk6Ym9vbGVhbntcbiAgICBwbHVnaW5zLmZzLnJlbW92ZVN5bmMocGF0aEFyZyk7XG4gICAgcmV0dXJuIHRydWU7XG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==