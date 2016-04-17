"use strict";

//call the instances of these functions (window.audioTools not Audiotools)
//not the classes themselves


var Sequencer = function(loader) {
  var self = this;
  console.log('its the sequencer');
  
  this.loader=loader;
  this.buffers = loader.response;
  this.sequenceLength = window.metadata.sequenceLength;
  this.numSamples = this.buffers.length;
  console.log(this.numSamples + " sample sequencer");
  this.currentBeat = 0;
  
  this.sources = [];
	this.gainNodes = [];
	this.panNodes = [];
  
  this.drumBusCompressor = this.loader.ctx.createDynamicsCompressor();
    this.drumBusCompressor.threshold.value = -40;
    this.drumBusCompressor.knee.value = 40;
    this.drumBusCompressor.ratio.value = 5;
    this.drumBusCompressor.reduction.value = -10;
    this.drumBusCompressor.attack.value = 0;
    this.drumBusCompressor.release.value = 0.25;
  
    this.drumBusCompressor.connect(this.loader.ctx.destination);
  
  
  this.initBuffers = function() {
    for(var i=0; i<self.numSamples; i++) {
      this.gainNodes[i] = this.loader.ctx.createGain();
      this.sources[i] =  this.loader.ctx.createBufferSource();
      this.panNodes[i] = this.loader.ctx.createStereoPanner();
      this.panNodes[i].pan.value = (Math.random()*2 -1);
      this.gainNodes[i].gain.value = 40;
      
      this.sources[i].buffer = this.loader.response[i];
			this.sources[i].connect(this.gainNodes[i]);
			this.gainNodes[i].connect(this.panNodes[i]);
			this.panNodes[i].connect(self.drumBusCompressor);
    }
  // console.log("initialized buffers");
};
  
  
  this.play = function(scheduledTime) {
    if(typeof scheduledTime === 'undefined') scheduledTime = 0;
    
    console.log('play ' + self.currentBeat);
    self.initBuffers();
    
    for (var i=0; i<self.numSamples; i++) {
      if( window.metadata.sequence[i][self.currentBeat] ) {
        self.sources[i].start(scheduledTime);
      }
    }
    
    self.currentBeat++
    if(self.currentBeat >= self.sequenceLength) 
      self.currentBeat = 0;
  };
  

};

function init(value){
    
}

  
  
//create by loader instead
//window.sequencer = new Sequencer;
  