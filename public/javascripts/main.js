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

    switch(data.type){
        case "state":{
            theaterState=data.value;
            for(let device in data.value){
                try {
                    if (data.value[device] == 1) {
                        document.getElementById(device).classList.add("pressed");
                    } else {
                        document.getElementById(device).classList.remove("pressed");
                    }
                    console.log("Device: " + device + " Value: " + data.value[device]);
                }
                catch(e){ console.log("error it TRY: " + device);}
            }
        }
            break;

        case "returnedData":
        //to be added to


            break;

        case("webcore"):
            console.log("This data came from WEBCORE: " + data.value);
            document.getElementById("webcoreOutput").innerText = (data.value + document.getElementById("webcoreOutput").value).substring(0,200);
            let inData = data.value.toString().split(".");
            //parse webcore data here and execute
            //switch(inData[1]){


           // }




        break;

        case("oppo"):
            textdata = (data.value + document.getElementById("oppoOutput").value).substring(0,200);
            document.getElementById("oppoOutput").innerText = textdata;
        break;

        case("denon"):
            textdata = (data.value + document.getElementById("denonOutput").value).substring(0,200);
            document.getElementById("denonOutput").innerText = textdata;
        break;

        case("jvc"):
            textdata = (data.value + document.getElementById("jvcOutput").value).substring(0,200);
            document.getElementById("jvcOutput").innerText = textdata;
        break;

        case("controller"):
            textdata = (data.value + document.getElementById("controllerOutput").value).substring(0,200);
            document.getElementById("controllerOutput").innerText = textdata;
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

function theaterButton(value){
    console.log("Theater button: "+ value + " was pressed");
    if(value == "moviePower"){
        if(theaterState.moviePower){ // if it'son turn it off
            theaterState.moviePower=0;
            value = "moviePowerOff";
            let y = document.getElementsByName( "theaterTypeGroup");  //clear out theater selection buttons
            for (let i = 0; i < y.length; i++) {
                theaterState[y[i].id] = 0;
            }
            y = document.getElementsByName( "theaterWatchGroup");
            for (let i = 0; i < y.length; i++) {
                theaterState[y[i].id] = 0;
            }
        }
        else{
            theaterState.moviePower=1;
            value = "moviePowerOn";
        }
    }
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