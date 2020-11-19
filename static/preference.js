// This is where all of the client side functions and logic will go
console.log("Hello World");
/**
 *Creates the url that is sent to the server
 */
function send(major, population, distance, sociallife, demographic, graduationrate, satoract, gpa) {
    let url = "/update/major/" + major + "/population/" + population + "/distance/" + distance + "/sociallife/" + sociallife + "/demographic/" + demographic + "/graduationrate/" + graduationrate + "/satoract/" + satoract + "/gpa/" + gpa;
    if (typeof window === 'undefined') {
        console.log("We are running from node");
        return url;
    } else {
        window.location.replace(url);
    }
}

/**
 * Enters all of the given values into .
 */
function signup() {
    let major = $('#major').val();
    if (major == 'none') {
        let status = "You must select a major";
        alert(status);
        return status;
    }
    let population = $("#population").val();
    let distance = $("#distance").val();
    let sociallife = $("#sociallife").val();
    let demographic = $("#demographic").val();
    let graduationrate = $("#graduationrate").val();
    let satoract = $("#satoract").val();
    let gpa = $("#gpa").val();

    send(major, population, distance, sociallife, demographic, graduationrate, satoract, gpa);
}

/**
 * Handles on click functions for the signup button
 */
function setup() {
    $("#signup").click(signup);
}

if (typeof window === 'undefined') {
    console.log("We are running from node");
    exports.send = send;
} else {
    $(document).ready(setup);
}