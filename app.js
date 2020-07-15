var express = require('express');
var path = require('path');
var ejs = require('ejs');
const WebSocket = require('ws');
var http = require('http');
var app = express();


app.use(express.static('public')); // set up the public directory as web accessible
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('main.ejs',{ });
})

app.get('/curtain', function (req, res) {
  res.render('curtain.ejs',{ });
})



var webserver = http.createServer(app).listen({port:9999}, function () {
  console.log('Webserver listening at http://' + webserver.address().address + ':' + webserver.address().port);

});
const wss = new WebSocket.Server({port:8082});

wss.on("connection",ws => {
  console.log("client has connected");

  ws.on("message", data =>{
    console.log("Webpage has sent data: " + data);
  })

  ws.send("Server responds now");

  ws.on("close", ws =>{
    console.log("Webpage has disconnected!");

  });

});

