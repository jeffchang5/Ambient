window.loader = new AudioSampleLoader();

    

window.loader.src= window.metadata.samples;

window.loader.onload = function () { 
  console.log('loader is loaded');
  window.response = loader.response;
  window.sequencer = new Sequencer(loader);
  
 };

window.loader.onerror = function () { console.error('loader error!'); };

window.loader.send();

