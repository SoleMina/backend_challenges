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
    thumbnail: info.get("image").name,
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
