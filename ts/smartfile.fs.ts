import 'typings-global'

import plugins = require('./smartfile.plugins')
import SmartfileInterpreter = require('./smartfile.interpreter')

import { Smartfile } from './smartfile.classes.smartfile'

import * as memory from './smartfile.memory'
/*===============================================================
============================ Checks =============================
===============================================================*/

/**
 *
 * @param filePath
 * @returns {boolean}
 */
export let fileExistsSync = function (filePath): boolean {
  let fileExistsBool: boolean = false
  try {
    plugins.fsExtra.readFileSync(filePath)
    fileExistsBool = true
  } catch (err) {
    fileExistsBool = false
  }
  return fileExistsBool
}

/**
 *
 * @param filePath
 * @returns {any}
 */
export let fileExists = function (filePath) {
  let done = plugins.q.defer()
  plugins.fs.access(filePath, 4, function (err) {
    err ? done.reject(err) : done.resolve()
  })
  return done.promise
}

/**
 * Checks if given path points to an existing directory
 */
export let isDirectory = function (pathArg): boolean {
  return plugins.fsExtra.statSync(pathArg).isDirectory()
}

/**
 * Checks if a given path points to an existing file
 */
export let isFile = function (pathArg): boolean {
  return plugins.fsExtra.statSync(pathArg).isFile()
}

/*===============================================================
============================ FS ACTIONS =========================
===============================================================*/

/**
 * copies a file from A to B on the local disk
 */
export let copy = function (fromArg: string, toArg: string) {
  let done = plugins.q.defer()
  plugins.fsExtra.copy(fromArg, toArg, {}, function () {
    done.resolve()
  })
  return done.promise
}

/**
 * copies a file SYNCHRONOUSLY from A to B on the local disk
 */
export let copySync = function (fromArg: string, toArg: string): boolean {
  plugins.fsExtra.copySync(fromArg, toArg)
  return true
}

/**
 * ensures that a directory is in place
 */
export let ensureDir = (dirPathArg: string) => {
  let done = plugins.q.defer()
  plugins.fsExtra.ensureDir(dirPathArg, done.resolve)
  return done.promise
}

/**
 * ensures that a directory is in place
 */
export let ensureDirSync = (dirPathArg: string) => {
  plugins.fsExtra.ensureDirSync(dirPathArg)
}

/**
 * ensure an empty directory
 * @executes ASYNC
 */
export let ensureEmptyDir = (dirPathArg: string) => {
  let done = plugins.q.defer()
  plugins.fsExtra.ensureDir(dirPathArg, () => {
    plugins.fsExtra.emptyDir(dirPathArg, done.resolve)
  })
  return done.promise
}

/**
 * ensure an empty directory
 * @executes SYNC
 */
export let ensureEmptyDirSync = (dirPathArg: string) => {
  plugins.fsExtra.ensureDirSync(dirPathArg)
  plugins.fsExtra.emptyDirSync(dirPathArg)
}

/**
 * ensures that a file is on disk
 * @param filePath the filePath to ensureDir
 * @param the fileContent to place into a new file in case it doesn't exist yet
 * @returns Promise<void>
 * @exec ASYNC
 */
export let ensureFile = (filePathArg, initFileStringArg): Promise<void> => {
  let done = plugins.q.defer<void>()
  ensureFileSync(filePathArg, initFileStringArg)
  done.resolve()
  return done.promise
}

/**
 * ensures that a file is on disk
 * @param filePath the filePath to ensureDir
 * @param the fileContent to place into a new file in case it doesn't exist yet
 * @returns Promise<void>
 * @exec SYNC
 */
export let ensureFileSync = (filePathArg: string, initFileStringArg: string): void => {
  if (fileExistsSync(filePathArg)) {
    return null
  } else {
    memory.toFsSync(initFileStringArg, filePathArg)
  }
}

/**
 * removes a file or folder from local disk
 */
export let remove = function (pathArg: string): Promise<void> {
  let done = plugins.q.defer<void>()
  plugins.fsExtra.remove(pathArg, function () {
    done.resolve()
  })
  return done.promise
}

/**
 * removes a file SYNCHRONOUSLY from local disk
 */
export let removeSync = function (pathArg: string): boolean {
  plugins.fsExtra.removeSync(pathArg)
  return true
}

/**
 * removes an array of filePaths from disk
 */
export let removeMany = function (filePathArrayArg: string[]) {
  let promiseArray: Promise<void>[] = []
  for (let filePath of filePathArrayArg) {
    promiseArray.push(remove(filePath))
  }
  return Promise.all(promiseArray)
}

/**
 * like removeFilePathArray but SYNCHRONOUSLY
 */
export let removeManySync = function (filePathArrayArg: string[]): void {
  for (let filePath of filePathArrayArg) {
    removeSync(filePath)
  }
}

/*===============================================================
============================ Write/Read =========================
===============================================================*/

/**
 *
 * @param filePathArg
 * @param fileTypeArg
 * @returns {any}
 */
