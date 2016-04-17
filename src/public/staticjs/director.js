'use strict';

var Director = function() {
  var self= this;
  
  this.randomInterval = function(min,max) {
    return Math.random() * (max-min) + min;
  }
  

  
  this.changeRhythmNotes = function() {
    var x = Math.floor( Math.random() * window.metadata.sequence.length);
    var y = Math.floor(Math.random() * window.metadata.sequence[x].length);
    console.log('changing shit up '+ x + ', ' + y);
    window.metadata.sequence[x][y] = !window.metadata.sequence[x][y];
  }
  
  this.changeRhythm = function() {
      self.changeRhythmNotes();
      setTimeout(self.changeRhythm, self.randomInterval(2000, 15000));
  }
  
  this.changeNoise = function() {
    //have to set it first because ramp is broken? 
    self.noiseGainNode.gain.setValueAtTime(self.noiseGainNode.gain.value, window.metadata.audioContext.currentTime + 0.5);
    
    self.noiseGainNode.gain.linearRampToValueAtTime(Math.random() /2 , window.metadata.audioContext.currentTime + 7);
    
    setTimeout(self.changeNoise, self.randomInterval(8000, 15000));
  }
  
  this.noiseMaker = function() {
    var noiseNode;
    if(coinFlip() ) {
      console.log('brown noise');
      noiseNode = createBrownianNoise(window.metadata.audioContext);
    }
    else {
      console.log('pink noise');
      noiseNode = createPinkNoise(window.metadata.audioContext);
    }
    
    self.noiseGainNode = window.metadata.audioContext.createGain();
    self.noiseGainNode.gain.value = 0.5;   
    
    self.noiseFilterNode = window.metadata.audioContext.createBiquadFilter();
    self.noiseFilterNode.type = self.noiseFilterNode.LOWPASS;  // In this case it's a lowshelf filter
    self.noiseFilterNode.frequency.value = Math.floor(Math.random() * 4000);
    self.noiseFilterNode.Q.value = 0;
    self.noiseFilterNode.gain.value = 0;
    
    var noisePanNode = window.metadata.audioContext.createStereoPanner();
    noisePanNode.pan.value = (Math.random() - 0.5);
    
    noiseNode.connect(self.noiseGainNode);
    
    self.noiseGainNode.connect(self.noiseFilterNode);
    
    self.noiseFilterNode.connect(noisePanNode);
    noisePanNode.connect(window.metadata.audioContext.destination);
    
    noiseNode.start(0);
    }
  
  this.start = function() {
    
    self.noiseMaker();
    self.changeRhythm();
    self.changeNoise();
    // var x = self.noiseMaker();
  }
  
  this.update = function() {
    self.noiseFilterNode.frequency.value  *= 0.8; 
    if(self.noiseFilterNode.frequency < 100) 
      self.noiseFilterNode.frequency = 4000;
      
    this.changeRhythmNotes();
  }
}


window.director = new Director();
