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

//# sourceMappingURL=data:application/json;base64,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TUFBTSxDQUFDLFFBQVEsQ0FBQyw4RUFBOEUsQ0FBQztxQkFDcEcsSUFBSSxDQUFDLFVBQVMsY0FBYztvQkFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxFQUFFLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxnREFBZ0QsRUFBQyxVQUFTLElBQUk7Z0JBQzdELFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHFDQUFxQyxDQUFDO3FCQUMzRCxJQUFJLENBQUM7b0JBQ0YsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDLEVBQUM7b0JBQ0UsSUFBSSxFQUFFLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3RzL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cbmxldCBzbWFydGZpbGUgPSByZXF1aXJlKFwiLi4vZGlzdC9pbmRleC5qc1wiKTtcbmxldCBiZWF1dHlsb2cgPSByZXF1aXJlKFwiYmVhdXR5bG9nXCIpO1xubGV0IHNob3VsZCA9IHJlcXVpcmUoXCJzaG91bGRcIik7XG5sZXQgdmlueWwgPSByZXF1aXJlKFwidmlueWxcIik7XG5sZXQgZ0Z1bmN0aW9uID0gcmVxdWlyZShcImd1bHAtZnVuY3Rpb25cIik7XG5cbmRlc2NyaWJlKFwic21hcnRmaWxlXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgZGVzY3JpYmUoXCIuY2hlY2tzXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgIGRlc2NyaWJlKFwiLmZpbGVFeGlzdHNTeW5jXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZXR1cm4gYW4gYWNjdXJhdGUgYm9vbGVhblwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgKHNtYXJ0ZmlsZS5jaGVja3MuZmlsZUV4aXN0c1N5bmMoXCIuL3Rlc3QvbXl0ZXN0Lmpzb25cIikpLnNob3VsZC5iZS50cnVlKCk7XG4gICAgICAgICAgICAgICAgKHNtYXJ0ZmlsZS5jaGVja3MuZmlsZUV4aXN0c1N5bmMoXCIuL3Rlc3Qvbm90dGhlcmUuanNvblwiKSkuc2hvdWxkLmJlLmZhbHNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLmZpbGVFeGlzdHNcIi55ZWxsb3csZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJldHVybiBhIHdvcmtpbmcgcHJvbWlzZVwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgKHNtYXJ0ZmlsZS5jaGVja3MuZmlsZUV4aXN0cyhcIi4vdGVzdC9teXRlc3QuanNvblwiKSkuc2hvdWxkLmJlLlByb21pc2UoKTtcbiAgICAgICAgICAgICAgICAoc21hcnRmaWxlLmNoZWNrcy5maWxlRXhpc3RzKFwiLi90ZXN0L215dGVzdC5qc29uXCIpKS5zaG91bGQuYmUuZnVsZmlsbGVkKCk7XG4gICAgICAgICAgICAgICAgKHNtYXJ0ZmlsZS5jaGVja3MuZmlsZUV4aXN0cyhcIi4vdGVzdC9ub3R0aGVyZS5qc29uXCIpKS5zaG91bGQubm90LmJlLmZ1bGZpbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgZGVzY3JpYmUoXCIuZnNhY3Rpb25cIi55ZWxsb3csZnVuY3Rpb24oKXtcbiAgICAgICAgZGVzY3JpYmUoXCIuY29weSgpXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCBjb3B5IGEgZGlyZWN0b3J5XCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZnNhY3Rpb24uY29weShcIi4vdGVzdC90ZXN0Zm9sZGVyL1wiLFwiLi90ZXN0L3RlbXAvXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGNvcHkgYSBmaWxlXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUuZnNhY3Rpb24uY29weShcIi4vdGVzdC9teXRlc3QueWFtbFwiLFwiLi90ZXN0L3RlbXAvXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIGNvcHkgYSBmaWxlIGFuZCByZW5hbWUgaXRcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNtYXJ0ZmlsZS5mc2FjdGlvbi5jb3B5KFwiLi90ZXN0L215dGVzdC55YW1sXCIsXCIuL3Rlc3QvdGVtcC9teXRlc3RSZW5hbWVkLnlhbWxcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZShcIi5sb2NhbFwiLnllbGxvdyxmdW5jdGlvbigpe1xuICAgICAgICBkZXNjcmliZShcInRvR3VscFN0cmVhbVN5bmMoKSBhbmQgdG9HdWxwRGVzdFN5bmNcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcHJvZHVjZSBhIGd1bHAgc3RyZWFtXCIsZnVuY3Rpb24oZG9uZSl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLmxvY2FsLnRvR3VscFN0cmVhbVN5bmMoXCIuL3Rlc3QvbXkqXCIpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHNtYXJ0ZmlsZS5sb2NhbC50b0d1bHBEZXN0U3luYyhcIi4vdGVzdC90ZW1wL1wiKSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoZ0Z1bmN0aW9uKGRvbmUsXCJhdEVuZFwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvT2JqZWN0U3luYygpXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGFuIFwiICsgXCIueWFtbFwiLmJsdWUgKyBcIiBmaWxlIHRvIGFuIG9iamVjdFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbGV0IHRlc3REYXRhID0gc21hcnRmaWxlLmxvY2FsLnRvT2JqZWN0U3luYyhcIi4vdGVzdC9teXRlc3QueWFtbFwiKTtcbiAgICAgICAgICAgICAgICB0ZXN0RGF0YS5zaG91bGQuaGF2ZS5wcm9wZXJ0eShcImtleTFcIixcInRoaXMgd29ya3NcIik7XG4gICAgICAgICAgICAgICAgdGVzdERhdGEuc2hvdWxkLmhhdmUucHJvcGVydHkoXCJrZXkyXCIsXCJ0aGlzIHdvcmtzIHRvb1wiKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCBzdGF0ZSB1bmtub3duIGZpbGUgdHlwZSBmb3IgdW5rbm93biBmaWxlIHR5cGVzXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9PYmplY3RTeW5jKFwiLi90ZXN0L215dGVzdC50eHRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KFwic2hvdWxkIHJlYWQgYW4gXCIgKyBcIi5qc29uXCIuYmx1ZSArIFwiIGZpbGUgdG8gYW4gb2JqZWN0XCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9PYmplY3RTeW5jKFwiLi90ZXN0L215dGVzdC5qc29uXCIpO1xuICAgICAgICAgICAgICAgIHRlc3REYXRhLnNob3VsZC5oYXZlLnByb3BlcnR5KFwia2V5MVwiLFwidGhpcyB3b3Jrc1wiKTtcbiAgICAgICAgICAgICAgICB0ZXN0RGF0YS5zaG91bGQuaGF2ZS5wcm9wZXJ0eShcImtleTJcIixcInRoaXMgd29ya3MgdG9vXCIpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvU3RyaW5nU3luYygpXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGEgZmlsZSB0byBhIHN0cmluZ1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2hvdWxkLmVxdWFsKFxuICAgICAgICAgICAgICAgICAgICBzbWFydGZpbGUubG9jYWwudG9TdHJpbmdTeW5jKFwiLi90ZXN0L215dGVzdC50eHRcIiksXG4gICAgICAgICAgICAgICAgICAgIFwiU29tZSBUZXN0U3RyaW5nICYmJSRcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvVmlueWxTeW5jXCIueWVsbG93LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWFkIGFuIFwiICsgXCIuanNvbiBPUiAueWFtbFwiLmJsdWUgKyBcIiBmaWxlIHRvIGFuIFwiICsgXCJ2aW55bCBmaWxlIG9iamVjdFwiLmN5YW4sZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVzdERhdGEgPSBzbWFydGZpbGUubG9jYWwudG9WaW55bFN5bmMoXCIuL3Rlc3QvbXl0ZXN0Lmpzb25cIik7XG4gICAgICAgICAgICAgICAgKHZpbnlsLmlzVmlueWwodGVzdERhdGEpKS5zaG91bGQuYmUudHJ1ZSgpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoXCIucmVtb3RlXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgZGVzY3JpYmUoXCJ0b0d1bHBTdHJlYW1TeW5jKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgcHJvZHVjZSBhIGd1bHAgc3RyZWFtXCIsZnVuY3Rpb24oZG9uZSl7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLnJlbW90ZS50b0d1bHBTdHJlYW1TeW5jKFwibXl0ZXN0LnR4dFwiLFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1c2hyb2Nrcy9zbWFydGZpbGUvbWFzdGVyL3Rlc3QvXCIpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHNtYXJ0ZmlsZS5sb2NhbC50b0d1bHBEZXN0U3luYyhcIi4vdGVzdC90ZW1wL1wiKSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoZ0Z1bmN0aW9uKGRvbmUsXCJhdEVuZFwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKFwiLnRvU3RyaW5nKClcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaXQoXCJzaG91bGQgbG9hZCBhIHJlbW90ZSBmaWxlIHRvIGEgdmFyaWFibGVcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQoNTAwMCk7XG4gICAgICAgICAgICAgICAgc21hcnRmaWxlLnJlbW90ZS50b1N0cmluZyhcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9wdXNocm9ja3Mvc21hcnRmaWxlL21hc3Rlci90ZXN0L215dGVzdC50eHRcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2VTdHJpbmcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkLmVxdWFsKHJlc3BvbnNlU3RyaW5nLFwiU29tZSBUZXN0U3RyaW5nICYmJSRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdChcInNob3VsZCByZWplY3QgYSBQcm9taXNlIHdoZW4gdGhlIGxpbmsgaXMgZmFsc2VcIixmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgICAgICBzbWFydGZpbGUucmVtb3RlLnRvU3RyaW5nKFwiaHR0cHM6Ly9wdXNoLnJvY2tzL2RvZXNub3RleGlzdC50eHRcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRoaXMgdGVzdCBzaG91bGQgbm90IGJlIHJlc29sdmVkXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSlcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
