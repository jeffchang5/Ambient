var midi = new Array(127);
var a = 440;    	
var lowNote = 261.63; // C4
var highNote = 493.88; // B4
var context = null;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, $(window).width() / $(window).height(), 1, 1000);
var renderer = new THREE.WebGLRenderer();
var cyl = new Array();
var controls;
var array = new Array();
var boost = 0;

document.body.appendChild(renderer.domElement);
var i = 0;
for(var x = 0; x < 30; x += 2) {
    var j = 0;
    cyl[i] = new Array();
    for(var y = 0; y < 30; y += 2) {
        var geometry = new THREE.CylinderGeometry(2, 2, 2);
        
        var material = new THREE.MeshPhongMaterial({
            color: randomFairColor(),
            ambient: 0x808080,
            specular: 0xffffff,
            shininess: 20,
            reflectivity: 5.5 
        });
        
        cyl[i][j] = new THREE.Mesh(geometry, material);
        cyl[i][j].position = new THREE.Vector3(x, y, 0);
        
        scene.add(cyl[i][j]);
        j++;
    }
    i++;
}
var interval = window.setInterval(function() {
    if($('#loading_dots').text().length < 3) {
        $('#loading_dots').text($('#loading_dots').text() + '.');
    }
    else {
        $('#loading_dots').text('');
    }
}, 500);
var light = new THREE.AmbientLight(0x505050);
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);


directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, -1, -1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(-1, -1, 0);
scene.add(directionalLight);

camera.position.z = 0;
camera.position.x = 0;
camera.position.y = 50;

controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);

for(var i = 0; i < 7; i++) {
    controls.pan(new THREE.Vector3( 1, 0, 0 ));
    controls.pan(new THREE.Vector3( 0, 1, 0 ));
}

var render = function () {

    if(typeof array === 'object' && array.length > 0) {
        var k = 0;
        for(var i = 0; i < cyl.length; i++) {
            for(var j = 0; j < cyl[i].length; j++) {
                var scale = (array[k] + boost) / 30;
                if (scale <= cyl[i][j].scale.y) scale = scale;
                cyl[i][j].scale.y = (scale < 1 ? 1 : scale);
                cyl[i][j].scale.z = -scale ;
                cyl[i][j].scale.x = 25/scale; //(scale < 1 ? 1 : scale);

                k += (k < array.length ? 1 : 0);
            }
        }
    }

    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
    //setTimeout(testLoop,1000);
};

render();
renderer.setSize($(window).width(), $(window).height());

function randomFairColor() {
    var min = 64;
    var max = 224;
    var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
    var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
    var b = (Math.floor(Math.random() * (max - min + 1)) + min);
    return r + g + b;
}



// console.log(midi);
for (x = 0.0000; x < 127; x++){
	midi[x] = (a/32) * (Math.pow(2, (x-9)/12));
	// console.log(midi[x]);
	// console.log(x);
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
    [startinvals4, chordprogression4, majorminor4]];

var musicstop = false;

context = window.metadata.audioContext
        
        // postMessage(i);
        
        
var freqtotal = [];
var curchordprog = chords[Math.floor(Math.random()*chords.length)];
var curmajorminor = curchordprog[2];

// var startingnnote = Math.floor(Math.random()*12);
// curmajorminor.push();
// console.log("what");
// console.log(curchordprog);
for (k = 0; k < curchordprog[0].length; k ++){
    tempval = []
    var startingnnote = Math.floor(Math.random()*12);
    curchordprog[0][k] +=startingnnote;
    for (k2 = 0; k2 < curchordprog[1][k].length; k2 ++){
        
        // curchordprog[0][k][k2] += startingnnote;
        // console.log(midi[curchordprog[1][k][k2]+48+curchordprog[0][k]]);
        tempval.push(midi[curchordprog[1][k][k2]+32+curchordprog[0][k]]);
    }
    freqtotal.push(tempval);   
}
console.log(freqtotal);
quickness = 2.5;
j=0;

function coolStuff() {
  // console.log('does this work?');
}

function stop(){
    musicstop = true;
}

