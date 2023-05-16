const socket = io();

let input = document.querySelector("#messages");
let user = document.getElementById("user");
let log = document.getElementById("log");

console.log("heyyy");

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
    let messages = data.map(message => {
        return `<div><span>${message.user} dice: ${message.message}</span></div>`
    }).join("");
    log.innerHTML = messages;
})
