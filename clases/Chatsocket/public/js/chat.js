let username;
const socket = io();

Swal.fire({
    title: "write your name :)",
    input: "text",
    inputValidator: (value) => !value && "please write your name",
    allowOutsideClick: false,
}).then((res) => {
    username = res.value;
    document.getElementById("username").innerHTML = username;
    socket.emit("auth", username);
    console.log(username);
});
let chatbox =document.getElementById("chatBox");
chatbox.addEventListener("keyup", send);

function send(e) {
    if(e.key === "Enter") {
        console.log(chatbox.value);
        socket.emit("new_message", {
            username,
            message: chatbox.value
        })
    }
};

socket.on("allMessages", (data) => {
    document.getElementById("messageLogs").innerHTML = 
    data.map((message) => `<br><b>${message.username}</b>: ${message.message}`)
    .join("");
});;