"use strict";
require("typings-test");
const smartfile = require("../dist/index");
const path = require("path");
const should = require("should");
const vinyl = require("vinyl");
describe('smartfile', function () {
    describe('.fs', function () {
        describe('.fileExistsSync', function () {
            it('should return an accurate boolean', function () {
                should(smartfile.fs.fileExistsSync('./test/mytest.json')).be.true();
                should(smartfile.fs.fileExistsSync('./test/notthere.json')).be.false();
            });
        });
        describe('.fileExists', function () {
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
        describe('.copy()', function () {
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
    describe('.fs', function () {
        describe('.toObjectSync()', function () {
            it('should read an ' + '.yaml' + ' file to an object', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.yaml');
                should(testData).have.property('key1', 'this works');
                should(testData).have.property('key2', 'this works too');
            });
            it('should state unknown file type for unknown file types', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.txt');
            });
            it('should read an ' + '.json' + ' file to an object', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.json');
                should(testData).have.property('key1', 'this works');
                should(testData).have.property('key2', 'this works too');
            });
        });
        describe('.toStringSync()', function () {
            it('should read a file to a string', function () {
                should.equal(smartfile.fs.toStringSync('./test/mytest.txt'), 'Some TestString &&%$');
            });
        });
        describe('.toVinylSync', function () {
            it('should read an ' + '.json OR .yaml' + ' file to an ' + 'vinyl file object', function () {
                let testData = smartfile.fs.toVinylSync('./test/mytest.json');
                should(vinyl.isVinyl(testData)).be.true();
            });
        });
    });
    describe('.memory', function () {
        describe('.toGulpStream()', function () {
            it('should produce a valid gulp stream', function () {
                let localArray = ['test1', 'test2', 'test3'];
                smartfile.memory.toGulpStream(localArray);
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
        describe('vinylToStringSync()', function () {
            it('should produce a String from vinyl file', function () {
                let localString = smartfile.memory.vinylToStringSync(new vinyl({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQiwyQ0FBMEM7QUFFMUMsNkJBQTZCO0FBQzdCLGlDQUFnQztBQUNoQywrQkFBOEI7QUFFOUIsUUFBUSxDQUFDLFdBQVcsRUFBRTtJQUNsQixRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ1osUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtnQkFDcEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ25FLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQzFFLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ2xFLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFBO2dCQUNwRSxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUE7WUFDOUUsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtRQUNGLFFBQVEsQ0FBQyxvQkFBb0Is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