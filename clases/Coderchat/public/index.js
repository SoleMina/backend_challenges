const socket = io();

let input = document.querySelector("#mensaje");
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

socket.on("welcome", data => {
    //alert(data);
});
socket.on("messagelog", data => {
    console.log(data, 'data');
    let p = document.querySelector("#log");
    let mensajes = data.map(mensaje => {
        return `<div><span>${mensaje.user} dice: ${mensaje.message}</span></div>`
    }).join("");
    p.innerHTML = mensajes;
})