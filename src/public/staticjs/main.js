// window.audioTools = require("audioTools");
'use strict';

$('document').ready(function() {
    var array_of_files = [];
    var array_of_urls = [];
    var loader = AudioSampleLoader();


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
window.audioTools = require("audioTools");

audioTools.test();



// // window.audioTools = require("audioTools");
// 'use strict';
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
// require('./drummachine.js');
