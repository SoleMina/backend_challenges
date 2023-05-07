document.addEventListener("submit", evt => {
    evt.preventDefault();
    let form = document.querySelector("#petForm");
    let data = new FormData(form);
    fetch("http://localhost:3000/api/pets", {
        method: "POST",
        body: data
    }).then(result => {
        return result.json();
    }).then(json => {
        console.log(json);
    })
});

