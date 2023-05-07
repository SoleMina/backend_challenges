document.addEventListener("submit", evt => {
    evt.preventDefault();
    let form = document.querySelector("#petForm");
    let data = new FormData(form);
    let name = data.get("name");
    let specie = data.get("specie");
    let age = data.get("age");

    let req = {
        name,
        specie,
        age
    };

    fetch("http://localhost:3000/api/pets", {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
            "Content-type": "application/json"
        }
    }).then(result => {
        return result.json();
    }).then(json => {
        console.log(json);
    })
});

