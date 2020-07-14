// created 7/13/2020 steve

const ws = new WebSocket("ws://localhost:8082");

ws.addEventListener("open",() => {
    console.log(" websocket connected")
    ws.send("I'm here at main page");

});
ws.addEventListener("message",(data) => {
    console.log(data);

});
