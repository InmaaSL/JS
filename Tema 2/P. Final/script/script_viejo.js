window.onload = function(){
    //Botones formulario: 
    btnCancelar = document.getElementById('cancelar');
    btnGuardar = document.getElementById('guardar');
    btnGestion = document.getElementById('gestion'); 
    
    
    //Funciones en funcionamiento: 
    btnCancelar.onclick = limpiarForm;
    btnGuardar.onclick = almacenarClientes;
    btnGestion.addEventListener("click", recuperarAlmacenamiento);

    //Cargamos el localStorage: 
    
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

function almacenarClientes(event){
    //Validamos primero los datos, para ello recogemos el resultado de validar en una variable.
    resultado = validarCampos();

    //Recogemos las variables necesarias:
    let nombreC = document.getElementById('nombre').value;
    let apellidosC = document.getElementById('apellidos').value;
    let dniC = document.getElementById('dni').value;
    let fechaNacC = document.getElementById('fechaNac').value;
    let emailC = document.getElementById('email').value;
    let contrasenyaPC = document.getElementById('contrasenyaP').value;

    if(resultado){
        
        if(localStorage.getItem("Clientes") == null){
            //Creamos un objeto de tipo cliente: 
            var id = 1;
            cliente = [{ "id" : id, 
                        "nombre" : nombreC, 
                        "apellidos" : apellidosC, 
                        "dni" : dniC, 
                        "fechaNac" : fechaNacC, 
                        "email": emailC, 
                        "contrasenya": contrasenyaPC
                    }];
            localStorage.setItem("Clientes", JSON.stringify(cliente));
        } else {
            var nuevoCliente; 
            var arrayClientes;

            if (id==null || id == ""){
                arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
                nuevoCliente = { id : arrayClientes.length + 1,
                            nombre : nombreC, 
                            apellidos : apellidosC, 
                            dni : dniC, 
                            fechaNac : fechaNacC, 
                            email: emailC, 
                            contrasenya: contrasenyaPC
                };
                //Añadimos el nuevo cliente al array: 
                arrayClientes.push(nuevoCliente);
            } else {
                arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
                idClienteMod = id - 1; 
                arrayClientes[idClienteMod] = {
                                                id : id,
                                                nombre : nombreC, 
                                                apellidos : apellidosC, 
                                                dni : dniC, 
                                                fechaNac : fechaNacC, 
                                                email: emailC, 
                                                contrasenya: contrasenyaPC
                };
            }
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
        }
    }
}

function recuperarAlmacenamiento(){
    //Obtenemos la tabla:
    tabla = document.getElementById('tablaClientes');

    //tabla = document.getElementById('tablaClientes');
    fila = tabla.getElementsByTagName("tr");

    for (let i = fila.length-1; i > 0; i--) {
        tabla.removeChild(fila[i]);
    }

    //Recuperamos el objeto del localstorage: 
    var clientes = JSON.parse(localStorage.getItem("Clientes"));

    //Obtenemos primero la cantidad de elementos guardados en el storage:
    cantidadItems = localStorage.length;

    if(cantidadItems > 0){            
        // for (var i = 0; i < clientes.length; i++) {
                        
            //Recogemos en un objeto la información que haya en el localStorage pasandolo a string con parse:
            // //Para ir añanadiendo filas primero cogemos la referencia de donde las queremos insertar:  
            // tbody = document.getElementsByTagName('tbody')[0];
    
            //Creamos la fila: 
            nuevaFila = document.createElement('tr');
            nuevaFila.setAttribute('id', element.id)
            nuevaFila.setAttribute('class', 'nuevo_Cliente');

            //Añadimos la primera celda ID:
            nuevaCelda = document.createElement('td');
            nuevaCelda.setAttribute('class', 'id');
            contenido = document.createTextNode(element.id);
            nuevaCelda.appendChild(contenido);
            nuevaFila.appendChild(nuevaCelda);
            tabla.appendChild(nuevaFila);
            
            //Añadimos la segunda celda NOMBRE:
            nuevaCelda = document.createElement('td');
            nuevaCelda.setAttribute('class', 'nombre');
            contenido = document.createTextNode(element.nombre);
            nuevaCelda.appendChild(contenido);
            nuevaFila.appendChild(nuevaCelda);
            tabla.appendChild(nuevaFila);

            //Añadimos la tercera celda APELLIDOS:
            nuevaCelda = document.createElement('td');
            nuevaCelda.setAttribute('class', 'apellidos');
            contenido = document.createTextNode(element.apellidos);
            nuevaCelda.appendChild(contenido);
            nuevaFila.appendChild(nuevaCelda);
            tabla.appendChild(nuevaFila);
            
            //Añadimos la cuarta celda DNI:
            nuevaCelda = document.createElement('td');
            nuevaCelda.setAttribute('class', 'dni');
            contenido = document.createTextNode(element.dni);
            nuevaCelda.appendChild(contenido);
            nuevaFila.appendChild(nuevaCelda);
            tabla.appendChild(nuevaFila);

            //Añadimos la quinta celda FECHA NACIMIENTO:
            nuevaCelda = document.createElement('td');
            nuevaCelda.setAttribute('class', 'fechaNac');
            contenido = document.createTextNode(element.fechaNac);
            nuevaCelda.appendChild(contenido);
            nuevaFila.appendChild(nuevaCelda);
            tabla.appendChild(nuevaFila);

            //Añadimos la quinta celda EMAIL:
            nuevaCelda = document.createElement('td');
            nuevaCelda.setAttribute('class', 'fechaNac');
            contenido = document.createTextNode(element.email);
            nuevaCelda.appendChild(contenido);
            nuevaFila.appendChild(nuevaCelda);
            tabla.appendChild(nuevaFila);

            //Añadimos la quinta celda EMAIL:
            nuevaCelda = document.createElement('td');
            nuevaCelda.setAttribute('class', 'contrasenya');
            contenido = document.createTextNode(element.contrasenya);
            nuevaCelda.appendChild(contenido);
            nuevaFila.appendChild(nuevaCelda);
            tabla.appendChild(nuevaFila);

            // //Añadimos la sesta celda BOTONES:
            nuevaCelda = document.createElement('td');
            nuevaCelda.setAttribute('class', 'celda');
            nuevaCelda.innerHTML = '<button id="borrarCliente">Borrar</button> <button id="Editar">Editar</button>';
            nuevaFila.appendChild(nuevaCelda);
            tabla.appendChild(nuevaFila);

            //Al ser un botón que creamos de forma instantánea, lo mejor es poner un evento: 
            btnBorrarCliente = document.getElementById('borrarCliente');
            //btnBorrarCliente.addEventListener("clik", borrarCliente);
            btnBorrarCliente.addEventListener("click", function (){
                this.parentNode.parentNode.remove();
                actualizarClientes();
               //clientes = JSON.parse(localStorage.getItem("Clientes"));
                    // for (let x = 0; x < clientes.length; x++) {
                    //     if(clientes[x].id == element.id){
                    //         clientes.splice(x, 1);
                    //         localStorage.setItem("Clientes", JSON.stringify(clientes));
                    //         location.href = "formularioClientes.html";
                    //         return;
                    //     }
                        
                    // }
            })
        });
    }
}

