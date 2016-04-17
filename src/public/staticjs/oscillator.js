var midi = new Array(127);
var a = 440;    	
var lowNote = 261.63; // C4
  var highNote = 493.88; // B4

console.log(midi);
for (x = 0.0000; x < 127; x++){
	midi[x] = (a/32) * (Math.pow(2, (x-9)/12));
	console.log(midi[x]);
	console.log(x);
}

function coolStuff() {
  console.log('does this work?');
}

window.makeSound = function (){
        var context = new AudioContext();
        var vals1 = [-1, 4, 7];
        var vals2 = [-1, 3, 6];
        var vals3 = [1, 4, 8];
        var vals4 = [1, 4, 9];
        var vals = [vals1, vals2, vals3, vals4];
        var freqtotal = [];
        for (k = 0; k < vals.length; k ++){
                var tempval = [];
                for (k2 = 0; k2 < vals[k].length; k2 ++){
                        tempval.push(midi[vals[k][k2]+60]);
                }
                freqtotal.push(tempval);
        }
        // var minor7  = [0, 3, 7, 10];
        // var freqs = [midi[67], midi[64], midi[60], midi[72]];
        // var freqs2 = [midi[60], midi[64], midi[71], midi[74]];
        // var freqs3 = [midi[60], midi[63], midi[67], midi[70]];
        // var freqtotal = [freqs, freqs2, freqs3];
        
        repeat = 2;
        checker = true;
        cuval = 0;
        for (j = 0; j < 10; j ++){
                var oscs = [];
                if (checker){
                        curfreq = freqtotal[j%freqtotal.length];        
                        checker = false;
                        cuval ++;
                }
                else if (cuval + 1 < repeat){
                        cuval ++;
                }
                else{
                        console.log("yoyoyo");
                        checker = true;
                        cuval = 0;
                }

                console.log(curfreq);
                for (x = 0; x < curfreq.length; x ++){
                        var oscillator = context.createOscillator();
                        oscillator.frequency.value = curfreq[x];
                        // oscillator..value = 50;
                        oscillator.type = "triangle"
                        oscillator.connect(context.destination);
                        // gainNode = context.createGainNode();
                        // gainNode.connect(context.destination);
                        // oscillator.connect(gainNode);
                        // Connect the oscillator to our speakers
                        oscs.push(oscillator);
                }
                // console.log(freqs);
                console.log(oscs);
                
                for (i = 0; i < oscs.length; i ++){
                        // playSound(oscs[i], 0)
                        oscs[i].start(j/2);
                        oscs[i].stop((j+0.4)/2);

                }
        }
                
        
        
        
        
}
