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
            it("should remove single files", function () {
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

//# sourceMappingURL=data:application/json;base64,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UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxhQUFhLEVBQUM7WUFDbkIsRUFBRSxDQUFDLHlDQUF5QyxFQUFDLFVBQVMsSUFBSTtnQkFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsOEVBQThFLENBQUM7cUJBQ3BHLElBQUksQ0FBQyxVQUFTLGNBQWM7b0JBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQ3BELElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsZ0RBQWdELEVBQUMsVUFBUyxJQUFJO2dCQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQ0FBcUMsQ0FBQztxQkFDM0QsSUFBSSxDQUFDO29CQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxFQUFDO29CQUNFLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90cy90eXBpbmdzL21haW4uZC50c1wiIC8+XG5sZXQgc21hcnRmaWxlID0gcmVxdWlyZShcIi4uL2Rpc3QvaW5kZXguanNcIik7XG5sZXQgYmVhdXR5bG9nID0gcmVxdWlyZShcImJlYXV0eWxvZ1wiKTtcbmxldCBzaG91bGQgPSByZXF1aXJlKFwic2hvdWxkXCIpO1xubGV0IHZpbnlsID0gcmVxdWlyZShcInZpbnlsXCIpO1xubGV0IGdGdW5jdGlvbiA9IHJlcXVpcmUoXCJndWxwLWZ1bmN0aW9uXCIpO1xuXG5kZXNjcmliZShcInNtYXJ0ZmlsZVwiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgIGRlc2NyaWJlKFwiLmNoZWNrc1wiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICBkZXNjcmliZShcIi5maWxlRXhpc3RzU3luY1wiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcmV0dXJuIGFuIGFjY3VyYXRlIGJvb2xlYW5cIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHNTeW5jKFwiLi90ZXN0L215dGVzdC5qc29uXCIpKS5zaG91bGQuYmUudHJ1ZSgpO1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHNTeW5jKFwiLi90ZXN0L25vdHRoZXJlLmpzb25cIikpLnNob3VsZC5iZS5mYWxzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZShcIi5maWxlRXhpc3RzXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZXR1cm4gYSB3b3JraW5nIHByb21pc2VcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHMoXCIuL3Rlc3QvbXl0ZXN0Lmpzb25cIikpLnNob3VsZC5iZS5Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgKHNtYXJ0ZmlsZS5jaGVja3MuZmlsZUV4aXN0cyhcIi4vdGVzdC9teXRlc3QuanNvblwiKSkuc2hvdWxkLmJlLmZ1bGZpbGxlZCgpO1xuICAgICAgICAgICAgICAgIChzbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHMoXCIuL3Rlc3Qvbm90dGhlcmUuanNvblwiKSkuc2hvdWxkLm5vdC5iZS5mdWxmaWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH0pO1xuICAgIGRlc2NyaWJlKFwiLmZzYWN0aW9uXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgIGRlc2NyaWJlKFwiLmNvcHkoKVwiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgY29weSBhIGRpcmVjdG9yeVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmZzYWN0aW9uLmNvcHkoXCIuL3Rlc3QvdGVzdGZvbGRlci9cIixcIi4vdGVzdC90ZW1wL1wiKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCBjb3B5IGEgZmlsZVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmZzYWN0aW9uLmNvcHkoXCIuL3Rlc3QvbXl0ZXN0LnlhbWxcIixcIi4vdGVzdC90ZW1wL1wiKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCBjb3B5IGEgZmlsZSBhbmQgcmVuYW1lIGl0XCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZnNhY3Rpb24uY29weShcIi4vdGVzdC9teXRlc3QueWFtbFwiLFwiLi90ZXN0L3RlbXAvbXl0ZXN0UmVuYW1lZC55YW1sXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnJlbW92ZSgpXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlbW92ZSBhbiBlbnRpcmUgZGlyZWN0b3J5XCIsZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZW1vdmUgc2luZ2xlIGZpbGVzXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZShcIi5sb2NhbFwiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICBkZXNjcmliZShcInRvR3VscFN0cmVhbVN5bmMoKSBhbmQgdG9HdWxwRGVzdFN5bmNcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcHJvZHVjZSBhIGd1bHAgc3RyZWFtXCIsZnVuY3Rpb24oZG9uZSl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmxvY2FsLnRvR3VscFN0cmVhbVN5bmMoXCIuL3Rlc3QvbXkqXCIpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHNtYXJ0ZmlsZS5sb2NhbC50b0d1bHBEZXN0U3luYyhcIi4vdGVzdC90ZW1wL1wiKSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoZ0Z1bmN0aW9uKGRvbmUsXCJhdEVuZFwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvT2JqZWN0U3luYygpXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGFuIFwiICsgXCIueWFtbFwiLmJsdWUgKyBcIiBmaWxlIHRvIGFuIG9iamVjdFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbGV0IHRlc3REYXRhID0gc21hcnRmaWxlLmxvY2FsLnRvT2JqZWN0U3luYyhcIi4vdGVzdC9teXRlc3QueWFtbFwiKTtcbiAgICAgICAgICAgICAgICB0ZXN0RGF0YS5zaG91bGQuaGF2ZS5wcm9wZXJ0eShcImtleTFcIixcInRoaXMgd29ya3NcIik7XG4gICAgICAgICAgICAgICAgdGVzdERhdGEuc2hvdWxkLmhhdmUucHJvcGVydHkoXCJrZXkyXCIsXCJ0aGlzIHdvcmtzIHRvb1wiKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCBzdGF0ZSB1bmtub3duIGZpbGUgdHlwZSBmb3IgdW5rbm93biBmaWxlIHR5cGVzXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9PYmplY3RTeW5jKFwiLi90ZXN0L215dGVzdC50eHRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlYWQgYW4gXCIgKyBcIi5qc29uXCIuYmx1ZSArIFwiIGZpbGUgdG8gYW4gb2JqZWN0XCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9PYmplY3RTeW5jKFwiLi90ZXN0L215dGVzdC5qc29uXCIpO1xuICAgICAgICAgICAgICAgIHRlc3REYXRhLnNob3VsZC5oYXZlLnByb3BlcnR5KFwia2V5MVwiLFwidGhpcyB3b3Jrc1wiKTtcbiAgICAgICAgICAgICAgICB0ZXN0RGF0YS5zaG91bGQuaGF2ZS5wcm9wZXJ0eShcImtleTJcIixcInRoaXMgd29ya3MgdG9vXCIpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvU3RyaW5nU3luYygpXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGEgZmlsZSB0byBhIHN0cmluZ1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2hvdWxkLmVxdWFsKFxuICAgICAgICAgICAgICAgICAgICBzbWFydGZpbGUubG9jYWwudG9TdHJpbmdTeW5jKFwiLi90ZXN0L215dGVzdC50eHRcIiksXG4gICAgICAgICAgICAgICAgICAgIFwiU29tZSBUZXN0U3RyaW5nICYmJSRcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvVmlueWxTeW5jXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGFuIFwiICsgXCIuanNvbiBPUiAueWFtbFwiLmJsdWUgKyBcIiBmaWxlIHRvIGFuIFwiICsgXCJ2aW55bCBmaWxlIG9iamVjdFwiLmN5YW4sZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9WaW55bFN5bmMoXCIuL3Rlc3QvbXl0ZXN0Lmpzb25cIik7XG4gICAgICAgICAgICAgICAgKHZpbnlsLmlzVmlueWwodGVzdERhdGEpKS5zaG91bGQuYmUudHJ1ZSgpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoXCIucmVtb3RlXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgZGVzY3JpYmUoXCJ0b0d1bHBTdHJlYW1TeW5jKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcHJvZHVjZSBhIGd1bHAgc3RyZWFtXCIsZnVuY3Rpb24oZG9uZSl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLnJlbW90ZS50b0d1bHBTdHJlYW1TeW5jKFwibXl0ZXN0LnR4dFwiLFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1c2hyb2Nrcy9zbWFydGZpbGUvbWFzdGVyL3Rlc3QvXCIpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHNtYXJ0ZmlsZS5sb2NhbC50b0d1bHBEZXN0U3luYyhcIi4vdGVzdC90ZW1wL1wiKSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoZ0Z1bmN0aW9uKGRvbmUsXCJhdEVuZFwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvU3RyaW5nKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgbG9hZCBhIHJlbW90ZSBmaWxlIHRvIGEgdmFyaWFibGVcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQoNTAwMCk7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLnJlbW90ZS50b1N0cmluZyhcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9wdXNocm9ja3Mvc21hcnRmaWxlL21hc3Rlci90ZXN0L215dGVzdC50eHRcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2VTdHJpbmcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkLmVxdWFsKHJlc3BvbnNlU3RyaW5nLFwiU29tZSBUZXN0U3RyaW5nICYmJSRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWplY3QgYSBQcm9taXNlIHdoZW4gdGhlIGxpbmsgaXMgZmFsc2VcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQoMTAwMDApO1xuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5yZW1vdGUudG9TdHJpbmcoXCJodHRwczovL3B1c2gucm9ja3MvZG9lc25vdGV4aXN0LnR4dFwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGhpcyB0ZXN0IHNob3VsZCBub3QgYmUgcmVzb2x2ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
