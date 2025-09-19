const enviado = document.getElementById("btnEnviar")


enviado.addEventListener("click", (e) =>{
    e.preventDefault()
    let errorNombre = document.getElementById("lblErrorNombre")
    let errorApellido = document.getElementById("lblErrorApellido")
    let errorEmail = document.getElementById("lblErrorEmail")


    let nombre = document.getElementById("text1").value
    let apellido = document.getElementById("textApellido").value
    let email = document.getElementById("txtEmail").value
    if(nombre === "" || nombre.length <= 3) {
        errorNombre.innerText = "El nombre es obligatorio y debe tener al menos 3 caracteres"
        errorNombre.style.color = "red"
        errorNombre.style.fontWeight = "bold"
    } else {
        errorNombre.innerHTML = ""
    }

    if (apellido === "" || apellido.length <= 3){
        errorApellido.innerText = "El apellido no puede estar vacio y debe tener al menos 3 caracteres"
        errorApellido.style.color = "red"
        errorApellido.style.fontWeight = "bold"
    }else {
        errorApellido.innerText = ""
    }


    
    if (email === ""){
        errorEmail.innerText = "El campo no puede estar vacio"
        errorEmail.style.color = "red"
        errorEmail.style.fontWeight = "bold"
        return
    } else {
        errorEmail.innerText = ""
    }

    let usuario = {
        nombre : nombre,
        apellido : apellido,
        email : email
    }

    alert("Formulario enviado")

    console.log(usuario)
})