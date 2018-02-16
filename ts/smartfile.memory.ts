import plugins = require('./smartfile.plugins')
import { Smartfile } from './smartfile.classes.smartfile'
import * as smartfileFs from './smartfile.fs'


import SmartfileInterpreter = require('./smartfile.interpreter')

/**
 * converts file to Object
 * @param fileStringArg
 * @param fileTypeArg
 * @returns {any|any}
 */
export let toObject = function (fileStringArg: string, fileTypeArg: string) {
  return SmartfileInterpreter.objectFile(fileStringArg, fileTypeArg)
}

export interface IToFsOptions {
  respectRelative?: boolean
}

/**
 * writes string or Smartfile to disk.
 * @param fileArg
 * @param fileNameArg
 * @param fileBaseArg
 */
export let toFs = async (fileContentArg: string | Smartfile, filePathArg, optionsArg: IToFsOptions = {} ) => {
  let done = plugins.q.defer()

  // check args
  if (!fileContentArg || !filePathArg) {
    throw new Error('expected valid arguments')
  }

  // prepare actual write action
  let fileString: string
  let filePath: string = filePathArg

  // handle Smartfile
  if (fileContentArg instanceof Smartfile) {
    let fileContentArg2: any = fileContentArg
    fileString = fileContentArg.contentBuffer.toString()
    // handle options
    if (optionsArg.respectRelative) {
      filePath = plugins.path.join(filePath, fileContentArg.path)
    }
  } else if (typeof fileContentArg === 'string') {
    fileString = fileContentArg
  } else {
    throw new Error('fileContent is neither string nor Smartfile')
  }
  await smartfileFs.ensureDir(plugins.path.parse(filePath).dir)
  plugins.fsExtra.writeFile(filePath, fileString, {encoding: 'utf8'}, done.resolve)
  return await done.promise
}

/**
 * writes a string or a Smartfile to disk synchronously, only supports string
 * @param fileArg 
 * @param filePathArg 
 */
export let toFsSync = function (fileArg: string, filePathArg: string) {
  // function checks to abort if needed
  if (!fileArg || !filePathArg) {
    throw new Error('expected a valid arguments')
  }

  // prepare actual write action
  let fileString: string
  let filePath: string = filePathArg

  if (typeof fileArg !== 'string') {
    throw new Error('fileArg is not of type String.')
  } else if (typeof fileArg === 'string') {
    fileString = fileArg
  }
  plugins.fsExtra.writeFileSync(filePath, fileString, {encoding: 'utf8'})
}

export let smartfileArrayToFs = async (smartfileArrayArg: Smartfile[], dirArg: string) => {
  await smartfileFs.ensureDir(dirArg)
  for (let smartfile of smartfileArrayArg) {
    await toFs(smartfile, dirArg, {
      respectRelative: true
    })
  }
}
