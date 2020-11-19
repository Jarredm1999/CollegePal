const chai = require("chai");
const expect = chai.expect;
const request = require("request");
const chaiHttp = require("chai-http");

let url = "https://collegepal.herokuapp.com";

chai.use(chaiHttp);

describe("Load Heroku", function() {
   this.timeout(20000);
   
   describe("Render the login page from heroku", function() {
       it("Should render the page with status 200",
       function(done) {
           chai.request(url).get("/").end(function(err, res) {
               expect(res.status).to.equal(200);
               done();
           });
       });
       
       it("Should render the login page with email, password fields and The login and sign up buttons",
       function(done) {
           chai.request(url).get("/").end(function(err, res) {
               expect(res.text).to.have.string("<input type=\"text\" placeholder=\"Email\" id=\"email\"/>");
               expect(res.text).to.have.string("<input type=\"password\" placeholder=\"Password\" id=\"password\"/>");
               expect(res.text).to.have.string("<input type=\"button\" value=\"Login\" id=\"login\"/>");
               expect(res.text).to.have.string("<input type=\"button\" value=\"Sign up\" id=\"signup\"/>");
               done();
           });
       });
   });
   
   describe("Render the sign up page from heroku", function() {
       it("Should render the signup page with status 200",
       function(done) {
           chai.request(url).get("/signup/").end(function(err, res) {
               expect(res.status).to.equal(200);
               done();
           });
       });
       
       it("Should render the signup page with all of the input fields",
       function(done) {
           chai.request(url).get("/signup/").end(function(err, res) {
               expect(res.text).to.have.string("<p>First name</p><input type=\"text\" id=\"firstname\"/><br/><p>Last name </p><input type=\"text\" id=\"lastname\"/><br/><p>E-mail</p><input type=\"text\" id=\"email\"/><br/><p>Password</p><input type=\"password\" id=\"password\"/><br/><p>Re-enter password</p><input type=\"password\" id=\"password2\"/><br/><br/><input type=\"button\" value=\"Next\" id=\"next\"/>");
               done();
           });
       });
   });
   
   describe("Render the prefrence page from heroku", function() {
       it("Should render the prefrence page with status 200",
       function(done) {
           chai.request(url).get("/signup/email/:email/password/:password/name/:name").end(function(err, res) {
               expect(res.status).to.equal(200);
               done();
           });
       });
       
       it("Should render the preference page with all of the input fields",
       function(done) {
           chai.request(url).get("/signup/email/:email/password/:password/name/:name").end(function(err, res) {
               expect(res.text).to.have.string("<div class=\"div-class\" id=\"majorinput\"><select id=\"major\"><option value=\"none\">--Select--</option><option value=\"compsci\">Computer Science</option><option value=\"math\">Mathematics</option><option value=\"english\">English</option><option value=\"biology\">Biology</option><option value=\"nursing\">Nursing</option><option value=\"agriculture\">Agriculture</option><option value=\"psychology\">Psychology</option><option value=\"history\">History</option><option value=\"business\">Business </option></select></div><p>Population</p><br/><div class=\"div-class\" id=\"populationinput\"><select id=\"population\"><option value=\"none\">--Select--</option><option value=\"&lt;5000\"><5,000</option><option value=\"&lt;10000\"><10,000</option><option value=\"&lt;15000\"><15,000</option><option value=\"&lt;20000\"><20,000</option></select></div><p>In/State</p><br/><div class=\"div-class\" id=\"instateinput\"><select id=\"distance\"><option value=\"none\">--Select--</option><option value=\"in\">In State</option><option value=\"out\">Out of State</option></select></div><p>Social Life</p><br/><div class=\"div-class\" id=\"socialinput\"><select id=\"sociallife\"><option value=\"none\">--Select--</option><option value=\"in\">In city</option><option value=\"near\">Near city</option><option value=\"far\">Far from city</option></select></div><p>HBCU/PWI</p><br/><div class=\"div-class\" id=\"demographicinput\"><select id=\"demographic\"><option value=\"none\">--Select--</option><option value=\"HBCU\">HBCU</option><option value=\"PWI\">PWI</option></select></div><p>Graduation Rate</p><br/><div class=\"div-class\" id=\"graduationrateinput\"><select id=\"graduationrate\"><option value=\"none\">--Select--</option><option value=\"&gt;70\">>70%</option><option value=\"&lt;70\"><70%</option></select></div><p>SAT/ACT</p><br/><div class=\"div-class\" id=\"satoractinput\"><select id=\"satoract\"><option value=\"none\">--Select--</option><option value=\"SAT only\">SAT only</option><option value=\"ACT only\">ACT only</option><option value=\"Both\">Both</option></select></div><p>GPA</p><br/><div class=\"div-class\" id=\"gpainput\"><select id=\"gpa\"><option value=\"none\">--Select--</option><option value=\"&gt;2.0\">>2.0</option><option value=\"&gt;2.5\">>2.5</option><option value=\"&gt;3.0\">>3.0</option><option value=\"&gt;3.25\">>3.25</option><option value=\"&gt;3.5\">>3.5</option><option value=\"&gt;3.75\">>3.75</option></select></div><br/><div class=\"div-class\" id=\"signupinput\"><input type=\"button\" value=\"Sign up\" id=\"signup\"/>");
               done();
           });
       });
   });
   
   describe("Render the homepage page from heroku", function() {
       it("Should render the homepage with status 200",
       function(done) {
           chai.request(url).get("/update/major/:major/population/:population/distance/:distance/sociallife/:sociallife/demographic/:demographic/graduationrate/:graduationrate/satoract/:satoract/gpa/:gpa").end(function(err, res) {
               expect(res.status).to.equal(200);
               done();
           });
       });
   });
   
   describe("Render the search page from heroku", function() {
       it("Should render the search page with status 200",
       function(done) {
           chai.request(url).get("/search/input/:input").end(function(err, res) {
               expect(res.status).to.equal(200);
               done();
           });
       });
   });
});



