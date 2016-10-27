import 'typings-test'
import * as smartfile from '../dist/index'
import beautylog = require('beautylog')
import path = require('path')
import * as should from 'should'
let vinyl = require('vinyl')

describe('smartfile'.yellow, function () {
    describe('.fs'.yellow, function () {
        describe('.fileExistsSync'.yellow, function () {
            it('should return an accurate boolean', function () {
                should(smartfile.fs.fileExistsSync('./test/mytest.json')).be.true()
                should(smartfile.fs.fileExistsSync('./test/notthere.json')).be.false()
            })
        })
        describe('.fileExists'.yellow, function () {
            it('should return a working promise', function () {
                should(smartfile.fs.fileExists('./test/mytest.json')).be.Promise()
                should(smartfile.fs.fileExists('./test/mytest.json')).be.fulfilled()
                should(smartfile.fs.fileExists('./test/notthere.json')).not.be.fulfilled()
            })
        })
        describe('.listFoldersSync()', function () {
            it('should get the file type from a string', function () {
                should(smartfile.fs.listFoldersSync('./test/')).containDeep(['testfolder'])
                should(smartfile.fs.listFoldersSync('./test/')).not.containDeep(['notExistentFolder'])
            })
        })
        describe('.listFolders()', function () {
            it('should get the file type from a string', function (done) {
                smartfile.fs.listFolders('./test/')
                    .then(function (folderArrayArg) {
                        should(folderArrayArg).containDeep(['testfolder'])
                        should(folderArrayArg).not.containDeep(['notExistentFolder'])
                        done()
                    })
            })
        })
        describe('.listFilesSync()', function () {
            it('should get the file type from a string', function () {
                should(smartfile.fs.listFilesSync('./test/')).containDeep(['mytest.json'])
                should(smartfile.fs.listFilesSync('./test/')).not.containDeep(['notExistentFile'])
                should(smartfile.fs.listFilesSync('./test/', /mytest\.json/)).containDeep(['mytest.json'])
                should(smartfile.fs.listFilesSync('./test/', /mytests.json/)).not.containDeep(['mytest.json'])
            })
        })
        describe('.listFiles()', function () {
            it('should get the file type from a string', function (done) {
                smartfile.fs.listFiles('./test/')
                    .then(function (folderArrayArg) {
                        should(folderArrayArg).containDeep(['mytest.json'])
                        should(folderArrayArg).not.containDeep(['notExistentFile'])
                        done()
                    })
            })
        })
        describe('.listFileTree()', function () {
            it('should get a file tree', function (done) {
                smartfile.fs.listFileTree(path.resolve('./test/'), '**/*.txt')
                    .then(function (folderArrayArg) {
                        should(folderArrayArg).containDeep(['testfolder/testfile1.txt'])
                        should(folderArrayArg).not.containDeep(['mytest.json'])
                        done()
                    })
            })
        })
        describe('.copy()'.yellow, function () {
            it('should copy a directory', function () {
                smartfile.fs.copy('./test/testfolder/', './test/temp/')
            })
            it('should copy a file', function () {
                smartfile.fs.copy('./test/mytest.yaml', './test/temp/')
            })
            it('should copy a file and rename it', function () {
                smartfile.fs.copy('./test/mytest.yaml', './test/temp/mytestRenamed.yaml')
            })
        })
        describe('.remove()', function () {
            it('should remove an entire directory', function () {
                
            })
            it('smartfile.fs.remove -> should remove single files', function (done) {
                smartfile.fs.remove('./test/temp/mytestRenamed.yaml')
                    .then(() => { done() })
            })
            it('smartfile.fs.removeSync -> should remove single files synchronouly',function() {
                smartfile.fs.removeSync('./test/temp/testfile1.txt')
                should(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).be.false()
            })
            it('smartfile.fs.removeMany -> should remove and array of files',function(done) {
                smartfile.fs.removeMany(['./test/temp/testfile1.txt','./test/temp/testfile2.txt']).then(() => {
                    should(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).be.false()
                    should(smartfile.fs.fileExistsSync('./test/temp/testfile2.txt')).be.false()
                    done()
                })
            })
            it('smartfile.fs.removeManySync -> should remove and array of single files synchronouly',function() {
                smartfile.fs.removeManySync(['./test/temp/testfile1.txt','./test/temp/testfile2.txt'])
                should(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).be.false()
                should(smartfile.fs.fileExistsSync('./test/temp/testfile2.txt')).be.false()
            })
        })
    })

    describe('.interpreter', function () {
        describe('.filetype()', function () {
            it('should get the file type from a string', function () {
                should(smartfile.interpreter.filetype('./somefolder/data.json')).equal('json')
            })
        })
    })

    describe('.fs'.yellow, function () {
        describe('.toObjectSync()'.yellow, function () {
            it('should read an ' + '.yaml'.blue + ' file to an object', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.yaml')
                should(testData).have.property('key1', 'this works')
                should(testData).have.property('key2', 'this works too')

            })
            it('should state unknown file type for unknown file types', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.txt')
            })
            it('should read an ' + '.json'.blue + ' file to an object', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.json')
                should(testData).have.property('key1', 'this works')
                should(testData).have.property('key2', 'this works too')

            })
        })
        describe('.toStringSync()'.yellow, function () {
            it('should read a file to a string', function () {
                should.equal(
                    smartfile.fs.toStringSync('./test/mytest.txt'),
                    'Some TestString &&%$'
                )
            })
        })
        describe('.toVinylSync'.yellow, function () {
            it('should read an ' + '.json OR .yaml'.blue + ' file to an ' + 'vinyl file object'.cyan, function () {
                let testData = smartfile.fs.toVinylSync('./test/mytest.json')
                should(vinyl.isVinyl(testData)).be.true()
            })
        })
    })

    describe('.memory', function () {
        describe('.toGulpStream()', function () {
            it('should produce a valid gulp stream', function () {
                let localArray = ['test1', 'test2', 'test3']
                smartfile.memory.toGulpStream(localArray)
            })
        })
        describe('toVinylFileSync()', function () {
            it('should produce a vinylFile', function () {
                let localString = 'myString'
                let localOptions = { filename: 'vinylfile2', base: '/someDir' }
                should(smartfile.memory.toVinylFileSync(localString, localOptions) instanceof vinyl).be.true()
            })
        })
        describe('toVinylArraySync()', function () {
            it('should produce a an array of vinylfiles', function () {
                let localStringArray = ['string1', 'string2', 'string3']
                let localOptions = { filename: 'vinylfile2', base: '/someDir' }
                let testResult = smartfile.memory.toVinylArraySync(localStringArray, localOptions)
                should(testResult).be.Array()
                should(testResult.length === 3).be.true()
                for (let myKey in testResult) {
                    should(testResult[myKey] instanceof vinyl).be.true()
                }
            })
        })
        describe('toStringSync()', function () {
            it('should produce a String from vinyl file', function () {
                let localString = smartfile.memory.toStringSync(new vinyl({
                    base: '/',
                    path: '/test.txt',
                    contents: new Buffer('myString')
                }))
                should(localString).equal('myString')
            })
        })
        describe('toFs()', function () {
            it('should write a file to disk and return a promise', function (done) {
                let localString = 'myString'
                smartfile.memory.toFs(
                    localString,
                    path.join(process.cwd(), './test/temp/testMemToFs.txt')
                ).then(done)
            })
        })
        describe('toFsSync()', function () {
            it('should write a file to disk and return true if successfull', function () {
                let localString = 'myString'
                smartfile.memory.toFsSync(
                    localString,
                    path.join(process.cwd(), './test/temp/testMemToFsSync.txt')
                )
            })
        })
    })

    describe('.remote', function () {
        describe('.toString()', function () {
            it('should load a remote file to a variable', function (done) {
                this.timeout(5000)
                smartfile.remote.toString(
                    'https://raw.githubusercontent.com/pushrocks/smartfile/master/test/mytest.txt'
                ).then(function (responseString) {
                    should.equal(responseString, 'Some TestString &&%$')
                    done()
                })
            })
            it('should reject a Promise when the link is false', function (done) {
                this.timeout(10000)
                smartfile.remote.toString('https://push.rocks/doesnotexist.txt')
                    .then(function () {
                        throw new Error('this test should not be resolved')
                    }, function () {
                        done()
                    })
            })
        })
    })
})
