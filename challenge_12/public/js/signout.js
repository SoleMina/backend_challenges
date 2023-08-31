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
