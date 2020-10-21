// This is where all of the client side functions and logic will go
console.log("Hello World");
//function that creates the url that is sent to the server
function send(email, password) {
    let url = "/login/email/" + email + "/password/" + password;
    console.log(url);
    window.location.replace(url);
}

/**
 * function that checks if text is entered before sending.
 */
function login() {
    let email = $("#email").val();
    let password = $("#password").val()
    if (email == '' || password == '') {
        alert("You did not enter an email or password");
        return;
    }
    send(email, password);
}

/**
 * function that handles on click functions for the buttons
 */
function setup() {
    $("#login").click(login);
    $("#signup").click(signup);
}




$(document).ready(setup);