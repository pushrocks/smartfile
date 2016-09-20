"use strict";
require("typings-test");
const smartfile = require("../dist/index");
let gulp = require("gulp");
let gFunction = require("gulp-function");
const path = require("path");
const should = require("should");
let vinyl = require("vinyl");
describe("smartfile".yellow, function () {
    describe(".fs".yellow, function () {
        describe(".fileExistsSync".yellow, function () {
            it("should return an accurate boolean", function () {
                (smartfile.fs.fileExistsSync("./test/mytest.json")).should.be.true();
                (smartfile.fs.fileExistsSync("./test/notthere.json")).should.be.false();
            });
        });
        describe(".fileExists".yellow, function () {
            it("should return a working promise", function () {
                (smartfile.fs.fileExists("./test/mytest.json")).should.be.Promise();
                (smartfile.fs.fileExists("./test/mytest.json")).should.be.fulfilled();
                (smartfile.fs.fileExists("./test/notthere.json")).should.not.be.fulfilled();
            });
        });
        describe(".listFoldersSync()", function () {
            it("should get the file type from a string", function () {
                smartfile.fs.listFoldersSync("./test/").should.containDeep(["testfolder"]);
                smartfile.fs.listFoldersSync("./test/").should.not.containDeep(["notExistentFolder"]);
            });
        });
        describe(".listFolders()", function () {
            it("should get the file type from a string", function (done) {
                smartfile.fs.listFolders("./test/")
                    .then(function (folderArrayArg) {
                    folderArrayArg.should.containDeep(["testfolder"]);
                    folderArrayArg.should.not.containDeep(["notExistentFolder"]);
                    done();
                });
            });
        });
        describe(".listFilesSync()", function () {
            it("should get the file type from a string", function () {
                smartfile.fs.listFilesSync("./test/").should.containDeep(["mytest.json"]);
                smartfile.fs.listFilesSync("./test/").should.not.containDeep(["notExistentFile"]);
                smartfile.fs.listFilesSync("./test/", /mytest\.json/).should.containDeep(["mytest.json"]);
                smartfile.fs.listFilesSync("./test/", /mytests.json/).should.not.containDeep(["mytest.json"]);
            });
        });
        describe(".listFiles()", function () {
            it("should get the file type from a string", function (done) {
                smartfile.fs.listFiles("./test/")
                    .then(function (folderArrayArg) {
                    folderArrayArg.should.containDeep(["mytest.json"]);
                    folderArrayArg.should.not.containDeep(["notExistentFile"]);
                    done();
                });
            });
        });
        describe(".listFileTree()", function () {
            it("should get a file tree", function (done) {
                smartfile.fs.listFileTree(path.resolve("./test/"), "**/*.txt")
                    .then(function (folderArrayArg) {
                    folderArrayArg.should.containDeep(["testfolder/testfile1.txt"]);
                    folderArrayArg.should.not.containDeep(["mytest.json"]);
                    done();
                });
            });
        });
        describe(".copy()".yellow, function () {
            it("should copy a directory", function () {
                smartfile.fs.copy("./test/testfolder/", "./test/temp/");
            });
            it("should copy a file", function () {
                smartfile.fs.copy("./test/mytest.yaml", "./test/temp/");
            });
            it("should copy a file and rename it", function () {
                smartfile.fs.copy("./test/mytest.yaml", "./test/temp/mytestRenamed.yaml");
            });
        });
        describe(".remove()", function () {
            it("should remove an entire directory", function () {
            });
            it("should remove single files", function () {
            });
        });
    });
    describe(".interpreter", function () {
        describe(".filetype()", function () {
            it("should get the file type from a string", function () {
                smartfile.interpreter.filetype("./somefolder/data.json").should.equal("json");
            });
        });
    });
    describe(".fs".yellow, function () {
        describe("toGulpStreamSync() and toGulpDestSync", function () {
            it("should produce a gulp stream", function (done) {
                smartfile.fs.toGulpStreamSync("./test/my*")
                    .pipe(smartfile.fs.toGulpDestSync("./test/temp/"))
                    .pipe(gFunction(done, "atEnd"));
            });
        });
        describe(".toObjectSync()".yellow, function () {
            it("should read an " + ".yaml".blue + " file to an object", function () {
                let testData = smartfile.fs.toObjectSync("./test/mytest.yaml");
                testData.should.have.property("key1", "this works");
                testData.should.have.property("key2", "this works too");
            });
            it("should state unknown file type for unknown file types", function () {
                let testData = smartfile.fs.toObjectSync("./test/mytest.txt");
            });
            it("should read an " + ".json".blue + " file to an object", function () {
                let testData = smartfile.fs.toObjectSync("./test/mytest.json");
                testData.should.have.property("key1", "this works");
                testData.should.have.property("key2", "this works too");
            });
        });
        describe(".toStringSync()".yellow, function () {
            it("should read a file to a string", function () {
                should.equal(smartfile.fs.toStringSync("./test/mytest.txt"), "Some TestString &&%$");
            });
        });
        describe(".toVinylSync".yellow, function () {
            it("should read an " + ".json OR .yaml".blue + " file to an " + "vinyl file object".cyan, function () {
                let testData = smartfile.fs.toVinylSync("./test/mytest.json");
                (vinyl.isVinyl(testData)).should.be.true();
            });
        });
    });
    describe(".memory", function () {
        describe(".toGulpStream()", function () {
            it("should produce a valid gulp stream", function () {
                let localArray = ["test1", "test2", "test3"];
                smartfile.memory.toGulpStream(localArray)
                    .pipe(gulp.dest("./test/temp/"));
            });
        });
        describe("toVinylFileSync()", function () {
            it("should produce a vinylFile", function () {
                let localString = "myString";
                let localOptions = { filename: "vinylfile2", base: "/someDir" };
                (smartfile.memory.toVinylFileSync(localString, localOptions) instanceof vinyl).should.be.true();
            });
        });
        describe("toVinylArraySync()", function () {
            it("should produce a an array of vinylfiles", function () {
                let localStringArray = ["string1", "string2", "string3"];
                let localOptions = { filename: "vinylfile2", base: "/someDir" };
                let testResult = smartfile.memory.toVinylArraySync(localStringArray, localOptions);
                testResult.should.be.Array();
                (testResult.length === 3).should.be.true();
                for (let myKey in testResult) {
                    (testResult[myKey] instanceof vinyl).should.be.true();
                }
            });
        });
        describe("toStringSync()", function () {
            it("should produce a String from vinyl file", function () {
                let localString = smartfile.memory.toStringSync(new vinyl({
                    base: "/",
                    path: "/test.txt",
                    contents: new Buffer("myString")
                }));
                localString.should.equal("myString");
            });
        });
        describe("toFs()", function () {
            it("should write a file to disk and return a promise", function (done) {
                let localString = "myString";
                smartfile.memory.toFs(localString, path.join(process.cwd(), "./test/temp/testMemToFs.txt")).then(done);
            });
        });
        describe("toFsSync()", function () {
            it("should write a file to disk and return true if successfull", function () {
                let localString = "myString";
                smartfile.memory.toFsSync(localString, path.join(process.cwd(), "./test/temp/testMemToFsSync.txt"));
            });
        });
    });
    describe(".remote", function () {
        describe("toGulpStreamSync()", function () {
            it("should produce a gulp stream", function (done) {
                this.timeout(5000);
                smartfile.remote.toGulpStreamSync("mytest.txt", "https://raw.githubusercontent.com/pushrocks/smartfile/master/test/")
                    .pipe(smartfile.fs.toGulpDestSync("./test/temp/"))
                    .pipe(gFunction(done, "atEnd"));
            });
        });
        describe(".toString()", function () {
            it("should load a remote file to a variable", function (done) {
                this.timeout(5000);
                smartfile.remote.toString("https://raw.githubusercontent.com/pushrocks/smartfile/master/test/mytest.txt")
                    .then(function (responseString) {
                    should.equal(responseString, "Some TestString &&%$");
                    done();
                });
            });
            it("should reject a Promise when the link is false", function (done) {
                this.timeout(10000);
                smartfile.remote.toString("https://push.rocks/doesnotexist.txt")
                    .then(function () {
                    throw new Error("this test should not be resolved");
                }, function () {
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFzQjtBQUN0QiwyQ0FBMkM7QUFFM0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN6Qyw2QkFBOEI7QUFDOUIsaUNBQWtDO0FBQ2xDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUU3QixRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBQztJQUN4QixRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQztRQUNsQixRQUFRLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFDO1lBQzlCLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBQztnQkFDbkMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDckUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1RSxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUM7WUFDMUIsRUFBRSxDQUFDLGlDQUFpQyxFQUFDO2dCQUNqQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNwRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxD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