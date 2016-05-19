/// <reference path="../ts/typings/index.d.ts" />
import * as smartfile from "../dist/index.js";
let beautylog = require("beautylog");
let gulp = require("gulp");
let gFunction = require("gulp-function");
import should = require("should");
let vinyl = require("vinyl");

describe("smartfile".yellow,function(){
    describe(".checks".yellow,function(){
        describe(".fileExistsSync".yellow,function(){
            it("should return an accurate boolean",function(){
                (smartfile.checks.fileExistsSync("./test/mytest.json")).should.be.true();
                (smartfile.checks.fileExistsSync("./test/notthere.json")).should.be.false();
            });
        });
        describe(".fileExists".yellow,function(){
            it("should return a working promise",function(){
                (smartfile.checks.fileExists("./test/mytest.json")).should.be.Promise();
                (smartfile.checks.fileExists("./test/mytest.json")).should.be.fulfilled();
                (smartfile.checks.fileExists("./test/notthere.json")).should.not.be.fulfilled();
            });
        })
    });


    describe(".fsaction".yellow,function(){
        describe(".copy()".yellow,function(){
            it("should copy a directory",function(){
                smartfile.fsaction.copy("./test/testfolder/","./test/temp/")
            });
            it("should copy a file",function(){
                smartfile.fsaction.copy("./test/mytest.yaml","./test/temp/")
            });
            it("should copy a file and rename it",function(){
                smartfile.fsaction.copy("./test/mytest.yaml","./test/temp/mytestRenamed.yaml")
            });
        });
        describe(".remove()",function(){
            it("should remove an entire directory",function(){

            });
            it("should remove single files",function(){

            });
        });
    });

    describe(".get",function(){
        describe(".filetype()",function(){
            it("should get the file type from a string",function(){
                smartfile.get.filetype("./somefolder/data.json").should.equal("json");
            });
        });
        describe(".foldersSync()",function(){
            it("should get the file type from a string",function(){
                smartfile.get.foldersSync("./test/").should.containDeep([ "testfolder"]);
                smartfile.get.foldersSync("./test/").should.not.containDeep([ "notExistentFolder"]);
            });
        });
        describe(".folders()",function(){
            it("should get the file type from a string",function(done){
                smartfile.get.folders("./test/")
                    .then(function(folderArrayArg){
                        folderArrayArg.should.containDeep([ "testfolder"]);
                        folderArrayArg.should.not.containDeep([ "notExistentFolder"]);
                        done();
                    });
            });
        });
    });


    describe(".local".yellow,function(){
        describe("toGulpStreamSync() and toGulpDestSync",function(){
            it("should produce a gulp stream",function(done){
                smartfile.local.toGulpStreamSync("./test/my*")
                    .pipe(smartfile.local.toGulpDestSync("./test/temp/"))
                    .pipe(gFunction(done,"atEnd"));
            });
        });
        describe(".toObjectSync()".yellow,function(){
            it("should read an " + ".yaml".blue + " file to an object",function(){
                let testData = smartfile.local.toObjectSync("./test/mytest.yaml");
                testData.should.have.property("key1","this works");
                testData.should.have.property("key2","this works too");

            });
            it("should state unknown file type for unknown file types",function(){
                let testData = smartfile.local.toObjectSync("./test/mytest.txt");
            });
            it("should read an " + ".json".blue + " file to an object",function(){
                let testData = smartfile.local.toObjectSync("./test/mytest.json");
                testData.should.have.property("key1","this works");
                testData.should.have.property("key2","this works too");

            });
        });
        describe(".toStringSync()".yellow,function(){
            it("should read a file to a string",function(){
                should.equal(
                    smartfile.local.toStringSync("./test/mytest.txt"),
                    "Some TestString &&%$"
                );
            });
        });
        describe(".toVinylSync".yellow,function(){
            it("should read an " + ".json OR .yaml".blue + " file to an " + "vinyl file object".cyan,function(){
                let testData = smartfile.local.toVinylSync("./test/mytest.json");
                (vinyl.isVinyl(testData)).should.be.true();

            });
        });
    });

    describe(".memory",function(){
        describe(".toGulpStream()",function(){
            it("should produce a valid gulp stream",function(){
                let localArray = ["test1","test2","test3"];
                smartfile.memory.toGulpStream(localArray)
                    .pipe(gulp.dest("./test/temp/"));
            });
        });
        describe("toVinylFileSync()",function(){
            it("should produce a vinylFile",function(){
                let localString = "myString";
                let localOptions = {filename:"vinylfile2",base:"/someDir"};
                (smartfile.memory.toVinylFileSync(localString,localOptions) instanceof vinyl).should.be.true();
            });
        });
        describe("toVinylArraySync()",function(){
            it("should produce a an array of vinylfiles",function(){
                let localStringArray = ["string1","string2","string3"];
                let localOptions = {filename:"vinylfile2",base:"/someDir"};
                let testResult = smartfile.memory.toVinylArraySync(localStringArray,localOptions);
                testResult.should.be.Array();
                (testResult.length === 3).should.be.true();
                for (let myKey in testResult){
                    (testResult[myKey] instanceof vinyl).should.be.true();
                }
            });
        });
        describe("toStringSync()",function(){
            it("should produce a String from vinyl file",function(){
                let localString = smartfile.memory.toStringSync(new vinyl({
                    base:"/",
                    path:"/test.txt",
                    contents: new Buffer("myString")
                }));
                localString.should.equal("myString");
            });
        });
        describe("toFs()",function(){
            it("should write a file to disk and return a promise",function(done){
                let localString = "myString";
                smartfile.memory.toFs(
                    localString,
                    {
                        fileName:"./test/temp/testMemToFs.txt",
                        filePath:process.cwd()
                    }
                ).then(done);
            });
        });
        describe("toFsSync()",function(){
            it("should write a file to disk and return true if successfull",function(){
                let localString = "myString";
                smartfile.memory.toFsSync(
                    localString,{
                        fileName:"./test/temp/testMemToFsSync.txt",
                        filePath:process.cwd()
                    }
                );
            });
        });
    });

    describe(".remote",function(){
        describe("toGulpStreamSync()",function(){
            it("should produce a gulp stream",function(done){
                smartfile.remote.toGulpStreamSync("mytest.txt","https://raw.githubusercontent.com/pushrocks/smartfile/master/test/")
                    .pipe(smartfile.local.toGulpDestSync("./test/temp/"))
                    .pipe(gFunction(done,"atEnd"));
            });
        });
        describe(".toString()",function(){
            it("should load a remote file to a variable",function(done){
                this.timeout(5000);
                smartfile.remote.toString("https://raw.githubusercontent.com/pushrocks/smartfile/master/test/mytest.txt")
                    .then(function(responseString){
                        should.equal(responseString,"Some TestString &&%$");
                        done();
                    });
            });
            it("should reject a Promise when the link is false",function(done){
                this.timeout(10000);
                smartfile.remote.toString("https://push.rocks/doesnotexist.txt")
                    .then(function(){
                        throw new Error("this test should not be resolved");
                    },function(){
                        done();
                    })
            });
        });
    })
});
