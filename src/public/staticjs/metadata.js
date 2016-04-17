"use strict";

var Metadata = function() {
  var self = this;
  
  this.samples = [
    'public/samples/bd-01.wav',
    'public/samples/cym1.wav',
    'public/samples/hh-03.wav',
  ];
  
  this.sequenceLength = 8;
  
  
  this.sequence = Array();
  
  for(var i=0; i<self.samples.length; i++) {
    self.sequence[i] = Array();
    for(var j=0; j< self.sequenceLength; j++) {
      self.sequence[i][j] = coinFlip();
    }
  }
  
  
  
  
}

//global
window.metadata = new Metadata();