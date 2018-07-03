import * as plugins from './smartfile.plugins';
import * as fs from './smartfile.fs';
import * as memory from './smartfile.memory';

export interface ISmartfileConstructorOptions {
  path?: string;
  contentString?: string;
  contentBuffer?: Buffer;
  base?: string;
}

/**
 * class Smartfile
 * -> is vinyl file compatible
 */
export class Smartfile {
  /**
   * the full path of the file on disk
   */
  path: string;

  /**
   *
   */
  parsedPath: plugins.path.ParsedPath;

  /**
   * the content of the file as Buffer
   */
  contentBuffer: Buffer;

  /**
   * The current working directory of the file
   * Note:this is similar to gulp and different from native node path base
   */
  base: string;

  /**
   * sync the file with disk
   */
  sync: boolean;

  /**
   * the constructor of Smartfile
   * @param optionsArg
   */

  constructor(optionsArg: ISmartfileConstructorOptions) {
    if (optionsArg.contentBuffer) {
      this.contentBuffer = optionsArg.contentBuffer;
    } else if (optionsArg.contentString) {
      this.setContentsFromString(optionsArg.contentString);
    } else {
      console.log('created empty Smartfile?');
    }
    this.path = optionsArg.path;
    this.parsedPath = plugins.path.parse(this.path);
    this.base = optionsArg.base;
  }

  /**
   * set contents from string
   * @param contentString
   */
  setContentsFromString(contentString: string) {
    this.contents = new Buffer(contentString);
  }

  /**
   * write file to disk
   * Behaviours:
   * - no argument write to exactly where the file was picked up
   */
  async write(pathArg?: string) {
    const stringToWrite = this.contentBuffer.toString();
    await memory.toFs(stringToWrite, this.path);
  }

  /**
   * read file from disk
   */
  async read() {}

  // -----------------------------------------------
  // vinyl compatibility
  // -----------------------------------------------
  /**
   * vinyl-compatibility: alias of this.contentBuffer
   */
  get contents(): Buffer {
    return this.contentBuffer;
  }
  set contents(contentsArg) {
    this.contentBuffer = contentsArg;
  }

  /**
   * vinyl-compatibility
   */
  get cwd() {
    return process.cwd();
  }

  /**
   * return relative path of file
   */
  get relative(): string {
    return plugins.path.relative(this.base, this.path);
  }

  /**
   * return truw when the file has content
   */
  isNull(): boolean {
    if (!this.contentBuffer) {
      return true;
    }
    return false;
  }

  /**
   * return true if contents are Buffer
   */
  isBuffer(): boolean {
    if (this.contents instanceof Buffer) {
      return true;
    }
    return false;
  }

  isDirectory() {
    return false;
  }

  isStream() {
    return false;
  }

  isSymbolic() {
    return false;
  }

  // update things
  updateFileName(fileNameArg: string) {
    let oldFileName = this.parsedPath.base;
    this.path = this.path.replace(new RegExp(oldFileName + '$'), fileNameArg);
  }
}
