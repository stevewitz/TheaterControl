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
            document.getElementById("webcoreOutput").value = (data.value +"\r"+ document.getElementById("webcoreOutput").value).substring(0,200);
            let inData = data.value.toString().split(".");
            //parse webcore data here and execute
            switch(inData[1]){
                case "standard":
                    if(inData[0]=="ON"){
                        console.log("Switch " + inData[1] + " is ON" );
                        standardButton();                                      //
                    }else if(inData[0] == "OFF"){
                        console.log("Switch " + inData[1] + " is OFF");        // --
                    }
                break;
                case "standard widescreen":
                    if(inData[0]=="ON"){
                        console.log("Switch " + inData[1] + " is ON" );
                        standardWideScreen();                                  //
                    }else if(inData[0] == "OFF"){
                        console.log("Switch " + inData[1] + " is OFF");        // --
                    }
                break;
                case "black and white":
                    if(inData[0]=="ON"){
                        console.log("Switch " + inData[1] + " is ON" );
                        standardBlackAndWhite();                              //
                    }else if(inData[0] == "OFF"){
                        console.log("Switch " + inData[1] + " is OFF");       // --
                    }
                break;

                case "movie":
                    if(inData[0]=="ON"){
                        console.log("Switch " + inData[1] + " is ON" );
                        theaterButton("moviePower")  //                        //
                    }else if(inData[0] == "OFF"){
                        console.log("Switch " + inData[1] + " is OFF");
                        theaterButton("moviePower") //                         //
                    }
                break;

                case "play":
                    if(inData[0]=="ON"){
                        console.log("Switch " + inData[1] + " is ON" );
                        playOn();                                                  //
                    }else if(inData[0] == "OFF"){
                        console.log("Switch " + inData[1] + " is OFF");
                        playOff();                                                 //
                    }
                break;

                case "hdr":
                    if(inData[0]=="ON"){
                        console.log("Switch " + inData[1] + " is ON" );
                        hdrOn();                                                   //
                    }else if(inData[0] == "OFF"){
                        console.log("Switch " + inData[1] + " is OFF");            // --

                    }
                break;

                case "hdr two":
                    if(inData[0]=="ON"){
                        console.log("Switch " + inData[1] + " is ON" );
                        hdrTwo();                                                   //
                    }else if(inData[0] == "OFF"){
                        console.log("Switch " + inData[1] + " is OFF");             // --
                    }
                break;
            }
        break;

        case("oppo"):
            textdata = (data.value  + document.getElementById("oppoOutput").value).substring(0,200);
            document.getElementById("oppoOutput").value = textdata;
        break;

        case("denon"):
            textdata = (data.value +"\r" + document.getElementById("denonOutput").value).substring(0,200);
            document.getElementById("denonOutput").value = textdata;
        break;

        case("jvc"):
            textdata = (data.value +"\r" + document.getElementById("jvcOutput").value).substring(0,200);
            document.getElementById("jvcOutput").value = textdata;
        break;

        case("controller"):
            textdata = (data.value +"\r"+ document.getElementById("controllerOutput").value).substring(0,200);
            document.getElementById("controllerOutput").value = textdata;
        break;
    }




});
ws.addEventListener("close", (data) => {
    location.reload();
});

function curtainButton(value){
    console.log('\u25bc');
    console.log("\u25c0 Curtain button: "+ value + " was pressed");
    buttonPressStates(value);
}
function lightsButton(value){
    console.log("Lights button: "+ value + " was pressed");
    buttonPressStates(value);
}

