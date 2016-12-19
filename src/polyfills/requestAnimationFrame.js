(function(){
  "use strict";
  console.log("Polyfilll requestAnimationFrame!!!!!")

  //compatiblizo requestAnimationFrame en playVideo...
  //... autojecutando una function anónima para crearlo al leer el script.
  window.playVideo = (function(cb){
    //TODO: entender la última funtion como es que no da error.
    return window.requestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           function(cb){
             window.setTimeout(cb, 100); //en milisegundos
           }
  })();

})();
