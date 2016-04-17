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

function makeSound(){
        var context = new AudioContext();
        var vals1 = [-1, 4, 7];
        var vals2 = [4, 9, 10];
        var vals3 = [3, 6, 12];
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
        for (j = 0; j < 8; j ++){
                var oscs = [];
                
                if (checker){

                        curfreq = freqtotal[(j/2)%freqtotal.length];

                        console.log((j/2)%freqtotal.length);       
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
                        var gainNode = context.createGain();
                        var oscillator = context.createOscillator();
                        oscillator.frequency.value = curfreq[x];
                        // oscillator..value = 50;
                        oscillator.type = "sine"
                        var biquadFilter = context.createBiquadFilter();
                        oscillator.connect(context.destination);
                        // biquadFilter.connect(gainNode);
                        // biquadFilter.type = "lowshelf";
                        // biquadFilter.frequency.value = 100;
                        // biquadFilter.gain.value = 30;                 
                        // gainNode.connect(context.destination);
                        oscillator.start((j/2).toFixed(5));
                        // gainNode = context.createGainNode();
                        // gainNode.connect(context.destination);
                        // oscillator.connect(gainNode);
                        // Connect the oscillator to our speakers
                        oscillator.stop(((j+.5)/2).toFixed(5));
                        oscs.push(oscillator);
                        // break;
                }
                // console.log(freqs);
                console.log(oscs);
                
                // for (i = 0; i < oscs.length; i ++){
                //         oscs[i].stop((j+.5)/2);
                        
                // }
        }
        
        
        
        
        
}
