// This is where all of the client side functions and logic will go
console.log("Hello World");
/**
 *Creates the url that is sent to the server
 */
function send(email, password) {
    let url = "/login/email/" + email + "/password/" + password;
    console.log(url);
    if (typeof window === 'undefined') {
        console.log("We are running from node");
        return url;
    } else {
        window.location.replace(url);
    }
}

function signup() {
    let url = "/signup/";
     if (typeof window === 'undefined') {
        console.log("We are running from node");
        return url;
    } else {
        window.location.replace(url);
    }
}

/**
 * Checks if text is entered before sending.
 */
function login() {
    let email = $("#email").val();
    let password = $("#password").val();
    let hashed = password.hashCode();
    if (email == '' || password == '') {
        let status = "You did not enter an email or password";
        alert(status);
        return status;
    }
    send(email, hashed);
}

/**
 * Hashes the password before sending it to the server
 */
String.prototype.hashCode = function() {
    let hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (let i = 0; i < this.length; i++) {
        let char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return hash;
}

/**
 * Handles on click functions for the buttons
 */
function setup() {
    $("#login").click(login);
    $("#signup").click(signup);
}

if (typeof window === 'undefined') {
    console.log("We are running from node");
    exports.send = send;
    exports.signup = signup;
} else {
    $(document).ready(setup);
}