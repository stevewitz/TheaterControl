// created 7/13/2020 steve

//const ws = new WebSocket("ws://localhost:8082");
var ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port);

ws.addEventListener("open",() => {
    console.log(" websocket connected")
    ws.send("I'm here at main page");

});
ws.addEventListener("message",({data}) => {
    console.log(data);

});