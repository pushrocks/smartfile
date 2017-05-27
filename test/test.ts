import * as smartfile from '../dist/index'
import path = require('path')

import { expect, tap } from 'tapbundle'

// ---------------------------
// smartfile.fs
// ---------------------------

tap.test('.fs.fileExistsSync -> should return an accurate boolean', async () => {
  expect(smartfile.fs.fileExistsSync('./test/mytest.json')).to.be.true
  expect(smartfile.fs.fileExistsSync('./test/notthere.json')).be.false
})

tap.test('.fs.fileExists should resolve or reject a promise', async () => {
  expect(smartfile.fs.fileExists('./test/mytest.json')).to.be.instanceof(Promise)
  await expect(smartfile.fs.fileExists('./test/mytest.json')).to.eventually.be.fulfilled
  await expect(smartfile.fs.fileExists('./test/notthere.json')).to.eventually.be.rejected
})

tap.test('.fs.listFoldersSync() -> should get the file type from a string', async () => {
  expect(smartfile.fs.listFoldersSync('./test/')).to.deep.include('testfolder')
  expect(smartfile.fs.listFoldersSync('./test/')).to.not.deep.include('notExistentFolder')
})

tap.test('.fs.listFolders() -> should get the file type from a string', async () => {
  let folderArrayArg = await smartfile.fs.listFolders('./test/')
  expect(folderArrayArg).to.deep.include('testfolder')
  expect(folderArrayArg).to.not.deep.include('notExistentFolder')
})


tap.test('.fs.listFilesSync() -> should get the file type from a string', async () => {
  expect(smartfile.fs.listFilesSync('./test/')).to.deep.include('mytest.json')
  expect(smartfile.fs.listFilesSync('./test/')).to.not.deep.include('notExistentFile')
  expect(smartfile.fs.listFilesSync('./test/', /mytest\.json/)).to.deep.include('mytest.json')
  expect(smartfile.fs.listFilesSync('./test/', /mytests.json/)).to.not.deep.include('mytest.json')
})

tap.test('.fs.listFiles() -> should get the file type from a string', async () => {
  let folderArrayArg = await smartfile.fs.listFiles('./test/')
  expect(folderArrayArg).to.deep.include('mytest.json')
  expect(folderArrayArg).to.not.deep.include('notExistentFile')
})

tap.test('.fs.listFileTree() -> should get a file tree', async () => {
  let folderArrayArg = await smartfile.fs.listFileTree(path.resolve('./test/'), '**/*.txt')
  expect(folderArrayArg).to.deep.include('testfolder/testfile1.txt')
  expect(folderArrayArg).to.not.deep.include('mytest.json')
})

tap.test('.fs.fileTreeToObject -> should read a file tree into an Object', async () => {
  let fileArrayArg = await smartfile.fs.fileTreeToObject(path.resolve('./test/'), '**/*.txt')
  expect(fileArrayArg[ 0 ]).to.be.instanceof(smartfile.Smartfile)
  expect(fileArrayArg[ 0 ].contents.toString()).to.equal(fileArrayArg[ 0 ].contentBuffer.toString())
})

tap.test('.fs.copy() -> should copy a directory', async () => {
  smartfile.fs.copy('./test/testfolder/', './test/temp/')
})

tap.test('.fs.copy() -> should copy a file', async () => {
  smartfile.fs.copy('./test/mytest.yaml', './test/temp/')
})

tap.test('.fs.copy() -> should copy a file and rename it', async () => {
  smartfile.fs.copy('./test/mytest.yaml', './test/temp/mytestRenamed.yaml')
})

tap.test('.fs.remove() -> should remove an entire directory', async () => {

})

tap.test('.fs.remove -> should remove single files', async () => {
  await expect(smartfile.fs.remove('./test/temp/mytestRenamed.yaml')).to.eventually.be.fulfilled
})

tap.test('.fs.removeSync -> should remove single files synchronouly', async () => {
  smartfile.fs.removeSync('./test/temp/testfile1.txt')
  expect(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).to.be.false
})

