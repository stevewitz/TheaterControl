let express = require('express');
let path = require('path');
let ejs = require('ejs');
const WebSocket = require('ws');
let http = require('http');
let app = express();
let net = require('net');
const clients = new Set()
const denon = require('./denonControl.js')
const oppo = require('./oppoControl.js')
const jvc = require('./jvcControl.js')
console.log(denon.denonCommands);
let SerialPort = require('serialport');
let port;
const Readline = SerialPort.parsers.Readline;
const parser = new Readline({delimiter: '\r\n'});
let os = require('os');
const childProcess = require('child_process');
var browser;
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
  denonVolumeDown:0,
  moviePower:0
};
//start browser
if(os.platform()=='linux') {
  browser = childProcess.exec('DISPLAY=:0 chromium-browser  http://localhost:9999/', function () {
    console.log('started browser');
  });
}

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

  
 // console.log('Data:', data.toString())
  console.log("Controller Returned:" +data.toString() );
  exports.sendData("controller",data.toString());


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
                                                                                                      ////////////////////////////////
app.post('/', urlencodedParser, (req, res) => { // ALL Webcore data comes in here
  console.log("this is the text: " + req.body);                                                      /////////////////////////////////
  module.exports.sendData("webcore", req.body);

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

/////////////////////////
module.exports.sendData = function(type, value){
  for(let client of clients) {   //send packet to all clients
    let systemInfo={
      type:type,
      value: value
    };
    if(client.readyState === 1) {
      client.send(JSON.stringify(systemInfo));
    }
  }




}


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
      jvc.send(jvc.jvcCommands.jvcPowerOn);
      break;
    case "jvcPowerOff":
      jvc.send(jvc.jvcCommands.jvcPowerOff);
      break;
    case "jvcLensMemory1":
      jvc.send(jvc.jvcCommands.jvcLensMemory1);
      break;
    case "jvcLensMemory2":
      jvc.send(jvc.jvcCommands.jvcLensMemory2);
      break;
    case "jvcLensMemory3":
      jvc.send(jvc.jvcCommands.jvcLensMemory3);
      break;
    case "jvcLensMemory4":
      jvc.send(jvc.jvcCommands.jvcLensMemory4);
      break;
    case "jvcPictureMode1":
      jvc.send(jvc.jvcCommands.jvcPictureMode1);
      break;
    case "jvcPictureMode2":
      jvc.send(jvc.jvcCommands.jvcPictureMode2);
      break;
    case "jvcPictureMode3":
      jvc.send(jvc.jvcCommands.jvcPictureMode3);
      break;
    case "jvcPictureMode4":
      jvc.send(jvc.jvcCommands.jvcPictureMode4);
      break;
    case "jvcCMD1":
      jvc.send(jvc.jvcCommands.jvcCMD1);
      break;
    case "jvcCMD2":
      jvc.send(jvc.jvcCommands.jvcCMD2);
      break;
    case "jvcCMD3":
      jvc.send(jvc.jvcCommands.jvcCMD3);
      break;
    case "jvcPowerStatus":
      jvc.send(jvc.jvcCommands.jvcPowerStatus);
      break;

    case "oppoPowerOn":
      oppo.send(oppo.oppoCommands.oppoPowerOn);
      break;
    case "oppoPowerOff":
      oppo.send(oppo.oppoCommands.oppoPowerOff);
      break;
    case "oppoInputHdmi":
      oppo.send(oppo.oppoCommands.oppoInputHdmi);
      break;
    case "oppoInputBluray":
      oppo.send(oppo.oppoCommands.oppoInputBluray);
      break;
    case "denonPowerOn":
        denon.send(denon.denonCommands.denonPowerOn);
      break;
    case "denonPowerOff":
      denon.send(denon.denonCommands.denonPowerOff);
      break;
    case "denonInputBluray":
      denon.send(denon.denonCommands.denonInputBluray);
      break;
    case "denonInputDVD":
      denon.send(denon.denonCommands.denonInputDVD);
      break;
    case "denonInputTV":
      denon.send(denon.denonCommands.denonInputTV);
      break;

    case "denonZone3Off":
      denon.send(denon.denonCommands.denonZone3Off);
      break;
    case "denonZone2Off":
      denon.send(denon.denonCommands.denonZone2Off);
      break;
    case "denonVolumeUp":
      denon.send(denon.denonCommands.denonVolumeUp);
      break;
    case "denonVolumeDown":
      denon.send(denon.denonCommands.denonVolumeDown);
      break;

  }

}


