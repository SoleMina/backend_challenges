const socket = io();

let input = document.querySelector("#messages");
let user = document.getElementById("user");

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
