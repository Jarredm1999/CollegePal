const index = require("../static/index.js");
const expect = require("chai").expect;

describe("This is an example test", function() {
   it("Should be test@gmail.com", function () {
       expect(index.send('test@gmail.com', 'pass123')).to.equal("/login/email/test@gmail.com/password/pass123");
   });
});