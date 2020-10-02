import { Smartfile } from './smartfile.classes.smartfile';
import * as plugins from './smartfile.plugins';
import * as fs from './smartfile.fs';

/**
 * a virtual directory exposes a fs api
 */
export class VirtualDirectory {
  private fileArray: Smartfile[] = [];
  public static async fromFsDirPath(pathArg: string) {
    const newVirtualDir = new VirtualDirectory();
    newVirtualDir.addSmartfiles(await fs.fileTreeToObject(pathArg, '**/*'));
  }

  constructor() {}

  public addSmartfiles(smartfileArrayArg: Smartfile[]) {
    this.fileArray = this.fileArray.concat(smartfileArrayArg);
  }

  public async getFileByPath(pathArg: string) {
    for (const smartfile of this.fileArray) {
      if (smartfile.path === pathArg) {
        return smartfile;
      }
    }
  }

  // TODO implement root shifting to get subdirectories as new virtual directories
  // TODO implement root shifting to combine VirtualDirecotries in a parent virtual directory
}
