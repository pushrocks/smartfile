"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    let done = plugins.smartpromise.defer();
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
    let done = plugins.smartpromise.defer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLnJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5yZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBK0M7QUFHL0M7Ozs7Ozs7SUFPSTtBQUVKOzs7O0dBSUc7QUFDUSxRQUFBLFFBQVEsR0FBRyxVQUFVLE9BQWU7SUFDN0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUN2QyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7UUFDcEMsTUFBTSxFQUFFLEtBQUs7S0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN2QjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsR0FBRyxPQUFPLENBQUMsQ0FBQTtZQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGlDQUFpQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUE7U0FDcEU7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFRDs7OztHQUlHO0FBQ1EsUUFBQSxRQUFRLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRTtJQUN4QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3ZDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ2xELElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsaUNBQWlDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQTtTQUNwRTtJQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3JCLENBQUMsQ0FBQSJ9