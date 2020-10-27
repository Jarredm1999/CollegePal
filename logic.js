//This is where all of the server side functions and logic will be held
//Initializing local variables
let status = "";
let cred = [];
let email = "";
let password = "";
let actualName = "";
let welcome = "";
const express = require('express');
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 80;
}

// Create database to hold results
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(
    "./accounts.db",
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
        'CREATE TABLE IF NOT EXISTS Accounts(email, password, name, major, population, distance, sociallife, demographic, graduationrate, sat, act, gpa)',
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
function next (req,res) {
    res.render('preference');
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
    let sql = `SELECT email, password FROM accounts`;
    db.serialize(() => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            rows.forEach((row) => {
                cred.push(`${row.email}, ${row.password}`);
            });
            let checkString = email + ", " + password;
            for (let i = 0; i < cred.length; i++) {
                console.log(checkString);
                console.log(cred[i]);
                if (checkString == cred[i]) {
                    status = "You are logged in";
                }
            }
            let welcome = "Welcome to College Pal";
            let args = {
                "welcome" : welcome
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
}


app.use(express.static("static"));
app.set('views', './views')
app.set('view engine', 'pug')
app.get('/', (req, res) => {
    initial(res);
});
app.get('/login/email/:email/password/:password', login);
app.get('/signup/', signup);
app.get('/preference/', next);
app.listen(port, ()=> {
    console.log("App running at port=" + port)
});