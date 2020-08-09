let express = require('express');
let path = require('path');
let ejs = require('ejs');
const WebSocket = require('ws');
let http = require('http');
let app = express();
let net = require('net');

let SerialPort = require('serialport');
let port;
const Readline = SerialPort.parsers.Readline;
const parser = new Readline({delimiter: '\r\n'});
let os = require('os');
let systemState={};
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.text({extended: false});
//setup serialport

try {
    port = new SerialPort((os.platform() == 'linux') ? '/dev/ttyACM0' : 'com3', {
    baudRate: 9600
  })
}
catch(e){
  console.log("error opening serial port");
}

//listen on serialport via parser
port.pipe(parser);
port.on('open', () => {
  console.log('Port is open!')
})
//all incoming data comes in here
parser.on('data', function (data) {
  console.log('Data:', data.toString())
})
port.write("1");
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

app.post('/', urlencodedParser, (req, res) => {
  console.log("this is the text: " + req.body);
});


var webserver = http.createServer(app).listen({port:9999}, function () {
  console.log('Webserver listening at http://' + webserver.address().address + ':' + webserver.address().port);

});
const wss = new WebSocket.Server({server:webserver});

wss.on("connection",ws => {
  console.log("client has connected");

  ws.on("message", data =>{
    console.log("Webpage has sent data: " + data);
    data= JSON.parse(data);
    if(data.type == "jvc" && data.value == "jvc Clicked"){
      ws.send("OK");
    }
  })

  ws.send("Server responds now");

  ws.on("close", ws =>{
    console.log("Webpage has disconnected!");

  });

});

var server = net.createServer(function(connection) {
  console.log('client connected');

  connection.on('end', function() {
    console.log('client disconnected');
  });
  connection.on('data', function(data) {
    console.log(data.toString());
    connection.end();
  });
  connection.write('Hello World!\r\n');
  connection.pipe(connection);
});

server.listen(8888, function() {
  console.log('server is listening');
});