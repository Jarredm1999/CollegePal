const signup = require("../static/signup.js");
const expect = require("chai").expect;

describe("Checks if the send function is sending the correct url on the signup page", function() {
   it("Should be /signup/email/test@gmail.com/password/pass123/name/testuser", function () {
       expect(signup.send('test@gmail.com', 'pass123', 'testuser')).to.equal("/signup/email/test@gmail.com/password/pass123/name/testuser");
   });
});