import * as plugins from './smartfile.plugins';
import { Smartfile } from './smartfile.classes.smartfile';
import * as smartfileFs from './smartfile.fs';
import * as interpreter from './smartfile.interpreter';

/**
 * converts file to Object
 * @param fileStringArg
 * @param fileTypeArg
 * @returns {any|any}
 */
export let toObject = (fileStringArg: string, fileTypeArg: string) => {
  return interpreter.objectFile(fileStringArg, fileTypeArg);
};

export interface IToFsOptions {
  respectRelative?: boolean;
}

/**
 * writes string or Smartfile to disk.
 * @param fileArg
 * @param fileNameArg
 * @param fileBaseArg
 */
export let toFs = async (
  fileContentArg: string | Buffer | Smartfile,
  filePathArg: string,
  optionsArg: IToFsOptions = {}
) => {
  const done = plugins.smartpromise.defer();

  // check args
  if (!fileContentArg || !filePathArg) {
    throw new Error('expected valid arguments');
  }

  // prepare actual write action
  let fileContent: string | Buffer;
  let fileEncoding: 'utf8' | 'binary' = 'utf8';
  let filePath: string = filePathArg;

  // handle Smartfile
  if (fileContentArg instanceof Smartfile) {
    fileContent = fileContentArg.contentBuffer;
    // handle options
    if (optionsArg.respectRelative) {
      filePath = plugins.path.join(filePath, fileContentArg.path);
    }
  } else if (Buffer.isBuffer(fileContentArg)) {
    fileContent = fileContentArg;
    fileEncoding = 'binary';
  } else if (typeof fileContentArg === 'string') {
    fileContent = fileContentArg;
  } else {
    throw new Error('fileContent is neither string nor Smartfile');
  }
  await smartfileFs.ensureDir(plugins.path.parse(filePath).dir);
  plugins.fsExtra.writeFile(filePath, fileContent, { encoding: fileEncoding }, done.resolve);
  return await done.promise;
};

/**
 * writes a string or a Smartfile to disk synchronously, only supports string
 * @param fileArg
 * @param filePathArg
 */
export const toFsSync = (fileArg: string, filePathArg: string) => {
  // function checks to abort if needed
  if (!fileArg || !filePathArg) {
    throw new Error('expected a valid arguments');
  }

  // prepare actual write action
  let fileString: string;
  const filePath: string = filePathArg;

  if (typeof fileArg !== 'string') {
    throw new Error('fileArg is not of type String.');
  } else if (typeof fileArg === 'string') {
    fileString = fileArg;
  }
  plugins.fsExtra.writeFileSync(filePath, fileString, { encoding: 'utf8' });
};

export let smartfileArrayToFs = async (smartfileArrayArg: Smartfile[], dirArg: string) => {
  await smartfileFs.ensureDir(dirArg);
  for (const smartfile of smartfileArrayArg) {
    await toFs(smartfile, dirArg, {
      respectRelative: true,
    });
  }
};
