import 'typings-global'

import plugins = require('./smartfile.plugins')
import SmartfileInterpreter = require('./smartfile.interpreter')
let vinyl = require('vinyl')

export interface IVinylFile {
  contents: Buffer
  base: string
  path: string,
}

/**
 * converts file to Object
 * @param fileStringArg
 * @param fileTypeArg
 * @returns {any|any}
 */
export let toObject = function (fileStringArg: string, fileTypeArg: string) {
  return SmartfileInterpreter.objectFile(fileStringArg, fileTypeArg)
}

/**
 * takes a string and converts it to vinyl file
 * @param fileArg
 * @param optionsArg
 */
export let toVinylFileSync = function (fileArg: string, optionsArg?: { filename?: string, base?: string, relPath?: string }) {
  optionsArg ? void (0) : optionsArg = { filename: 'vinylfile', base: '/' }
  optionsArg.filename ? void (0) : optionsArg.filename = 'vinylfile'
  optionsArg.base ? void (0) : optionsArg.base = '/'
  optionsArg.relPath ? void ('0') : optionsArg.relPath = ''
  let vinylFile = new vinyl({
    base: optionsArg.base,
    path: plugins.path.join(optionsArg.base, optionsArg.relPath, optionsArg.filename),
    contents: new Buffer(fileArg)
  })
  return vinylFile
}

/**
 * takes a string array and some options and returns a vinylfile array
 * @param arrayArg
 * @param optionsArg
 */
export let toVinylArraySync = function (
  arrayArg: string[],
  optionsArg?: {
    filename?: string,
    base?: string,
    relPath?: string
  }
) {
  let vinylArray = []
  for (let stringIndexArg in arrayArg) {
    let myString = arrayArg[ stringIndexArg ]
    vinylArray.push(toVinylFileSync(myString, optionsArg))
  }
  return vinylArray
}

/**
 * takes a vinylFile object and converts it to String
 */
export let vinylToStringSync = function (fileArg: IVinylFile): string {
  return fileArg.contents.toString('utf8')
}

/**
 * writes string or vinyl file to disk.
 * @param fileArg
 * @param fileNameArg
 * @param fileBaseArg
 */
export let toFs = function (fileContentArg: string | IVinylFile, filePathArg) {
  let done = plugins.q.defer()

  // function checks to abort if needed
  if (!fileContentArg || !filePathArg) {
    throw new Error('expected valid arguments')
  }

  // prepare actual write action
  let fileString: string
  let filePath: string = filePathArg
  if (vinyl.isVinyl(fileContentArg)) {
    let fileContentArg2: any = fileContentArg
    fileString = vinylToStringSync(fileContentArg2)
  } else if (typeof fileContentArg === 'string') {
    fileString = fileContentArg
  }
  plugins.fsExtra.writeFile(filePath, fileString, 'utf8', done.resolve)
  return done.promise
}

export let toFsSync = function (fileArg, filePathArg: string) {
  // function checks to abort if needed
  if (!fileArg || !filePathArg) {
    throw new Error('expected a valid arguments')
  }

  // prepare actual write action
  let fileString: string
  let filePath: string = filePathArg

  if (typeof fileArg !== 'string') {
    fileString = vinylToStringSync(fileArg)
  } else if (typeof fileArg === 'string') {
    fileString = fileArg
  }
  plugins.fsExtra.writeFileSync(filePath, fileString, 'utf8')
}
