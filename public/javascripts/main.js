// created 7/13/2020 steve

//const ws = new WebSocket("ws://localhost:8082");
const ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port);
let datapacket = {};
let theaterState={};
ws.addEventListener("open", () => {
    console.log(" websocket connected")
  //  ws.send("I'm here at main page");

});


ws.addEventListener("message", (data) => {
    console.log(data);

    data  = JSON.parse(data.data);
    theaterState=data.value;
    switch(data.type){
        case "state":{
            for(let device in data.value){

                if(data.value[device] == 1){
                    document.getElementById(device).classList.add("pressed");
                }
                else{
                    document.getElementById(device).classList.remove("pressed");
                }
                console.log("Device: " + device + " Value: " + data.value[device]);
            }
            break  ;
        }
        case "returnedData":{


        }
        break;


    }




});
ws.addEventListener("close", (data) => {
    location.reload();
});

function curtainButton(value){
    console.log("Curtain button: "+ value + " was pressed");
    buttonPressStates(value);
}
function lightsButton(value){
    console.log("Lights button: "+ value + " was pressed");
    buttonPressStates(value);
}
function oppoButton(value){
    console.log("Oppo button: "+ value + " was pressed");
    if(value == "oppoPower"){
        if(theaterState.oppoPower){ // if it'son turn it off
            theaterState.oppoPower=0;
            value = "oppoPowerOff";
        }
        else{
            theaterState.oppoPower=1;
            value = "oppoPowerOn";
        }
    }
    buttonPressStates(value);
}

function jvcButton(value){
    console.log("Jvc button: "+ value + " was pressed");
    if(value == "jvcPower"){
        if(theaterState.jvcPower){ // if it'son turn it off
            theaterState.jvcPower=0;
            value = "jvcPowerOff";
        }
        else{
            theaterState.jvcPower=1;
            value = "jvcPowerOn";
        }
    }
    buttonPressStates(value);
}

function denonButton(value){
    console.log("denon button: "+ value + " was pressed");
    if(value == "denonPower"){
        if(theaterState.denonPower){ // if it's on turn it off
            theaterState.denonPower=0;
            value = "denonPowerOff";
        }
        else{
            theaterState.denonPower=1;
            value = "denonPowerOn";
        }
    }
    if(value.includes("Zone")){
        if(theaterState[value] == 0){
            theaterState[value] =1;
        }
        else{
            theaterState[value]=0;
        }
    }

    buttonPressStates(value);



}

function buttonPressStates(value) {
    try {
        let y = document.getElementsByName(document.getElementById(value).name);
        for (let i = 0; i < y.length; i++) {
            //  y[i].style.backgroundColor ="yellow";
            theaterState[y[i].id] = 0;
        }
    }
    catch(err){
        console.log("ERROR! " + err);
    }
    if((!value.includes("Power" ) && ( !value.includes ("Zone")))) {
        theaterState[value] = 1;
    }
    sendToServer(value);
}

function sendToServer (value) {
    let systemInfo = {
        type: "state",
        value: theaterState
    };
    ws.send(JSON.stringify(systemInfo));

    systemInfo = {   //send button press
        type: "buttonPress",
        value: value
    };
    ws.send(JSON.stringify(systemInfo));
}