"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        describe('toObjectFromFileTree', function () {
            it('should read a file tree into an Object', function () {
                smartfile.fs.fileTreeToObject(path.resolve('./test/'), '**/*.txt')
                    .then((fileArrayArg) => {
                    // expect(fileArrayArg[1]).to.be.instanceof(smartfile.Smartfile)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBcUI7QUFDckIsMkNBQTBDO0FBQzFDLDZCQUE2QjtBQUU3Qix5Q0FBa0M7QUFFbEMsK0JBQThCO0FBRTlCLFFBQVEsQ0FBQyxXQUFXLEVBQUU7SUFDcEIsUUFBUSxDQUFDLEtBQUssRUFBRTtRQUNkLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixFQUFFLENBQUMsbUNBQW1DLEVBQUU7Z0JBQ3RDLGtCQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFBO2dCQUNwRSxrQkFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFBO1lBQ3RFLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3RCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtnQkFDcEMsa0JBQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3hFLGtCQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFBO2dCQUNyRSxrQkFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUE7WUFDN0UsQ0FBQyxDQUFDLENBQUE7UUFDSixD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