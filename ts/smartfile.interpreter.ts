import * as plugins from './smartfile.plugins';

export let filetype = (pathArg: string): string => {
  const extName = plugins.path.extname(pathArg);
  const fileType = extName.replace(/\.([a-z]*)/, '$1'); // remove . form fileType
  return fileType;
};

export let objectFile = (fileStringArg: string, fileTypeArg) => {
  switch (fileTypeArg) {
    case 'yml':
    case 'yaml':
      return plugins.yaml.safeLoad(fileStringArg);
    case 'json':
      return JSON.parse(fileStringArg);
    default:
      console.error('file type ' + fileTypeArg.blue + ' not supported');
      break;
  }
};
