// created 7/13/2020 steve

//const ws = new WebSocket("ws://localhost:8082");
const ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port);
let datapacket = {};

ws.addEventListener("open", () => {
    console.log(" websocket connected")
  //  ws.send("I'm here at main page");

});


ws.addEventListener("message", (data) => {
    console.log(data);

    data  = JSON.parse(data.data);
    if (data.type == "state") {
        for(let device in data.value){
            if(data.value.hasOwnProperty(device)){

                if(data.value[device] == 1){
                    document.getElementById(device).style.backgroundColor = "#ea9191";
                }
                else{
                    document.getElementById(device).style.backgroundColor = "skyblue";
                }
                console.log("Device: " + device + " Value: " + data.value[device]);
            }
        }


    }
    let x = 1;
    x=x++;

    if(data=="OK"){
        document.getElementById("jvc").style.backgroundColor= "red";
    }

});



function curtainButton(value){
    console.log("Curtain button: "+ value + " was pressed");

}
function lightsButton(value){
    console.log("Lights button: "+ value + " was pressed");

}
function oppoButton(value){
    console.log("Oppo button: "+ value + " was pressed");

}

function jvcButton(value){
    console.log("Jvc button: "+ value + " was pressed");

}

function denonButton(value){
    console.log("denon button: "+ value + " was pressed");

}
