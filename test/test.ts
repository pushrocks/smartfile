import "typings-test";
import * as smartfile from "../dist/index";
import beautylog = require("beautylog");
let gulp = require("gulp");
let gFunction = require("gulp-function");
import path = require("path");
import should = require("should");
let vinyl = require("vinyl");

describe("smartfile".yellow,function(){
    describe(".fs".yellow,function(){
        describe(".fileExistsSync".yellow,function(){
            it("should return an accurate boolean",function(){
                (smartfile.fs.fileExistsSync("./test/mytest.json")).should.be.true();
                (smartfile.fs.fileExistsSync("./test/notthere.json")).should.be.false();
            });
        });
        describe(".fileExists".yellow,function(){
            it("should return a working promise",function(){
                (smartfile.fs.fileExists("./test/mytest.json")).should.be.Promise();
                (smartfile.fs.fileExists("./test/mytest.json")).should.be.fulfilled();
                (smartfile.fs.fileExists("./test/notthere.json")).should.not.be.fulfilled();
            });
        });
        describe(".listFoldersSync()",function(){
            it("should get the file type from a string",function(){
                smartfile.fs.listFoldersSync("./test/").should.containDeep([ "testfolder"]);
                smartfile.fs.listFoldersSync("./test/").should.not.containDeep([ "notExistentFolder"]);
            });
        });
        describe(".listFolders()",function(){
            it("should get the file type from a string",function(done){
                smartfile.fs.listFolders("./test/")
                    .then(function(folderArrayArg){
                        folderArrayArg.should.containDeep([ "testfolder"]);
                        folderArrayArg.should.not.containDeep([ "notExistentFolder"]);
                        done();
                    });
            });
        });
        describe(".listFilesSync()",function(){
            it("should get the file type from a string",function(){
                smartfile.fs.listFilesSync("./test/").should.containDeep([ "mytest.json"]);
                smartfile.fs.listFilesSync("./test/").should.not.containDeep([ "notExistentFile"]);
                smartfile.fs.listFilesSync("./test/",/mytest\.json/).should.containDeep([ "mytest.json"]);
                smartfile.fs.listFilesSync("./test/",/mytests.json/).should.not.containDeep([ "mytest.json"]);
            });
        });
        describe(".listFiles()",function(){
            it("should get the file type from a string",function(done){
                smartfile.fs.listFiles("./test/")
                    .then(function(folderArrayArg){
                        folderArrayArg.should.containDeep([ "mytest.json"]);
                        folderArrayArg.should.not.containDeep([ "notExistentFile"]);
                        done();
                    });
            });
        });
        describe(".listFileTree()",function(){
            it("should get a file tree",function(done){
                smartfile.fs.listFileTree(path.resolve("./test/"),"**/*.txt")
                    .then(function(folderArrayArg){
                        folderArrayArg.should.containDeep([ "testfolder/testfile1.txt"]);
                        folderArrayArg.should.not.containDeep([ "mytest.json"]);
                        done();
                    });
            });
        });
        describe(".copy()".yellow,function(){
            it("should copy a directory",function(){
                smartfile.fs.copy("./test/testfolder/","./test/temp/")
            });
            it("should copy a file",function(){
                smartfile.fs.copy("./test/mytest.yaml","./test/temp/")
            });
            it("should copy a file and rename it",function(){
                smartfile.fs.copy("./test/mytest.yaml","./test/temp/mytestRenamed.yaml")
            });
        });
        describe(".remove()",function(){
            it("should remove an entire directory",function(){

            });
            it("should remove single files",function(){

            });
        });
    });

    describe(".interpreter",function(){
        describe(".filetype()",function(){
            it("should get the file type from a string",function(){
                smartfile.interpreter.filetype("./somefolder/data.json").should.equal("json");
            });
        });
    });


    describe(".fs".yellow,function(){
        describe("toGulpStreamSync() and toGulpDestSync",function(){
            it("should produce a gulp stream",function(done){
                smartfile.fs.toGulpStreamSync("./test/my*")
                    .pipe(smartfile.fs.toGulpDestSync("./test/temp/"))
                    .pipe(gFunction(done,"atEnd"));
            });
        });
        describe(".toObjectSync()".yellow,function(){
            it("should read an " + ".yaml".blue + " file to an object",function(){
                let testData = smartfile.fs.toObjectSync("./test/mytest.yaml");
                testData.should.have.property("key1","this works");
                testData.should.have.property("key2","this works too");

            });
            it("should state unknown file type for unknown file types",function(){
                let testData = smartfile.fs.toObjectSync("./test/mytest.txt");
            });
            it("should read an " + ".json".blue + " file to an object",function(){
                let testData = smartfile.fs.toObjectSync("./test/mytest.json");
                testData.should.have.property("key1","this works");
                testData.should.have.property("key2","this works too");

            });
        });
        describe(".toStringSync()".yellow,function(){
            it("should read a file to a string",function(){
                should.equal(
                    smartfile.fs.toStringSync("./test/mytest.txt"),
                    "Some TestString &&%$"
                );
            });
        });
        describe(".toVinylSync".yellow,function(){
            it("should read an " + ".json OR .yaml".blue + " file to an " + "vinyl file object".cyan,function(){
                let testData = smartfile.fs.toVinylSync("./test/mytest.json");
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
                    path.join(process.cwd(),"./test/temp/testMemToFs.txt")
                ).then(done);
            });
        });
        describe("toFsSync()",function(){
            it("should write a file to disk and return true if successfull",function(){
                let localString = "myString";
                smartfile.memory.toFsSync(
                    localString,
                    path.join(process.cwd(),"./test/temp/testMemToFsSync.txt")
                );
            });
        });
    });

    describe(".remote",function(){
        describe("toGulpStreamSync()",function(){
            it("should produce a gulp stream",function(done){
                smartfile.remote.toGulpStreamSync("mytest.txt","https://raw.githubusercontent.com/pushrocks/smartfile/master/test/")
                    .pipe(smartfile.fs.toGulpDestSync("./test/temp/"))
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
