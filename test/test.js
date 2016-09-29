"use strict";
require("typings-test");
const smartfile = require("../dist/index");
let gulp = require('gulp');
let gFunction = require('gulp-function');
const path = require("path");
const should = require("should");
let vinyl = require('vinyl');
describe('smartfile'.yellow, function () {
    describe('.fs'.yellow, function () {
        describe('.fileExistsSync'.yellow, function () {
            it('should return an accurate boolean', function () {
                should(smartfile.fs.fileExistsSync('./test/mytest.json')).be.true();
                should(smartfile.fs.fileExistsSync('./test/notthere.json')).be.false();
            });
        });
        describe('.fileExists'.yellow, function () {
            it('should return a working promise', function () {
                should(smartfile.fs.fileExists('./test/mytest.json')).be.Promise();
                should(smartfile.fs.fileExists('./test/mytest.json')).be.fulfilled();
                should(smartfile.fs.fileExists('./test/notthere.json')).not.be.fulfilled();
            });
        });
        describe('.listFoldersSync()', function () {
            it('should get the file type from a string', function () {
                should(smartfile.fs.listFoldersSync('./test/')).containDeep(['testfolder']);
                should(smartfile.fs.listFoldersSync('./test/')).not.containDeep(['notExistentFolder']);
            });
        });
        describe('.listFolders()', function () {
            it('should get the file type from a string', function (done) {
                smartfile.fs.listFolders('./test/')
                    .then(function (folderArrayArg) {
                    should(folderArrayArg).containDeep(['testfolder']);
                    should(folderArrayArg).not.containDeep(['notExistentFolder']);
                    done();
                });
            });
        });
        describe('.listFilesSync()', function () {
            it('should get the file type from a string', function () {
                should(smartfile.fs.listFilesSync('./test/')).containDeep(['mytest.json']);
                should(smartfile.fs.listFilesSync('./test/')).not.containDeep(['notExistentFile']);
                should(smartfile.fs.listFilesSync('./test/', /mytest\.json/)).containDeep(['mytest.json']);
                should(smartfile.fs.listFilesSync('./test/', /mytests.json/)).not.containDeep(['mytest.json']);
            });
        });
        describe('.listFiles()', function () {
            it('should get the file type from a string', function (done) {
                smartfile.fs.listFiles('./test/')
                    .then(function (folderArrayArg) {
                    should(folderArrayArg).containDeep(['mytest.json']);
                    should(folderArrayArg).not.containDeep(['notExistentFile']);
                    done();
                });
            });
        });
        describe('.listFileTree()', function () {
            it('should get a file tree', function (done) {
                smartfile.fs.listFileTree(path.resolve('./test/'), '**/*.txt')
                    .then(function (folderArrayArg) {
                    should(folderArrayArg).containDeep(['testfolder/testfile1.txt']);
                    should(folderArrayArg).not.containDeep(['mytest.json']);
                    done();
                });
            });
        });
        describe('.copy()'.yellow, function () {
            it('should copy a directory', function () {
                smartfile.fs.copy('./test/testfolder/', './test/temp/');
            });
            it('should copy a file', function () {
                smartfile.fs.copy('./test/mytest.yaml', './test/temp/');
            });
            it('should copy a file and rename it', function () {
                smartfile.fs.copy('./test/mytest.yaml', './test/temp/mytestRenamed.yaml');
            });
        });
        describe('.remove()', function () {
            it('should remove an entire directory', function () {
            });
            it('smartfile.fs.remove -> should remove single files', function (done) {
                smartfile.fs.remove('./test/temp/mytestRenamed.yaml')
                    .then(() => { done(); });
            });
            it('smartfile.fs.removeSync -> should remove single files synchronouly', function () {
                smartfile.fs.removeSync('./test/temp/testfile1.txt');
                should(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).be.false();
            });
            it('smartfile.fs.removeMany -> should remove and array of files', function (done) {
                smartfile.fs.removeMany(['./test/temp/testfile1.txt', './test/temp/testfile2.txt']).then(() => {
                    should(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).be.false();
                    should(smartfile.fs.fileExistsSync('./test/temp/testfile2.txt')).be.false();
                    done();
                });
            });
            it('smartfile.fs.removeManySync -> should remove and array of single files synchronouly', function () {
                smartfile.fs.removeManySync(['./test/temp/testfile1.txt', './test/temp/testfile2.txt']);
                should(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).be.false();
                should(smartfile.fs.fileExistsSync('./test/temp/testfile2.txt')).be.false();
            });
        });
    });
    describe('.interpreter', function () {
        describe('.filetype()', function () {
            it('should get the file type from a string', function () {
                should(smartfile.interpreter.filetype('./somefolder/data.json')).equal('json');
            });
        });
    });
    describe('.fs'.yellow, function () {
        describe('toGulpStreamSync() and toGulpDestSync', function () {
            it('should produce a gulp stream', function (done) {
                smartfile.fs.toGulpStreamSync('./test/my*')
                    .pipe(smartfile.fs.toGulpDestSync('./test/temp/'))
                    .pipe(gFunction(done, 'atEnd'));
            });
        });
        describe('.toObjectSync()'.yellow, function () {
            it('should read an ' + '.yaml'.blue + ' file to an object', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.yaml');
                should(testData).have.property('key1', 'this works');
                should(testData).have.property('key2', 'this works too');
            });
            it('should state unknown file type for unknown file types', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.txt');
            });
            it('should read an ' + '.json'.blue + ' file to an object', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.json');
                should(testData).have.property('key1', 'this works');
                should(testData).have.property('key2', 'this works too');
            });
        });
        describe('.toStringSync()'.yellow, function () {
            it('should read a file to a string', function () {
                should.equal(smartfile.fs.toStringSync('./test/mytest.txt'), 'Some TestString &&%$');
            });
        });
        describe('.toVinylSync'.yellow, function () {
            it('should read an ' + '.json OR .yaml'.blue + ' file to an ' + 'vinyl file object'.cyan, function () {
                let testData = smartfile.fs.toVinylSync('./test/mytest.json');
                should(vinyl.isVinyl(testData)).be.true();
            });
        });
    });
    describe('.memory', function () {
        describe('.toGulpStream()', function () {
            it('should produce a valid gulp stream', function () {
                let localArray = ['test1', 'test2', 'test3'];
                smartfile.memory.toGulpStream(localArray)
                    .pipe(gulp.dest('./test/temp/'));
            });
        });
        describe('toVinylFileSync()', function () {
            it('should produce a vinylFile', function () {
                let localString = 'myString';
                let localOptions = { filename: 'vinylfile2', base: '/someDir' };
                should(smartfile.memory.toVinylFileSync(localString, localOptions) instanceof vinyl).be.true();
            });
        });
        describe('toVinylArraySync()', function () {
            it('should produce a an array of vinylfiles', function () {
                let localStringArray = ['string1', 'string2', 'string3'];
                let localOptions = { filename: 'vinylfile2', base: '/someDir' };
                let testResult = smartfile.memory.toVinylArraySync(localStringArray, localOptions);
                should(testResult).be.Array();
                should(testResult.length === 3).be.true();
                for (let myKey in testResult) {
                    should(testResult[myKey] instanceof vinyl).be.true();
                }
            });
        });
        describe('toStringSync()', function () {
            it('should produce a String from vinyl file', function () {
                let localString = smartfile.memory.toStringSync(new vinyl({
                    base: '/',
                    path: '/test.txt',
                    contents: new Buffer('myString')
                }));
                should(localString).equal('myString');
            });
        });
        describe('toFs()', function () {
            it('should write a file to disk and return a promise', function (done) {
                let localString = 'myString';
                smartfile.memory.toFs(localString, path.join(process.cwd(), './test/temp/testMemToFs.txt')).then(done);
            });
        });
        describe('toFsSync()', function () {
            it('should write a file to disk and return true if successfull', function () {
                let localString = 'myString';
                smartfile.memory.toFsSync(localString, path.join(process.cwd(), './test/temp/testMemToFsSync.txt'));
            });
        });
    });
    describe('.remote', function () {
        describe('toGulpStreamSync()', function () {
            it('should produce a gulp stream', function (done) {
                this.timeout(5000);
                smartfile.remote.toGulpStreamSync('mytest.txt', 'https://raw.githubusercontent.com/pushrocks/smartfile/master/test/').pipe(smartfile.fs.toGulpDestSync('./test/temp/'))
                    .pipe(gFunction(done, 'atEnd'));
            });
        });
        describe('.toString()', function () {
            it('should load a remote file to a variable', function (done) {
                this.timeout(5000);
                smartfile.remote.toString('https://raw.githubusercontent.com/pushrocks/smartfile/master/test/mytest.txt').then(function (responseString) {
                    should.equal(responseString, 'Some TestString &&%$');
                    done();
                });
            });
            it('should reject a Promise when the link is false', function (done) {
                this.timeout(10000);
                smartfile.remote.toString('https://push.rocks/doesnotexist.txt')
                    .then(function () {
                    throw new Error('this test should not be resolved');
                }, function () {
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQiwyQ0FBMEM7QUFFMUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzFCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUN4Qyw2QkFBNkI7QUFDN0IsaUNBQWdDO0FBQ2hDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUU1QixRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtJQUN6QixRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUNuQixRQUFRLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFO1lBQy9CLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtnQkFDcEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ25FLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQzFFLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUMzQixFQUFFLENBQUMsaUNBQWlDLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUNsRSxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtn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