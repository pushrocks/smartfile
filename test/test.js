/// <reference path="../ts/typings/main.d.ts" />
var smartfile = require("../dist/index.js");
var beautylog = require("beautylog");
var should = require("should");
var vinyl = require("vinyl");
var gFunction = require("gulp-function");
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
            it("should remove single files");
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

//# sourceMappingURL=data:application/json;base64,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Q0FBQztRQUNILFFBQVEsQ0FBQyxhQUFhLEVBQUM7WUFDbkIsRUFBRSxDQUFDLHlDQUF5QyxFQUFDLFVBQVMsSUFBSTtnQkFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsOEVBQThFLENBQUM7cUJBQ3BHLElBQUksQ0FBQyxVQUFTLGNBQWM7b0JBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQ3BELElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsZ0RBQWdELEVBQUMsVUFBUyxJQUFJO2dCQUM3RCxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQ0FBcUMsQ0FBQztxQkFDM0QsSUFBSSxDQUFDO29CQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxFQUFDO29CQUNFLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90cy90eXBpbmdzL21haW4uZC50c1wiIC8+XG5sZXQgc21hcnRmaWxlID0gcmVxdWlyZShcIi4uL2Rpc3QvaW5kZXguanNcIik7XG5sZXQgYmVhdXR5bG9nID0gcmVxdWlyZShcImJlYXV0eWxvZ1wiKTtcbmxldCBzaG91bGQgPSByZXF1aXJlKFwic2hvdWxkXCIpO1xubGV0IHZpbnlsID0gcmVxdWlyZShcInZpbnlsXCIpO1xubGV0IGdGdW5jdGlvbiA9IHJlcXVpcmUoXCJndWxwLWZ1bmN0aW9uXCIpO1xuXG5kZXNjcmliZShcInNtYXJ0ZmlsZVwiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgIGRlc2NyaWJlKFwiLmNoZWNrc1wiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICBkZXNjcmliZShcIi5maWxlRXhpc3RzU3luY1wiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmV0dXJuIGFuIGFjY3VyYXRlIGJvb2xlYW5cIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHNTeW5jKFwiLi90ZXN0L215dGVzdC5qc29uXCIpKS5zaG91bGQuYmUudHJ1ZSgpO1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHNTeW5jKFwiLi90ZXN0L25vdHRoZXJlLmpzb25cIikpLnNob3VsZC5iZS5mYWxzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcIi5maWxlRXhpc3RzXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZXR1cm4gYSB3b3JraW5nIHByb21pc2VcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHMoXCIuL3Rlc3QvbXl0ZXN0Lmpzb25cIikpLnNob3VsZC5iZS5Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgKHNtYXJ0ZmlsZS5jaGVja3MuZmlsZUV4aXN0cyhcIi4vdGVzdC9teXRlc3QuanNvblwiKSkuc2hvdWxkLmJlLmZ1bGZpbGxlZCgpO1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHMoXCIuL3Rlc3Qvbm90dGhlcmUuanNvblwiKSkuc2hvdWxkLm5vdC5iZS5mdWxmaWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH0pO1xuICAgIGRlc2NyaWJlKFwiLmZzYWN0aW9uXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgIGRlc2NyaWJlKFwiLmNvcHkoKVwiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgY29weSBhIGRpcmVjdG9yeVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmZzYWN0aW9uLmNvcHkoXCIuL3Rlc3QvdGVzdGZvbGRlci9cIixcIi4vdGVzdC90ZW1wL1wiKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCBjb3B5IGEgZmlsZVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmZzYWN0aW9uLmNvcHkoXCIuL3Rlc3QvbXl0ZXN0LnlhbWxcIixcIi4vdGVzdC90ZW1wL1wiKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCBjb3B5IGEgZmlsZSBhbmQgcmVuYW1lIGl0XCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZnNhY3Rpb24uY29weShcIi4vdGVzdC9teXRlc3QueWFtbFwiLFwiLi90ZXN0L3RlbXAvbXl0ZXN0UmVuYW1lZC55YW1sXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnJlbW92ZSgpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlbW92ZSBhbiBlbnRpcmUgZGlyZWN0b3J5XCIsZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZW1vdmUgc2luZ2xlIGZpbGVzXCIpXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKFwiLmxvY2FsXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgIGRlc2NyaWJlKFwidG9HdWxwU3RyZWFtU3luYygpIGFuZCB0b0d1bHBEZXN0U3luY1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBwcm9kdWNlIGEgZ3VscCBzdHJlYW1cIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUubG9jYWwudG9HdWxwU3RyZWFtU3luYyhcIi4vdGVzdC9teSpcIilcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoc21hcnRmaWxlLmxvY2FsLnRvR3VscERlc3RTeW5jKFwiLi90ZXN0L3RlbXAvXCIpKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShnRnVuY3Rpb24oZG9uZSxcImF0RW5kXCIpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIudG9PYmplY3RTeW5jKClcIi55ZWxsb3csZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlYWQgYW4gXCIgKyBcIi55YW1sXCIuYmx1ZSArIFwiIGZpbGUgdG8gYW4gb2JqZWN0XCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9PYmplY3RTeW5jKFwiLi90ZXN0L215dGVzdC55YW1sXCIpO1xuICAgICAgICAgICAgICAgIHRlc3REYXRhLnNob3VsZC5oYXZlLnByb3BlcnR5KFwia2V5MVwiLFwidGhpcyB3b3Jrc1wiKTtcbiAgICAgICAgICAgICAgICB0ZXN0RGF0YS5zaG91bGQuaGF2ZS5wcm9wZXJ0eShcImtleTJcIixcInRoaXMgd29ya3MgdG9vXCIpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHN0YXRlIHVua25vd24gZmlsZSB0eXBlIGZvciB1bmtub3duIGZpbGUgdHlwZXNcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGxldCB0ZXN0RGF0YSA9IHNtYXJ0ZmlsZS5sb2NhbC50b09iamVjdFN5bmMoXCIuL3Rlc3QvbXl0ZXN0LnR4dFwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmVhZCBhbiBcIiArIFwiLmpzb25cIi5ibHVlICsgXCIgZmlsZSB0byBhbiBvYmplY3RcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGxldCB0ZXN0RGF0YSA9IHNtYXJ0ZmlsZS5sb2NhbC50b09iamVjdFN5bmMoXCIuL3Rlc3QvbXl0ZXN0Lmpzb25cIik7XG4gICAgICAgICAgICAgICAgdGVzdERhdGEuc2hvdWxkLmhhdmUucHJvcGVydHkoXCJrZXkxXCIsXCJ0aGlzIHdvcmtzXCIpO1xuICAgICAgICAgICAgICAgIHRlc3REYXRhLnNob3VsZC5oYXZlLnByb3BlcnR5KFwia2V5MlwiLFwidGhpcyB3b3JrcyB0b29cIik7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIudG9TdHJpbmdTeW5jKClcIi55ZWxsb3csZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlYWQgYSBmaWxlIHRvIGEgc3RyaW5nXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzaG91bGQuZXF1YWwoXG4gICAgICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5sb2NhbC50b1N0cmluZ1N5bmMoXCIuL3Rlc3QvbXl0ZXN0LnR4dFwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJTb21lIFRlc3RTdHJpbmcgJiYlJFwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIudG9WaW55bFN5bmNcIi55ZWxsb3csZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlYWQgYW4gXCIgKyBcIi5qc29uIE9SIC55YW1sXCIuYmx1ZSArIFwiIGZpbGUgdG8gYW4gXCIgKyBcInZpbnlsIGZpbGUgb2JqZWN0XCIuY3lhbixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGxldCB0ZXN0RGF0YSA9IHNtYXJ0ZmlsZS5sb2NhbC50b1ZpbnlsU3luYyhcIi4vdGVzdC9teXRlc3QuanNvblwiKTtcbiAgICAgICAgICAgICAgICAodmlueWwuaXNWaW55bCh0ZXN0RGF0YSkpLnNob3VsZC5iZS50cnVlKCk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZShcIi5yZW1vdGVcIixmdW5jdGlvbigpe1xuICAgICAgICBkZXNjcmliZShcInRvR3VscFN0cmVhbVN5bmMoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBwcm9kdWNlIGEgZ3VscCBzdHJlYW1cIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUucmVtb3RlLnRvR3VscFN0cmVhbVN5bmMoXCJteXRlc3QudHh0XCIsXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVzaHJvY2tzL3NtYXJ0ZmlsZS9tYXN0ZXIvdGVzdC9cIilcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoc21hcnRmaWxlLmxvY2FsLnRvR3VscERlc3RTeW5jKFwiLi90ZXN0L3RlbXAvXCIpKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShnRnVuY3Rpb24oZG9uZSxcImF0RW5kXCIpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoXCIudG9TdHJpbmcoKVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBsb2FkIGEgcmVtb3RlIGZpbGUgdG8gYSB2YXJpYWJsZVwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCg1MDAwKTtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUucmVtb3RlLnRvU3RyaW5nKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1c2hyb2Nrcy9zbWFydGZpbGUvbWFzdGVyL3Rlc3QvbXl0ZXN0LnR4dFwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZVN0cmluZyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG91bGQuZXF1YWwocmVzcG9uc2VTdHJpbmcsXCJTb21lIFRlc3RTdHJpbmcgJiYlJFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlamVjdCBhIFByb21pc2Ugd2hlbiB0aGUgbGluayBpcyBmYWxzZVwiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5yZW1vdGUudG9TdHJpbmcoXCJodHRwczovL3B1c2gucm9ja3MvZG9lc25vdGV4aXN0LnR4dFwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGhpcyB0ZXN0IHNob3VsZCBub3QgYmUgcmVzb2x2ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
