const socket = io();
let buttonList = document.querySelectorAll(".btn-primary");
let cards = document.querySelectorAll(".card-title");
console.log(cards);

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

//example

// function emit_data() {
//     socket.emit("segunda_conexion", {
//         name: Sara,
//         age: 20
//     })
// };

// let selectors = document.querySelectorAll(".btn_primary");
// console.log(selectors);
// selectors.forEach(each = each.addEventListener("click", emit_data));

socket.on("contador", data => {
    console.log(data, "contador");
})