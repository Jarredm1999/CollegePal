const index = require("../static/index.js");
const expect = require("chai").expect;

describe("Checks if the send function is sending the correct url", function() {
   it("/login/email/test@gmail.com/password/pass123", function () {
       expect(index.send('test@gmail.com', 'pass123')).to.equal("/login/email/test@gmail.com/password/pass123");
   });
});

describe("Checks if the send function is sending the correct url", function() {
   it("Should be /signup/", function () {
       expect(index.signup()).to.equal("/signup/");
   });
});