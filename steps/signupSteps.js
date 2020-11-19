const cucumber = require("cucumber");
const expect = require("chai").expect;
const Given = cucumber.Given;
const When = cucumber.When;
const Then = cucumber.Then;
const signup = require("../static/signup.js");

let email;
let password;
let name;

Given("user enters their email, password, and name", function() {
    email = "test@gmail.com";
    password = "testpass";
    name = "test user";
});

let url;

When("the user clicks next", function() {
    url = signup.send(email, password, name);
});

Then("{string} is returned as the signup url", function(str) {
    expect(url).to.equal(str);
});