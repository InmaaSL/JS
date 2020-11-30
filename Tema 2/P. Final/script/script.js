window.onload = function(){
    //Botones formulario: 
    btnGuardar = document.getElementById('guardar');
    btnGestion = document.getElementById('gestion'); 

    btnGuardar.onclick = validarCampos;
    
}

function validarDNI(dni){
    //Recogemos las diferentes variables: 
    var numero;
    var letr;
    var letra;
    var expresion_regular_dni;

    expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

    if(expresion_regular_dni.test(dni) == true){
        numero = dni.substr(0,dni.length-1);
        letr = dni.substr(dni.length-1,1);

        //Operación que obtiene la posición de la letra en el DNI:
        numero = numero % 23;

        letra ='TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero,numero+1);

        if (letra!=letr.toUpperCase()) {
            return false; 
        }
    } else {
        return false;
    }
}

function validarFechaNacimiento(fecha){
    var fechaSplit = fecha.split("/");
        var dia = fechaSplit[0];
        var mes = fechaSplit[1];
        var anyo = fechaSplit[2];
        var date = new Date(anyo,mes,'0');
        if (!isNaN(dia) && anyo > 1900) {
            if((dia-0)>(date.getDate()-0)){
                return false;
            }
        }
}

function validarEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

function validarContrasenya(contrasenyaP, contrasenyaR){
    var espacios = false;
    var cont = 0;
    //Comprobamos primero que no haya espacios en blanco:
    while (!espacios && (cont < contrasenyaP.length)) {
    if (contrasenyaP.charAt(cont) == " ")
        espacios = true;
        cont++;
    }
    if (espacios) {
        // alert ("La contraseña no puede contener espacios en blanco");
    return false;
    }

    //Comprobamos que ambos campos estén completos:
    if (contrasenyaP.length == 0 || contrasenyaR.length == 0) {
        // alert("Los campos de la password no pueden quedar vacios");
        return false;
    }

    //Comprobamos que ambas coincidan: 
    if (contrasenyaP != contrasenyaR) {
        // alert("Las passwords deben de coincidir");
        return false;
    } else {

        return true; 
    }
}

function validarCampos(){
    //Recogemos los campos a validar: 
    let nombre = document.getElementById('nombre');
    let apellidos = document.getElementById('apellidos');
    let dni = document.getElementById('dni');
    let fechaNac = document.getElementById('fechaNac');
    let email = document.getElementById('email');
    let contrasenyaP = document.getElementById('contrasenyaP'); 
    let contrasenyaR = document.getElementById('contrasenyaR');

    //Recogemos los campos donde anoraremos errores: 
    let nombreError = document.getElementById('errorNombre');
    let apellidosError = document.getElementById('errorApellidos');
    let dniError = document.getElementById('errorDNI');
    let fechaNacError = document.getElementById('errorFechaNac');
    let emailError = document.getElementById('errorEmail');
    let contrasenyaPError = document.getElementById('errorContrasenyaP'); 
    let contrasenyaRError = document.getElementById('errorContrasenyaR');

    // Ponemos colores para fallo:
    nombre.style.backgroundColor = "#FFF";
	dni.style.backgroundColor = "#FFF";
    
    //Asignamos una variable para comprobar el estado de las validaciones: 
    let resultado = true;
    
    //Validamos el nombre y los apellidos
    if (nombre.value == null || nombre.value.length == 0 || /^\s+$/.test(nombre.value)) {
        nombre.style.backgroundColor = "rgba(255,155,155,0.4)";
        nombre.focus();
        nombreError.innerHTML = "El nombre no puede estar vacío";
		resultado = false;
    } else {
        nombreError.innerHTML = "";
    }

    if (apellidos.value == null || apellidos.value.length == 0 || /^\s+$/.test(apellidos.value)) {
        apellidos.style.backgroundColor = "rgba(255,155,155,0.4)";
        apellidos.focus();
        apellidosError.innerHTML = "Los apellidos no pueden estar vacíos";
		resultado = false;
    } else {
        apellidosError.innerHTML = "";
    }
    
    //Comprobamos el DNI usando la función correspondiente: 
	if(dni.value == 0 || validarDNI(dni.value) == false){
		dni.style.backgroundColor = "rgba(255,155,155,0.4)";
        dni.focus();
        dniError.innerHTML = "Hay un error en su DNI";
		resultado = false;		
    } else {
        dniError.innerHTML = "";
    }

    //Validamos fecha de nacimiento usando la función correspondiente: 
    if (fechaNac.value == 0 || validarFechaNacimiento(fechaNac.value) == false){
        fechaNac.style.backgroundColor = "rgba(255,155,155,0.4)";
        fechaNac.focus();
        fechaNacError.innerHTML = "Debe usted introducir una fecha";
		resultado = false;	
    } else {
        fechaNacError.innerHTML = "";
    }

    //Validamos el correo electrónico:
    if (email.value == 0 || validarEmail(email.value) == false){
        email.style.backgroundColor = "rgba(255,155,155,0.4)";
        email.focus();
        emailError.innerHTML = "Introduzca su email";
		resultado = false;
    } else {
        emailError.innerHTML = "";
    }

    //Validamos la primera contraseña: 
    if(validarContrasenya(contrasenyaP, contrasenyaR) == false){
        contrasenyaP.style.backgroundColor = "rgba(255,155,155,0.4)";
        contrasenyaP.focus();
        contrasenyaPError.innerHTML = "Introduzca una contraseña válida";
        contrasenyaR.style.backgroundColor = "rgba(255,155,155,0.4)";
        contrasenyaR.focus();
        contrasenyaRError.innerHTML = "Las contraseñas no coinciden";

		resultado = false;
    } else {
        contrasenyaPError.innerHTML = "";
        contrasenyaRError.innerHTML = "";
    }
    

    
    return resultado;
    
    // dniError.innerHTML = "";
}