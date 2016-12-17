"use strict";
//create web socket server
var express = require('express')(); // guardo una instancia de express
var http = require('http').createServer(express); //creo un server http con express TODO: entender mejor
var io = require('socket.io')(http); //creo una instancia de socket.io y le paso el server HTTP.

//variables propias
var port = process.env.PORT || 3000;

//
http.listen(port, function(){
  console.log("transmitiendo en el puerto "+ port);
});

//route for clients
app.get("/", function(req, res){
  res.sendFile(__dirname+"/example/client.html");
});

//route for transmitter
app.get("/transmitter", function(req, res){
  res.sendFile(__dirname+"/example/server.html");
});

//socket
io.on('connection', function(socket){
  socket.on('streaming', function(imgs){
    io.emit('play video', imgs);
  });
});
