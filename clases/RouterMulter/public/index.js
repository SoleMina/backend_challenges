const socket = io();

//-------- Eventos de socket --------
socket.on("deliverPets", data => {
    let pets = data.payload;
    console.log(pets);
    fetch("templates/petTable.handlebars").then(string => string.text())
    .then(template => {
        const processedTemplate = Handlebars.compile(template);
        const templateObject = {
            pets: pets
        }
        const html = processedTemplate(templateObject);
        let div = document.getElementById("petTable");
        div.innerHTML = html;
    })
});


//-------- Fin de socket ------------

document.getElementById("image").onchange = (e) => {
    let read = new FileReader();
    read.onload = e => {
        document.querySelector(".image-text").innerHTML = "Qué hermoso!"
        document.getElementById("preview").src = e.target.result;
    }
    if(e.target.files[0]){
        read.readAsDataURL(e.target.files[0]);
    }
}
// fetch("templates/petTable.handlebars");

document.addEventListener("submit",  (event) => {
    event.preventDefault();
    let form =  document.querySelector("#petForm");
    let data =  new FormData(form);
    console.log(data, "dataaaaa");

    fetch("/api/pets", {
        method: "POST",
        body: data
    }).then((result) => {
        console.log(result, "result");
        return result.json();
    }).then(json => {
        Swal.fire({
            title: "Éxito",
            icon: "success",
            timer: 2000 
        }).then(result => {
            location.href="/"
        })
    })
});