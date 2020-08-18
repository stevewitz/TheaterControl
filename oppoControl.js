const net = require('net');
const app = require('./app.js')
const HOST = '192.168.2.112'
let client;

connect();

function connect(){
    client = net.createConnection({ port: 23,host: HOST}, () => {
        client.setEncoding('ASCII');
        console.log('connected to OPPO!');
    }).on('error',(err)=>{
        console.log('Oppo connection error:'+err)
        let destroyTimeout =setTimeout(function(){client.destroy(); console.log("socket destroyed");},1000);  // destroy socket 1500ms after sending data
        setTimeout(function(){connect(); console.log("Trying to connect to OPPO");},5000)
    });
    client.on('data', (data) => {
        console.log("Oppo Returned:" +data.toString() );
        app.sendData("oppo",data.toString());

    });
    client.on('end', () => {
        console.log('disconnected from Oppo'); // now we can send additional commands
    });
}


module.exports.oppoCommands={
    oppoPowerOn:'PON',
    oppoPowerOff:'POF',
    oppoInputHdmi:'SIS 1',
    oppoInputBluray:'SIS 0'
}

module.exports.send  = function(data){
    client.write('#' + data+'\r\n');
    console.log('OPPO sent: ',data);
    //do something
}
