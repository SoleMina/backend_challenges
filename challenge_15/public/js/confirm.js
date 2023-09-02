console.log("CONFIRMMMM!!!!");

let form = document.getElementById("confirmForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;
  let passwordConfirm = document.querySelector('#passwordConfirm').value;
  if(password === passwordConfirm) {
    fetch("http://localhost:8080/api/confirm-password", {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((result) => result.json())
        .then((res) => {
          alert("Password reseted");
          location.href = "http://localhost:8080/login";
        });
  }else{
    alert("User un nuevo password");
  }
});