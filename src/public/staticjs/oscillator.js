var midi = new Array(127);
var a = 440;        
var lowNote = 261.63; // C4
var highNote = 493.88; // B4
var context = null;


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
var startinvals5 = [0, 4, 5, 0]
var startinvals6 = [0, 3, 5, 0]
var startinvals7 = [0, 2, 5, 0]
var chordprogression1 = [major5, major5, minor5, major5, major5, major5];
var majorminor1 = [true, true, false, true, true, true];
var chordprogression2 = [major5, major5, minor5, major5];
var majorminor2 = [true, true, false, true];
var chordprogression3 = [major5, major5, major5, major5];
var majorminor3 = [true, true, true, true];
var chordprogression4 = [minor5, minor5, major5, major5];
var majorminor4 = [false, false, true, true];
var minorprogression = [minor5, minor5, minor5];
var majorminor5 = [false, true, true];
var minorminor = [false, false, false];
var minorminor2 = [false, false, false];
var mood = 0.75;
var moodbad = -0.05;
var chords = 
    [[startinvals1, chordprogression1, majorminor1], 
    [startinvals2, chordprogression2, majorminor2],
    [startinvals3, chordprogression3, majorminor3],
    [startinvals4, chordprogression4, majorminor4]];

var minorchords = 
    [[startinvals6, minorprogression, minorminor],
    [startinvals7, minorprogression, minorminor],
    [startinvals3, chordprogression3, majorminor3]];


var musicstop = false;

