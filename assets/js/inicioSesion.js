document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("txtEmail").value.trim();
    let pass = document.getElementById("password").value

    let errorEmail = document.getElementById("lblErrorEmail");
    let errorPass = document.getElementById("lblErrorPassword");

    let vefCorreo = false, vefPass = false;

    if(email === ""){
        errorEmail.innerText = "El correo no puede estar vacío";
    } else if(!email.includes("@")){
        errorEmail.innerText = "El correo debe ser válido";
    } else {
        errorEmail.innerText = "";
        vefCorreo = true;
    }

    if(pass === ""){
        errorPass.innerText = "La contraseña no puede estar vacía";
    } else {
        errorPass.innerText = "";
        vefPass = true;
    }

    if(vefCorreo && vefPass){
        // Recuperar usuario registrado
        let usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

        if(usuarioGuardado.email === email && usuarioGuardado.pass === pass){
            alert("Bienvenido " + usuarioGuardado.nombre);
            window.location.href = "index.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    }
});

