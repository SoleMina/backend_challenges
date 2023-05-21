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