const logic = require("../logic.js");
const expect = require("chai").expect;

describe("This is an example test", function() {
   it("Should be test@gmail.com", function () {
       expect(logic.exTest('test@gmail.com')).to.equal("test@gmail.com");
   });
});