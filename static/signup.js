// This is where all of the client side functions and logic will go
console.log("Hello World");
/**
 *Creates the url that is sent to the server
 */
function send(email, password, name) {
    let url = "/signup/email/" + email + "/password/" + password + "/name/" + name;
    console.log(url);
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
function next() {
    let email = $("#email").val();
    let password = $("#password").val();
    let password2 = $("#password2").val();
    let hashed = password.hashCode();
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let name = firstname + " " + lastname;
    
    if (email == '' || password == '' || password2 == '' || firstname == '' || lastname == '') {
        alert("Enter all of the fields");
        return;
    }
    
    if (password != password2) {
        alert("You entered mismatched passwords");
        return;
    }
    send(email, hashed, name);
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
    $("#next").click(next);
}




if (typeof window === 'undefined') {
    console.log("We are running from node");
    exports.send = send;
} else {
    $(document).ready(setup);
}