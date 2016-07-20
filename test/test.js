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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsTUFBWSxTQUFTLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFFM0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN6QyxNQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUM5QixNQUFPLE1BQU0sV0FBVyxRQUFRLENBQUMsQ0FBQztBQUNsQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFN0IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUM7SUFDeEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUM7UUFDbEIsUUFBUSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBQztZQUM5QixFQUFFLENBQUMsbUNBQW1DLEVBQUM7Z0JBQ25DLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDO1lBQzFCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBQztnQkFDakMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FB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