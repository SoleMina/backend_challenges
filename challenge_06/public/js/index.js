const socket = io();

let count = Number(document.getElementById("count").textContent);
let buy = document.getElementById("buy");

buy.addEventListener("click", () => {
    count = count + 1;
    document.getElementById("count").innerHTML = count;
});


/***** *****/

