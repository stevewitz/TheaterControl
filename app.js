let express = require('express');
let path = require('path');
let ejs = require('ejs');
const WebSocket = require('ws');
let http = require('http');
let app = express();
let net = require('net');
const clients = new Set()
const denon = require('./denonControl.js')
let SerialPort = require('serialport');
let port;
const Readline = SerialPort.parsers.Readline;
const parser = new Readline({delimiter: '\r\n'});
let os = require('os');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.text({extended: false});

let theaterState={
  curtainStop:0,
  curtain235:0,
  curtain16_9:0,
  curtain4_3:0,
  curtainClose:1,
  lightsOff:1,
  lightsOn:0,
  lightsPause:0,
  jvcPower:0,
  jvcLensMemory1:0,
  jvcLensMemory2:1,
  jvcLensMemory3:0,
  jvcLensMemory4:0,
  jvcPictureMode1:1,
  jvcPictureMode2:0,
  jvcPictureMode3:0,
  jvcCMD1:1,
  jvcCMD2:0,
  jvcCMD3:0,
  oppoPower:0,
  oppoInputHdmi:0,
  oppoInputBluray:0,
  denonPower:0,
  denonInputBluray:1,
  denonInputDVD:0,
  denonZone3Off:0,
  denonZone2Off:0,
  denonVolumeUp:0,
  denonVolumeDown:0
};


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

/////////////////////////////////////////////////////////
wss.on("connection",ws => {
  clients.add(ws);

  console.log("client has connected");
  console.log("number of connections: " + clients.size);
  ////////////////////////////////
  ws.on("message", data =>{
    console.log("Webpage has sent data: " + data);

    data= JSON.parse(data);
    switch(data.type){
      case "state":{
        theaterState=data.value;
      }
      break;

      case "buttonPress":{ // a button has been pressed by the user
        console.log("the button that was pressed was: " +data.value);
        processButtonPress(data.value);
        for(let client of clients) {  //send theaterState to all clients
          let systemInfo={
            type:"state",
            value: theaterState
          };
          if(client.readyState === 1) {
            client.send(JSON.stringify(systemInfo));
          }
        }

      }
      break;
    }


  })

//send to all clients ////////////////////

  for(let client of clients) {  //send theaterState to all clients
    let systemInfo={
      type:"state",
      value: theaterState
    };
    if(client.readyState === 1) {
      client.send(JSON.stringify(systemInfo));
    }
  }
/////////////////////////////////////
  ws.on("close", function(){
   // delete clients[ws];
    clients.delete(ws);
    console.log("Webpage has disconnected! Clients still connected: " + clients.size);

  });

});

//////////////////////////////////////

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

function processButtonPress(button) {
  console.log("processing command: " + button);
  switch (button) {
    case "curtainStop":
      port.write("5");
    break;
    case "curtain235":
      port.write("4");
      break;
    case "curtain16_9":
      port.write("3");
      break;
    case "curtain4_3":
      port.write("2");
      break;
    case "curtainClose":
      port.write("1");
      break;
    case "lightsOff":
      port.write("8");
      break;
    case "lightsOn":
      port.write("9");
      break;
    case "lightsPause":
      port.write("0");
      break;
    case "jvcPowerOn":

      break;
    case "jvcPowerOff":

      break;
    case "jvcLensMemory1":

      break;
    case "jvcLensMemory2":

      break;
    case "jvcLensMemory3":

      break;
    case "jvcLensMemory4":

      break;
    case "jvcPictureMode1":

      break;
    case "jvcPictureMode2":

      break;
    case "jvcPictureMode3":

      break;
    case "jvcCMD1":

      break;
    case "jvcCMD2":

      break;
    case "jvcCMD3":

      break;
    case "oppoPowerOn":

      break;
    case "oppoPowerOff":

      break;
    case "oppoInputHdmi":

      break;
    case "oppoInputBluray":

      break;
    case "denonPowerOn":
      /////////////////
        //////////////////////
        console.log("returned: "+ denonCommands.denonPowerOn);
      break;
    case "denonPowerOff":

      break;
    case "denonInputBluray":

      break;
    case "denonInputDVD":

      break;
    case "denonZone3Off":

      break;
    case "denonZone2Off":

      break;
    case "denonVolumeUp":

      break;
    case "denonVolumeDown":

      break;

  }

}


