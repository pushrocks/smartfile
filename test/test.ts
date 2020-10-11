import * as smartfile from '../ts/index';
import * as path from 'path';

import { expect, tap } from '@pushrocks/tapbundle';

// ---------------------------
// smartfile.fs
// ---------------------------

tap.test('.fs.fileExistsSync -> should return an accurate boolean', async () => {
  // tslint:disable-next-line: no-unused-expression
  expect(smartfile.fs.fileExistsSync('./test/testassets/mytest.json')).to.be.true;
  // tslint:disable-next-line: no-unused-expression
  expect(smartfile.fs.fileExistsSync('./test/testassets/notthere.json')).be.false;
});

tap.test('.fs.fileExists -> should resolve or reject a promise', async () => {
  expect(smartfile.fs.fileExists('./test/testassets/mytest.json')).to.be.instanceof(Promise);
  await smartfile.fs.fileExists('./test/testassets/mytest.json');
  await smartfile.fs.fileExists('./test/testassets/notthere.json').catch((err) => {
    return expect(err.message).to.equal(
      "ENOENT: no such file or directory, access './test/testassets/notthere.json'"
    );
  });
});

tap.test('.fs.listFoldersSync() -> should get the file type from a string', async () => {
  expect(smartfile.fs.listFoldersSync('./test/testassets/')).to.include('testfolder');
  expect(smartfile.fs.listFoldersSync('./test/testassets/')).to.not.include('notExistentFolder');
});

tap.test('.fs.listFolders() -> should get the file type from a string', async () => {
  const folderArrayArg = await smartfile.fs.listFolders('./test/testassets/');
  expect(folderArrayArg).to.include('testfolder');
  expect(folderArrayArg).to.not.include('notExistentFolder');
});

tap.test('.fs.listFilesSync() -> should get the file type from a string', async () => {
  expect(smartfile.fs.listFilesSync('./test/testassets/')).to.include('mytest.json');
  expect(smartfile.fs.listFilesSync('./test/testassets/')).to.not.include('notExistentFile');
  expect(smartfile.fs.listFilesSync('./test/testassets/', /mytest\.json/)).to.include(
    'mytest.json'
  );
  expect(smartfile.fs.listFilesSync('./test/testassets/', /mytests.json/)).to.not.include(
    'mytest.json'
  );
});

tap.test('.fs.listFiles() -> should get the file type from a string', async () => {
  const folderArrayArg = await smartfile.fs.listFiles('./test/testassets/');
  expect(folderArrayArg).to.include('mytest.json');
  expect(folderArrayArg).to.not.include('notExistentFile');
});

tap.test('.fs.listFileTree() -> should get a file tree', async () => {
  const folderArrayArg = await smartfile.fs.listFileTree(
    path.resolve('./test/testassets/'),
    '**/*.txt'
  );
  expect(folderArrayArg).to.include('testfolder/testfile1.txt');
  expect(folderArrayArg).to.not.include('mytest.json');
});

tap.test('.fs.fileTreeToObject -> should read a file tree into an Object', async () => {
  const fileArrayArg = await smartfile.fs.fileTreeToObject(
    path.resolve('./test/testassets/'),
    '**/*.txt'
  );
  expect(fileArrayArg[0]).to.be.instanceof(smartfile.Smartfile);
  expect(fileArrayArg[0].contents.toString()).to.equal(fileArrayArg[0].contentBuffer.toString());
});

tap.test('.fs.copy() -> should copy a directory', async () => {
  await smartfile.fs.copy('./test/testassets/testfolder/', './test/testassets/temp/');
});

tap.test('.fs.copy() -> should copy a file', async () => {
  await smartfile.fs.copy('./test/testassets/mytest.yaml', './test/testassets/temp/mytest.yaml');
});

tap.test('.fs.copy() -> should copy a file and rename it', async () => {
  await smartfile.fs.copy(
    './test/testassets/mytest.yaml',
    './test/testassets/temp/mytestRenamed.yaml'
  );
});

tap.test('.fs.remove() -> should remove an entire directory', async () => {});

tap.test('.fs.remove -> should remove single files', async () => {
  await smartfile.fs.remove('./test/testassets/temp/mytestRenamed.yaml');
});

tap.test('.fs.removeSync -> should remove single files synchronouly', async () => {
  smartfile.fs.removeSync('./test/testassets/temp/testfile1.txt');
  expect(smartfile.fs.fileExistsSync('./test/testassets/temp/testfile1.txt')).to.be.false;
});

tap.test('.fs.removeMany -> should remove and array of files', async () => {
  smartfile.fs
    .removeMany(['./test/testassets/temp/testfile1.txt', './test/testassets/temp/testfile2.txt'])
    .then(() => {
      expect(smartfile.fs.fileExistsSync('./test/testassets/temp/testfile1.txt')).to.be.false;
      expect(smartfile.fs.fileExistsSync('./test/testassets/temp/testfile2.txt')).to.be.false;
    });
});

