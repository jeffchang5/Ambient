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


function coinFlip() { 
  return (Math.floor(Math.random() * 2) == 0);
}

function createPinkNoise(ctx ) {
        
  var bufferSize = 2 * ctx.sampleRate,
      noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate),
      output = noiseBuffer.getChannelData(0),
      b0, b1, b2, b3, b4, b5, b6;

  b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
  for (var i = 0; i < bufferSize; i++) {
      var white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
  }

  var pinkNoise = ctx.createBufferSource();
  pinkNoise.buffer = noiseBuffer;
  pinkNoise.loop = true;

  return pinkNoise;
}
    
function createBrownianNoise(ctx) {
  var bufferSize = 2 * ctx.sampleRate,
      noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate),
      output = noiseBuffer.getChannelData(0),
      lastOut = 0.0;
  for (var i = 0; i < bufferSize; i++) {
      var white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
  }

  var brownianNoise = ctx.createBufferSource();
  brownianNoise.buffer = noiseBuffer;
  brownianNoise.loop = true;

  return brownianNoise;
}