const net = require('net');
//const HOST = 'localhost' // use when running tcpbridge
const HOST = '192.168.2.111'
let client;

connect();

function connect(){
    client = net.createConnection({ port: 23,host: HOST}, () => {
        client.setEncoding('ASCII');
        console.log('connected to denon!');
    }).on('error',(err)=>{
        console.log('Denon connection error:'+err)
        setTimeout(function(){connect();},5000)
    });
    client.on('data', (data) => {
        console.log("Denon Returned:" +data.toString() );
    });
    client.on('end', () => {
        console.log('disconnected from projector'); // now we can send additional commands
    });
}


module.exports.denonCommands={
    denonPowerOn:'PWON',
    denonPowerOff:'PWSTANDBY',
    denonPowerStatus:'PW?',
    denonInputBluray:'SIBD',
    denonInputDVD:'SIDVD',
    denonZone3Off:'Z3OFF',
    denonZone2Off:'Z2OFF',
    denonVolumeUp:'MVUP',
    denonVolumeDown:'MVDOWN'
}

module.exports.send  = function(data){
    client.write(data+'\r');
    console.log('denon sent: ',data);
   //do something
}
