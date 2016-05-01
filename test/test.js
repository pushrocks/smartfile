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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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SUFDUCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHMvdHlwaW5ncy9tYWluLmQudHNcIiAvPlxuaW1wb3J0ICogYXMgc21hcnRmaWxlIGZyb20gXCIuLi9kaXN0L2luZGV4LmpzXCI7XG5sZXQgYmVhdXR5bG9nID0gcmVxdWlyZShcImJlYXV0eWxvZ1wiKTtcbmxldCBndWxwID0gcmVxdWlyZShcImd1bHBcIik7XG5sZXQgZ0Z1bmN0aW9uID0gcmVxdWlyZShcImd1bHAtZnVuY3Rpb25cIik7XG5pbXBvcnQgc2hvdWxkID0gcmVxdWlyZShcInNob3VsZFwiKTtcbmxldCB2aW55bCA9IHJlcXVpcmUoXCJ2aW55bFwiKTtcblxuZGVzY3JpYmUoXCJzbWFydGZpbGVcIi55ZWxsb3csZnVuY3Rpb24oKXtcbiAgICBkZXNjcmliZShcIi5jaGVja3NcIi55ZWxsb3csZnVuY3Rpb24oKXtcbiAgICAgICAgZGVzY3JpYmUoXCIuZmlsZUV4aXN0c1N5bmNcIi55ZWxsb3csZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJldHVybiBhbiBhY2N1cmF0ZSBib29sZWFuXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAoc21hcnRmaWxlLmNoZWNrcy5maWxlRXhpc3RzU3luYyhcIi4vdGVzdC9teXRlc3QuanNvblwiKSkuc2hvdWxkLmJlLnRydWUoKTtcbiAgICAgICAgICAgICAgICAoc21hcnRmaWxlLmNoZWNrcy5maWxlRXhpc3RzU3luYyhcIi4vdGVzdC9ub3R0aGVyZS5qc29uXCIpKS5zaG91bGQuYmUuZmFsc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIuZmlsZUV4aXN0c1wiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmV0dXJuIGEgd29ya2luZyBwcm9taXNlXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAoc21hcnRmaWxlLmNoZWNrcy5maWxlRXhpc3RzKFwiLi90ZXN0L215dGVzdC5qc29uXCIpKS5zaG91bGQuYmUuUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHMoXCIuL3Rlc3QvbXl0ZXN0Lmpzb25cIikpLnNob3VsZC5iZS5mdWxmaWxsZWQoKTtcbiAgICAgICAgICAgICAgICAoc21hcnRmaWxlLmNoZWNrcy5maWxlRXhpc3RzKFwiLi90ZXN0L25vdHRoZXJlLmpzb25cIikpLnNob3VsZC5ub3QuYmUuZnVsZmlsbGVkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9KTtcblxuXG4gICAgZGVzY3JpYmUoXCIuZnNhY3Rpb25cIi55ZWxsb3csZnVuY3Rpb24oKXtcbiAgICAgICAgZGVzY3JpYmUoXCIuY29weSgpXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBjb3B5IGEgZGlyZWN0b3J5XCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZnNhY3Rpb24uY29weShcIi4vdGVzdC90ZXN0Zm9sZGVyL1wiLFwiLi90ZXN0L3RlbXAvXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGNvcHkgYSBmaWxlXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZnNhY3Rpb24uY29weShcIi4vdGVzdC9teXRlc3QueWFtbFwiLFwiLi90ZXN0L3RlbXAvXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGNvcHkgYSBmaWxlIGFuZCByZW5hbWUgaXRcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5mc2FjdGlvbi5jb3B5KFwiLi90ZXN0L215dGVzdC55YW1sXCIsXCIuL3Rlc3QvdGVtcC9teXRlc3RSZW5hbWVkLnlhbWxcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIucmVtb3ZlKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmVtb3ZlIGFuIGVudGlyZSBkaXJlY3RvcnlcIixmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlbW92ZSBzaW5nbGUgZmlsZXNcIixmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZShcIi5nZXRcIixmdW5jdGlvbigpe1xuICAgICAgICBkZXNjcmliZShcIi5maWxldHlwZSgpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGdldCB0aGUgZmlsZSB0eXBlIGZyb20gYSBzdHJpbmdcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5nZXQuZmlsZXR5cGUoXCIuL3NvbWVmb2xkZXIvZGF0YS5qc29uXCIpLnNob3VsZC5lcXVhbChcImpzb25cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLmZvbGRlcnNTeW5jKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgZ2V0IHRoZSBmaWxlIHR5cGUgZnJvbSBhIHN0cmluZ1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmdldC5mb2xkZXJzU3luYyhcIi4vdGVzdC9cIikuc2hvdWxkLmNvbnRhaW5EZWVwKFsgXCJ0ZXN0Zm9sZGVyXCJdKTtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZ2V0LmZvbGRlcnNTeW5jKFwiLi90ZXN0L1wiKS5zaG91bGQubm90LmNvbnRhaW5EZWVwKFsgXCJub3RFeGlzdGVudEZvbGRlclwiXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLmZvbGRlcnMoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBnZXQgdGhlIGZpbGUgdHlwZSBmcm9tIGEgc3RyaW5nXCIsZnVuY3Rpb24oZG9uZSl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmdldC5mb2xkZXJzKFwiLi90ZXN0L1wiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihmb2xkZXJBcnJheUFyZyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2xkZXJBcnJheUFyZy5zaG91bGQuY29udGFpbkRlZXAoWyBcInRlc3Rmb2xkZXJcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9sZGVyQXJyYXlBcmcuc2hvdWxkLm5vdC5jb250YWluRGVlcChbIFwibm90RXhpc3RlbnRGb2xkZXJcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgZGVzY3JpYmUoXCIubG9jYWxcIi55ZWxsb3csZnVuY3Rpb24oKXtcbiAgICAgICAgZGVzY3JpYmUoXCJ0b0d1bHBTdHJlYW1TeW5jKCkgYW5kIHRvR3VscERlc3RTeW5jXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHByb2R1Y2UgYSBndWxwIHN0cmVhbVwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5sb2NhbC50b0d1bHBTdHJlYW1TeW5jKFwiLi90ZXN0L215KlwiKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShzbWFydGZpbGUubG9jYWwudG9HdWxwRGVzdFN5bmMoXCIuL3Rlc3QvdGVtcC9cIikpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKGdGdW5jdGlvbihkb25lLFwiYXRFbmRcIikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcIi50b09iamVjdFN5bmMoKVwiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmVhZCBhbiBcIiArIFwiLnlhbWxcIi5ibHVlICsgXCIgZmlsZSB0byBhbiBvYmplY3RcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGxldCB0ZXN0RGF0YSA9IHNtYXJ0ZmlsZS5sb2NhbC50b09iamVjdFN5bmMoXCIuL3Rlc3QvbXl0ZXN0LnlhbWxcIik7XG4gICAgICAgICAgICAgICAgdGVzdERhdGEuc2hvdWxkLmhhdmUucHJvcGVydHkoXCJrZXkxXCIsXCJ0aGlzIHdvcmtzXCIpO1xuICAgICAgICAgICAgICAgIHRlc3REYXRhLnNob3VsZC5oYXZlLnByb3BlcnR5KFwia2V5MlwiLFwidGhpcyB3b3JrcyB0b29cIik7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgc3RhdGUgdW5rbm93biBmaWxlIHR5cGUgZm9yIHVua25vd24gZmlsZSB0eXBlc1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbGV0IHRlc3REYXRhID0gc21hcnRmaWxlLmxvY2FsLnRvT2JqZWN0U3luYyhcIi4vdGVzdC9teXRlc3QudHh0XCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGFuIFwiICsgXCIuanNvblwiLmJsdWUgKyBcIiBmaWxlIHRvIGFuIG9iamVjdFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbGV0IHRlc3REYXRhID0gc21hcnRmaWxlLmxvY2FsLnRvT2JqZWN0U3luYyhcIi4vdGVzdC9teXRlc3QuanNvblwiKTtcbiAgICAgICAgICAgICAgICB0ZXN0RGF0YS5zaG91bGQuaGF2ZS5wcm9wZXJ0eShcImtleTFcIixcInRoaXMgd29ya3NcIik7XG4gICAgICAgICAgICAgICAgdGVzdERhdGEuc2hvdWxkLmhhdmUucHJvcGVydHkoXCJrZXkyXCIsXCJ0aGlzIHdvcmtzIHRvb1wiKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcIi50b1N0cmluZ1N5bmMoKVwiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmVhZCBhIGZpbGUgdG8gYSBzdHJpbmdcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNob3VsZC5lcXVhbChcbiAgICAgICAgICAgICAgICAgICAgc21hcnRmaWxlLmxvY2FsLnRvU3RyaW5nU3luYyhcIi4vdGVzdC9teXRlc3QudHh0XCIpLFxuICAgICAgICAgICAgICAgICAgICBcIlNvbWUgVGVzdFN0cmluZyAmJiUkXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcIi50b1ZpbnlsU3luY1wiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmVhZCBhbiBcIiArIFwiLmpzb24gT1IgLnlhbWxcIi5ibHVlICsgXCIgZmlsZSB0byBhbiBcIiArIFwidmlueWwgZmlsZSBvYmplY3RcIi5jeWFuLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbGV0IHRlc3REYXRhID0gc21hcnRmaWxlLmxvY2FsLnRvVmlueWxTeW5jKFwiLi90ZXN0L215dGVzdC5qc29uXCIpO1xuICAgICAgICAgICAgICAgICh2aW55bC5pc1ZpbnlsKHRlc3REYXRhKSkuc2hvdWxkLmJlLnRydWUoKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoXCIubWVtb3J5XCIsZnVuY3Rpb24oKXtcbiAgICAgICAgZGVzY3JpYmUoXCIudG9HdWxwU3RyZWFtKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcHJvZHVjZSBhIHZhbGlkIGd1bHAgc3RyZWFtXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxBcnJheSA9IFtcInRlc3QxXCIsXCJ0ZXN0MlwiLFwidGVzdDNcIl07XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLm1lbW9yeS50b0d1bHBTdHJlYW0obG9jYWxBcnJheSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoZ3VscC5kZXN0KFwiLi90ZXN0L3RlbXAvXCIpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCJ0b1ZpbnlsRmlsZVN5bmMoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBwcm9kdWNlIGEgdmlueWxGaWxlXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxTdHJpbmcgPSBcIm15U3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsT3B0aW9ucyA9IHtmaWxlbmFtZTpcInZpbnlsZmlsZTJcIixiYXNlOlwiL3NvbWVEaXJcIn07XG4gICAgICAgICAgICAgICAgKHNtYXJ0ZmlsZS5tZW1vcnkudG9WaW55bEZpbGVTeW5jKGxvY2FsU3RyaW5nLGxvY2FsT3B0aW9ucykgaW5zdGFuY2VvZiB2aW55bCkuc2hvdWxkLmJlLnRydWUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCJ0b1ZpbnlsQXJyYXlTeW5jKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcHJvZHVjZSBhIGFuIGFycmF5IG9mIHZpbnlsZmlsZXNcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGxldCBsb2NhbFN0cmluZ0FycmF5ID0gW1wic3RyaW5nMVwiLFwic3RyaW5nMlwiLFwic3RyaW5nM1wiXTtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxPcHRpb25zID0ge2ZpbGVuYW1lOlwidmlueWxmaWxlMlwiLGJhc2U6XCIvc29tZURpclwifTtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdFJlc3VsdCA9IHNtYXJ0ZmlsZS5tZW1vcnkudG9WaW55bEFycmF5U3luYyhsb2NhbFN0cmluZ0FycmF5LGxvY2FsT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGVzdFJlc3VsdC5zaG91bGQuYmUuQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAodGVzdFJlc3VsdC5sZW5ndGggPT09IDMpLnNob3VsZC5iZS50cnVlKCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbXlLZXkgaW4gdGVzdFJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICh0ZXN0UmVzdWx0W215S2V5XSBpbnN0YW5jZW9mIHZpbnlsKS5zaG91bGQuYmUudHJ1ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCJ0b1N0cmluZ1N5bmMoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBwcm9kdWNlIGEgU3RyaW5nIGZyb20gdmlueWwgZmlsZVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsU3RyaW5nID0gc21hcnRmaWxlLm1lbW9yeS50b1N0cmluZ1N5bmMobmV3IHZpbnlsKHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZTpcIi9cIixcbiAgICAgICAgICAgICAgICAgICAgcGF0aDpcIi90ZXN0LnR4dFwiLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50czogbmV3IEJ1ZmZlcihcIm15U3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RyaW5nLnNob3VsZC5lcXVhbChcIm15U3RyaW5nXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcInRvRnMoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCB3cml0ZSBhIGZpbGUgdG8gZGlzayBhbmQgcmV0dXJuIGEgcHJvbWlzZVwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIGxldCBsb2NhbFN0cmluZyA9IFwibXlTdHJpbmdcIjtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUubWVtb3J5LnRvRnMoXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTpcIi4vdGVzdC90ZW1wL3Rlc3RNZW1Ub0ZzLnR4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGg6cHJvY2Vzcy5jd2QoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcInRvRnNTeW5jKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgd3JpdGUgYSBmaWxlIHRvIGRpc2sgYW5kIHJldHVybiB0cnVlIGlmIHN1Y2Nlc3NmdWxsXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxTdHJpbmcgPSBcIm15U3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLm1lbW9yeS50b0ZzU3luYyhcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdHJpbmcse1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6XCIuL3Rlc3QvdGVtcC90ZXN0TWVtVG9Gc1N5bmMudHh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDpwcm9jZXNzLmN3ZCgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoXCIucmVtb3RlXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgZGVzY3JpYmUoXCJ0b0d1bHBTdHJlYW1TeW5jKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcHJvZHVjZSBhIGd1bHAgc3RyZWFtXCIsZnVuY3Rpb24oZG9uZSl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLnJlbW90ZS50b0d1bHBTdHJlYW1TeW5jKFwibXl0ZXN0LnR4dFwiLFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1c2hyb2Nrcy9zbWFydGZpbGUvbWFzdGVyL3Rlc3QvXCIpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHNtYXJ0ZmlsZS5sb2NhbC50b0d1bHBEZXN0U3luYyhcIi4vdGVzdC90ZW1wL1wiKSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoZ0Z1bmN0aW9uKGRvbmUsXCJhdEVuZFwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvU3RyaW5nKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgbG9hZCBhIHJlbW90ZSBmaWxlIHRvIGEgdmFyaWFibGVcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQoNTAwMCk7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLnJlbW90ZS50b1N0cmluZyhcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9wdXNocm9ja3Mvc21hcnRmaWxlL21hc3Rlci90ZXN0L215dGVzdC50eHRcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2VTdHJpbmcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkLmVxdWFsKHJlc3BvbnNlU3RyaW5nLFwiU29tZSBUZXN0U3RyaW5nICYmJSRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWplY3QgYSBQcm9taXNlIHdoZW4gdGhlIGxpbmsgaXMgZmFsc2VcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQoMTAwMDApO1xuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5yZW1vdGUudG9TdHJpbmcoXCJodHRwczovL3B1c2gucm9ja3MvZG9lc25vdGV4aXN0LnR4dFwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGhpcyB0ZXN0IHNob3VsZCBub3QgYmUgcmVzb2x2ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KVxufSk7XG4iXX0=
