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
  
  
  
  
  
  
  
  
  this.initBuffers = function() {
    for(var i=0; i<self.numSamples; i++) {
      this.gainNodes[i] = this.loader.ctx.createGain();
      this.sources[i] =  this.loader.ctx.createBufferSource();
      this.panNodes[i] = this.loader.ctx.createStereoPanner();
      this.panNodes[i].pan.value = (Math.random()*2 -1);
      
      this.sources[i].buffer = this.loader.response[i];
			this.sources[i].connect(this.gainNodes[i]);
			this.gainNodes[i].connect(this.panNodes[i]);
			this.panNodes[i].connect(this.loader.ctx.destination);
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
  

  this.playworker = function(value){
// context = window.metadata.audioContext;


    timerWorker = new Worker("public/staticjs/sequenceworker.js");

    timerWorker.onmessage = function(e) {
        if (e.data == "tick") {
            // console.log("tick!");
            play(value);
        }
        else
            console.log("message: " + e.data);
    };
    timerWorker.postMessage({"interval":'start'});
  }
};

function init(value){
    
}

  
  
//create by loader instead
//window.sequencer = new Sequencer;
  