var twitterdata = [{"docSentiment": {"score": "-0.447134", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"statusInfo": "unsupported-text-language", "language": "latin", "totalTransactions": "1", "status": "ERROR", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.844499", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"type": "neutral"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"type": "neutral"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.26579", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"statusInfo": "unsupported-text-language", "language": "unknown", "totalTransactions": "1", "status": "ERROR", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"type": "neutral"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.564906", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.481234", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.629139", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.662186", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.695845", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.683494", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.426187", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.763101", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.0199341", "type": "positive", "mixed": "1"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.388888", "type": "negative", "mixed": "1"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.316558", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.344176", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.406011", "type": "negative", "mixed": "1"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.338007", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.700181", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.482401", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.345506", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.605603", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.274351", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.483135", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.559614", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.304631", "type": "negative", "mixed": "1"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.419835", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"type": "neutral"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.677499", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.688548", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.350989", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.0454843", "type": "negative", "mixed": "1"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"type": "neutral"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"type": "neutral"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.654319", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.715896", "type": "negative", "mixed": "1"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.496628", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.594096", "type": "positive"}, "language": "french", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"statusInfo": "unsupported-text-language", "language": "danish", "totalTransactions": "1", "status": "ERROR", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"type": "neutral"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.745048", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"type": "neutral"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.43043", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.568904", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"type": "neutral"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "-0.276202", "type": "negative"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}, {"docSentiment": {"score": "0.285882", "type": "positive"}, "language": "english", "totalTransactions": "1", "status": "OK", "usage": "By accessing AlchemyAPI or using information generated by AlchemyAPI, you are agreeing to be bound by the AlchemyAPI Terms of Use: http://www.alchemyapi.com/company/terms.html"}];
// var twitterdata = JSON.parse(twitterdata);
var values = ["Metaphorically Speaking, What If I Had An Exclusive Song By My Favorite Artist And I Was Gonna Drop It Tonight What Would You Say.", "Kid Cudi Is A Genius", "I'm Soo Excited Right Now", "Stanley", "Kubricks", "Revenge.", "George Jeffersons Return. |||", "Maybe If I Was Harry Styles I Could Swim Across The Atlantic.", "Kurt Cobain Is Still Alive", "He Lives Inside The Souls Of The Youth", "I Just Keep Falling", "Crying On Rodeo.", "Lost In My Reflection.", "Hello @BoyanSlat We Should Talk", "I'm At TED", "\"Fashion Show In Gotham, I Need Another Costume\"", "We Waste 1.3 Billion Tons Of Food Every Year, And There Is 1.3 Billion People In The World Living In Extreme Poverty. The Solution Is Clear.", "Wow The @Migos Just Started Following me, I Should Drop #HOPE Right Now.", "A Team", "Wassup With Oregon Right Now?", "If Voting Made Any Difference They Wouldn't Let Us Do It - Mark Twain |||", "MSFTSrepublic\n Committee Of The Utopian \n Society Project", "I Really Hope @kendricklamar Has Seen The @HamiltonMusical On Broadway...Bars", "Hey", "MSFTSrep News Channel?", "The Age Of Adaline Might Be The Best Movie I've Ever Seen, Excluding Twilight.", "I Finna Pull Up To The Theater And Go See My Man Shia", "Shia Labeouf Do Not Leave New York City Without Letting Me See You.", "Home Is Any Place That Has A Bed, A TV, And You.", "HardWork Dedication Until There's Peace And Non Poverty In Every Nation, And I Isn't Patient. ||", "Chemtrails.", "We Pulled Up, And Blew The Speakers At The GQxGap Party. Then We Pulled Out.", "Yo @MacMiller I'm Coming To Your Show Right Now I Hope I Can Get In", "If I Had A Nickel For Every Time I've Cried In The Back Of An Uber, I Would Have Another Pair Of Yeezy's.", "#MSFTSmeetup Nyc 212 N End Ave\nNew York, NY 10282 At 8:30. \nWear Something You Can Run In |||", "Currently Working With Cody Simpson On His New Death Metal Project. . . It's Lit \ud83d\udc4d\ud83c\udffd", "Guys My Biological Brother @JCmoodymusic Is On #MSFTSFrequency With Me Today.", "am", "Oh Yeah And I Forgot To Say, Come Around 10.", "Shouts Out To Everybody That Copped The New Pants, I'm In Sewing Class Today, Soo That Next Level Is Coming Soon. |||", "The Biggest Flex Anyone Will Ever Have Is Dying.", "Lexington Avenue", "Kanye For President.", "Today,Tomorrow,Always.", "Love Yourself, And Watch.", "MSFTS FREQUENCY X ABSTRACT RADIO, Tune In.", "\"Don't Believe Me? Go Watch CitizenFour.\"", "\"Jaden, Where Can We Expect You To Be In 5 Years?\" \" Gone.\"", "Whoever Hasn't Seen My New Music Video Should Probably Peep.#Scarface", "Tune Into Beats1 Now For The #Flames #MSFTSFrequency", "6PM In New York."];

function coolStuff() {
  // console.log('does this work?');
}

function stop(){
    musicstop = true;
    console.log(twitterdata[0]["docSentiment"]["score"]);
}

function selectTweet(k){
    mood = twitterdata[k]["docSentiment"]["score"];
}

function makeSound(){ 
    window.director.start();
    var context = window.metadata.audioContext;
        
        // postMessage(i);

        
    var freqtotal = [];
    if (mood > 0){
        var curchordprog = chords[Math.floor(Math.random()*chords.length)];
        var curmajorminor = curchordprog[2];
    }
    else{
        var curchordprog = chords[Math.floor(Math.random()*chords.length)];
        // var curchordprog = minorchords[Math.floor(Math.random()*minorchords.length)];
        var curmajorminor = curchordprog[2];
    }
    

    // var startingnnote = Math.floor(Math.random()*12);
    // curmajorminor.push();
    // console.log("what");
    // console.log(curchordprog);
    for (k = 0; k < curchordprog[0].length; k ++){
        tempval = []
        var startingnnote = Math.floor(Math.random()*12);
        curchordprog[0][k] +=startingnnote;
        console.log(curchordprog[1]);
        for (k2 = 0; k2 < curchordprog[1][k].length; k2 ++){
            
            // curchordprog[0][k][k2] += startingnnote;
            // console.log(midi[curchordprog[1][k][k2]+48+curchordprog[0][k]]);
            tempval.push(midi[curchordprog[1][k][k2]+32+curchordprog[0][k]]);
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

    repeat = 0;
    
    repeatval = 2;
    checker = true;
    cuval = 0;
    quickness = 2 * (1+Math.abs(mood));

    nextMeasureTime = 0;
    j=0;


    while(j < 24){
        if (j==8){
            j=0;
            break;
        }
        if (musicstop){
            break;
        }


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

            // console.log(curfr eq);
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
                nodes.volume.gain.value = 0.10                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ;
                // biquadFilter.connect(gainNode);
                // nodes.filter.type = "lowshelf";
                // biquadFilter.frequency.value = 100;
                // biquadFilter.gain.value = 30;                 
                nodes.volume.connect(context.destination);
								
								
								
                oscillator.start((quickness*(repeat * 24 +j)).toFixed(9));
								// window.director.update();
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
                if (tempval.length == 3){
                    for (inner = 0; inner < 2; inner ++){


                        // var distortion = context.createWaveShaper();
                        // distortion.curve = makeDistortionCurve(10);
                        // distortion.oversample = '4x';
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

                        oscillator.frequency.value = tempval[inner];
                        nodes.panner.setVelocity(-5, -5, -5);
                        // oscillator..value = 50;
                        oscillator.type = "sine";
                        // var biquadFilter = context.createBiquadFilter();
                      //  oscillator.connect(nodes.filter);
                    //    oscillator.connect(compressor);
												
                        // oscillator.connect(distortion);
													
													//also give dry signal
													// var volume2 = context.createGain();
	            //             volume2.gain.value= .01;
													
													// oscillator.connect(volume2);
													// volume2.connect(context.destination);
												
                        //nodes.filter.type = "highpass";
                      //  nodes.filter.frequency.value = oscillator.frequency.value+5;
                        oscillator.connect(nodes.convolver);
                      // /  oscillator.connect(nodes.filter);
                      //  oscillator.connect(nodes.panner);

                        nodes.volume.gain.value = 0.15;
                      //  nodes.filter.connect(nodes.volume);
												
												nodes.panner.connect(nodes.volume);
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
                        // gainNode = context.createGainNode();
                        // gainNode.connect(context.destination);
                        // oscillator.connect(gainNode);
                        // Connect the oscillator to our speakers
                        oscillator.stop(quickness*((repeat * 24) +(8*j+2*v+inner+0.7)/8).toFixed(5));
                    }
                    // break;
                }
                else{
                //     var distortion = context.createWaveShaper();
                // distortion.curve = makeDistortionCurve(100);
                // distortion.oversample = '4x';
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
                // nodes.panner.setVelocity(-5, -5, -5);
                // oscillator..value = 50;
                oscillator.type = "sine";
                // var biquadFilter = context.createBiquadFilter();
                oscillator.connect(nodes.filter);
                oscillator.connect(compressor);
                // oscillator.connect(distortion);
								;
                nodes.filter.type = "highpass";
                nodes.filter.frequency.value = oscillator.frequency.value+5;
								
								//dont care
                	oscillator.connect(nodes.convolver);
                	oscillator.connect(nodes.filter);
                // distortion.connect(nodes.panner);
								// nodes.panner.connect(context.destination);

                nodes.volume.gain.value = 0.2;
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
            j == 0;
            break;
        }

        
        // console.log(freqs);
        // console.log(oscs);
       
            
            // for (i = 0; i < oscs.length; i ++){
            //         oscs[i].stop((j+.5)/2);
                    
            // }
            }
        
            
        
        
        
        
        
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
        values2 = Math.floor(Math.random()*(tempval.length+3));
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
