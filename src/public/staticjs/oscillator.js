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
        var dom7 = [0, 4, 7, 10];
        var dim7 = [0, 3, 6, 9];
        var major7 = [0, 4, 7, 11];
        var minor7 = [0, 3, 7, 10];
        var major5 = [0, 4, 7];
        var minor5 = [0, 3, 7];
        var minor5d = [0, 3, 6];
        var augment = [0, 4, 8];
        var chord2 = [0, 2, 7];
        var startinvals1 = [4, -3, 8, -3, -1, 4];
        var startinvals2 = [0, 7, 9, 5]
        var startinvals3 = [0, 4, 5, 0]
        var startinvals4 = [9, 2, 7, 0]
        var startinvals5 = [2, 11, 7, 2, 9]
        var chordprogression1 = [major5, major5, minor5, major5, major5, major5];
        var chordprogression2 = [major5, major5, minor5, major5];
        var chordprogression3 = [major5, major5, major5, major5];
        var chordprogression4 = [minor5, minor5, major5, major5];
        var chords = 
            [[startinvals1, chordprogression1], 
            [startinvals2, chordprogression2],
            [startinvals3, chordprogression3],
            [startinvals4, chordprogression4]]
        var curchordprog = chords[Math.floor(Math.random()*chords.length)];
        console.log("what");
        console.log(curchordprog);
        for (repeat = 0; repeat < 5; repeat ++){
            var freqtotal = [];
            for (k = 0; k < curchordprog[0].length; k ++){
                tempval = []
                for (k2 = 0; k2 < curchordprog[1][k].length; k2 ++){
                    console.log(midi[curchordprog[1][k][k2]+48+curchordprog[0][k]]);
                    tempval.push(midi[curchordprog[1][k][k2]+48+curchordprog[0][k]]);
                }
                freqtotal.push(tempval);   
            }
            console.log(freqtotal);
            var notes = [major7, major7, minor7, dom7, major7, major7]
            var freqtotal2 = [];
            for (k = 0; k < curchordprog[0].length; k ++){
                tempval = [];
                for (k2 = 0; k2 < notes[k].length; k2++){
                    tempval.push(midi[notes[k][k2]+60+curchordprog[0][k]]);
                }
                freqtotal2.push(tempval);
            }
            
            // var minor7  = [0, 3, 7, 10];
            // var freqs = [midi[67], midi[64], midi[60], midi[72]];
            // var freqs2 = [midi[60], midi[64], midi[71], midi[74]];
            // var freqs3 = [midi[60], midi[63], midi[67], midi[70]];
            // var freqtotal = [freqs, freqs2, freqs3];
            
            repeatval = 2;
            checker = true;
            cuval = 0;
            quickness = 1.8;

            for (j = 0; j < 24; j++) {
                
                var oscs = [];
                
                if (checker){
                        curfreq2 = freqtotal2[(j/2)%freqtotal2.length];
                        curfreq = freqtotal[(j/2)%freqtotal.length];

                        console.log((j/2)%freqtotal.length);       
                        checker = false;
                        cuval ++;
                }
                else if (cuval + 1 < repeatval){
                        cuval ++;
                }
                else{
                        console.log("yoyoyo");
                        checker = true;
                        cuval = 0;
                }

                console.log(curfreq);
                for (x = 0; x < curfreq.length; x ++){
                    var nodes = {};
                    nodes.filter = context.createBiquadFilter();
                    nodes.convolver = context.createConvolver();
                    nodes.volume = context.createGain();
                    var gainNode = context.createGain();
                    var oscillator = context.createOscillator();
                    oscillator.frequency.value = curfreq[x];
                    // oscillator..value = 50;
                    oscillator.type = "sine"
                    var biquadFilter = context.createBiquadFilter();
                    oscillator.connect(nodes.filter);
                    oscillator.connect(nodes.convolver);
                    nodes.filter.connect(nodes.volume);
                    nodes.volume.gain.value = 0.10;
                    // biquadFilter.connect(gainNode);
                    // biquadFilter.type = "lowshelf";
                    // biquadFilter.frequency.value = 100;
                    // biquadFilter.gain.value = 30;                 
                    nodes.volume.connect(context.destination);
                    oscillator.start(((repeat * 24) +quickness*j).toFixed(5));
                    // gainNode = context.createGainNode();
                    // gainNode.connect(context.destination);
                    // oscillator.connect(gainNode);
                    // Connect the oscillator to our speakers
                    oscillator.stop(((repeat * 24) +quickness*(j+.75)).toFixed(5));
                    oscs.push(oscillator);
                    // break;
                }
                var compressor = context.createDynamicsCompressor();
                compressor.threshold.value = -20;
                compressor.knee.value = 15;
                compressor.ratio.value = 12;
                compressor.reduction.value = -20;
                compressor.attack.value = 0.001;
                compressor.release.value = 0.001;
                for (v = 0; v < 4; v ++){
                    var nodes = {};
                    nodes.filter = context.createBiquadFilter();
                    nodes.convolver = context.createConvolver();
                    nodes.volume = context.createGain();
                    var gainNode = context.createGain();
                    var oscillator = context.createOscillator();
                    console.log(Math.floor(Math.random()*curfreq2.length));
                    oscillator.frequency.value = curfreq2[Math.floor(Math.random()*curfreq2.length)];
                    // oscillator..value = 50;
                    oscillator.type = "sine";
                    // var biquadFilter = context.createBiquadFilter();
                    oscillator.connect(nodes.filter);
                    oscillator.connect(compressor);
                    nodes.filter.type = "lowpass";
                    nodes.filter.frequency.value = oscillator.frequency.value+5;
                    oscillator.connect(nodes.convolver);
                    nodes.filter.connect(nodes.volume);
                    nodes.volume.gain.value = 0.40;
                    // biquadFilter.connect(gainNode);
                    // biquadFilter.type = "lowshelf";
                    // biquadFilter.frequency.value = 100;
                    // biquadFilter.gain.value = 30;                 
                    nodes.volume.connect(context.destination);
                    oscillator.start(((repeat * 24) +quickness*(4*j+v)/4).toFixed(5));
                    // gainNode = context.createGainNode();
                    // gainNode.connect(context.destination);
                    // oscillator.connect(gainNode);
                    // Connect the oscillator to our speakers
                    oscillator.stop(((repeat * 24) +quickness*(4*j+v+1)/4).toFixed(5));
                    
                    // break;
                }
                // console.log(freqs);
                console.log(oscs);
               
                    
                    // for (i = 0; i < oscs.length; i ++){
                    //         oscs[i].stop((j+.5)/2);
                            
                    // }
            }
        }
            
        
        
        
        
        
}