export let toObjectSync = function (filePathArg, fileTypeArg?) {
  let fileString = plugins.fsExtra.readFileSync(filePathArg, 'utf8')
  let fileType
  fileTypeArg ? fileType = fileTypeArg : fileType = SmartfileInterpreter.filetype(filePathArg)
  return SmartfileInterpreter.objectFile(fileString, fileType)
}

/**
 * reads a file content to a String
 * @param filePath
 * @returns {string|Buffer|any}
 */
export let toStringSync = function (filePath) {
  let fileString
  fileString = plugins.fsExtra.readFileSync(filePath, 'utf8')
  return fileString
}

export let fileTreeToObject = async (dirPathArg: string, miniMatchFilter: string) => {
  let fileTree = await listFileTree(dirPathArg, miniMatchFilter)
  let smartfileArray: Smartfile[] = []
  for (let filePath of fileTree) {
    smartfileArray.push(new Smartfile({
      path: filePath,
      contentBuffer: new Buffer(toStringSync(filePath))
    }))
  }
  return smartfileArray
}

/**
 *
 * @param filePathArg
 * @param options
 * @returns {number}
 */
export let toVinylSync = function (filePathArg, options = {}) {
  return plugins.vinylFile.readSync(filePathArg, options)
}

/**
 * lets you reload files hot.
 * @param path
 * @returns {any}
 */
export let requireReload = function (path: string) {
  return plugins.requireReload(path)
}

/**
 * lists Folders in a directory on local disk
 * @returns Promise
 */
export let listFolders = function (pathArg: string, regexFilter?: RegExp) {
  let done = plugins.q.defer()
  let folderArray = plugins.fsExtra.readdirSync(pathArg).filter(function (file) {
    return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isDirectory()
  })
  if (regexFilter) {
    folderArray = folderArray.filter((fileItem) => {
      return regexFilter.test(fileItem)
    })
  }
  done.resolve(folderArray)
  return done.promise
}

/**
 * lists Folders SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
export let listFoldersSync = function (pathArg: string, regexFilter?: RegExp): string[] {
  let folderArray = plugins.fsExtra.readdirSync(pathArg).filter(function (file) {
    return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isDirectory()
  })
  if (regexFilter) {
    folderArray = folderArray.filter((fileItem) => {
      return regexFilter.test(fileItem)
    })
  }
  return folderArray
}

/**
 * lists Files in a directory on local disk
 * @returns Promise
 */
export let listFiles = function (pathArg: string, regexFilter?: RegExp) {
  let done = plugins.q.defer()
  let fileArray = plugins.fsExtra.readdirSync(pathArg).filter(function (file) {
    return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isFile()
  })
  if (regexFilter) {
    fileArray = fileArray.filter((fileItem) => {
      return regexFilter.test(fileItem)
    })
  }
  done.resolve(fileArray)
  return done.promise
}

/**
 * lists Files SYNCHRONOUSLY in a directory on local disk
 * @returns an array with the folder names as strings
 */
export let listFilesSync = function (pathArg: string, regexFilter?: RegExp): string[] {
  let fileArray = plugins.fsExtra.readdirSync(pathArg).filter(function (file) {
    return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isFile()
  })
  if (regexFilter) {
    fileArray = fileArray.filter((fileItem) => {
      return regexFilter.test(fileItem)
    })
  }
  return fileArray
}

/**
 * lists all items (folders AND files) in a directory on local disk
 * @returns Promise<string[]>
 */
export let listAllItems = function (pathArg: string, regexFilter?: RegExp): Promise<string[]> {
  let done = plugins.q.defer<string[]>()
  let allItmesArray = plugins.fsExtra.readdirSync(pathArg)
  if (regexFilter) {
    allItmesArray = allItmesArray.filter((fileItem) => {
      return regexFilter.test(fileItem)
    })
  };
  done.resolve(allItmesArray)
  return done.promise
}

/**
 * lists all items (folders AND files) in a directory on local disk
 * @returns an array with the folder names as strings
 * @executes SYNC
 */
export let listAllItemsSync = function (pathArg: string, regexFilter?: RegExp): string[] {
  let allItmesArray = plugins.fsExtra.readdirSync(pathArg).filter(function (file) {
    return plugins.fsExtra.statSync(plugins.path.join(pathArg, file)).isFile()
  })
  if (regexFilter) {
    allItmesArray = allItmesArray.filter((fileItem) => {
      return regexFilter.test(fileItem)
    })
  }
  return allItmesArray
}

/**
 * lists a file tree using a miniMatch filter
 * note: if the miniMatch Filter is an absolute path, the cwdArg will be omitted
 * @returns Promise<string[]> string array with the absolute paths of all matching files
 */
export let listFileTree = (dirPathArg: string, miniMatchFilter: string): Promise<string[]> => {
  let done = plugins.q.defer<string[]>()

  // handle absolute miniMatchFilter
  let dirPath: string
  if (plugins.path.isAbsolute(miniMatchFilter)) {
    dirPath = '/'
  } else {
    dirPath = dirPathArg
  }

  let options = {
    cwd: dirPath
  }
  plugins.glob(miniMatchFilter, options, (err, files: string[]) => {
    if (err) {
      console.log(err)
      done.reject(err)
    }
    done.resolve(files)
  })
  return done.promise
}
