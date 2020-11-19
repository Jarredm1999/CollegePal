const cucumber = require("cucumber");
const expect = require("chai").expect;
const Given = cucumber.Given;
const When = cucumber.When;
const Then = cucumber.Then;
const index = require("../static/index.js");

let email;
let password;

Given("user enters their email and password", function() {
    email = "test@gmail.com";
    password = "testpass";
});

let url;

When("the user clicks login", function() {
    url = index.send(email, password);
});

Then("{string} is returned as the url", function(str) {
    expect(url).to.equal(str);
});
