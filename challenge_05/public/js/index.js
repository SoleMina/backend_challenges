const socket = io();

let form = document.getElementById("productsForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(form, "form");
  let info = new FormData(form);
  console.log(info, "info");

  let sendObject = { 
    title: info.get("name"),
    description: info.get("description"),
    price: info.get("price"),
    thumbnail: info.get("url_photo"),
    code: info.get("code"),
    stock: info.get("stock")
  };

  console.log(sendObject, "sendObject");
  
  fetch("http://localhost:8000/api/products", {
    method: "POST",
    body: JSON.stringify(sendObject),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((result) => result.json())
    .then((json) => {
      form.reset();
      alert("Product registered");
      location.href = "http://localhost:8000/products";
    });
});

let input = document.querySelector("#messages");
let user = document.getElementById("user");
let count = Number(document.getElementById("count").textContent);
let buy = document.getElementById("buy");

buy.addEventListener("click", () => {
    count = count + 1;
    document.getElementById("count").innerHTML = count;
});

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

/***** *****/

