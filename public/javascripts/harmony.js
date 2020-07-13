var debug = 1;
var console = {}
console.log = (function () {return function (x) {if (debug) {process.stdout.write(ll.ansitime('brightYellow','Harmony') + x + '\n');}}})();
/**
 * Created by todd on 3/28/2016.
 */

var harmony = require('harmonyhubjs-client');
exports.start = function(harmonyipaddpress,callback){

    harmony(harmonyipaddpress).then(function(harmonyClient){
        global.harmonyClient = harmonyClient;

        callback();
    })

};


function getHarmonyThings(ip){
    websock.send(JSON.stringify({object:"statusupdate",data:{message:'Requesting available commands'}}),'harmony');

    harmonyClient.getAvailableCommands()
        .then(function(x) {
            websock.send(JSON.stringify({object:"statusupdate",data:{message:'Received available commands'}}),'harmony');
            var rv = [];
            // build the devices
            for   (var i in x.device) {
                rv[i] = {
                id: x.device[i].id,
                name: x.device[i].label,
                type: "Logitec Harmony Device",
                issmartthingchild: false,
                commands: []
            };
                for   (var j in x.device[i].controlGroup){
                    var catigory =x.device[i].controlGroup[j].name;
                    for   (var k in x.device[i].controlGroup[j].function){
                        cp = {
                            catigory:catigory,
                            name:x.device[i].controlGroup[j].function[k].name,
                            label:x.device[i].controlGroup[j].function[k].label,
                            command:'action='+x.device[i].controlGroup[j].function[k].action.replace(/\:/g, '::')+':status=press',
                            sendto:'logitec-harmony',
                            ipaddress:ip
                    };
                        rv[i].commands.push(cp);
                    }
                }
            }

            // add the activities as a device


            //harmonyClient.end();
            var activity = {
                id: "Harmony "+ip,
                name: "Harmony-"+ip.slice(ip.length-3),
                type: "Logitec Harmony Hub",
                issmartthingchild: false,
                commands: []
            };

            for   (var i in x.activity){
                    cp = {
                        label:x.activity[i].suggestedDisplay,
                        name:x.activity[i].label,
                        command:x.activity[i].id,
                        sendto:'harmony hub',
                        ipaddress:ip
                    }
                activity.commands.push(cp);

            }
            rv.push(activity);
            //websock.send(JSON.stringify({object:"statusupdate",data:{message:''}}),'harmony');
            //console.log(JSON.stringify(rv,null,4))
            for   (var i in rv){
                var o = ll.getthingbyid(rv[i].id)
                if (o) {

                    websock.send(JSON.stringify({object:"statusupdate",data:{message:rv[i].name+' found - updating commands'}}),'harmony');
                    o.commands = rv[i].commands
                    ll.writething(o,true);
                } else
                {
                 // add new thing
                    websock.send(JSON.stringify({object:"statusupdate",data:{message:rv[i].name+' ADDED'}}),'harmony');
                    ll.writething(rv[i],true);
                }


            }





            });



};

// exports.sendcommand = function(incmd){
//
//     console.log('here:'+incmd)
//     harmonyClient.send('holdAction', incmd)
//         .then(function() {
//         console.log('harmony cmd exec')
//         });
// }
exports.sendcommand = function(incmd,ip){
    if (!ip){ip='10.6.1.21';}
    harmony(ip).then(function(harmonyClient){
        //global.harmonyClient = harmonyClient;
        harmonyClient.send('holdAction', incmd)
            .then(function() {
             harmonyClient.end();
                console.log('harmony cmd exec'+incmd)

            });

    })


};
exports.sendactivity = function(id,ip){
    if (!ip){ip='10.6.1.21';}
    harmony(ip).then(function(harmonyClient){
        //global.harmonyClient = harmonyClient;
        harmonyClient.startActivity(id)
            .then(function() {
                harmonyClient.end();
                console.log('harmony activity'+incmd)

            });

    })


};

function discover(){
    var HarmonyHubDiscover = require('harmonyhubjs-discover');
    var discover = new HarmonyHubDiscover(61991);

    discover.on('online', function(hub) {
        // Triggered when a new hub was found
        websock.send(JSON.stringify({object:"statusupdate",data:{message:'Found Harmony Hub:'+hub.ip}}),'harmony');
        console.log('Harmony Hub Found:' + hub.ip)
        var harmony = require('harmonyhubjs-client');
            harmony(hub.ip).then(function(harmonyClient){
                global.harmonyClient = harmonyClient;
                websock.send(JSON.stringify({object:"statusupdate",data:{message:'Harmony client started'}}),'harmony');

                getHarmonyThings(hub.ip);
            });





    });

    discover.on('offline', function(hub) {
        // Triggered when a hub disappeared
        console.log('lost ' + hub.ip)
    });

   // I dont think this is helpful for us.
    // discover.on('update', function(hubs) {
    //     // Combines the online & update events by returning an array with all known
    //     // hubs for ease of use.
    //     var knownHubIps = hubs.reduce(function(prev, hub) {
    //         return prev + (prev.length > 0 ? ', ' : '') + hub.ip
    //     }, '')
    //
    //     console.log('known ips: ' + knownHubIps)
    // })

// Look for hubs:
    discover.start();

// Stop looking for hubs:
// discover.stop()
}
exports.inwebsocket = function (data,id){
    switch (data.instruction){
        case "start":
            websock.send(JSON.stringify({object:"statusupdate",data:{message:'Searching for Harmony Hub...'}}),'harmony');
            discover();
            break;
        default:
            console.log ('Unknown instruction:'+data.instruction)




    }

}



