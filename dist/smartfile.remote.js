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
            console.error('could not get remote file from ' + fromArg);
            done.reject(new Error('could not get remote file from ' + fromArg));
        }
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRmaWxlLnJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZmlsZS5yZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQkFBdUI7QUFDdkIsK0NBQStDO0FBRy9DOzs7Ozs7O0lBT0k7QUFFSjs7OztHQUlHO0FBQ1EsUUFBQSxRQUFRLEdBQUcsVUFBVSxPQUFlO0lBQzdDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQ3BDLE1BQU0sRUFBRSxLQUFLO0tBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVE7UUFDZixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsR0FBRyxPQUFPLENBQUMsQ0FBQTtZQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGlDQUFpQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDckUsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBRUQ7Ozs7R0FJRztBQUNRLFFBQUEsUUFBUSxHQUFHLENBQUMsT0FBZTtJQUNwQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVE7UUFDOUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEdBQUcsT0FBTyxDQUFDLENBQUE7WUFDMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ3JFLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3JCLENBQUMsQ0FBQSJ9