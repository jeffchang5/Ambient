"use strict";

var Metadata = function() {
  var self = this;
  
  this.audioContext = new AudioContext();
  
  this.kyleSamples = [    
    'public/samples/vaporwave/cans-flanged.wav',
    'public/samples/vaporwave/popcorn-snare.wav',
    'public/samples/vaporwave/popcorn-tom.wav',
    'public/samples/vaporwave/popcorn-crinkle.wav',
    'public/samples/vaporwave/popcorn-tom-phased.wav',
    'public/samples/vaporwave/reddbull1.wav'
  ];

  
  this.samples = [
    'public/samples/bd-01.wav',
    'public/samples/cym1.wav',
    'public/samples/hh-03.wav',
  ].concat(this.kyleSamples);
  
  this.sequenceLength = 8;
  
  //float 0-1 determines how many notes are picked in the sequencer
  this.busyFactor = .3;
  this.expectedMaxSamplesAtOnce = 5;
  this.playChance = (self.busyFactor * self.expectedMaxSamplesAtOnce ) / this.samples.length;
  console.log('chance : ' + this.playChance);
  
  this.sequence = Array();
  
  for(var i=0; i<self.samples.length; i++) {
    self.sequence[i] = Array();
    for(var j=0; j< self.sequenceLength; j++) {
      self.sequence[i][j] = ( Math.random() < this.playChance);
    }
  }
  
  
  
  
}

//global
window.metadata = new Metadata();