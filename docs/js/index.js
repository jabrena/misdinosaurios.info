//Redirect to secure version
if (location.protocol != 'https:'){
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

function upgradeDino() {
    console.log("Upgrading Dino")
    var dinosaursList = [
        "stegosaurus.html",
        "ankylosaurus.html",
        "pterodactyl.html",
        "brontosaurus.html",
        "triceratops.html" ];
    var dinosaur = dinosaursList[Math.floor(Math.random() * dinosaursList.length)];
    $.get("dinos/" + dinosaur, function (data) {
        $(".ascii").html(data);
    });
}

//Events
//Startup
$(function () {
    upgradeDino();
});
//Scheduled
var interval = setInterval(function () { upgradeDino(); }, 5 * 1000);

function validateWebForm() {

    var value1 = $( "#fullname" ).val()
    var value2 = $( "#email" ).val()
    var value3 = $( "#comment" ).val()

    if ((value1 != "") &&
        (value2 != "") &&
        (value3 != "")) {
        return true;
    }

    return false;
}

function getWebFormValues() {

    var value1 = $( "#fullname" ).val()
    var value2 = $( "#email" ).val()
    var value3 = $( "#comment" ).val()

    return {"value1": value1, "value2": value2, "value3": value3}
}

//Docs: https://ifttt.com/maker_webhooks
function getIFTTTAddress() {

    var KEY = "b-V5sei3pfxIj_4k0ONF3T";
    var EVENT = "mis_dinosaurios"

    return "https://maker.ifttt.com/trigger/" + EVENT + "/with/key/" + KEY + "/";
}

function sendDataToIFTTT() {

    $.post(
        getIFTTTAddress(),
        getWebFormValues(),
        function(result) { },
        'jsonp')
    .always(function() {
        console.log("Request sent");
    });

    $("#contactform")[0].reset();
}

$(function () {
    $('#btn').click(function() {
        if(validateWebForm()) {
            sendDataToIFTTT();
        } else {
            alert("Complete the Contact form please")
        }
    });
});