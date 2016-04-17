window.audioTools = require("./audioTools");
console.log ("this is a test: " + $(window).width()) ;

// audioTools.test();

'use strict';

$('document').ready(function() {
    var array_of_files = [];
    var array_of_urls = [];


    $.ajax({
        url: "/public/samples/_file_list.txt",
        success: function(data) {
            array_of_files = data.split('\n');
            for (var i in array_of_files) {
                array_of_urls.push("/public/samples/" + array_of_files[i]);

            }
            console.log(array_of_urls);

        }

    });
});



            //$("#play_button").show();

// window.sample_array = [];
// $('document').ready(function() {
//     var array_of_files = [];
//
//     $.ajax({
//         url: "/public/samples/_file_list.txt",
//         success: function(data) {
//             array_of_files = data.split('\n');
//             for (var i in array_of_files) {
//
//                 $.ajax({
//                     url: "/public/samples/" + array_of_files[i],
//                     success: function (data) {
//                         sample_array.push(data);
//
//
//
//                     }
//
//
//                     //$("#play_button").show();
//                 });
//
//             }
//
//         }
//
//     });
//     console.log(sample_array);
//
//
// });