(function(){
  "use strict";
  console.log('polyfilll!!!!!!!!!!!!!!!!!!')
  //'promisizada'la function getUserMedia() de navegadores viejos
  var promisifiedOldGUM = function(constraints, successCallback, errorCallback) {

    // First get ahold of getUserMedia, if present
    var getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if(!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function(successCallback, errorCallback) {
      getUserMedia.call(navigator, constraints, successCallback, errorCallback);
    });

  }

  // compatiblizo mediaDevices, algunos navegadores implementan mediaDevices a medias.
  if(navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }

  //completamos la compatiblización sobrescribiendo (o creando) getUserMedia() con nuestra funcion 'promisizada'
  if(navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
  }

})();
