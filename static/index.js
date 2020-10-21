// This is where all of the client side functions and logic will go
console.log("Hello World");

function send(email, password) {
    let url = "/login/email/" + email + "/password/" + password;
    console.log(url);
    window.location.replace(url);
}

function login() {
    let email = $("#email").val();
    let password = $("#password").val()
    send(email, password);
}

function setup() {
    $("#login").click(login);
    $("#signup").click(signup);
}




$(document).ready(setup);