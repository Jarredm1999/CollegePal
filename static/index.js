// This is where all of the client side functions and logic will go
console.log("Hello World");

function send(email, password) {
    let url = "/login/email/" + email + "/password/" + password;
    console.log(url);
    window.location.replace(url);
}

function login(email, password) {
    if (email == 'jarredm1999@gmail.com' && password == 'pass123') {
        send(email, password);
    } else {
        alert("You entered an invalid username or password");
        return;
    }
}

function setup() {
    $("#login").click(login);
    $("#signup").click(signup);
}




$(document).ready(setup);