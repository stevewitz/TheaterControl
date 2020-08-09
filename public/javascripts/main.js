// created 7/13/2020 steve

//const ws = new WebSocket("ws://localhost:8082");
const ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port);
let datapacket = {};

ws.addEventListener("open", () => {
    console.log(" websocket connected")
  //  ws.send("I'm here at main page");

});


ws.addEventListener("message", ({data}) => {
    console.log(data);
    if(data=="OK"){
        document.getElementById("jvc").style.backgroundColor= "red";
    }

});

function jvcClick(){
    datapacket.type = "jvc";
    datapacket.value = "jvc Clicked"
    ws.send(JSON.stringify(datapacket));
}