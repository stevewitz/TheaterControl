const net = require('net');
//const HOST = 'localhost' // use when running tcpbridge
const HOST = '192.168.2.112'
let client;

connect();

function connect(){
    client = net.createConnection({ port: 23,host: HOST}, () => {
        client.setEncoding('ASCII');
        console.log('connected to OPPO!');
    }).on('error',(err)=>{
        console.log('Oppo connection error:'+err)
        setTimeout(function(){connect();},5000)
    });
    client.on('data', (data) => {
        console.log("Oppo Returned:" +data.toString() );
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
