/// <reference path="../ts/typings/main.d.ts" />
var smartfile = require("../dist/index.js");
var beautylog = require("beautylog");
var should = require("should");
var vinyl = require("vinyl");

describe("smartfile",function(){
    describe(".readFileToString".yellow,function(){
        it("should read a file to a string",function(){
            should.equal(
                smartfile.readFileToString("./test/mytest.txt"),
                "Some TestString &&%$"
            );
        });
    });
    describe(".readFileToObject".yellow,function(){
        it("should read an " + ".yaml".blue + " file to an object",function(){
            var testData = smartfile.readFileToObject("./test/mytest.yaml");
            testData.should.have.property("key1","this works");
            testData.should.have.property("key2","this works too");

        });
        it("should state unknown file type for unknown file types",function(){
            var testData = smartfile.readFileToObject("./test/mytest.txt");
        });
        it("should read an " + ".json".blue + " file to an object",function(){
            var testData = smartfile.readFileToObject("./test/mytest.json");
            testData.should.have.property("key1","this works");
            testData.should.have.property("key2","this works too");

        });
    });
    describe(".readFileToVinyl".yellow,function(){
        it("should read an " + ".json OR .yaml".blue + " file to an " + "vinyl file object".cyan,function(){
            var testData = smartfile.readFileToVinyl("./test/mytest.json");
            (vinyl.isVinyl(testData)).should.be.true();

        });
    });
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
    describe("copy",function(){
        it("should copy a directory",function(){
            smartfile.copy("./test/testfolder/","./test/assets/")
        });
        it("should copy a file",function(){
            smartfile.copy("./test/mytest.yaml","./test/assets/")
        });
        it("should copy a file and rename it",function(){
            smartfile.copy("./test/mytest.yaml","./test/assets/mytestRenamed.yaml")
        });
    });
});
