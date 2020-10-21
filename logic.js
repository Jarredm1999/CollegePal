//This is where all of the server side functions and logic will be held
//Initializing local variables
let status = "";
const express = require('express');
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 80;
}

function initial(res) {
    let args = {
        "status" : status
    };
    res.render('index', args);
}

function login(req, res){
    let email = req.params.email;
    let password = req.params.password;
    if (email == 'jarredm1999@gmail.com' && password == 'pass123') {
        status = "You are logged in";
    } else {
        status = "You entered an invalid email or password";
    }
    console.log(req.params);
    initial(res);
}


app.use(express.static("static"));
app.set('views', './views')
app.set('view engine', 'pug')
app.get('/', (req, res) => {
    initial(res);
});
app.get('/login/email/:email/password/:password', login);
app.listen(port, ()=> {
    console.log("App running at port=" + port)
});