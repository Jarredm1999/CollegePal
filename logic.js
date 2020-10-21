//This is where all of the server side functions and logic will be held
//Initializing local variables
let status = "";
let cred = [];
let email = "";
let password = "";
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
 * Renders a status message on the webpage.
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
                if (checkString == cred[i]) {
                    status = "You are logged in";
                } else {
                    status = "Enter a valid email and password";
                }
            }
            let args = {
                "status" : status
            };
            res.render('index', args);
            cred.splice(0, cred.length);
        });
    });
}


app.use(express.static("static"));
app.set('views', './views')
app.set('view engine', 'pug')
app.get('/', (req, res) => {
    checkCred(res);
});
app.get('/login/email/:email/password/:password', login);
app.listen(port, ()=> {
    console.log("App running at port=" + port)
});