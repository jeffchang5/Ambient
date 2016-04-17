'use strict';

var Director = function() {
  var self= this;
  
  this.randomInterval = function(min,max) {
    return Math.random() * (max-min) + min;
  }
  
  this.changeRhythm = function() {
      
      var x = Math.floor( Math.random() * window.metadata.sequence.length);
      var y = Math.floor(Math.random() * window.metadata.sequence[x].length);
      console.log('changing shit up '+ x + ', ' + y);
      window.metadata.sequence[x][y] = !window.metadata.sequence[x][y];
      
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
    self.noiseGainNode.gain.value = 0.2;   
    var noisePanNode = window.metadata.audioContext.createStereoPanner();
    noisePanNode.pan.value = (Math.random() - 0.5);
    
    noiseNode.connect(self.noiseGainNode);
    
    self.noiseGainNode.connect(noisePanNode);
    noisePanNode.connect(window.metadata.audioContext.destination);
    
    noiseNode.start(0);
    }
  
  this.start = function() {
    
    self.noiseMaker();
    self.changeRhythm();
    self.changeNoise();
    // var x = self.noiseMaker();
  }
}


window.director = new Director();
