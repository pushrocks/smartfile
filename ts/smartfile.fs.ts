import plugins = require('./smartfile.plugins');
import SmartfileInterpreter = require('./smartfile.interpreter');

import { Smartfile } from './smartfile.classes.smartfile';

import * as memory from './smartfile.memory';
/*===============================================================
============================ Checks =============================
===============================================================*/

/**
 *
 * @param filePath
 * @returns {boolean}
 */
export const fileExistsSync = (filePath): boolean => {
  let fileExistsBool: boolean = false;
  try {
    plugins.fsExtra.readFileSync(filePath);
    fileExistsBool = true;
  } catch (err) {
    fileExistsBool = false;
  }
  return fileExistsBool;
};

/**
 *
 * @param filePath
 * @returns {any}
 */
export const fileExists = async (filePath): Promise<boolean> => {
  const done = plugins.smartpromise.defer<boolean>();
  plugins.fs.access(filePath, 4, err => {
    err ? done.resolve(false) : done.resolve(true);
  });
  return done.promise;
};

/**
 * Checks if given path points to an existing directory
 */
export const isDirectory = (pathArg): boolean => {
  try {
    return plugins.fsExtra.statSync(pathArg).isDirectory();
  } catch (err) {
    return false;
  }
};

/**
 * Checks if a given path points to an existing file
 */
export const isFile = (pathArg): boolean => {
  return plugins.fsExtra.statSync(pathArg).isFile();
};

/*===============================================================
============================ FS ACTIONS =========================
===============================================================*/

/**
 * copies a file from A to B on the local disk
 */
export const copy = async (fromArg: string, toArg: string): Promise<boolean> => {
  const done = plugins.smartpromise.defer<boolean>();
  plugins.fsExtra.copy(fromArg, toArg, {}, err => {
    if (err) {
      throw new Error(`Could not copy from ${fromArg} to ${toArg}: ${err}`);
    }
    done.resolve(true);
  });
  return done.promise;
};

/**
 * copies a file SYNCHRONOUSLY from A to B on the local disk
 */
export const copySync = (fromArg: string, toArg: string): boolean => {
  plugins.fsExtra.copySync(fromArg, toArg);
  return true;
};

/**
 * ensures that a directory is in place
 */
export const ensureDir = async (dirPathArg: string) => {
  await plugins.fsExtra.ensureDir(dirPathArg);
};

/**
 * ensures that a directory is in place
 */
export const ensureDirSync = (dirPathArg: string) => {
  plugins.fsExtra.ensureDirSync(dirPathArg);
};

/**
 * ensure an empty directory
 * @executes ASYNC
 */
export const ensureEmptyDir = async (dirPathArg: string) => {
  await plugins.fsExtra.ensureDir(dirPathArg);
  await plugins.fsExtra.emptyDir(dirPathArg);
};

/**
 * ensure an empty directory
 * @executes SYNC
 */
export const ensureEmptyDirSync = (dirPathArg: string) => {
  plugins.fsExtra.ensureDirSync(dirPathArg);
  plugins.fsExtra.emptyDirSync(dirPathArg);
};

/**
 * ensures that a file is on disk
 * @param filePath the filePath to ensureDir
 * @param the fileContent to place into a new file in case it doesn't exist yet
 * @returns Promise<void>
 * @exec ASYNC
 */
export const ensureFile = async (filePathArg, initFileStringArg): Promise<void> => {
  ensureFileSync(filePathArg, initFileStringArg);
};

/**
 * ensures that a file is on disk
 * @param filePath the filePath to ensureDir
 * @param the fileContent to place into a new file in case it doesn't exist yet
 * @returns Promise<void>
 * @exec SYNC
 */
export const ensureFileSync = (filePathArg: string, initFileStringArg: string): void => {
  if (fileExistsSync(filePathArg)) {
    return null;
  } else {
    memory.toFsSync(initFileStringArg, filePathArg);
  }
};

/**
 * removes a file or folder from local disk
 */
export const remove = async (pathArg: string): Promise<void> => {
  await plugins.fsExtra.remove(pathArg);
};

/**
 * removes a file SYNCHRONOUSLY from local disk
 */
export const removeSync = (pathArg: string): void => {
  plugins.fsExtra.removeSync(pathArg);
};

/**
 * removes an array of filePaths from disk
 */
export const removeMany = async (filePathArrayArg: string[]) => {
  const promiseArray: Array<Promise<void>> = [];
  for (const filePath of filePathArrayArg) {
    promiseArray.push(remove(filePath));
  }
  await Promise.all(promiseArray);
};

/**
 * like removeFilePathArray but SYNCHRONOUSLY
 */
export const removeManySync = (filePathArrayArg: string[]): void => {
  for (const filePath of filePathArrayArg) {
    removeSync(filePath);
  }
};

/*===============================================================
============================ Write/Read =========================
===============================================================*/

/**
 *
 * @param filePathArg
 * @param fileTypeArg
 * @returns {any}
 */
export const toObjectSync = (filePathArg, fileTypeArg?) => {
  const fileString = plugins.fsExtra.readFileSync(filePathArg, 'utf8');
  let fileType;
  fileTypeArg ? (fileType = fileTypeArg) : (fileType = SmartfileInterpreter.filetype(filePathArg));
  return SmartfileInterpreter.objectFile(fileString, fileType);
};

