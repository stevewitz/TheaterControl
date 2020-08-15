const net = require('net');
const HOST = '192.168.2.110'


 function send(command) {
     currentCommand = command;
     currentCommandName = "name";
     const client = net.createConnection({port: 20554, host: HOST}, () => {

         //'connect' listener
         console.log('connected to server!');
         //   client.write('world!\r\n');
     });
     client.on('data', (data) => {
         sdata = data.toString();
         switch (sdata) {
             case 'PJ_OK' :
                 console.log('PJ_OK received - sending PJREQ');
                 client.write('PJREQ');
             break;

             case 'PJACK' :
                 console.log('\x1b[41m%s\x1b[0m','PJACK received send command:' + command);
                 console.log('\x1b[31m%s\x1b[0m','PJACK received send command:' + command);
                 client.write(command);
             break;

             default:
                 switch (command[0]) {

                     case(0x3f): // this is a Reference Command (?) expect 2 seperate packets back
                         //scan buffer for 2 0x0a to see if both messages are concatonated
                         if (data[0] == 0x06 && data.length == 6) { // we have an ack
                             //do nothing for now, but commands was acknowledged
                         }
                         if (data[0] == 0x40) {
                             if (data[data.length - 1] == 0x0a) {
                                 //we have a valid command
                                 returnedInfo = data;
                                 console.log("received Reference data as separate data.  Data is: " + returnedInfo.toString() + "  Reference Sent: " + currentCommand.toString());
                                 // dataFromProjector(currentCommandName, returnedInfo);
                             } else {
                                 //command returned invalid date
                                 console.log("received requested data as separate data, but it was invalid  Command sent was: " + currentCommand.toString());
                             }

                             client.end();
                         }
                         if (data[0] == 0x06 && data.length > 6) {

                             if (data[6] == 0x40) { //this is the data we want
                                 if (data[data.length - 1] == 0x0a) {
                                     returnedInfo = data.slice(6, data.length);
                                     console.log("received Reference data as concatinated data.  Data is: " + returnedInfo.toString() + "  Reference Sent: " + currentCommand.toString());
                                     //    dataFromProjector(currentCommandName, returnedInfo)
                                 }
                             } else {
                                 //command returned invalid date
                                 console.log("received requested data as concatonated data, but it was invalid  Command sent was: " + currentCommand.toString());
                             }
                             client.end();
                         }
                     break;

                     case (0x21): // this is an ack for a operation
                         if (data[data.length - 1] == 0x0a) {//valid ack
                             console.log("Reveived valid ACK from operation command");
                         } else {
                             console.log("Invalid data from operation command");
                         }

                         client.end();
                    break;

                     default:
                         console.log("Received invalid data unknown type.  First byte of returned string is: " + data[0]);
                         client.end();
                         console.log("*********************************************************************************");
                         console.log("Command" + command);
                     break;
                 }
            break;
         }
     });
 }

module.exports.jvcCommands={
    jvcPowerOff:Buffer.from([0x3f,0x89,0x01,0x50,0x57,0x0a]), //change these to proper codes
    jvcPowerOn:Buffer.from([0x3f,0x89,0x01,0x50,0x57,0x0a]), //change these to proper codes
    jvcHdmi1:Buffer.from([0x21,0x89,0x01,0x49,0x50,0x36,0x0a]),
    jvcCMD1:Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x34,0x0a]),
    jvcCMD2:Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x35,0x0a]),
    jvcCMD3:Buffer.from([0x21,0x89,0x01,0x50,0x4d,0x47,0x54,0x37,0x0a]),
    jvcLensMemory1:Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X30,0x0a]),
    jvcLensMemory2:Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X31,0x0a]),
    jvcLensMemory3:Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X32,0x0a]),
    jvcLensMemory4:Buffer.from([0x21,0x89,0x01,0x49,0x4e,0x4d,0x4C,0X33,0x0a]),

}

module.exports.send  = function(data){
   send( data );
    console.log('jvc sent: ',data);
}