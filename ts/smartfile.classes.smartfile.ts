import * as plugins from './smartfile.plugins'

export interface ISmartfileConstructorOptions {
  path?: string
  contentsString?: string
  contentBuffer?: Buffer
}

export class Smartfile {
  path: string
  contents: Buffer
  constructor(optionsArg: ISmartfileConstructorOptions) {
    if (optionsArg.contentBuffer) {
      this.contents = optionsArg.contentBuffer
    } else if(optionsArg.contentsString) {
      this.contents = new Buffer(optionsArg.contentsString)
    }
    this.path = optionsArg.path
  }

  /**
   * set contents from string
   * @param contentString
   */
  setContentFromString(contentString: string) {
    this.contents = new Buffer(contentString)
  }
}
