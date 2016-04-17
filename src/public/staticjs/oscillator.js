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
var majorscale = [0, 2, 4, 5, 7, 9, 11, 12];
var minorscale = [0, 2, 3, 5, 7, 8, 10, 12];
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
var majorminor1 = [true, true, false, true, true, true];
var chordprogression2 = [major5, major5, minor5, major5];
var majorminor2 = [true, true, false, true];
var chordprogression3 = [major5, major5, major5, major5];
var majorminor3 = [true, true, true, true];
var chordprogression4 = [minor5, minor5, major5, major5];
var majorminor4 = [false, false, true, true];
var chords = 
    [[startinvals1, chordprogression1, majorminor1], 
    [startinvals2, chordprogression2, majorminor2],
    [startinvals3, chordprogression3, majorminor3],
    [startinvals4, chordprogression4, majorminor4]]



function coolStuff() {
  console.log('does this work?');
}

function makeSound(){
        var context = new AudioContext();
        
        
        for (repeat = 0; repeat < 5; repeat ++){
            var freqtotal = [];
            var curchordprog = chords[Math.floor(Math.random()*chords.length)];
            var curmajorminor = curchordprog[2];

            // var startingnnote = Math.floor(Math.random()*12);
            // curmajorminor.push();
            console.log("what");
            console.log(curchordprog);
            for (k = 0; k < curchordprog[0].length; k ++){
                tempval = []
                var startingnnote = Math.floor(Math.random()*12);
                curchordprog[0][k] +=startingnnote;
                for (k2 = 0; k2 < curchordprog[1][k].length; k2 ++){
                    
                    // curchordprog[0][k][k2] += startingnnote;
                    console.log(midi[curchordprog[1][k][k2]+48+curchordprog[0][k]]);
                    tempval.push(midi[curchordprog[1][k][k2]+36+curchordprog[0][k]]);
                }
                freqtotal.push(tempval);   
            }
            console.log(freqtotal);
            
            // var freqtotal2 = [];
            // for (k = 0; k < curchordprog[0].length; k ++){
            //     tempval = [];
            //     for (k2 = 0; k2 < notes[k].length; k2++){
            //         tempval.push(midi[notes[k][k2]+60+curchordprog[0][k]]);
            //     }
            //     freqtotal2.push(tempval);
            // }
            
            // var minor7  = [0, 3, 7, 10];
            // var freqs = [midi[67], midi[64], midi[60], midi[72]];
            // var freqs2 = [midi[60], midi[64], midi[71], midi[74]];
            // var freqs3 = [midi[60], midi[63], midi[67], midi[70]];
            // var freqtotal = [freqs, freqs2, freqs3];
            
            repeatval = 2;
            checker = true;
            cuval = 0;
            quickness = 2.5;

            for (j = 0; j < 24; j++) {
                
                var oscs = [];
                
                if (checker){
                        curmajmin = (j/2)%curmajorminor.length;
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
                    // var gainNode = context.createGain();
                    var oscillator = context.createOscillator();
                    oscillator.frequency.value = curfreq[x];
                    // oscillator..value = 50volume
                    oscillator.type = "sine"
                    // var biquadFilter = context.createBiquadFilter();
                    oscillator.connect(nodes.filter);
                    // oscillator.connect(nodes.convolver);
                    nodes.filter.connect(nodes.volume);
                    nodes.volume.gain.value = 0.10;
                    // biquadFilter.connect(gainNode);
                    // nodes.filter.type = "lowshelf";
                    // biquadFilter.frequency.value = 100;
                    // biquadFilter.gain.value = 30;                 
                    nodes.volume.connect(context.destination);
                    oscillator.start((quickness*(repeat * 24 +j)).toFixed(9));
                    // gainNode = context.createGainNode();
                    // gainNode.connect(context.destination);
                    // oscillator.connect(gainNode);
                    // Connect the oscillator to our speakers
                    oscillator.stop((quickness*(repeat * 24 +j+.7)).toFixed(9));
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
                    // break;
                    var nodes = {};
                    nodes.filter = context.createBiquadFilter();
                    nodes.convolver = context.createConvolver();
                    nodes.volume = context.createGain();
                    var gainNode = context.createGain();
                    var oscillator = context.createOscillator();
                    // console.log(Math.floor(Math.random()*curmajorminor.length));
                    var tempval = returnNotes(curmajorminor[curmajmin], curchordprog[0][curmajmin]);
                    console.log("whatwhatwhat");
                    console.log(tempval);
                    oscillator.frequency.value = tempval;

                    // oscillator..value = 50;
                    oscillator.type = "sine";
                    // var biquadFilter = context.createBiquadFilter();
                    oscillator.connect(nodes.filter);
                    oscillator.connect(compressor);
                    nodes.filter.type = "lowpass";
                    nodes.filter.frequency.value = oscillator.frequency.value+5;
                    oscillator.connect(nodes.convolver);
                    nodes.filter.connect(nodes.volume);
                    nodes.volume.gain.value = 0.40 * v/4;
                    // biquadFilter.connect(gainNode);
                    // biquadFilter.type = "lowshelf";
                    // biquadFilter.frequency.value = 100;
                    // biquadFilter.gain.value = 30;                 
                    nodes.volume.connect(context.destination);
                    oscillator.start(quickness*((repeat * 24) +(4*j+v)/4).toFixed(5));
                    // gainNode = context.createGainNode();
                    // gainNode.connect(context.destination);
                    // oscillator.connect(gainNode);
                    // Connect the oscillator to our speakers
                    oscillator.stop(quickness*((repeat * 24) +(4*j+v+1)/4).toFixed(5));
                    
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

function returnNotes(major, starting){
    if (major){
        notestopickfrom = majorscale;
    }
    else{
        notestopickfrom = minorscale;
    }
    tempval = [];
    for (k = 0; k < notestopickfrom.length; k++){
        tempval.push(midi[notestopickfrom[k] + 48 + starting]);
    }
    values = Math.floor(Math.random()*(tempval.length*2+3));
    if (values == 0){
        return tempval[0];

    }
    if (values == 1){
        return tempval[2];

    }
    if (values == 2)
    {
        return tempval[4];

    }

    return tempval[(values - 3)%tempval.length];
    
}
