const socket = io();
let buttonList = document.querySelectorAll(".btn-primary");
let cards = document.querySelectorAll(".card-title");
console.log(cards);

// let card = document.querySelector(".card-title").innerHTML;
// console.log(card);

socket.emit(
    "primera_conexion", {
    name: "Sole",
    age: 29
});

const buttonPressed = (index) => {
    console.log(cards[index]);
    socket.emit("message", {
        user: cards[index].innerHTML
    });
  }

// btn.addEventListener("click", buttonPressed);

buttonList.forEach(function(i, index){
    i.addEventListener("click",  () =>{
        buttonPressed(index);
    })
});
