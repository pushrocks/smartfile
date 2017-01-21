"use strict";
require("typings-test");
const smartfile = require("../dist/index");
const path = require("path");
const smartchai_1 = require("smartchai");
const vinyl = require("vinyl");
describe('smartfile', function () {
    describe('.fs', function () {
        describe('.fileExistsSync', function () {
            it('should return an accurate boolean', function () {
                smartchai_1.expect(smartfile.fs.fileExistsSync('./test/mytest.json')).to.be.true;
                smartchai_1.expect(smartfile.fs.fileExistsSync('./test/notthere.json')).be.false;
            });
        });
        describe('.fileExists', function () {
            it('should return a working promise', function () {
                smartchai_1.expect(smartfile.fs.fileExists('./test/mytest.json')).to.be.a('promise');
                smartchai_1.expect(smartfile.fs.fileExists('./test/mytest.json')).to.be.fulfilled;
                smartchai_1.expect(smartfile.fs.fileExists('./test/notthere.json')).to.not.be.fulfilled;
            });
        });
        describe('.listFoldersSync()', function () {
            it('should get the file type from a string', function () {
                smartchai_1.expect(smartfile.fs.listFoldersSync('./test/')).to.deep.include('testfolder');
                smartchai_1.expect(smartfile.fs.listFoldersSync('./test/')).to.not.deep.include('notExistentFolder');
            });
        });
        describe('.listFolders()', function () {
            it('should get the file type from a string', function (done) {
                smartfile.fs.listFolders('./test/')
                    .then(function (folderArrayArg) {
                    smartchai_1.expect(folderArrayArg).to.deep.include('testfolder');
                    smartchai_1.expect(folderArrayArg).to.not.deep.include('notExistentFolder');
                    done();
                });
            });
        });
        describe('.listFilesSync()', function () {
            it('should get the file type from a string', function () {
                smartchai_1.expect(smartfile.fs.listFilesSync('./test/')).to.deep.include('mytest.json');
                smartchai_1.expect(smartfile.fs.listFilesSync('./test/')).to.not.deep.include('notExistentFile');
                smartchai_1.expect(smartfile.fs.listFilesSync('./test/', /mytest\.json/)).to.deep.include('mytest.json');
                smartchai_1.expect(smartfile.fs.listFilesSync('./test/', /mytests.json/)).to.not.deep.include('mytest.json');
            });
        });
        describe('.listFiles()', function () {
            it('should get the file type from a string', function (done) {
                smartfile.fs.listFiles('./test/')
                    .then(function (folderArrayArg) {
                    smartchai_1.expect(folderArrayArg).to.deep.include('mytest.json');
                    smartchai_1.expect(folderArrayArg).to.not.deep.include('notExistentFile');
                    done();
                });
            });
        });
        describe('.listFileTree()', function () {
            it('should get a file tree', function (done) {
                smartfile.fs.listFileTree(path.resolve('./test/'), '**/*.txt')
                    .then(function (folderArrayArg) {
                    smartchai_1.expect(folderArrayArg).to.deep.include('testfolder/testfile1.txt');
                    smartchai_1.expect(folderArrayArg).to.not.deep.include('mytest.json');
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
                smartchai_1.expect(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).to.be.false;
            });
            it('smartfile.fs.removeMany -> should remove and array of files', function (done) {
                smartfile.fs.removeMany(['./test/temp/testfile1.txt', './test/temp/testfile2.txt']).then(() => {
                    smartchai_1.expect(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).to.be.false;
                    smartchai_1.expect(smartfile.fs.fileExistsSync('./test/temp/testfile2.txt')).to.be.false;
                    done();
                });
            });
            it('smartfile.fs.removeManySync -> should remove and array of single files synchronouly', function () {
                smartfile.fs.removeManySync(['./test/temp/testfile1.txt', './test/temp/testfile2.txt']);
                smartchai_1.expect(smartfile.fs.fileExistsSync('./test/temp/testfile1.txt')).to.be.false;
                smartchai_1.expect(smartfile.fs.fileExistsSync('./test/temp/testfile2.txt')).to.be.false;
            });
        });
    });
    describe('.interpreter', function () {
        describe('.filetype()', function () {
            it('should get the file type from a string', function () {
                smartchai_1.expect(smartfile.interpreter.filetype('./somefolder/data.json')).equal('json');
            });
        });
    });
    describe('.fs', function () {
        describe('.toObjectSync()', function () {
            it('should read an ' + '.yaml' + ' file to an object', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.yaml');
                smartchai_1.expect(testData).have.property('key1', 'this works');
                smartchai_1.expect(testData).have.property('key2', 'this works too');
            });
            it('should state unknown file type for unknown file types', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.txt');
            });
            it('should read an ' + '.json' + ' file to an object', function () {
                let testData = smartfile.fs.toObjectSync('./test/mytest.json');
                smartchai_1.expect(testData).have.property('key1', 'this works');
                smartchai_1.expect(testData).have.property('key2', 'this works too');
            });
        });
        describe('.toStringSync()', function () {
            it('should read a file to a string', function () {
                smartchai_1.expect(smartfile.fs.toStringSync('./test/mytest.txt'))
                    .to.equal('Some TestString &&%$');
            });
        });
        describe('.toVinylSync', function () {
            it('should read an ' + '.json OR .yaml' + ' file to an ' + 'vinyl file object', function () {
                let testData = smartfile.fs.toVinylSync('./test/mytest.json');
                smartchai_1.expect(vinyl.isVinyl(testData)).to.be.true;
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
                smartchai_1.expect(smartfile.memory.toVinylFileSync(localString, localOptions) instanceof vinyl).to.be.true;
            });
        });
        describe('toVinylArraySync()', function () {
            it('should produce a an array of vinylfiles', function () {
                let localStringArray = ['string1', 'string2', 'string3'];
                let localOptions = { filename: 'vinylfile2', base: '/someDir' };
                let testResult = smartfile.memory.toVinylArraySync(localStringArray, localOptions);
                smartchai_1.expect(testResult).to.be.a('array');
                smartchai_1.expect(testResult.length === 3).to.be.true;
                for (let myKey in testResult) {
                    smartchai_1.expect(testResult[myKey] instanceof vinyl).to.be.true;
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
                smartchai_1.expect(localString).equal('myString');
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
                    smartchai_1.expect(responseString).to.equal('Some TestString &&%$');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQiwyQ0FBMEM7QUFDMUMsNkJBQTZCO0FBRTdCLHlDQUFrQztBQUVsQywrQkFBOEI7QUFFOUIsUUFBUSxDQUFDLFdBQVcsRUFBRTtJQUNsQixRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ1osUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtnQkFDcEMsa0JBQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUE7Z0JBQ3BFLGtCQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUE7WUFDeEUsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtRQUNGLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDcEIsRUFBRSxDQUFDLGlDQUFpQyxFQUFFO2dCQUNsQyxrQkFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDeEUsa0JBQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUE7Z0JBQ3JFLGtCQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQTtZQUMvRSxDQUFDLENBQUMsQ0FBQTtRQUNOLENB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