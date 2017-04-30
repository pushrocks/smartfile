import * as plugins from './smartfile.plugins'

export interface ISmartfileConstructorOptions {
  path?: string
  contentString?: string
  contentBuffer?: Buffer
  base?: string
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
   * the content of the file as Buffer
   */
  contentBuffer: Buffer

  /**
   * The current working directory of the file
   */
  base: string

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
    } else if (optionsArg.contentString) {
      this.setContentsFromString(optionsArg.contentString)
    } else {
      console.log('created empty Smartfile?')
    }
    this.path = optionsArg.path
    this.base = optionsArg.base
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

  // -----------------------------------------------
  // vinyl compatibility
  // -----------------------------------------------
  /**
   * vinyl-compatibility: alias of this.contentBuffer
   */
  get contents (): Buffer {
    return this.contentBuffer
  }
  set contents (contentsArg) {
    this.contentBuffer = contentsArg
  }

  /**
   * vinyl-compatibility
   */
  get cwd () {
    return this.base
  }

  /**
   * return relative path of file
   */
  get relative (): string {
    return this.path
  }

  /**
   * return truw when the file has content
   */
  isNull (): boolean {
    if (!this.contentBuffer) {
      return true
    }
    return false
  }

  /**
   * return true if contents are Buffer
   */
  isBuffer (): boolean {
    if (this.contents instanceof Buffer) {
      return true
    }
    return false
  }

  isDirectory () {
    return false
  }

  isStream () {
    return false
  }
}
