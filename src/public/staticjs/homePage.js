$(function() {
  console.log('doc ready and shit');
  $('.aesthetic').click( function() {
    makeSound();
  });
  
  
  $('.tweets').change( function(test) {
    console.log($( ".tweets option:selected" ).text() );
    var index = $(".tweets").prop('selectedIndex');
    console.log( index);
    selectTweet( index);
  });
  
  
});