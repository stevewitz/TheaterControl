/**
 * Created by todd on 1/15/2018.
 */
const net = require('net');
//const HOST = 'localhost' // use when running tcpbridge
const HOST = '192.168.2.112'
var client;

connect();
const recreateDevice = true;


if (recreateDevice){
    var device ={
        type:"OPPOUDP203",
        id: "OPPO203",
        name: "OPPO203",
        commands:[
            {   name:'Power ON',
                code:'PON',
                sendto:"oppo203"
            },
            {   name:'Power OFF',
                code:'POF',
                sendto:"oppo203"
            },
            {   name:'Stop',
                code:'STP',
                sendto:"oppo203"
            },
            {   name:'Play',
                code:'PLA',
                sendto:"oppo203"
            },
            {   name:'Pause',
                code:'PAU',
                sendto:"oppo203"
            },
            {   name:'Query Verbose Mode',
                code:'QVM',
                sendto:"oppo203"
            },
            {   name:'Query Power Status',
                code:'QPW',
                sendto:"oppo203"
            },
            {   name:'Query HDMI Resolution',
                code:'QHD',
                sendto:"oppo203"
            },
            {   name:'Query Playback Status',
                code:'QPL',
                sendto:"oppo203"
            },
            {   name:'Query Disc Type',
                code:'QDT',
                sendto:"oppo203"
            },
            {   name:'Query HDR Setting',
                code:'QHR',
                sendto:"oppo203"
            },
            {   name:'Query HDR Status',
                code:'QHS',
                sendto:"oppo203"
            },
            {   name:'Query Input Source',
                code:'QIS',
                sendto:"oppo203"
            },
            {   name:'Query Aspect Ratio Setting',
                code:'QAR',
                sendto:"oppo203"
            },
            {   name:'Query Firmware Version',
                code:'QVR',
                sendto:"oppo203"
            },
            {   name:'Set Verbose Mode Off',
                code:'SVM 0',
                sendto:"oppo203"
            },
            {   name:'Set Verbose Mode 2',
                code:'SVM 2',
                sendto:"oppo203"
            },
            {   name:'Select Input Blu-ray',
                code:'SIS 0',
                sendto:"oppo203"
            },
            {   name:'Select Input HDMI',
                code:'SIS 1',
                sendto:"oppo203"
            },




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
        console.log('Oppo connection error:'+err)
        setTimeout(function(){connect();},5000)
    });
    client.on('data', (data) => {
        var o = ll.getthingbyid('OPPO203');

        // for (var i=0;i<data.length;++i){
        //     console.log(data[i])
        // }
        // console.log('Oppo data:'+data)
        var respList = data.toString().split('\r')

        for (var i=0;i<respList.length-1;++i){
            var parsedResp = respList[i].split(' ');
            var event = parsedResp[0].substring(1);
            var status=parsedResp[1];
            // if the event is a query - the send status is OK or ER
            // if the event is just an event will dont get OK or ER so below is a fix
            if (status == 'OK' || status == 'ER'){
                var eData = parsedResp[2]
            } else
            {
                eData = status;
                status = "OK";
            }

            //console.log(respList[i])
            console.log('Oppo Event:'+event+'-Result:'+status+'-'+eData)
            o[event] = eData
            ll.writething(o,true); // update the thing
            rp.event("OPPO203",event,eData,status) // send the event



        }
    });



client.on('end', () => {
    console.log('disconnected from projector'); // now we can send additional commands
});

}

exports.execCommand = function(obj,cmd){
        client.write('#'+cmd.code+'\r\n');
    console.log('write oppo command')
 

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