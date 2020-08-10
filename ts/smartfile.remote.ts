import plugins = require('./smartfile.plugins');
import SmartfileInterpreter = require('./smartfile.interpreter');

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
export let toObject = (fromArg: string) => {
  const done = plugins.smartpromise.defer();
  plugins.smartrequest
    .request(fromArg, {
      method: 'get',
    })
    .then((res: any) => {
      if (res.statusCode === 200) {
        done.resolve(res.body);
      } else {
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
export let toString = (fromArg: string): Promise<string> => {
  const done = plugins.smartpromise.defer<string>();
  plugins.smartrequest.getBinary(fromArg).then((res: any) => {
    if (res.statusCode === 200) {
      const encoding = plugins.smartmime.getEncoding(fromArg);
      done.resolve(res.body.toString(encoding));
    } else {
      done.reject(new Error('could not get remote file from ' + fromArg));
    }
  });
  return done.promise;
};