function theaterButton(value){
    console.log("Theater button: "+ value + " was pressed");
    switch (value) {
        case "moviePower":
            if (theaterState.moviePower) { // if it'son turn it off
                theaterState.moviePower = 0;
                value = "moviePowerOff";
                devicesTurnOff();
                let y = document.getElementsByName("theaterTypeGroup");  //clear out theater selection buttons
                for (let i = 0; i < y.length; i++) {
                    theaterState[y[i].id] = 0;
                }
                y = document.getElementsByName("theaterWatchGroup");
                for (let i = 0; i < y.length; i++) {
                    theaterState[y[i].id] = 0;
                }
            } else {
                theaterState.moviePower = 1;
                value = "moviePowerOn";
                deviceStartUp();
            }
            break;

        case "movieTypeStandard":
            standardButton();
            break;

        case "movieTypeStandardWidescreen":
            standardWideScreen();
            break;

        case "movieTypeBW":
            standardBlackAndWhite();
            break;

        case "movieTypeHDR":
            hdrOn();
            break;

        case "movieTypeHDRTwo":
            hdrTwo();
            break;

        case "movieWatchOppo":
            watchOppo();
            break;

        case "movieWatchShield":
            watchSheild();
            break;

        case "movieWatchPanasonic":
            watchPanny();
            break;
    }




    // if(value == "moviePower"){
    //     if(theaterState.moviePower){ // if it'son turn it off
    //         theaterState.moviePower=0;
    //         value = "moviePowerOff";
    //         devicesTurnOff();
    //         let y = document.getElementsByName( "theaterTypeGroup");  //clear out theater selection buttons
    //         for (let i = 0; i < y.length; i++) {
    //             theaterState[y[i].id] = 0;
    //         }
    //         y = document.getElementsByName( "theaterWatchGroup");
    //         for (let i = 0; i < y.length; i++) {
    //             theaterState[y[i].id] = 0;
    //         }
    //     }
    //     else{
    //         theaterState.moviePower=1;
    //         value = "moviePowerOn";
    //         deviceStartUp();
    //     }
    // }
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

function deviceStartUp(){// turn on and set up all initial inputs
   oppoButton("oppoPower") ;
   denonButton("denonPower");
   lightsButton("lightsOn");

   jvcButton("jvcPower") /////  disabled while testing
   setTimeout(function(){ oppoButton("oppoInputHdmi");}, 1500);
   setTimeout(function(){ denonButton("denonInputBluray");}, 1510);
   setTimeout(function(){ denonButton("denonZone3Off");}, 2500);
   setTimeout(function(){ denonButton("denonZone2Off");}, 3500);
   setTimeout(function(){ jvcButton("jvcLensMemory2");}, 120000);
   setTimeout(function(){ jvcButton("jvcPictureMode1");}, 130000);
   setTimeout(function(){ jvcButton("jvcCMD1");}, 140000);


}

function devicesTurnOff(){
    oppoButton("oppoPower") ;
    denonButton("denonPower");
    jvcButton("jvcPower") /////  disabled while testing
}

function standardButton(){
    // denon bluray, oppo hdmi, jvc standrd, normal, curtain 16x9
    denonButton("denonInputBluray");
    oppoButton("oppoInputHdmi");
    jvcButton("jvcPictureMode1");
    jvcButton("jvcLensMemory2");
    curtainButton("curtain16_9");
}

function standardWideScreen(){
    // denon bluray, oppo hdmi, jvc standrd, widewcreen, curtain 235
    denonButton("denonInputBluray");
    oppoButton("oppoInputHdmi");
    jvcButton("jvcPictureMode1");
    jvcButton("jvcLensMemory1");
    curtainButton("curtain235");
}

function standardBlackAndWhite(){
    // denon bluray, oppo hdmi, jvc standrd, widewcreen, curtain 235
    denonButton("denonInputBluray");
    oppoButton("oppoInputHdmi");
    jvcButton("jvcPictureMode2");
    jvcButton("jvcLensMemory2");
    curtainButton("curtain4_3");
}
function playOn(){
    lightsButton("lightsOff");
}
function playOff(){
    lightsButton("lightsPause");
}

function hdrOn(){
    denonButton("denonInputBluray");
    oppoButton("oppoInputHdmi");
    jvcButton("jvcPictureMode3");
    jvcButton("jvcLensMemory1");
    curtainButton("curtain235");
}

function hdrTwo(){
    denonButton("denonInputDVD");
    oppoButton("oppoInputHdmi");
    jvcButton("jvcPictureMode4");
    jvcButton("jvcLensMemory1");
    curtainButton("curtain235");
}

function watchOppo(){
    oppoButton("oppoInputBluray");
    denonButton("denonInputBluray");
}

function watchSheild(){
    oppoButton("oppoInputHdmi");
    denonButton("denonInputBluray");
}

function watchPanny(){
    denonButton("denonInputDVD");
}