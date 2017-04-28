import * as plugins from './smartfile.plugins'

export interface ISmartfileConstructorOptions {
  path?: string
  contentsString?: string
  contentBuffer?: Buffer
}

/**
 * class Smartfile
 * -> is vinyl file compatible
 */
export class Smartfile {
  /**
   * the full path of the file on disk
   */
  path: string

  /**
   * The contents of the file as Buffer
   */
  contents: Buffer

  /**
   * The current working directory of the file
   */
  cwd: string

  /**
   * sync the file with disk
   */
  sync: boolean

  /**
   * the constructor of Smartfile
   * @param optionsArg
   */
  constructor (optionsArg: ISmartfileConstructorOptions) {
    if (optionsArg.contentBuffer) {
      this.contents = optionsArg.contentBuffer
    } else if (optionsArg.contentsString) {
      this.contents = new Buffer(optionsArg.contentsString)
    }
    this.path = optionsArg.path
  }

  /**
   * return relative path of file
   * -> 
   */
  get relative () {
    return ''
  }


  /**
   * set contents from string
   * @param contentString
   */
  setContentsFromString(contentString: string) {
    this.contents = new Buffer(contentString)
  }

  /**
   * write file to disk
   */
  async write () {

  }

  /**
   * read file from disk
   */
  async read () {
  }
}
