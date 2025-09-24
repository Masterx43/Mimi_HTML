document.getElementById("formulario").addEventListener("submit", function(e){
    e.preventDefault(); 

    // Capturar valores
    let nombre = document.getElementById("text1").value.trim();
    let apellido = document.getElementById("textApellido").value.trim();
    let email = document.getElementById("txtEmail").value.trim();
    let pass = document.getElementById("password").value

    // Labels de error
    let errorNombre = document.getElementById("lblErrorNombre");
    let errorApellido = document.getElementById("lblErrorApellido");
    let errorEmail = document.getElementById("lblErrorEmail");
    let passError = document.getElementById("lblErrorPassword");

    let vefNombre = false, vefApellido = false, vefCorreo = false, vefPass = false;

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

    if(pass === "") {
        passError.innerText = "No puede estar vacio este campo"
    } else {
        passError.innerText = "";
        vefPass = true
    }

    if (vefNombre && vefApellido && vefCorreo && vefPass) {
        let usuario = { nombre, apellido, email , pass};

        localStorage.setItem("usuario", JSON.stringify(usuario));
        
        alert("Usuario registrado correctamente");
        console.log(usuario);
        window.location.href = "index.html"; 
    }

});

