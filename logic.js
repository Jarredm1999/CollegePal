//This is where all of the server side functions and logic will be held
//Initializing local variables
let status = "";
let cred = [];
let selectedSchools = [];
let pref = [];
let userPref = [];
let email = "";
let password = "";
let name = "";
let major = "";
let population = "";
let distance  = "";
let sociallife = "";
let demographic = "";
let graduationrate = "";
let satoract = "";
let gpa = "";
let welcome = "";
let count = 0;
let stored = "";
let selectedSchool = "";
const express = require('express');
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 80;
}

/**
 * Just a test function for testing
 */
function exTest(email) {
    return email;
}

// Create database to hold results
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(
    "./data.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Connected to db");
        }
    }
);
// Create tables if it doesn't already exist
db.serialize(() => {
    db.run(
        'CREATE TABLE IF NOT EXISTS Accounts(email, password, name, major, population, distance, sociallife, demographic, graduationrate, satoract, gpa)',
        [],
        (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("Table created");
            }
        }
    );
});

// Create tables if it doesn't already exist
db.serialize(() => {
    db.run(
        'CREATE TABLE IF NOT EXISTS Colleges(schoolname, majors, population, distance, sociallife, demographic, graduationrate, satoract, gpa)',
        [],
        (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("Table created");
            }
        }
    );
});


/**
 * Renders the login page
 */
function initial(res) {
    res.render('index');
}

/**
 * Adding more to this function. Right now it is just rendering the signup page when the signup button is clicked
 */
function signup(req, res) {
    res.render('signup');
}
// Trying to connect the preference page to the next button - Chyna
function next(req,res) {
    res.render('preference');
}

/**
 * Holds the value of email, password and name so that we can insert all of the users info into the database
 */
function insertSignup(req, res) {
    email = req.params.email;
    password = req.params.password;
    name = req.params.name;
    console.log(req.params);
    res.render('preference');
}

/**
 * inserts all of the users info into the database and displays a welcome message on the homepage
 */
