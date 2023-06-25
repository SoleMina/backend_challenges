const socket = io();

let count = Number(document.getElementById("count").textContent);
let buy = document.getElementById("buy");

// buy.addEventListener("click", () => {
//     count = count + 1;
//     document.getElementById("count").innerHTML = count;
// });


/***** *****/

document.getElementById('signout').addEventListener('click',(event)=>{
    event.preventDefault();

    fetch(`/api/auth/signout`, {
        method: 'POST',
    })
        .then(res=>res.json())
        .then(res=>console.log(res))    //en lugar de imprimir en consola: mostrar mensaje de alerta
        .then(res => location.href = '/login')
        .catch(err=>console.log(err))   //en lugar de imprimir en consola: mostrar mensaje de alerta
})

