"use strict";
//utility classes

//call the instances of these functions (window.audioTools not Audiotools)
//not the classes themselves
var AudioTools = function() {
  
  this.test = function() {
    console.log('la la la');
  };

};


//clock.time() = number of seconds elapsed
var Clock = function() {
//https://gist.github.com/electricg/4372563
  this.now = function() { return (new Date()).getTime(); }; 
  var startAt = 0;
  this.start = function() { startAt	= this.now(); };
  this.time = function() { return Math.floor((startAt ? this.now() - startAt : 0)/ 1000 ); };
  
  this.start();
};


window.audioTools = new AudioTools();
window.clock = new Clock();