tap.test('.fs.removeMany -> should remove and array of files', async () => {
  smartfile.fs.removeMany([ './test/temp/testfile1.txt', './test/temp/testfile2.txt' ]).then(() => {
    expect(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).to.be.false
    expect(smartfile.fs.fileExistsSync('./test/temp/testfile2.txt')).to.be.false
  })
})

tap.test('.fs.removeManySync -> should remove and array of single files synchronouly', async () => {
  smartfile.fs.removeManySync([ './test/temp/testfile1.txt', './test/temp/testfile2.txt' ])
  expect(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).to.be.false
  expect(smartfile.fs.fileExistsSync('./test/temp/testfile2.txt')).to.be.false
})

tap.test('.fs.toObjectSync() -> should read an ' + '.yaml' + ' file to an object', async () => {
  let testData = smartfile.fs.toObjectSync('./test/mytest.yaml')
  expect(testData).have.property('key1', 'this works')
  expect(testData).have.property('key2', 'this works too')

})
tap.test('.fs.toObjectSync() -> should state unknown file type for unknown file types', async () => {
  let testData = smartfile.fs.toObjectSync('./test/mytest.txt')
})

tap.test('.fs.toObjectSync() -> should read an ' + '.json' + ' file to an object', async () => {
  let testData = smartfile.fs.toObjectSync('./test/mytest.json')
  expect(testData).have.property('key1', 'this works')
  expect(testData).have.property('key2', 'this works too')
})


tap.test('.fs.toStringSync() -> should read a file to a string', async () => {
  expect(smartfile.fs.toStringSync('./test/mytest.txt'))
    .to.equal('Some TestString &&%$')
})

// ---------------------------
// smartfile.interpreter
// ---------------------------

tap.test('.interpreter.filetype() -> should get the file type from a string', async () => {
  expect(smartfile.interpreter.filetype('./somefolder/data.json')).equal('json')
})

// ---------------------------
// smartfile.memory
// ---------------------------

tap.test('.memory.toFs() -> should write a file to disk and return a promise', async () => {
  let localString = 'myString'
  await smartfile.memory.toFs(
    localString,
    path.join(process.cwd(), './test/temp/testMemToFs.txt')
  )
})

tap.test('.memory.toFsSync() -> should write a file to disk and return true if successfull', async () => {
  let localString = 'myString'
  smartfile.memory.toFsSync(
    localString,
    path.join(process.cwd(), './test/temp/testMemToFsSync.txt')
  )
})

tap.test('.remote.toString() -> should load a remote file to a variable', async () => {
  let responseString = await smartfile.remote.toString(
    'https://raw.githubusercontent.com/pushrocks/smartfile/master/test/mytest.txt'
  )
  expect(responseString).to.equal('Some TestString &&%$')
})

tap.test('.remote.toString() -> should reject a Promise when the link is false', async () => {
  await expect(smartfile.remote.toString('https://push.rocks/doesnotexist.txt'))
    .to.eventually.be.rejected
})

// ---------------------------
// smartfile.Smartfile
// ---------------------------

tap.test('.Smartfile -> should produce vinyl compatible files', async () => {
  let smartfileArray = await smartfile.fs.fileTreeToObject(process.cwd(), './test/testfolder/**/*')
  let localSmartfile = smartfileArray[ 0 ]
  expect(localSmartfile).to.be.instanceof(smartfile.Smartfile)
  expect(localSmartfile.contents).to.be.instanceof(Buffer)
  // tslint:disable-next-line:no-unused-expression
  expect(localSmartfile.isBuffer()).to.be.true
  // tslint:disable-next-line:no-unused-expression
  expect(localSmartfile.isDirectory()).to.be.false
  // tslint:disable-next-line:no-unused-expression
  expect(localSmartfile.isNull()).to.be.false
})

tap.test('should output a smartfile array to disk', async () => {
  let smartfileArray = await smartfile.fs.fileTreeToObject('./test/testfolder/', '*')
  for (let smartfile of smartfileArray) {
    console.log(smartfile.relative)
    console.log(smartfile.path)
    console.log(smartfile.base)
    console.log(smartfile.parsedPath)
  }
  await smartfile.memory.smartfileArrayToFs(smartfileArray, path.resolve('./test/temp/testoutput/'))
})

tap.start()
