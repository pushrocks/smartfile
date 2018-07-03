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
    plugins.smartrequest
        .request(fromArg, {
        method: 'get'
    })
        .then((res) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLnJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5yZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBZ0Q7QUFHaEQ7Ozs7Ozs7SUFPSTtBQUVKOzs7O0dBSUc7QUFDUSxRQUFBLFFBQVEsR0FBRyxVQUFTLE9BQWU7SUFDNUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QyxPQUFPLENBQUMsWUFBWTtTQUNqQixPQUFPLENBQUMsT0FBTyxFQUFFO1FBQ2hCLE1BQU0sRUFBRSxLQUFLO0tBQ2QsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ2pCLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEdBQUcsT0FBTyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDdEIsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNRLFFBQUEsUUFBUSxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUU7SUFDeEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtRQUNsRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGlDQUFpQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDckU7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN0QixDQUFDLENBQUMifQ==