"use strict";
require("typings-test");
var smartfile = require("../dist/index");
var beautylog = require("beautylog");
var gulp = require("gulp");
var gFunction = require("gulp-function");
var path = require("path");
var should = require("should");
var vinyl = require("vinyl");
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
                var testData = smartfile.fs.toObjectSync("./test/mytest.yaml");
                testData.should.have.property("key1", "this works");
                testData.should.have.property("key2", "this works too");
            });
            it("should state unknown file type for unknown file types", function () {
                var testData = smartfile.fs.toObjectSync("./test/mytest.txt");
            });
            it("should read an " + ".json".blue + " file to an object", function () {
                var testData = smartfile.fs.toObjectSync("./test/mytest.json");
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
                var testData = smartfile.fs.toVinylSync("./test/mytest.json");
                (vinyl.isVinyl(testData)).should.be.true();
            });
        });
    });
    describe(".memory", function () {
        describe(".toGulpStream()", function () {
            it("should produce a valid gulp stream", function () {
                var localArray = ["test1", "test2", "test3"];
                smartfile.memory.toGulpStream(localArray)
                    .pipe(gulp.dest("./test/temp/"));
            });
        });
        describe("toVinylFileSync()", function () {
            it("should produce a vinylFile", function () {
                var localString = "myString";
                var localOptions = { filename: "vinylfile2", base: "/someDir" };
                (smartfile.memory.toVinylFileSync(localString, localOptions) instanceof vinyl).should.be.true();
            });
        });
        describe("toVinylArraySync()", function () {
            it("should produce a an array of vinylfiles", function () {
                var localStringArray = ["string1", "string2", "string3"];
                var localOptions = { filename: "vinylfile2", base: "/someDir" };
                var testResult = smartfile.memory.toVinylArraySync(localStringArray, localOptions);
                testResult.should.be.Array();
                (testResult.length === 3).should.be.true();
                for (var myKey in testResult) {
                    (testResult[myKey] instanceof vinyl).should.be.true();
                }
            });
        });
        describe("toStringSync()", function () {
            it("should produce a String from vinyl file", function () {
                var localString = smartfile.memory.toStringSync(new vinyl({
                    base: "/",
                    path: "/test.txt",
                    contents: new Buffer("myString")
                }));
                localString.should.equal("myString");
            });
        });
        describe("toFs()", function () {
            it("should write a file to disk and return a promise", function (done) {
                var localString = "myString";
                smartfile.memory.toFs(localString, path.join(process.cwd(), "./test/temp/testMemToFs.txt")).then(done);
            });
        });
        describe("toFsSync()", function () {
            it("should write a file to disk and return true if successfull", function () {
                var localString = "myString";
                smartfile.memory.toFsSync(localString, path.join(process.cwd(), "./test/temp/testMemToFsSync.txt"));
            });
        });
    });
    describe(".remote", function () {
        describe("toGulpStreamSync()", function () {
            it("should produce a gulp stream", function (done) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsSUFBWSxTQUFTLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFDM0MsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekMsSUFBTyxJQUFJLFdBQVcsTUFBTSxDQUFDLENBQUM7QUFDOUIsSUFBTyxNQUFNLFdBQVcsUUFBUSxDQUFDLENBQUM7QUFDbEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTdCLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFDO0lBQ3hCLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDO1FBQ2xCLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUM7WUFDOUIsRUFBRSxDQUFDLG1DQUFtQyxFQUFDO2dCQUNuQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQztZQUMxQixFQUFFLENBQUMsaUNBQWlDLEVBQUM7Z0JBQ2pDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENB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