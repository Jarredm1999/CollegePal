//This is where all of the server side functions and logic will be held
const express = require('express');
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 80;
}

function initial(res) {
    let args = {
        "status" : "You have not logged in"
    };
    res.render('index', args);
}

function login(req, res){
    console.log(req.params);
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