function updatePref(req, res) {
    let major = req.params.major;
    let population = req.params.population;
    let distance  = req.params.distance;
    let sociallife = req.params.sociallife;
    let demographic = req.params.demographic;
    let graduationrate = req.params.graduationrate;
    let satoract = req.params.satoract;
    let gpa = req.params.gpa;
    db.run(`INSERT INTO Accounts(email, password, name, major, population, distance, sociallife, demographic, graduationrate, satoract, gpa) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [email, password, name, major, population, distance, sociallife, demographic, graduationrate, satoract, gpa], function(err) {
        if (err) {
            console.log(err.message);
        }
    });
    let sql = `SELECT schoolname, majors, population, distance, sociallife, demographic, graduationrate, satoract, gpa FROM Colleges`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err.message);
            }
            rows.forEach((row) => {
                let majorsArr = `${row.majors}`.split(' ');
                for (let i = 0; i < majorsArr.length; i++) {
                    if (major == majorsArr[i]) {
                        count++;
                    }
                }
                if (count > 0) {
                    if (population == `${row.population}`) {
                        count++;
                    } 
                    if (distance == `${row.distance}`) {
                        count++;
                    }
                    if (sociallife == `${row.sociallife}`) {
                        count++;
                    }
                    if (demographic == `${row.demographic}`) {
                        count++;
                    }
                    if (graduationrate == `${row.graduationrate}`) {
                        count++;
                    }
                    if (satoract == `${row.satoract}`) {
                        count++;
                    }
                    if (gpa == `${row.gpa}`) {
                        count++;
                    }
                    selectedSchools.push(`${row.schoolname}` + " " + count);
                }
                count = 0;
            });
        console.log(selectedSchools);
        for (let i = 0; i < selectedSchools.length; i++) {
            if (selectedSchools[i].slice(-1) > stored) {
                stored = selectedSchools[i].slice(-1);
            }
        }
        
        for (let i = 0; i < selectedSchools.length; i++) {
            if (stored == selectedSchools[i].slice(-1)) {
                selectedSchool = selectedSchools[i].substring(0, selectedSchools[i].length - 1);
            }
        }
        console.log(selectedSchool);
        let names = name.split(" ");
        let firstname = names[0];
        let welcome = "Thanks for signing up, \n" + firstname  + "welcome to College Pal!";
        let args = {
            "welcome" : welcome,
            "selectedSchool" : selectedSchool,
            "stored" : stored
        };
        res.render('homepage', args);
    });
}

/**
 * Assigns the email and password to a variable then calls checkCred()
 */
function login(req, res){
    email = req.params.email;
    password = req.params.password;
    checkCred(res);
    console.log(req.params);
}

/**
 * Pulls all of the email and passwords from the database and inserts them into an array.
 * Checks if one of those match the email and password that the user inputted. 
 * If it is then the function renders the homepage.
 */
function checkCred(res) {
    let sql = `SELECT email, password, major, population, distance, sociallife, demographic, graduationrate, satoract, gpa FROM accounts`;
    db.serialize(() => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            rows.forEach((row) => {
                cred.push(`${row.email}, ${row.password}`);
                pref.push(`${row.major},${row.population},${row.distance},${row.sociallife},${row.demographic},${row.graduationrate},${row.satoract},${row.gpa}`);
            });
            let checkString = email + ", " + password;
            for (let i = 0; i < cred.length; i++) {
                console.log(checkString);
                console.log(cred[i]);
                if (checkString == cred[i]) {
                    status = "You are logged in";
                    userPref = pref[i].split(",");
                    console.log(userPref);
                }
            }
            let sql = `SELECT schoolname, majors, population, distance, sociallife, demographic, graduationrate, satoract, gpa FROM Colleges`;
            db.all(sql, [], (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                rows.forEach((row) => {
                    let majorsArr = `${row.majors}`.split(' ');
                    for (let i = 0; i < majorsArr.length; i++) {
                        if (userPref[0] == majorsArr[i]) {
                            count++;
                        }
                    }
                    if (count > 0) {
                        if (userPref[1] == `${row.population}`) {
                            count++;
                        } 
                        if (userPref[2] == `${row.distance}`) {
                            count++;
                        }
                        if (userPref[3] == `${row.sociallife}`) {
                            count++;
                        }
                        if (userPref[4] == `${row.demographic}`) {
                            count++;
                        }
                        if (userPref[5] == `${row.graduationrate}`) {
                            count++;
                        }
                        if (userPref[6] == `${row.satoract}`) {
                            count++;
                        }
                        if (userPref[7] == `${row.gpa}`) {
                            count++;
                        }
                        selectedSchools.push(`${row.schoolname}` + " " + count);
                    }
                    console.log(count);
                    count = 0;
                });
             console.log(selectedSchools);
            for (let i = 0; i < selectedSchools.length; i++) {
                if (selectedSchools[i].slice(-1) > stored) {
                    stored = selectedSchools[i].slice(-1);
                }
            }
            
            for (let i = 0; i < selectedSchools.length; i++) {
                if (stored == selectedSchools[i].slice(-1)) {
                    selectedSchool = selectedSchools[i].substring(0, selectedSchools[i].length - 1);
                }
            }
            console.log(selectedSchool);
            let welcome = "Welcome to College Pal";
            let args = {
                "welcome" : welcome,
                "selectedSchool" : selectedSchool,
                "stored" : stored
            };
            console.log(status);
            if (status == "You are logged in") {
                res.render('homepage', args);
            } else {
                initial(res);
            }
            cred.splice(0, cred.length);
            status = "";
        });
    });
  });
}

/**
 * Exports the exTest function for tesing
 */
exports.exTest = exTest;

app.use(express.static("static"));
app.set('views', './views')
app.set('view engine', 'pug')
app.get('/', (req, res) => {
    initial(res);
});
app.get('/login/email/:email/password/:password', login);
app.get('/signup/', signup);
app.get('/signup/email/:email/password/:password/name/:name', insertSignup);
app.get('/update/major/:major/population/:population/distance/:distance/sociallife/:sociallife/demographic/:demographic/graduationrate/:graduationrate/satoract/:satoract/gpa/:gpa', updatePref);
app.listen(port, ()=> {
    console.log("App running at port=" + port)
});