// This is where all of the client side functions and logic will go
console.log("Hello World");
/**
 *Creates the url that is sent to the server
 */
function send(input) {
    let url = "/search/input/" + input;
    console.log(url);
    window.location.replace(url);
}

/**
 * Checks if text is entered before sending.
 */
function search() {
    let input = $("input").val();
    send(input);
}

/**
 * Handles on click functions for the buttons
 */
function setup() {
    $("#search").click(search);
}

$(document).ready(setup);