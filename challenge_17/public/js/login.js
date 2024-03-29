document.getElementById('login').addEventListener('click',(event)=>{
    event.preventDefault()
    let data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
    }
    console.log(data)
    fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res=>res.json())
        .then(res=>console.log(res))    //en lugar de imprimir en consola: mostrar mensaje de alerta
        .then(res=> alert("Welcome!!")) 
        .then(res => location.href = '/products')
        .catch(err=>console.log(err))   //en lugar de imprimir en consola: mostrar mensaje de alerta
});

