(function(){
  "use strict";
  //
  var io = io();
  var startCamera = false;

  //guardo los elementos video y canvas y creo el contexto de canvas.
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d'); //El 2d nos permite hacer mapas de bits dinámicos, el 3d aún no está.

  navigator.mediaDevices.getUserMedia({
    video:true,
    audio:false
  }, function(stream){ //callback success
    startCamera = true;
    video.src = window.URL.createObjectURL(stream); //creamos un objeto manipulado desde la url TODO: entender...
  }, function(error){ //callback error
    console.log(error);
  });

  function streamVideo(context, video, canvas){
    context.drawImage(video, 0, 0);
    var ouput = canvas.toDataURL('image/jpeg', .2);

    if(startCamera){
      io.emit('streaming', function(ouputStream){});
    }

    playVideo(function(){
      //inception
      streamVideo(context, video, canvas);
    });
  }

  window.addEventListener('load', function(){
    video.style.display = 'none';
    video.autoplay = true;
    streamVideo(context, video, canvas);
  });
})();
