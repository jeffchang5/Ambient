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
  
  this.start = function() {
    self.changeRhythm();
  }
}


window.director = new Director();