function actualizarClientes(){
    //Primero borramos lo que haya y así guardamos actualizando los datos: 
    localStorage.clear();

    miObj = JSON.parse(localStorage.getItem("Clientes"));

    //Obtenemos la tabla:
    tabla = document.getElementById('tablaClientes');

    //tabla = document.getElementById('tablaClientes');
    fila = tabla.getElementsByClassName("nuevo_Cliente");
    
    //Nos quedamos solo con los artículos y no con la "fila enunciado":
    clientes = fila.length;

    //Calculamos:
    //Como no cogemos todas las filas, sino solo las de los artículos creados podemos comenzar en 0.
    //Obtenemos el valor de la celda que tiene como clase total.  
    //parseFloat ->  convertir una cadena en un número.
    if (clientes > 0) {
            for (var i = 0; i < clientes; i++) {	
                miObj.id = fila[i].getElementsByClassName('id')[0].innerText;
                miObj.nombre = fila[i].getElementsByClassName('nombre')[0].innerText;
                miObj.apellidos = fila[i].getElementsByClassName('apellidos')[0].innerText;
                miObj.dni = fila[i].getElementsByClassName('dni')[0].innerText;
                miObj.fechaNac = fila[i].getElementsByClassName('fechaNac')[0].innerText;
                miObj.email = fila[i].getElementsByClassName('email')[0].innerText;
                miObj.contrasenya = fila[i].getElementsByClassName('contrasenya')[0].innerText;

                localStorage.setItem("Clientes", JSON.stringify(clientes));
            alert('Datos almacenados correctamente')
        }	
    } else {
        alert('No hay productos que almacenar');
    }
    
}