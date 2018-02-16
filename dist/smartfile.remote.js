"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-global");
const plugins = require("./smartfile.plugins");
/* export let toFs = function (from: string, toPath: string) {
  let done = plugins.q.defer()
  let stream = plugins.smartrequest(from).pipe(plugins.fsExtra.createWriteStream(toPath))
  stream.on('finish', function () {
    done.resolve(toPath)
  })
  return done.promise
} */
/**
 *
 * @param fromArg
 * @returns {any}
 */
exports.toObject = function (fromArg) {
    let done = plugins.q.defer();
    plugins.smartrequest.request(fromArg, {
        method: 'get'
    }).then((res) => {
        if (res.statusCode === 200) {
            done.resolve(res.body);
        }
        else {
            console.log('could not get remote file from ' + fromArg);
            done.reject(new Error('could not get remote file from ' + fromArg));
        }
    });
    return done.promise;
};
/**
 *
 * @param fromArg
 * @returns {any}
 */
exports.toString = (fromArg) => {
    let done = plugins.q.defer();
    plugins.smartrequest.get(fromArg).then((res) => {
        if (res.statusCode === 200) {
            done.resolve(res.body);
        }
        else {
            done.reject(new Error('could not get remote file from ' + fromArg));
        }
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLnJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5yZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQkFBdUI7QUFDdkIsK0NBQStDO0FBRy9DOzs7Ozs7O0lBT0k7QUFFSjs7OztHQUlHO0FBQ1EsUUFBQSxRQUFRLEdBQUcsVUFBVSxPQUFlO0lBQzdDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQ3BDLE1BQU0sRUFBRSxLQUFLO0tBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxHQUFHLE9BQU8sQ0FBQyxDQUFBO1lBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsaUNBQWlDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUNyRSxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFRDs7OztHQUlHO0FBQ1EsUUFBQSxRQUFRLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRTtJQUN4QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGlDQUFpQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDckUsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBIn0=