/**
 * reads a file content to a String
 */
export const toStringSync = (filePath: string): string => {
  const encoding = plugins.smartmime.getEncoding(filePath);
  const fileString: string = plugins.fsExtra.readFileSync(filePath, encoding);
  return fileString;
};

export const toBufferSync = (filePath: string): Buffer => {
  return plugins.fsExtra.readFileSync(filePath);
}

export const fileTreeToHash = async (dirPathArg: string, miniMatchFilter: string) => {
  const fileTreeObject = await fileTreeToObject(dirPathArg, miniMatchFilter);
  let combinedString = '';
  for (const smartfile of fileTreeObject) {
    combinedString += smartfile.contentBuffer.toString();
  }
  const hash = await plugins.smarthash.sha256FromString(combinedString);
  return hash;
};

/**
 * creates a smartfile array from a directory
 * @param dirPathArg the directory to start from
 * @param miniMatchFilter a minimatch filter of what files to include
 */
export const fileTreeToObject = async (dirPathArg: string, miniMatchFilter: string) => {
  // handle absolute miniMatchFilter
  let dirPath: string;
  if (plugins.path.isAbsolute(miniMatchFilter)) {
    dirPath = '/';
  } else {
    dirPath = dirPathArg;
  }

  const fileTree = await listFileTree(dirPath, miniMatchFilter);
  const smartfileArray: Smartfile[] = [];
  for (const filePath of fileTree) {
    const readPath = ((): string => {
      if (!plugins.path.isAbsolute(filePath)) {
        return plugins.path.join(dirPath, filePath);
      } else {
        return filePath;
      }
    })();
    const fileContentString = toStringSync(readPath);

    // push a read file as Smartfile
    smartfileArray.push(
      new Smartfile({
        contentBuffer: Buffer.from(fileContentString),
        base: dirPath,
        path: filePath
      })
    );
  }
  return smartfileArray;
};

/**
 * lists Folders in a directory on local disk
 * @returns Promise with an array that contains the folder names
 */
export const listFolders = async (pathArg: string, regexFilter?: RegExp): Promise<string[]> => {
  return listFoldersSync(pathArg, regexFilter);
};

/**
 * lists Folders SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
export const listFoldersSync = (pathArg: string, regexFilter?: RegExp): string[] => {
  let folderArray = plugins.fsExtra.readdirSync(pathArg).filter(file => {
    return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isDirectory();
  });
  if (regexFilter) {
    folderArray = folderArray.filter(fileItem => {
      return regexFilter.test(fileItem);
    });
  }
  return folderArray;
};

/**
 * lists Files in a directory on local disk
 * @returns Promise
 */
export const listFiles = async (pathArg: string, regexFilter?: RegExp): Promise<string[]> => {
  return listFilesSync(pathArg, regexFilter);
};

/**
 * lists Files SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
export const listFilesSync = (pathArg: string, regexFilter?: RegExp): string[] => {
  let fileArray = plugins.fsExtra.readdirSync(pathArg).filter(file => {
    return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isFile();
  });
  if (regexFilter) {
    fileArray = fileArray.filter(fileItem => {
      return regexFilter.test(fileItem);
    });
  }
  return fileArray;
};

/**
 * lists all items (folders AND files) in a directory on local disk
 * @returns Promise<string[]>
 */
export const listAllItems = async (pathArg: string, regexFilter?: RegExp): Promise<string[]> => {
  return listAllItemsSync(pathArg, regexFilter);
};

/**
 * lists all items (folders AND files) in a directory on local disk
 * @returns an array with the folder names as strings
 * @executes SYNC
 */
export const listAllItemsSync = (pathArg: string, regexFilter?: RegExp): string[] => {
  let allItmesArray = plugins.fsExtra.readdirSync(pathArg).filter(file => {
    return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isFile();
  });
  if (regexFilter) {
    allItmesArray = allItmesArray.filter(fileItem => {
      return regexFilter.test(fileItem);
    });
  }
  return allItmesArray;
};

/**
 * lists a file tree using a miniMatch filter
 * note: if the miniMatch Filter is an absolute path, the cwdArg will be omitted
 * @returns Promise<string[]> string array with the absolute paths of all matching files
 */
export const listFileTree = async (
  dirPathArg: string,
  miniMatchFilter: string,
  absolutePathsBool: boolean = false
): Promise<string[]> => {
  const done = plugins.smartpromise.defer<string[]>();

  // handle absolute miniMatchFilter
  let dirPath: string;
  if (plugins.path.isAbsolute(miniMatchFilter)) {
    dirPath = '/';
  } else {
    dirPath = dirPathArg;
  }

  const options = {
    cwd: dirPath,
    nodir: true,
    dot: true
  };
  plugins.glob(miniMatchFilter, options, (err, files: string[]) => {
    if (err) {
      console.log(err);
      done.reject(err);
    }
    done.resolve(files);
  });

  let fileList = await done.promise;
  if (absolutePathsBool) {
    fileList = fileList.map(filePath => {
      return plugins.path.resolve(plugins.path.join(dirPath, filePath));
    });
  }

  return fileList;
};
