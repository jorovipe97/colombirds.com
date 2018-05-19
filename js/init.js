(function($){
  $(function(){

  	// Init modals
  	$('.modal').modal();
  	// Init side bars
    $('.sidenav').sidenav();
    // Init parallax
    //$('.parallax').parallax({z: 20});
    // Note: I have modified the source code of the materialize.js file for modify the speed of the parallax with the css class layer-1
    /*
    layer-1: 0.1
    layer-2: 0.3
    layer-3: 0.4
    layer-4: 0.6
    layer-5: 0.8
    layer-6: 0.9
    */
    $('.parallax').parallax();
    //$('.layer2').parallax({z: 0})
    //$('parallax-window').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space
