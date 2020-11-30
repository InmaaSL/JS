window.onload = function(){
    //Botones formulario: 
    btnGuardar = document.getElementById('guardar');
    btnGestion = document.getElementById('gestion'); 

    //Variable que usamos para poder ir agregando clientes al localStorage:
    i = 0;

    //variable para asignar un id a cada cliente:
    id = 1;
    if (localStorage.length != 0){
            id = 1;
    }

    //Funciones en funcionamiento: 
    btnGuardar.onclick = almacenarClientes;
    btnGestion.addEventListener("click", gestionClientes);
    btnGestion.addEventListener("click", recuperarAlmacenamiento);

}

function gestionClientes(){
    location.href = "clientes.html";
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

function validarContrasenya(contrasenya){
    var mayuscula = false;
    var minuscula = false;
    var numero = false;
    var caracter_raro = false;

    if(contrasenya.length >= 8){		
        for(var i = 0;i<contrasenya.length;i++){
            if(contrasenya.charCodeAt(i) >= 65 && contrasenya.charCodeAt(i) <= 90){
                mayuscula = true;
            } else if(contrasenya.charCodeAt(i) >= 97 && contrasenya.charCodeAt(i) <= 122){
                minuscula = true;
            } else if(contrasenya.charCodeAt(i) >= 48 && contrasenya.charCodeAt(i) <= 57){
                numero = true;
            } else {
                caracter_raro = true;
            }
        }

        if(mayuscula == true && minuscula == true && caracter_raro == true && numero == true){
            return true;
        }
    }
    return false;

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
    if(validarContrasenya(contrasenyaP.value) == false){
        contrasenyaP.style.backgroundColor = "rgba(255,155,155,0.4)";
        contrasenyaP.focus();
        contrasenyaPError.innerHTML = "Introduzca una contraseña válida. Recuerde que ha de tener al menos 8 caracteres, mayúsculas, minúsculas, números y algun signo de puntuación";

		resultado = false;
    } else {
        contrasenyaPError.innerHTML = "";
    }

    //Validamos segunda contraseña: 
    if(contrasenyaR.value != contrasenyaP.value){
        contrasenyaR.style.backgroundColor = "rgba(255,155,155,0.4)";
        contrasenyaR.focus();
        contrasenyaRError.innerHTML = "Las contraseñas no coinciden";
    } else {
        contrasenyaRError.innerHTML = "";
    }
    
    return resultado;
    
}

function limpiarForm(){
    //Obtenemos el formulario y lo ponemos en blanco: 
	form = document.getElementById('clientesForm');
	form.reset();
}

function almacenarClientes(){
    //Validamos primero los datos, para ello recogemos el resultado de validar en una variable.
    resultado = validarCampos();
    
    //Recogemos las variables necesarias:
    let nombre = document.getElementById('nombre');
    let apellidos = document.getElementById('apellidos');
    let dni = document.getElementById('dni');
    let fechaNac = document.getElementById('fechaNac');
    let email = document.getElementById('email');
    let contrasenyaP = document.getElementById('contrasenyaP');
    //Si la validación va favorablemente guardamos el usuario en el localstorage:
    if(resultado){
        
        //Creamos un array con los objetos que vamos a usar:
        cliente = { id, nombre, apellidos, dni, fechaNac, email, contrasenyaP};
            cliente.id = id;
            cliente.nombre = nombre.value;
            cliente.apellidos = apellidos.value;
            cliente.dni = dni.value;
            cliente.fechaNac = fechaNac.value;
            cliente.email = email.value; 
            cliente.contrasenya = contrasenyaP.value;

            localStorage.setItem('cliente['+i+']', JSON.stringify(cliente));
    }
    i++;
    id++;
}

function recuperarAlmacenamiento(){
    //Obtenemos primero la cantidad de elementos guardados en el storage:
    cantidadItems = localStorage.length;

    //Obtenemos la tabla:
    tabla = document.getElementsByTagName("table")[0];

    if(cantidadItems > 0){
            for (var i = 0; i < cantidadItems; i++) {	
            //Recogemos en un objeto la información que haya en el localStorage pasandolo a string con parse:
            miObj = JSON.parse(localStorage.getItem('cliente['+i+']')); 
    
                // //Para ir añanadiendo filas primero cogemos la referencia de donde las queremos insertar:  
                // tbody = document.getElementsByTagName('tbody')[0];
        
                //Creamos la fila: 
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('class', 'nuevo_Articulo');
    
                //Añadimos la primera celda nombre:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'nombre');
                contenido = document.createTextNode(miObj.nombre);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                //tabla.appendChild(nuevaFila);
    
                // //Añadimos la segunda celda REFERNCIA:
                // nuevaCeldaREF = document.createElement('td');
                // nuevaCeldaREF.setAttribute('class', 'ref');
                // contenidoREF = document.createTextNode(miObj.ref);
                // nuevaCeldaREF.appendChild(contenidoREF);
                // nuevaFila.appendChild(nuevaCeldaREF);
                // tbody.appendChild(nuevaFila);
                // //tabla.appendChild(nuevaFila);
                
                // //Añadimos la tercera celda PRECIO:
                // nuevaCeldaPRE = document.createElement('td');
                // nuevaCeldaPRE.setAttribute('class', 'precio');
                // contenidoPRE = document.createTextNode(miObj.precio);
                // nuevaCeldaPRE.appendChild(contenidoPRE);
                // nuevaFila.appendChild(nuevaCeldaPRE);
                // tbody.appendChild(nuevaFila);
                // //tabla.appendChild(nuevaFila);
    
                // //Añadimos la cuarta celda CANTIDAD:
                // nuevaCeldaCAN = document.createElement('td');
                // nuevaCeldaCAN.setAttribute('class', 'cantidad');
                // contenidoCAN = document.createTextNode(miObj.cantidad);
                // nuevaCeldaCAN.appendChild(contenidoCAN);
                // nuevaFila.appendChild(nuevaCeldaCAN);
                // tbody.appendChild(nuevaFila);
                // //tabla.appendChild(nuevaFila);
    
                // //Añadimos la quinta celda TOTAL:
                // nuevaCeldaTOT = document.createElement('td');
                // nuevaCeldaTOT.setAttribute('class', 'total');
                // contenidoTOT = document.createTextNode(miObj.total);
                // nuevaCeldaTOT.appendChild(contenidoTOT);
                // nuevaFila.appendChild(nuevaCeldaTOT);
                // tbody.appendChild(nuevaFila);
                // //tabla.appendChild(nuevaFila);
    
                // //Añadimos la cuarta celda BOTON:
                // nuevaCeldaBOT = document.createElement('td');
                // nuevaCeldaBOT.setAttribute('class', 'celda');
                // nuevaCeldaBOT.innerHTML = '<button class="boton">Borrar</button>';
                // nuevaFila.appendChild(nuevaCeldaBOT);
                // tbody.appendChild(nuevaFila);
                // //tabla.appendChild(nuevaFila);
    
                // //Al ser un botón que creamos de forma instantánea, lo mejor es poner un evento: 
                // nuevaCeldaBOT.addEventListener("click",borraFila);

        }
    }
}