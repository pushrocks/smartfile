"use strict";
/// <reference path="../ts/typings/index.d.ts" />
var smartfile = require("../dist/index.js");
var beautylog = require("beautylog");
var gulp = require("gulp");
var gFunction = require("gulp-function");
var should = require("should");
var vinyl = require("vinyl");
describe("smartfile".yellow, function () {
    describe(".checks".yellow, function () {
        describe(".fileExistsSync".yellow, function () {
            it("should return an accurate boolean", function () {
                (smartfile.checks.fileExistsSync("./test/mytest.json")).should.be.true();
                (smartfile.checks.fileExistsSync("./test/notthere.json")).should.be.false();
            });
        });
        describe(".fileExists".yellow, function () {
            it("should return a working promise", function () {
                (smartfile.checks.fileExists("./test/mytest.json")).should.be.Promise();
                (smartfile.checks.fileExists("./test/mytest.json")).should.be.fulfilled();
                (smartfile.checks.fileExists("./test/notthere.json")).should.not.be.fulfilled();
            });
        });
    });
    describe(".fsaction".yellow, function () {
        describe(".copy()".yellow, function () {
            it("should copy a directory", function () {
                smartfile.fsaction.copy("./test/testfolder/", "./test/temp/");
            });
            it("should copy a file", function () {
                smartfile.fsaction.copy("./test/mytest.yaml", "./test/temp/");
            });
            it("should copy a file and rename it", function () {
                smartfile.fsaction.copy("./test/mytest.yaml", "./test/temp/mytestRenamed.yaml");
            });
        });
        describe(".remove()", function () {
            it("should remove an entire directory", function () {
            });
            it("should remove single files", function () {
            });
        });
    });
    describe(".get", function () {
        describe(".filetype()", function () {
            it("should get the file type from a string", function () {
                smartfile.get.filetype("./somefolder/data.json").should.equal("json");
            });
        });
        describe(".foldersSync()", function () {
            it("should get the file type from a string", function () {
                smartfile.get.foldersSync("./test/").should.containDeep(["testfolder"]);
                smartfile.get.foldersSync("./test/").should.not.containDeep(["notExistentFolder"]);
            });
        });
        describe(".folders()", function () {
            it("should get the file type from a string", function (done) {
                smartfile.get.folders("./test/")
                    .then(function (folderArrayArg) {
                    folderArrayArg.should.containDeep(["testfolder"]);
                    folderArrayArg.should.not.containDeep(["notExistentFolder"]);
                    done();
                });
            });
        });
    });
    describe(".local".yellow, function () {
        describe("toGulpStreamSync() and toGulpDestSync", function () {
            it("should produce a gulp stream", function (done) {
                smartfile.local.toGulpStreamSync("./test/my*")
                    .pipe(smartfile.local.toGulpDestSync("./test/temp/"))
                    .pipe(gFunction(done, "atEnd"));
            });
        });
        describe(".toObjectSync()".yellow, function () {
            it("should read an " + ".yaml".blue + " file to an object", function () {
                var testData = smartfile.local.toObjectSync("./test/mytest.yaml");
                testData.should.have.property("key1", "this works");
                testData.should.have.property("key2", "this works too");
            });
            it("should state unknown file type for unknown file types", function () {
                var testData = smartfile.local.toObjectSync("./test/mytest.txt");
            });
            it("should read an " + ".json".blue + " file to an object", function () {
                var testData = smartfile.local.toObjectSync("./test/mytest.json");
                testData.should.have.property("key1", "this works");
                testData.should.have.property("key2", "this works too");
            });
        });
        describe(".toStringSync()".yellow, function () {
            it("should read a file to a string", function () {
                should.equal(smartfile.local.toStringSync("./test/mytest.txt"), "Some TestString &&%$");
            });
        });
        describe(".toVinylSync".yellow, function () {
            it("should read an " + ".json OR .yaml".blue + " file to an " + "vinyl file object".cyan, function () {
                var testData = smartfile.local.toVinylSync("./test/mytest.json");
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
                smartfile.memory.toFs(localString, {
                    fileName: "./test/temp/testMemToFs.txt",
                    filePath: process.cwd()
                }).then(done);
            });
        });
        describe("toFsSync()", function () {
            it("should write a file to disk and return true if successfull", function () {
                var localString = "myString";
                smartfile.memory.toFsSync(localString, {
                    fileName: "./test/temp/testMemToFsSync.txt",
                    filePath: process.cwd()
                });
            });
        });
    });
    describe(".remote", function () {
        describe("toGulpStreamSync()", function () {
            it("should produce a gulp stream", function (done) {
                smartfile.remote.toGulpStreamSync("mytest.txt", "https://raw.githubusercontent.com/pushrocks/smartfile/master/test/")
                    .pipe(smartfile.local.toGulpDestSync("./test/temp/"))
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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SUFDUCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHMvdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cclxuaW1wb3J0ICogYXMgc21hcnRmaWxlIGZyb20gXCIuLi9kaXN0L2luZGV4LmpzXCI7XHJcbmxldCBiZWF1dHlsb2cgPSByZXF1aXJlKFwiYmVhdXR5bG9nXCIpO1xyXG5sZXQgZ3VscCA9IHJlcXVpcmUoXCJndWxwXCIpO1xyXG5sZXQgZ0Z1bmN0aW9uID0gcmVxdWlyZShcImd1bHAtZnVuY3Rpb25cIik7XHJcbmltcG9ydCBzaG91bGQgPSByZXF1aXJlKFwic2hvdWxkXCIpO1xyXG5sZXQgdmlueWwgPSByZXF1aXJlKFwidmlueWxcIik7XHJcblxyXG5kZXNjcmliZShcInNtYXJ0ZmlsZVwiLnllbGxvdyxmdW5jdGlvbigpe1xyXG4gICAgZGVzY3JpYmUoXCIuY2hlY2tzXCIueWVsbG93LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZGVzY3JpYmUoXCIuZmlsZUV4aXN0c1N5bmNcIi55ZWxsb3csZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmV0dXJuIGFuIGFjY3VyYXRlIGJvb2xlYW5cIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgKHNtYXJ0ZmlsZS5jaGVja3MuZmlsZUV4aXN0c1N5bmMoXCIuL3Rlc3QvbXl0ZXN0Lmpzb25cIikpLnNob3VsZC5iZS50cnVlKCk7XHJcbiAgICAgICAgICAgICAgICAoc21hcnRmaWxlLmNoZWNrcy5maWxlRXhpc3RzU3luYyhcIi4vdGVzdC9ub3R0aGVyZS5qc29uXCIpKS5zaG91bGQuYmUuZmFsc2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGVzY3JpYmUoXCIuZmlsZUV4aXN0c1wiLnllbGxvdyxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCByZXR1cm4gYSB3b3JraW5nIHByb21pc2VcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgKHNtYXJ0ZmlsZS5jaGVja3MuZmlsZUV4aXN0cyhcIi4vdGVzdC9teXRlc3QuanNvblwiKSkuc2hvdWxkLmJlLlByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHMoXCIuL3Rlc3QvbXl0ZXN0Lmpzb25cIikpLnNob3VsZC5iZS5mdWxmaWxsZWQoKTtcclxuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHMoXCIuL3Rlc3Qvbm90dGhlcmUuanNvblwiKSkuc2hvdWxkLm5vdC5iZS5mdWxmaWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBkZXNjcmliZShcIi5mc2FjdGlvblwiLnllbGxvdyxmdW5jdGlvbigpe1xyXG4gICAgICAgIGRlc2NyaWJlKFwiLmNvcHkoKVwiLnllbGxvdyxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCBjb3B5IGEgZGlyZWN0b3J5XCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5mc2FjdGlvbi5jb3B5KFwiLi90ZXN0L3Rlc3Rmb2xkZXIvXCIsXCIuL3Rlc3QvdGVtcC9cIilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGNvcHkgYSBmaWxlXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5mc2FjdGlvbi5jb3B5KFwiLi90ZXN0L215dGVzdC55YW1sXCIsXCIuL3Rlc3QvdGVtcC9cIilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGNvcHkgYSBmaWxlIGFuZCByZW5hbWUgaXRcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmZzYWN0aW9uLmNvcHkoXCIuL3Rlc3QvbXl0ZXN0LnlhbWxcIixcIi4vdGVzdC90ZW1wL215dGVzdFJlbmFtZWQueWFtbFwiKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkZXNjcmliZShcIi5yZW1vdmUoKVwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlbW92ZSBhbiBlbnRpcmUgZGlyZWN0b3J5XCIsZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCByZW1vdmUgc2luZ2xlIGZpbGVzXCIsZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoXCIuZ2V0XCIsZnVuY3Rpb24oKXtcclxuICAgICAgICBkZXNjcmliZShcIi5maWxldHlwZSgpXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaXQoXCJzaG91bGQgZ2V0IHRoZSBmaWxlIHR5cGUgZnJvbSBhIHN0cmluZ1wiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZ2V0LmZpbGV0eXBlKFwiLi9zb21lZm9sZGVyL2RhdGEuanNvblwiKS5zaG91bGQuZXF1YWwoXCJqc29uXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkZXNjcmliZShcIi5mb2xkZXJzU3luYygpXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaXQoXCJzaG91bGQgZ2V0IHRoZSBmaWxlIHR5cGUgZnJvbSBhIHN0cmluZ1wiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZ2V0LmZvbGRlcnNTeW5jKFwiLi90ZXN0L1wiKS5zaG91bGQuY29udGFpbkRlZXAoWyBcInRlc3Rmb2xkZXJcIl0pO1xyXG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmdldC5mb2xkZXJzU3luYyhcIi4vdGVzdC9cIikuc2hvdWxkLm5vdC5jb250YWluRGVlcChbIFwibm90RXhpc3RlbnRGb2xkZXJcIl0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkZXNjcmliZShcIi5mb2xkZXJzKClcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCBnZXQgdGhlIGZpbGUgdHlwZSBmcm9tIGEgc3RyaW5nXCIsZnVuY3Rpb24oZG9uZSl7XHJcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZ2V0LmZvbGRlcnMoXCIuL3Rlc3QvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZm9sZGVyQXJyYXlBcmcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb2xkZXJBcnJheUFyZy5zaG91bGQuY29udGFpbkRlZXAoWyBcInRlc3Rmb2xkZXJcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb2xkZXJBcnJheUFyZy5zaG91bGQubm90LmNvbnRhaW5EZWVwKFsgXCJub3RFeGlzdGVudEZvbGRlclwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgZGVzY3JpYmUoXCIubG9jYWxcIi55ZWxsb3csZnVuY3Rpb24oKXtcclxuICAgICAgICBkZXNjcmliZShcInRvR3VscFN0cmVhbVN5bmMoKSBhbmQgdG9HdWxwRGVzdFN5bmNcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCBwcm9kdWNlIGEgZ3VscCBzdHJlYW1cIixmdW5jdGlvbihkb25lKXtcclxuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5sb2NhbC50b0d1bHBTdHJlYW1TeW5jKFwiLi90ZXN0L215KlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHNtYXJ0ZmlsZS5sb2NhbC50b0d1bHBEZXN0U3luYyhcIi4vdGVzdC90ZW1wL1wiKSlcclxuICAgICAgICAgICAgICAgICAgICAucGlwZShnRnVuY3Rpb24oZG9uZSxcImF0RW5kXCIpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGVzY3JpYmUoXCIudG9PYmplY3RTeW5jKClcIi55ZWxsb3csZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmVhZCBhbiBcIiArIFwiLnlhbWxcIi5ibHVlICsgXCIgZmlsZSB0byBhbiBvYmplY3RcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlc3REYXRhID0gc21hcnRmaWxlLmxvY2FsLnRvT2JqZWN0U3luYyhcIi4vdGVzdC9teXRlc3QueWFtbFwiKTtcclxuICAgICAgICAgICAgICAgIHRlc3REYXRhLnNob3VsZC5oYXZlLnByb3BlcnR5KFwia2V5MVwiLFwidGhpcyB3b3Jrc1wiKTtcclxuICAgICAgICAgICAgICAgIHRlc3REYXRhLnNob3VsZC5oYXZlLnByb3BlcnR5KFwia2V5MlwiLFwidGhpcyB3b3JrcyB0b29cIik7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaXQoXCJzaG91bGQgc3RhdGUgdW5rbm93biBmaWxlIHR5cGUgZm9yIHVua25vd24gZmlsZSB0eXBlc1wiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9PYmplY3RTeW5jKFwiLi90ZXN0L215dGVzdC50eHRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGFuIFwiICsgXCIuanNvblwiLmJsdWUgKyBcIiBmaWxlIHRvIGFuIG9iamVjdFwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9PYmplY3RTeW5jKFwiLi90ZXN0L215dGVzdC5qc29uXCIpO1xyXG4gICAgICAgICAgICAgICAgdGVzdERhdGEuc2hvdWxkLmhhdmUucHJvcGVydHkoXCJrZXkxXCIsXCJ0aGlzIHdvcmtzXCIpO1xyXG4gICAgICAgICAgICAgICAgdGVzdERhdGEuc2hvdWxkLmhhdmUucHJvcGVydHkoXCJrZXkyXCIsXCJ0aGlzIHdvcmtzIHRvb1wiKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRlc2NyaWJlKFwiLnRvU3RyaW5nU3luYygpXCIueWVsbG93LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlYWQgYSBmaWxlIHRvIGEgc3RyaW5nXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNob3VsZC5lcXVhbChcclxuICAgICAgICAgICAgICAgICAgICBzbWFydGZpbGUubG9jYWwudG9TdHJpbmdTeW5jKFwiLi90ZXN0L215dGVzdC50eHRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTb21lIFRlc3RTdHJpbmcgJiYlJFwiXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkZXNjcmliZShcIi50b1ZpbnlsU3luY1wiLnllbGxvdyxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGFuIFwiICsgXCIuanNvbiBPUiAueWFtbFwiLmJsdWUgKyBcIiBmaWxlIHRvIGFuIFwiICsgXCJ2aW55bCBmaWxlIG9iamVjdFwiLmN5YW4sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXN0RGF0YSA9IHNtYXJ0ZmlsZS5sb2NhbC50b1ZpbnlsU3luYyhcIi4vdGVzdC9teXRlc3QuanNvblwiKTtcclxuICAgICAgICAgICAgICAgICh2aW55bC5pc1ZpbnlsKHRlc3REYXRhKSkuc2hvdWxkLmJlLnRydWUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoXCIubWVtb3J5XCIsZnVuY3Rpb24oKXtcclxuICAgICAgICBkZXNjcmliZShcIi50b0d1bHBTdHJlYW0oKVwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHByb2R1Y2UgYSB2YWxpZCBndWxwIHN0cmVhbVwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxBcnJheSA9IFtcInRlc3QxXCIsXCJ0ZXN0MlwiLFwidGVzdDNcIl07XHJcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUubWVtb3J5LnRvR3VscFN0cmVhbShsb2NhbEFycmF5KVxyXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKGd1bHAuZGVzdChcIi4vdGVzdC90ZW1wL1wiKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRlc2NyaWJlKFwidG9WaW55bEZpbGVTeW5jKClcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCBwcm9kdWNlIGEgdmlueWxGaWxlXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCBsb2NhbFN0cmluZyA9IFwibXlTdHJpbmdcIjtcclxuICAgICAgICAgICAgICAgIGxldCBsb2NhbE9wdGlvbnMgPSB7ZmlsZW5hbWU6XCJ2aW55bGZpbGUyXCIsYmFzZTpcIi9zb21lRGlyXCJ9O1xyXG4gICAgICAgICAgICAgICAgKHNtYXJ0ZmlsZS5tZW1vcnkudG9WaW55bEZpbGVTeW5jKGxvY2FsU3RyaW5nLGxvY2FsT3B0aW9ucykgaW5zdGFuY2VvZiB2aW55bCkuc2hvdWxkLmJlLnRydWUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGVzY3JpYmUoXCJ0b1ZpbnlsQXJyYXlTeW5jKClcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCBwcm9kdWNlIGEgYW4gYXJyYXkgb2YgdmlueWxmaWxlc1wiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxTdHJpbmdBcnJheSA9IFtcInN0cmluZzFcIixcInN0cmluZzJcIixcInN0cmluZzNcIl07XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxPcHRpb25zID0ge2ZpbGVuYW1lOlwidmlueWxmaWxlMlwiLGJhc2U6XCIvc29tZURpclwifTtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXN0UmVzdWx0ID0gc21hcnRmaWxlLm1lbW9yeS50b1ZpbnlsQXJyYXlTeW5jKGxvY2FsU3RyaW5nQXJyYXksbG9jYWxPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHRlc3RSZXN1bHQuc2hvdWxkLmJlLkFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAodGVzdFJlc3VsdC5sZW5ndGggPT09IDMpLnNob3VsZC5iZS50cnVlKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBteUtleSBpbiB0ZXN0UmVzdWx0KXtcclxuICAgICAgICAgICAgICAgICAgICAodGVzdFJlc3VsdFtteUtleV0gaW5zdGFuY2VvZiB2aW55bCkuc2hvdWxkLmJlLnRydWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGVzY3JpYmUoXCJ0b1N0cmluZ1N5bmMoKVwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHByb2R1Y2UgYSBTdHJpbmcgZnJvbSB2aW55bCBmaWxlXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCBsb2NhbFN0cmluZyA9IHNtYXJ0ZmlsZS5tZW1vcnkudG9TdHJpbmdTeW5jKG5ldyB2aW55bCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZTpcIi9cIixcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOlwiL3Rlc3QudHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudHM6IG5ldyBCdWZmZXIoXCJteVN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdHJpbmcuc2hvdWxkLmVxdWFsKFwibXlTdHJpbmdcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRlc2NyaWJlKFwidG9GcygpXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaXQoXCJzaG91bGQgd3JpdGUgYSBmaWxlIHRvIGRpc2sgYW5kIHJldHVybiBhIHByb21pc2VcIixmdW5jdGlvbihkb25lKXtcclxuICAgICAgICAgICAgICAgIGxldCBsb2NhbFN0cmluZyA9IFwibXlTdHJpbmdcIjtcclxuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5tZW1vcnkudG9GcyhcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOlwiLi90ZXN0L3RlbXAvdGVzdE1lbVRvRnMudHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoOnByb2Nlc3MuY3dkKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApLnRoZW4oZG9uZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRlc2NyaWJlKFwidG9Gc1N5bmMoKVwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHdyaXRlIGEgZmlsZSB0byBkaXNrIGFuZCByZXR1cm4gdHJ1ZSBpZiBzdWNjZXNzZnVsbFwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxTdHJpbmcgPSBcIm15U3RyaW5nXCI7XHJcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUubWVtb3J5LnRvRnNTeW5jKFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RyaW5nLHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6XCIuL3Rlc3QvdGVtcC90ZXN0TWVtVG9Gc1N5bmMudHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoOnByb2Nlc3MuY3dkKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKFwiLnJlbW90ZVwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZGVzY3JpYmUoXCJ0b0d1bHBTdHJlYW1TeW5jKClcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpdChcInNob3VsZCBwcm9kdWNlIGEgZ3VscCBzdHJlYW1cIixmdW5jdGlvbihkb25lKXtcclxuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5yZW1vdGUudG9HdWxwU3RyZWFtU3luYyhcIm15dGVzdC50eHRcIixcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9wdXNocm9ja3Mvc21hcnRmaWxlL21hc3Rlci90ZXN0L1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHNtYXJ0ZmlsZS5sb2NhbC50b0d1bHBEZXN0U3luYyhcIi4vdGVzdC90ZW1wL1wiKSlcclxuICAgICAgICAgICAgICAgICAgICAucGlwZShnRnVuY3Rpb24oZG9uZSxcImF0RW5kXCIpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGVzY3JpYmUoXCIudG9TdHJpbmcoKVwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGxvYWQgYSByZW1vdGUgZmlsZSB0byBhIHZhcmlhYmxlXCIsZnVuY3Rpb24oZG9uZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQoNTAwMCk7XHJcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUucmVtb3RlLnRvU3RyaW5nKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1c2hyb2Nrcy9zbWFydGZpbGUvbWFzdGVyL3Rlc3QvbXl0ZXN0LnR4dFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlU3RyaW5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkLmVxdWFsKHJlc3BvbnNlU3RyaW5nLFwiU29tZSBUZXN0U3RyaW5nICYmJSRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlamVjdCBhIFByb21pc2Ugd2hlbiB0aGUgbGluayBpcyBmYWxzZVwiLGZ1bmN0aW9uKGRvbmUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0KDEwMDAwKTtcclxuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5yZW1vdGUudG9TdHJpbmcoXCJodHRwczovL3B1c2gucm9ja3MvZG9lc25vdGV4aXN0LnR4dFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRoaXMgdGVzdCBzaG91bGQgbm90IGJlIHJlc29sdmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxufSk7XHJcbiJdfQ==
