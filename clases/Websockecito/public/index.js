const socket = io();
let input = document.querySelector("#info");
let div = document.querySelector("#log");
input.addEventListener("keyup", (e) => {
    socket.emit("message", e.target.value);
});
socket.on("welcome", data => {
    alert(data.message);
});
socket.on("log", data => {
    let p = document.createElement("p");
    if(div.firstChild) div.removeChild(div.firstChild);
    p.innerText = data;
    div.appendChild(p);

})