tap.test('.fs.removeManySync -> should remove and array of single files synchronouly', async () => {
  smartfile.fs.removeManySync([
    './test/testassets/temp/testfile1.txt',
    './test/testassets/temp/testfile2.txt',
  ]);
  expect(smartfile.fs.fileExistsSync('./test/testassets/temp/testfile1.txt')).to.be.false;
  expect(smartfile.fs.fileExistsSync('./test/testassets/temp/testfile2.txt')).to.be.false;
});

tap.test('.fs.toObjectSync() -> should read an ' + '.yaml' + ' file to an object', async () => {
  const testData = smartfile.fs.toObjectSync('./test/testassets/mytest.yaml');
  expect(testData).to.include({ key1: 'this works' });
  expect(testData).to.include({ key2: 'this works too' });
});
tap.test(
  '.fs.toObjectSync() -> should state unknown file type for unknown file types',
  async () => {
    const testData = smartfile.fs.toObjectSync('./test/testassets/mytest.txt');
  }
);

tap.test('.fs.toObjectSync() -> should read an ' + '.json' + ' file to an object', async () => {
  const testData = smartfile.fs.toObjectSync('./test/testassets/mytest.json');
  expect(testData).to.include({ key1: 'this works' });
  expect(testData).to.include({ key2: 'this works too' });
});

tap.test('.fs.toStringSync() -> should read a file to a string', async () => {
  expect(smartfile.fs.toStringSync('./test/testassets/mytest.txt')).to.equal(
    'Some TestString &&%$'
  );
});

// ---------------------------
// smartfile.interpreter
// ---------------------------

tap.test('.interpreter.filetype() -> should get the file type from a string', async () => {
  expect(smartfile.interpreter.filetype('./somefolder/data.json')).equal('json');
});

// ---------------------------
// smartfile.memory
// ---------------------------

tap.test('.memory.toFs() -> should write a file to disk and return a promise', async () => {
  const localString = 'myString';
  await smartfile.memory.toFs(
    localString,
    path.join(process.cwd(), './test/testassets/temp/testMemToFs.txt')
  );
});

tap.test(
  '.memory.toFsSync() -> should write a file to disk and return true if successfull',
  async () => {
    const localString = 'myString';
    smartfile.memory.toFsSync(
      localString,
      path.join(process.cwd(), './test/testassets/temp/testMemToFsSync.txt')
    );
  }
);

tap.test('.remote.toString() -> should load a remote file to a variable', async () => {
  const responseString = await smartfile.remote.toString(
    'https://raw.githubusercontent.com/pushrocks/smartfile/master/test/testassets/mytest.txt'
  );
  expect(responseString).to.equal('Some TestString &&%$');
});

tap.test('.remote.toString() -> should reject a Promise when the link is false', async (tools) => {
  await smartfile.remote.toString('https://push.rocks/doesnotexist.txt').catch((err) => {
    return expect(err.message).to.equal(
      'could not get remote file from https://push.rocks/doesnotexist.txt'
    );
  });
});

// ---------------------------
// smartfile.Smartfile
// ---------------------------

tap.test('.Smartfile -> should produce vinyl compatible files', async () => {
  const smartfileArray = await smartfile.fs.fileTreeToObject(
    process.cwd(),
    './test/testassets/testfolder/**/*'
  );
  const localSmartfile = smartfileArray[0];
  expect(localSmartfile).to.be.instanceof(smartfile.Smartfile);
  expect(localSmartfile.contents).to.be.instanceof(Buffer);
  // tslint:disable-next-line:no-unused-expression
  expect(localSmartfile.isBuffer()).to.be.true;
  // tslint:disable-next-line:no-unused-expression
  expect(localSmartfile.isDirectory()).to.be.false;
  // tslint:disable-next-line:no-unused-expression
  expect(localSmartfile.isNull()).to.be.false;
});

tap.test('should output a smartfile array to disk', async () => {
  const smartfileArray = await smartfile.fs.fileTreeToObject('./test/testassets/testfolder/', '*');
  for (const smartfileInstance of smartfileArray) {
    console.log(smartfileInstance.relative);
    console.log(smartfileInstance.path);
    console.log(smartfileInstance.base);
    console.log(smartfileInstance.parsedPath);
  }
  await smartfile.memory.smartfileArrayToFs(
    smartfileArray,
    path.resolve('./test/testassets/temp/testoutput/')
  );
});

tap.test('should create, store and retrieve valid smartfiles', async () => {
  const fileString = 'hi there';
  const filePath = './test/testassets/utf8.txt';
  const smartfileInstance = await smartfile.Smartfile.fromString(filePath, fileString, 'utf8');
  smartfileInstance.write();
  const smartfileInstance2 = await smartfile.Smartfile.fromFilePath(filePath);
  const retrievedString = smartfileInstance.contents.toString();
  expect(retrievedString).to.equal(fileString);
});

tap.start();
