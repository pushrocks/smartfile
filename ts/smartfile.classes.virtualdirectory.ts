import { Smartfile } from './smartfile.classes.smartfile';
import * as plugins from './smartfile.plugins';
import * as fs from './smartfile.fs';

/**
 * a virtual directory exposes a fs api
 */
export class VirtualDirectory {
  // STATIC
  public static async fromFsDirPath(pathArg: string): Promise<VirtualDirectory> {
    const newVirtualDir = new VirtualDirectory();
    newVirtualDir.addSmartfiles(await fs.fileTreeToObject(pathArg, '**/*'));
    return newVirtualDir;
  }

  public static async fromVirtualDirTransferableObject(
    virtualDirTransferableObjectArg: plugins.smartfileInterfaces.VirtualDirTransferableObject
  ): Promise<VirtualDirectory> {
    const newVirtualDir = new VirtualDirectory();
    for (const fileArg of virtualDirTransferableObjectArg.files) {
      newVirtualDir.addSmartfiles([Smartfile.enfoldFromJson(fileArg) as Smartfile]);
    }
    return newVirtualDir;
  }

  // INSTANCE
  private fileArray: Smartfile[] = [];

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

  public async toVirtualDirTransferableObject(): Promise<plugins.smartfileInterfaces.VirtualDirTransferableObject> {
    return {
      files: this.fileArray.map(smartfileArg => smartfileArg.foldToJson())
    };
  }

  public async saveToDisk() {
    for (const smartfileArg of this.fileArray) {
      
    }
  }

  // TODO implement root shifting to get subdirectories as new virtual directories
  // TODO implement root shifting to combine VirtualDirecotries in a parent virtual directory
}
