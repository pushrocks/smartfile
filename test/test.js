"use strict";
/// <reference path="../ts/typings/main.d.ts" />
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

//# sourceMappingURL=data:application/json;base64,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Q0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3RzL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cbmxldCBzbWFydGZpbGUgPSByZXF1aXJlKFwiLi4vZGlzdC9pbmRleC5qc1wiKTtcbmxldCBiZWF1dHlsb2cgPSByZXF1aXJlKFwiYmVhdXR5bG9nXCIpO1xubGV0IGd1bHAgPSByZXF1aXJlKFwiZ3VscFwiKTtcbmxldCBnRnVuY3Rpb24gPSByZXF1aXJlKFwiZ3VscC1mdW5jdGlvblwiKTtcbmltcG9ydCBzaG91bGQgPSByZXF1aXJlKFwic2hvdWxkXCIpO1xubGV0IHZpbnlsID0gcmVxdWlyZShcInZpbnlsXCIpO1xuXG5kZXNjcmliZShcInNtYXJ0ZmlsZVwiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgIGRlc2NyaWJlKFwiLmNoZWNrc1wiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICBkZXNjcmliZShcIi5maWxlRXhpc3RzU3luY1wiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmV0dXJuIGFuIGFjY3VyYXRlIGJvb2xlYW5cIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHNTeW5jKFwiLi90ZXN0L215dGVzdC5qc29uXCIpKS5zaG91bGQuYmUudHJ1ZSgpO1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHNTeW5jKFwiLi90ZXN0L25vdHRoZXJlLmpzb25cIikpLnNob3VsZC5iZS5mYWxzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcIi5maWxlRXhpc3RzXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZXR1cm4gYSB3b3JraW5nIHByb21pc2VcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHMoXCIuL3Rlc3QvbXl0ZXN0Lmpzb25cIikpLnNob3VsZC5iZS5Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgKHNtYXJ0ZmlsZS5jaGVja3MuZmlsZUV4aXN0cyhcIi4vdGVzdC9teXRlc3QuanNvblwiKSkuc2hvdWxkLmJlLmZ1bGZpbGxlZCgpO1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHMoXCIuL3Rlc3Qvbm90dGhlcmUuanNvblwiKSkuc2hvdWxkLm5vdC5iZS5mdWxmaWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZShcIi5mc2FjdGlvblwiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICBkZXNjcmliZShcIi5jb3B5KClcIi55ZWxsb3csZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGNvcHkgYSBkaXJlY3RvcnlcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5mc2FjdGlvbi5jb3B5KFwiLi90ZXN0L3Rlc3Rmb2xkZXIvXCIsXCIuL3Rlc3QvdGVtcC9cIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgY29weSBhIGZpbGVcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5mc2FjdGlvbi5jb3B5KFwiLi90ZXN0L215dGVzdC55YW1sXCIsXCIuL3Rlc3QvdGVtcC9cIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgY29weSBhIGZpbGUgYW5kIHJlbmFtZSBpdFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmZzYWN0aW9uLmNvcHkoXCIuL3Rlc3QvbXl0ZXN0LnlhbWxcIixcIi4vdGVzdC90ZW1wL215dGVzdFJlbmFtZWQueWFtbFwiKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcIi5yZW1vdmUoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZW1vdmUgYW4gZW50aXJlIGRpcmVjdG9yeVwiLGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmVtb3ZlIHNpbmdsZSBmaWxlc1wiLGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKFwiLmdldFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgIGRlc2NyaWJlKFwiLmZpbGV0eXBlKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgZ2V0IHRoZSBmaWxlIHR5cGUgZnJvbSBhIHN0cmluZ1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmdldC5maWxldHlwZShcIi4vc29tZWZvbGRlci9kYXRhLmpzb25cIikuc2hvdWxkLmVxdWFsKFwianNvblwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIuZm9sZGVyc1N5bmMoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBnZXQgdGhlIGZpbGUgdHlwZSBmcm9tIGEgc3RyaW5nXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZ2V0LmZvbGRlcnNTeW5jKFwiLi90ZXN0L1wiKS5zaG91bGQuY29udGFpbkRlZXAoWyBcInRlc3Rmb2xkZXJcIl0pO1xuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5nZXQuZm9sZGVyc1N5bmMoXCIuL3Rlc3QvXCIpLnNob3VsZC5ub3QuY29udGFpbkRlZXAoWyBcIm5vdEV4aXN0ZW50Rm9sZGVyXCJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIuZm9sZGVycygpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGdldCB0aGUgZmlsZSB0eXBlIGZyb20gYSBzdHJpbmdcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZ2V0LmZvbGRlcnMoXCIuL3Rlc3QvXCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGZvbGRlckFycmF5QXJnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbGRlckFycmF5QXJnLnNob3VsZC5jb250YWluRGVlcChbIFwidGVzdGZvbGRlclwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2xkZXJBcnJheUFyZy5zaG91bGQubm90LmNvbnRhaW5EZWVwKFsgXCJub3RFeGlzdGVudEZvbGRlclwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZShcIi5sb2NhbFwiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICBkZXNjcmliZShcInRvR3VscFN0cmVhbVN5bmMoKSBhbmQgdG9HdWxwRGVzdFN5bmNcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcHJvZHVjZSBhIGd1bHAgc3RyZWFtXCIsZnVuY3Rpb24oZG9uZSl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmxvY2FsLnRvR3VscFN0cmVhbVN5bmMoXCIuL3Rlc3QvbXkqXCIpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHNtYXJ0ZmlsZS5sb2NhbC50b0d1bHBEZXN0U3luYyhcIi4vdGVzdC90ZW1wL1wiKSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoZ0Z1bmN0aW9uKGRvbmUsXCJhdEVuZFwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvT2JqZWN0U3luYygpXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGFuIFwiICsgXCIueWFtbFwiLmJsdWUgKyBcIiBmaWxlIHRvIGFuIG9iamVjdFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbGV0IHRlc3REYXRhID0gc21hcnRmaWxlLmxvY2FsLnRvT2JqZWN0U3luYyhcIi4vdGVzdC9teXRlc3QueWFtbFwiKTtcbiAgICAgICAgICAgICAgICB0ZXN0RGF0YS5zaG91bGQuaGF2ZS5wcm9wZXJ0eShcImtleTFcIixcInRoaXMgd29ya3NcIik7XG4gICAgICAgICAgICAgICAgdGVzdERhdGEuc2hvdWxkLmhhdmUucHJvcGVydHkoXCJrZXkyXCIsXCJ0aGlzIHdvcmtzIHRvb1wiKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCBzdGF0ZSB1bmtub3duIGZpbGUgdHlwZSBmb3IgdW5rbm93biBmaWxlIHR5cGVzXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9PYmplY3RTeW5jKFwiLi90ZXN0L215dGVzdC50eHRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlYWQgYW4gXCIgKyBcIi5qc29uXCIuYmx1ZSArIFwiIGZpbGUgdG8gYW4gb2JqZWN0XCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9PYmplY3RTeW5jKFwiLi90ZXN0L215dGVzdC5qc29uXCIpO1xuICAgICAgICAgICAgICAgIHRlc3REYXRhLnNob3VsZC5oYXZlLnByb3BlcnR5KFwia2V5MVwiLFwidGhpcyB3b3Jrc1wiKTtcbiAgICAgICAgICAgICAgICB0ZXN0RGF0YS5zaG91bGQuaGF2ZS5wcm9wZXJ0eShcImtleTJcIixcInRoaXMgd29ya3MgdG9vXCIpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvU3RyaW5nU3luYygpXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGEgZmlsZSB0byBhIHN0cmluZ1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2hvdWxkLmVxdWFsKFxuICAgICAgICAgICAgICAgICAgICBzbWFydGZpbGUubG9jYWwudG9TdHJpbmdTeW5jKFwiLi90ZXN0L215dGVzdC50eHRcIiksXG4gICAgICAgICAgICAgICAgICAgIFwiU29tZSBUZXN0U3RyaW5nICYmJSRcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvVmlueWxTeW5jXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGFuIFwiICsgXCIuanNvbiBPUiAueWFtbFwiLmJsdWUgKyBcIiBmaWxlIHRvIGFuIFwiICsgXCJ2aW55bCBmaWxlIG9iamVjdFwiLmN5YW4sZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9WaW55bFN5bmMoXCIuL3Rlc3QvbXl0ZXN0Lmpzb25cIik7XG4gICAgICAgICAgICAgICAgKHZpbnlsLmlzVmlueWwodGVzdERhdGEpKS5zaG91bGQuYmUudHJ1ZSgpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZShcIi5tZW1vcnlcIixmdW5jdGlvbigpe1xuICAgICAgICBkZXNjcmliZShcIi50b0d1bHBTdHJlYW0oKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBwcm9kdWNlIGEgdmFsaWQgZ3VscCBzdHJlYW1cIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGxldCBsb2NhbEFycmF5ID0gW1widGVzdDFcIixcInRlc3QyXCIsXCJ0ZXN0M1wiXTtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUubWVtb3J5LnRvR3VscFN0cmVhbShsb2NhbEFycmF5KVxuICAgICAgICAgICAgICAgICAgICAucGlwZShndWxwLmRlc3QoXCIuL3Rlc3QvdGVtcC9cIikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcInRvVmlueWxGaWxlU3luYygpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHByb2R1Y2UgYSB2aW55bEZpbGVcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGxldCBsb2NhbFN0cmluZyA9IFwibXlTdHJpbmdcIjtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxPcHRpb25zID0ge2ZpbGVuYW1lOlwidmlueWxmaWxlMlwiLGJhc2U6XCIvc29tZURpclwifTtcbiAgICAgICAgICAgICAgICAoc21hcnRmaWxlLm1lbW9yeS50b1ZpbnlsRmlsZVN5bmMobG9jYWxTdHJpbmcsbG9jYWxPcHRpb25zKSBpbnN0YW5jZW9mIHZpbnlsKS5zaG91bGQuYmUudHJ1ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcInRvVmlueWxBcnJheVN5bmMoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBwcm9kdWNlIGEgYW4gYXJyYXkgb2YgdmlueWxmaWxlc1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsU3RyaW5nQXJyYXkgPSBbXCJzdHJpbmcxXCIsXCJzdHJpbmcyXCIsXCJzdHJpbmczXCJdO1xuICAgICAgICAgICAgICAgIGxldCBsb2NhbE9wdGlvbnMgPSB7ZmlsZW5hbWU6XCJ2aW55bGZpbGUyXCIsYmFzZTpcIi9zb21lRGlyXCJ9O1xuICAgICAgICAgICAgICAgIGxldCB0ZXN0UmVzdWx0ID0gc21hcnRmaWxlLm1lbW9yeS50b1ZpbnlsQXJyYXlTeW5jKGxvY2FsU3RyaW5nQXJyYXksbG9jYWxPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0ZXN0UmVzdWx0LnNob3VsZC5iZS5BcnJheSgpO1xuICAgICAgICAgICAgICAgICh0ZXN0UmVzdWx0Lmxlbmd0aCA9PT0gMykuc2hvdWxkLmJlLnRydWUoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBteUtleSBpbiB0ZXN0UmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgKHRlc3RSZXN1bHRbbXlLZXldIGluc3RhbmNlb2YgdmlueWwpLnNob3VsZC5iZS50cnVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcInRvU3RyaW5nU3luYygpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHByb2R1Y2UgYSBTdHJpbmcgZnJvbSB2aW55bCBmaWxlXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxTdHJpbmcgPSBzbWFydGZpbGUubWVtb3J5LnRvU3RyaW5nU3luYyhuZXcgdmlueWwoe1xuICAgICAgICAgICAgICAgICAgICBiYXNlOlwiL1wiLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOlwiL3Rlc3QudHh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzOiBuZXcgQnVmZmVyKFwibXlTdHJpbmdcIilcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdHJpbmcuc2hvdWxkLmVxdWFsKFwibXlTdHJpbmdcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwidG9GcygpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHdyaXRlIGEgZmlsZSB0byBkaXNrIGFuZCByZXR1cm4gYSBwcm9taXNlXCIsZnVuY3Rpb24oZG9uZSl7XG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsU3RyaW5nID0gXCJteVN0cmluZ1wiO1xuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5tZW1vcnkudG9GcyhcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOlwiLi90ZXN0L3RlbXAvdGVzdE1lbVRvRnMudHh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDpwcm9jZXNzLmN3ZCgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwidG9Gc1N5bmMoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCB3cml0ZSBhIGZpbGUgdG8gZGlzayBhbmQgcmV0dXJuIHRydWUgaWYgc3VjY2Vzc2Z1bGxcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGxldCBsb2NhbFN0cmluZyA9IFwibXlTdHJpbmdcIjtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUubWVtb3J5LnRvRnNTeW5jKFxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0cmluZyx7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTpcIi4vdGVzdC90ZW1wL3Rlc3RNZW1Ub0ZzU3luYy50eHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoOnByb2Nlc3MuY3dkKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZShcIi5yZW1vdGVcIixmdW5jdGlvbigpe1xuICAgICAgICBkZXNjcmliZShcInRvR3VscFN0cmVhbVN5bmMoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBwcm9kdWNlIGEgZ3VscCBzdHJlYW1cIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUucmVtb3RlLnRvR3VscFN0cmVhbVN5bmMoXCJteXRlc3QudHh0XCIsXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVzaHJvY2tzL3NtYXJ0ZmlsZS9tYXN0ZXIvdGVzdC9cIilcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoc21hcnRmaWxlLmxvY2FsLnRvR3VscERlc3RTeW5jKFwiLi90ZXN0L3RlbXAvXCIpKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShnRnVuY3Rpb24oZG9uZSxcImF0RW5kXCIpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIudG9TdHJpbmcoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBsb2FkIGEgcmVtb3RlIGZpbGUgdG8gYSB2YXJpYWJsZVwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCg1MDAwKTtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUucmVtb3RlLnRvU3RyaW5nKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1c2hyb2Nrcy9zbWFydGZpbGUvbWFzdGVyL3Rlc3QvbXl0ZXN0LnR4dFwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZVN0cmluZyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG91bGQuZXF1YWwocmVzcG9uc2VTdHJpbmcsXCJTb21lIFRlc3RTdHJpbmcgJiYlJFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlamVjdCBhIFByb21pc2Ugd2hlbiB0aGUgbGluayBpcyBmYWxzZVwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCgxMDAwMCk7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLnJlbW90ZS50b1N0cmluZyhcImh0dHBzOi8vcHVzaC5yb2Nrcy9kb2Vzbm90ZXhpc3QudHh0XCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0aGlzIHRlc3Qgc2hvdWxkIG5vdCBiZSByZXNvbHZlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSxmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
