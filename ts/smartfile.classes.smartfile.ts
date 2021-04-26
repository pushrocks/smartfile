import * as plugins from './smartfile.plugins';
import * as fs from './smartfile.fs';
import * as memory from './smartfile.memory';

export interface ISmartfileConstructorOptions {
  path?: string;
  contentBuffer?: Buffer;
  base?: string;
}

/**
 * class Smartfile
 * -> is vinyl file compatible
 */
export class Smartfile extends plugins.smartjson.Smartjson {
  // ======
  // STATIC
  // ======

  /**
   * creates a Smartfile from a filePath
   * @param filePath
   */
  public static async fromFilePath(filePath: string) {
    filePath = plugins.path.resolve(filePath);
    const fileBuffer = fs.toBufferSync(filePath);
    const smartfile = new Smartfile({
      path: filePath,
      contentBuffer: fileBuffer,
    });
    return smartfile;
  }

  public static async fromBuffer(filePath: string, contentBufferArg: Buffer) {
    const smartfile = new Smartfile({
      contentBuffer: contentBufferArg,
      path: filePath,
    });

    return smartfile;
  }

  public static async fromString(
    filePath: string,
    contentStringArg: string,
    encodingArg: 'utf8' | 'binary'
  ) {
    const smartfile = new Smartfile({
      contentBuffer: Buffer.from(contentStringArg, encodingArg),
      path: filePath,
    });

    return smartfile;
  }

  public static async fromFoldedJson(foldedJsonArg: string) {
    return new Smartfile(plugins.smartjson.parse(foldedJsonArg));
  }

  // ========
  // INSTANCE
  // ========
  /**
   * the full path of the file on disk
   */
  @plugins.smartjson.foldDec()
  public path: string;

  /**
   * a parsed path
   */
  @plugins.smartjson.foldDec()
  public parsedPath: plugins.path.ParsedPath;

  /**
   * the content of the file as Buffer
   */
  @plugins.smartjson.foldDec()
  public contentBuffer: Buffer;

  /**
   * The current working directory of the file
   * Note:this is similar to gulp and different from native node path base
   */
  @plugins.smartjson.foldDec()
  public base: string;

  /**
   * sync the file with disk
   */
  @plugins.smartjson.foldDec()
  public sync: boolean;

  /**
   * the constructor of Smartfile
   * @param optionsArg
   */

  constructor(optionsArg: ISmartfileConstructorOptions) {
    super();
    if (optionsArg.contentBuffer) {
      this.contentBuffer = optionsArg.contentBuffer;
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
  public setContentsFromString(contentString: string, encodingArg: 'utf8' | 'binary' = 'utf8') {
    this.contents = new Buffer(contentString, encodingArg);
  }

  /**
   * write file to disk at its original location
   * Behaviours:
   * - no argument write to exactly where the file was picked up
   */
  public async write() {
    await memory.toFs(this.contentBuffer, this.path);
  }

  /**
   * writes the file to path given as argument
   * @param filePathArg
   */
  public async writeToDiskAtPath(filePathArg: string) {
    if (!plugins.path.isAbsolute(filePathArg)) {
      filePathArg = plugins.path.join(process.cwd(), filePathArg);
    }
    await memory.toFs(this.contentBuffer, filePathArg);
  }

  public async writeToDir(dirPathArg: string) {
    dirPathArg = plugins.smartpath.transform.toAbsolute(dirPathArg);
    const filePath = plugins.path.join(dirPathArg, this.path);
    await memory.toFs(this.contentBuffer, filePath);
    return filePath;
  }

  /**
   * read file from disk
   */
  public async read() {}

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
  public get cwd() {
    return process.cwd();
  }

  /**
   * return relative path of file
   */
  public get relative(): string {
    return plugins.path.relative(this.base, this.path);
  }

  /**
   * return truw when the file has content
   */
  public isNull(): boolean {
    if (!this.contentBuffer) {
      return true;
    }
    return false;
  }

  /**
   * return true if contents are Buffer
   */
  public isBuffer(): boolean {
    if (this.contents instanceof Buffer) {
      return true;
    }
    return false;
  }

  public isDirectory() {
    return false;
  }

  public isStream() {
    return false;
  }

  public isSymbolic() {
    return false;
  }

  // update things
  public updateFileName(fileNameArg: string) {
    const oldFileName = this.parsedPath.base;
    this.path = this.path.replace(new RegExp(oldFileName + '$'), fileNameArg);
  }
}
