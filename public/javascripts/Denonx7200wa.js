/**
 * Created by todd on 1/15/2018.
 */
const net = require('net');
//const HOST = 'localhost' // use when running tcpbridge
const HOST = '192.168.2.111'
var client;

connect();
const recreateDevice = true;


if (recreateDevice){
    var device ={
        type:"Denonx7200wa",
        id: "Denon",
        name: "Denon",
        commands:[
          n

        ],
        events:[
            {name:'reference_POWER_STATE'},
            {name:'reference_HDMI'}
        ]
    }
    ll.writething(device,true)

}

function connect(){
    client = net.createConnection({ port: 23,host: HOST}, () => {

        //'connect' listener
        console.log('connected to server!');
           //client.write('#QHS\r\n');
    }).on('error',(err)=>{
        console.log('Denon connection error:'+err)
        setTimeout(function(){connect();},5000)
    });
    client.on('data', (data) => {
        var o = ll.getthingbyid('Denon');

        // for (var i=0;i<data.length;++i){
        //     console.log(data[i])
        // }
         console.log("Denon RAW data:" +data.toString() + " Data Length: " + data.length );

        var respList = data.toString().split('\r')

        for (var i=0;i<respList.length-1;++i){
            var parsedResp = respList[i].split(' ');
            var event = parsedResp[0].substring(0);
          //  var status=parsedResp[1];
            // if the event is a query - the send status is OK or ER
            // if the event is just an event will dont get OK or ER so below is a fix
          //  if (status == 'OK' || status == 'ER'){
                var eData = parsedResp[2]
          //  } else
          //  {
             //   eData = status;
                status = "OK";
           // }

            //console.log(respList[i])
            console.log('Denon Event:'+event+'-Result:'+status+'-'+eData)
            o[event] = eData
            ll.writething(o,true); // update the thing
            rp.event("Denon",event,eData,status) // send the event



        }
    });



client.on('end', () => {
    console.log('disconnected from projector'); // now we can send additional commands
});

}

exports.execCommand = function(obj,cmd){
        client.write(cmd.code+'\r');
    console.log('write Denon command')
 

};

function dataFromProjector (cmdName,data){
    var o = ll.getthingbyid('JVC550');
    var state = ''
    switch (cmdName){
        case 'reference_POWER_STATE':
            switch (data[5]){
                case 0x30:
                      state = 'Standby';
                      break;
                case 0x31:
                    state = 'Power On';
                    break;
                case 0x32:
                    state = 'Cooling';
                    break;
                case 0x34:
                    state = 'Error';
                    break;
                default:
                    state = 'Unknown:'+data[5];
                    break;

            }
            o.power_state = state
            break;
        case 'reference_HDMI':
            switch(data[5]){
                case 0x36:
                    state = "HDMI 1"
                    break;
                case 0x37:
                    state = "HDMI 2"
                    break;
                default:
                    state = 'Unknown:'+data[5];
                    break;
            }
            o.video_input = state
    }


    ll.writething(o,true); // update the thing
    rp.event("JVC550",cmdName,state) // send the event


}