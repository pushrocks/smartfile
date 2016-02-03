/// <reference path="typings/main.d.ts" />
var smartfile = require("../index.js");
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
});
