let form = document.getElementById("forgotForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let email = document.querySelector('#email').value;
  console.log(email);


  fetch("/api/forgot-password", {
    method: "POST",
    body: JSON.stringify({email}),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((result) => result.json());
});