function makeSound(){ 
    
    
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

    var repeat = 0;
    
    repeatval = 2;
    checker = true;
    cuval = 0;
    
    nextMeasureTime = 0;
    


        while(nextMeasureTime < context.currentTime + quickness){
            nextMeasureTime += quickness;

            var oscs = [];
            
            if (checker){
                    curmajmin = (j/2)%curmajorminor.length;
                    curfreq = freqtotal[(j/2)%freqtotal.length];

                    // console.log((j/2)%freqtotal.length);       
                    checker = false;
                    cuval ++;
            }
            else if (cuval + 1 < repeatval){
                    cuval ++;
            }
            else{
                    // console.log("yoyoyo");
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
                // oscillator.connect(analyser);
                // oscillator.connect(nodes.convolver);
                nodes.filter.connect(nodes.volume);
                nodes.volume.gain.value = 0.10;
                var myArrayBuffer = context.createBuffer(2, 22050, 22050);
                sourceJs = context.createScriptProcessor(2048, 1, 1);
                sourceJs.buffer = myArrayBuffer;
                sourceJs.connect(context.destination);
                analyser = context.createAnalyser();
                analyser.smoothingTimeConstant = 0.8;
                analyser.fftSize = 512;

                source = context.createBufferSource();
                source.buffer = myArrayBuffer;
                source.loop = false;

                source.connect(analyser);
                analyser.connect(sourceJs);
                source.connect(context.destination);

                sourceJs.onaudioprocess = function(e) {
                    array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    boost = 0;
                    for (var i = 0; i < array.length; i++) {
                        boost += array[i];
                    }
                    boost = boost / array.length;
                };

                clearInterval(interval);                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ;
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
            var previousnote = 0;
            for (v = 0; v < 4; v ++){
                var tempval = returnNotes(curmajorminor[curmajmin], curchordprog[0][curmajmin], previousnote);
                previousnote = tempval[0];
                if (false){
                    for (inner = 0; inner < 2; inner ++){


                        var distortion = context.createWaveShaper();
                        distortion.curve = makeDistortionCurve(100);
                        distortion.oversample = '4x';
                        var nodes = {};
                        nodes.filter = context.createBiquadFilter();
                        nodes.convolver = context.createConvolver();
                        nodes.volume = context.createGain();
                        nodes.panner = context.createPanner();
                        // var gainNode = context.createGain();
                        var oscillator = context.createOscillator();

                        // console.log(Math.floor(Math.random()*curmajorminor.length));
                        
                        // console.log("whatwhatwhat");
                        console.log(tempval);

                        oscillator.frequency.value = tempval[1];
                        nodes.panner.setVelocity(-5, -5, -5);
                        // oscillator..value = 50;
                        oscillator.type = "sine";
                        // var biquadFilter = context.createBiquadFilter();
                        oscillator.connect(nodes.filter);
                        oscillator.connect(compressor);
                        oscillator.connect(distortion);
                        nodes.filter.type = "highpass";
                        nodes.filter.frequency.value = oscillator.frequency.value+5;
                        oscillator.connect(nodes.convolver);
                        oscillator.connect(nodes.filter);
                        oscillator.connect(nodes.panner);
                        oscillator.connect(analyser);
                        nodes.volume.gain.value = 0.40;
                        nodes.filter.connect(nodes.volume);
                        // biquadFilter.connect(gainNode);
                        // biquadFilter.type = "lowshelf";
                        // biquadFilter.frequency.value = 100;
                        // biquadFilter.gain.value = 30;                 
                        nodes.volume.connect(context.destination);
                        
                        var scheduledTime = quickness*((repeat * 24) +(8*j+2*v+inner)/8).toFixed(5);
                        // console.log('time: ' + scheduledTime);
                        oscillator.start(scheduledTime);
                        // console.log(scheduledTime);
                        window.sequencer.play(scheduledTime);
												window.director.update();
                        // gainNode = context.createGainNode();
                        // gainNode.connect(context.destination);
                        // oscillator.connect(gainNode);
                        // Connect the oscillator to our speakers
                        oscillator.stop(quickness*((repeat * 24) +(8*j+2*v+inner+0.7)/8).toFixed(5));
                    }
                    // break;
                }
                else{
                    var distortion = context.createWaveShaper();
                    distortion.curve = makeDistortionCurve(100);
                    distortion.oversample = '4x';
                    var nodes = {};
                    nodes.filter = context.createBiquadFilter();
                    nodes.convolver = context.createConvolver();
                    nodes.volume = context.createGain();
                    nodes.panner = context.createPanner();
                    // var gainNode = context.createGain();
                    var oscillator = context.createOscillator();
                    // console.log(Math.floor(Math.random()*curmajorminor.length));
                    
                    // console.log("whatwhatwhat");
                    console.log(tempval);

                    oscillator.frequency.value = tempval[1];
                    nodes.panner.setVelocity(-5, -5, -5);
                    // oscillator..value = 50;
                    oscillator.type = "sine";
                    // var biquadFilter = context.createBiquadFilter();
                    oscillator.connect(nodes.filter);
                    oscillator.connect(compressor);
                    oscillator.connect(distortion);
                    nodes.filter.type = "highpass";
                    nodes.filter.frequency.value = oscillator.frequency.value+5;
                    oscillator.connect(nodes.convolver);
                    oscillator.connect(nodes.filter);
                    oscillator.connect(nodes.panner);
                    oscillator.connect(analyser);
                    nodes.volume.gain.value = 0.40;
                    nodes.filter.connect(nodes.volume);
                    // biquadFilter.connect(gainNode);
                    // biquadFilter.type = "lowshelf";
                    // biquadFilter.frequency.value = 100;
                    // biquadFilter.gain.value = 30;                 
                    nodes.volume.connect(context.destination);
                    
                    var scheduledTime = quickness*((repeat * 24) +(4*j+v)/4).toFixed(5);
                    // console.log('time: ' + scheduledTime);
                    oscillator.start(scheduledTime);
                    // console.log(scheduledTime);
                    window.sequencer.play(scheduledTime);
                    // gainNode = context.createGainNode();
                    // gainNode.connect(context.destination);
                    // oscillator.connect(gainNode);
                    // Connect the oscillator to our speakers
                    oscillator.stop(quickness*((repeat * 24) +(4*j+v+0.7)/4).toFixed(5));
                // break;
                }
                // break;
                
            }
            j ++;
        }
        
        // console.log(freqs);
        // console.log(oscs);
       
            
            // for (i = 0; i < oscs.length; i ++){
            //         oscs[i].stop((j+.5)/2);
                    
            // }
            
        
            
        
        
        
        
        
}

function returnNotes(major, starting, previous){
    if (major){
        notestopickfrom = majorscale;
    }
    else{
        notestopickfrom = minorscale;
    }
    tempval = [];
    for (k = 0; k < notestopickfrom.length; k++){
        if (midi[notestopickfrom[k] + 60 + starting] > 500){
            tempval.push(midi[notestopickfrom[k] + 44 + starting]);
        }
        else{
            tempval.push(midi[notestopickfrom[k] + 44 + starting]);

        }
    }
    weight = 0.15;
    singordouble = Math.floor(Math.random()*5);
    if (singordouble){
        val01 = Math.random();
        values = Math.floor(Math.random()*(tempval.length*2+3));
        if (val01 < 0.4 * weight){
            if (previous <= 0){
                return [previous, tempval[previous]];
            }
            return [previous-1, tempval[previous-1]];
        }
        if (val01 < 0.8 * weight) {
            if (previous >= tempval.length-1){
                return [previous, tempval[previous]];
            }
            return [previous+1, tempval[previous+1]];
        }
        if (val01 < weight){
            return [previous, tempval[previous]];
        }
        if (values == 0){
            return [0, tempval[0]];

        }
        if (values == 1){
            return [2, tempval[2]];

        }
        if (values == 2)
        {
            return [4, tempval[4]];

        }

        return [(values - 3)%tempval.length, tempval[(values - 3)%tempval.length]];    
    }
    else{
        val01 = Math.random();
        val02 = Math.random();
        if (val02 > 0.5){
            toincdec = 1;
        }
        else{
            toincdec = -1;
        }
        values = Math.floor(Math.random()*(tempval.length*2+3));
        values2 = Math.floor(Math.random()*(tempval.length*2+3));
        if (val01 < 0.4 * weight){
            if (previous <= 0){
                return [previous + 1, tempval[previous], tempval[previous+1]];
            }
            if (previous -1 ==0){
                return [previous-1, tempval[previous], tempval[previous-1]];

            }
            return [previous-1+toincdec, tempval[previous-1], tempval[previous-1+toincdec]];
        }
        if (val01 < 0.8 * weight) {
            if (previous >= tempval.length-1){
                return [previous-1, tempval[previous], tempval[previous-1]];
            }
            if (previous+1 == tempval.length-1){
                return [previous+1, tempval[previous], tempval[previous+1]];
            }
            return [previous+1+toincdec, tempval[previous+1], tempval[previous+1+toincdec]];
        }
        if (val01 < weight){
            if (previous >= tempval.length-1){
                return [previous-1, tempval[previous], tempval[previous-1]];    
            }
            if (previous <= 0){
                return [previous +1, tempval[previous], tempval[previous+1]];
            }
            return [previous + toincdec, tempval[previous], tempval[previous+toincdec]];
        }
        if (values == 0){
            return [1, tempval[0], tempval[1]];

        }
        if (values == 1){
            return [3+toincdec, tempval[3], tempval[3+toincdec]];

        }
        if (values == 2)
        {
            return [5+toincdec, tempval[5], tempval[5+toincdec]];

        }

        retval = (values-3)%tempval.length;
        if (retval ==0){
            return [1, tempval[0], tempval[1]]; 
        }
        if (retval == tempval.length-1){
            return [retval-1, tempval[retval], tempval[retval-1]];
        }
        return [retval+toincdec, tempval[retval], tempval[retval+toincdec]];
    }
}

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
}

function init(){
    // context = window.metadata.audioContext;
    

    window.director.start();
    

    setInterval(function(){makeSound()}, 2500*curchordprog[0].length);
    
}

