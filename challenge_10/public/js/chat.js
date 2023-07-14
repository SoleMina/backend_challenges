const socket = io();

let input = document.querySelector("#messages");
let user = document.getElementById("user");

input.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        if(e.target.value) {
            socket.emit("message", {user:user.value, message: e.target.value});
        }else{
            console.log("No enviado");
        }
    }
});
socket.on("messageslog", data => {
    let log = document.getElementById("log");
    let messages = data.map(message => {
        return `<div><span class="fw-bold">${message.user} dice: </span><span>${message.message}</span></div>`
    }).join("");
    log.innerHTML = messages;
});