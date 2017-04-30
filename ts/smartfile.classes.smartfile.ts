import * as plugins from './smartfile.plugins'

export interface ISmartfileConstructorOptions {
  path?: string
  contentString?: string
  contentBuffer?: Buffer
  cwd?: string
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
   * gulp-compatibility: alias of this.contentBuffer
   */
  contents: Buffer

  /**
   * the content of the file as Buffer
   */
  contentBuffer: Buffer

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
      this.contentBuffer = optionsArg.contentBuffer
      this.contents = optionsArg.contentBuffer
    } else if (optionsArg.contentString) {
      this.contentBuffer = optionsArg.contentBuffer
      this.contents = Buffer.from(optionsArg.contentString)
    } else {
      console.log('created empty Smartfile?')
    }
    this.path = optionsArg.path
    this.cwd = optionsArg.cwd
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
