document.getElementById("formulario").addEventListener("submit", function(e){
    e.preventDefault(); 

    // Capturar valores
    let nombre = document.getElementById("text1").value.trim();
    let apellido = document.getElementById("textApellido").value.trim();
    let email = document.getElementById("txtEmail").value.trim();

    // Labels de error
    let errorNombre = document.getElementById("lblErrorNombre");
    let errorApellido = document.getElementById("lblErrorApellido");
    let errorEmail = document.getElementById("lblErrorEmail");

    let vefNombre = false, vefApellido = false, vefCorreo = false;

    if(nombre === "" || nombre.length < 3){
        errorNombre.innerText = "El nombre es obligatorio y debe tener al menos 3 caracteres";
    } else {
        errorNombre.innerText = "";
        vefNombre = true;
    }

    if(apellido === "" || apellido.length < 3){
        errorApellido.innerText = "El apellido es obligatorio y debe tener al menos 3 caracteres";
    } else {
        errorApellido.innerText = "";
        vefApellido = true;
    }

    if(email === ""){
        errorEmail.innerText = "El correo no puede estar vacío";
    } else if(!email.includes("@")){
        errorEmail.innerText = "El correo debe ser válido";
    } else {
        errorEmail.innerText = "";
        vefCorreo = true;
    }

    if (vefNombre && vefApellido && vefCorreo) {
        let usuario = { nombre, apellido, email };
        alert("Formulario enviado correctamente");
        console.log(usuario);

        // Redirección a otra página
        window.location.href = "index.html"; 
    }

    
});

