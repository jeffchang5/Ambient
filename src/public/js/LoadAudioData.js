$('document').ready(function() {
    $.ajax({
        url: "/samples/bd05.wav",
        success: function() {
            alert("LOADED");
            //$("#play_button").show();
        },
        failure: function() {
            alert("Error!");
        }
    });
});