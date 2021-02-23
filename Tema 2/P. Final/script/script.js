
window.onload = function(){
    //Botones formulario: 
    btnCancelar = document.getElementById('cancelar');
    btnGuardar = document.getElementById('guardar');
    btnGestion = document.getElementById('gestion');     

    //Botones clientes: 
    btnBaja = document.getElementById("borrarCliente");
    
    //Funciones en funcionamiento: 
    btnCancelar.onclick = limpiarForm;
    btnGuardar.onclick = almacenarClientes;
    btnGestion.addEventListener("click", recuperarAlmacenamiento);


    //Cargamos el localStorage: 
    arrayTotal = JSON.parse(localStorage.getItem("Clientes"));
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
    
    // Ponemos colores para correcto:
    nombre.style.backgroundColor = "#FFF";
	dni.style.backgroundColor = "#FFF";
    //fechaNac.style.backgroundColor = "#FFF";
    
    //Asignamos una variable para comprobar el estado de las validaciones: 
    let resultado = true;
    
    //Validamos el nombre y los apellidos
    if (nombre.value == null || nombre.value.length == 0 || /^\s+$/.test(nombre.value)) {
        nombre.style.backgroundColor = "rgba(255,155,155,0.4)";
        nombre.focus();
        nombreError.innerHTML = "El nombre no puede estar vacío";
		resultado = false;
    } else {
        nombre.innerHTML = nombre.value;
        nombreError.innerHTML = "";
        nombre.style.backgroundColor = "#FFF";
    }
    
    if (apellidos.value == null || apellidos.value.length == 0 || /^\s+$/.test(apellidos.value)) {
        apellidos.style.backgroundColor = "rgba(255,155,155,0.4)";
        apellidos.focus();
        apellidosError.innerHTML = "Los apellidos no pueden estar vacíos";
		resultado = false;
    } else {
        apellidos.innerHTML = apellidos.value;
        apellidosError.innerHTML = "";
        apellidos.style.backgroundColor = "#FFF";
    }
    
    //Comprobamos el DNI usando la función correspondiente: 
	if(dni.value == 0 || validarDNI(dni.value) == false){
        dni.style.backgroundColor = "rgba(255,155,155,0.4)";
        dni.focus();
        dniError.innerHTML = "Hay un error en su DNI";
		resultado = false;		
    } else {
        dni.innerHTML = dni.value;
        dniError.innerHTML = "";
        dni.style.backgroundColor = "#FFF";
    }
    
    //Validamos fecha de nacimiento usando la función correspondiente: 
    if (fechaNac.value == 0 || validarFechaNacimiento(fechaNac.value) == false){
        fechaNac.style.backgroundColor = "rgba(255,155,155,0.4)";
        fechaNac.focus();
        fechaNacError.innerHTML = "Debe usted introducir una fecha";
		resultado = false;	
    } else {
        fechaNac.innerHTML = fechaNac.value;
        fechaNacError.innerHTML = "";
        fechaNac.style.backgroundColor = "#FFF";
    }
    
    //Validamos el correo electrónico:
    if (email.value == 0 || validarEmail(email.value) == false){
        email.style.backgroundColor = "rgba(255,155,155,0.4)";
        email.focus();
        emailError.innerHTML = "Introduzca su email";
		resultado = false;
    } else {
        email.innerHTML = email.value;
        emailError.innerHTML = "";
        email.style.backgroundColor = "#FFF";
    }
    
    //Validamos la primera contraseña: 
    if(validarContrasenya(contrasenyaP.value) == false || contrasenyaP.value == 0){
        contrasenyaP.style.backgroundColor = "rgba(255,155,155,0.4)";
        contrasenyaP.focus();
        contrasenyaPError.innerHTML = "Introduzca una contraseña válida. Recuerde que ha de tener al menos 8 caracteres, mayúsculas, minúsculas, números y algun signo de puntuación";
		resultado = false;
    } else {
        contrasenyaPError.innerHTML = "";
        contrasenyaP.style.backgroundColor = "#FFF";
    }
    
    //Validamos segunda contraseña: 
    if(contrasenyaR.value != contrasenyaP.value || contrasenyaR.value == 0){
        contrasenyaR.style.backgroundColor = "rgba(255,155,155,0.4)";
        contrasenyaR.focus();
        contrasenyaRError.innerHTML = "Las contraseñas no coinciden";
        resultado = false;
    } else {
        contrasenyaRError.innerHTML = "";
        contrasenyaR.style.backgroundColor = "#FFF";
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

    Clientes = [];

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
            newCliente = {"id" : id, 
                        "nombre" : nombreC, 
                        "apellidos" : apellidosC, 
                        "dni" : dniC, 
                        "fechaNac" : fechaNacC, 
                        "email": emailC, 
                        "contrasenya": contrasenyaPC,
                        "borrado" : false
                    };
            Clientes.push(newCliente);
            localStorage.setItem("Clientes", JSON.stringify(Clientes));
        } else {
            var arrayClientes;
            id = document.getElementById("id").value;
            // alert( "que id" + id);
            if (id==null || id == ""){
                arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
                miObj = { id : arrayClientes.length + 1,
                                nombre : nombreC, 
                                apellidos : apellidosC, 
                                dni : dniC, 
                                fechaNac : fechaNacC, 
                                email: emailC, 
                                contrasenya: contrasenyaPC,
                                borrado: false
                };
                //Añadimos el nuevo cliente al array: 
                arrayClientes.push(miObj);
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
                                                contrasenya: contrasenyaPC,
                                                borrado: false
                };
            }
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
        }
        limpiarForm();
    }
}

function recuperarAlmacenamiento(){
    //Obtenemos la tabla:
    var tabla = document.getElementById('tablaClientes');

    //tabla = document.getElementById('tablaClientes');
    var fila = tabla.getElementsByTagName("tr");

    for (let i = fila.length-1; i > 0; i--) {
        tabla.removeChild(fila[i]);
    }

    //Recuperamos el objeto del localstorage: 
    var clientes = JSON.parse(localStorage.getItem("Clientes"));
    if(clientes == null){
        alert("No hay clientes registrados");
    } else {         
        for (var i = 0; i < clientes.length; i++) {
            clientesBorrados = clientes[i].borrado;
            if(clientesBorrados == "true"){
                //alert("la casilla es verdadera");
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('id', clientes[i].id)
                nuevaFila.setAttribute('class', 'nuevo_Cliente');
                nuevaFila.setAttribute('hidden', 'false');

                //Añadimos la primera celda ID:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'idN');
                contenido = document.createTextNode(clientes[i].id);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la segunda celda NOMBRE:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'nombre');
                contenido = document.createTextNode(clientes[i].nombre);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la tercera celda APELLIDOS:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'apellidos');
                contenido = document.createTextNode(clientes[i].apellidos);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la cuarta celda DNI:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'dni');
                contenido = document.createTextNode(clientes[i].dni);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda FECHA NACIMIENTO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'fechaNac');
                contenido = document.createTextNode(clientes[i].fechaNac);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda EMAIL:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'email');
                contenido = document.createTextNode(clientes[i].email);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda CONTRASEÑA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'contrasenya');
                contenido = document.createTextNode(clientes[i].contrasenya);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda BORRADO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'campoBorrado');
                //nuevaCelda.setAttribute('hidden', 'true');
                contenido = document.createTextNode(clientes[i].borrado);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);

                tabla.appendChild(nuevaFila);

            }else {
                //alert("la casilla es falsa");
                //Creamos la fila: 
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('id', clientes[i].id)
                nuevaFila.setAttribute('class', 'nuevo_Cliente');

                //Añadimos la primera celda ID:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'idN');
                contenido = document.createTextNode(clientes[i].id);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la segunda celda NOMBRE:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'nombre');
                contenido = document.createTextNode(clientes[i].nombre);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la tercera celda APELLIDOS:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'apellidos');
                contenido = document.createTextNode(clientes[i].apellidos);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la cuarta celda DNI:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'dni');
                contenido = document.createTextNode(clientes[i].dni);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda FECHA NACIMIENTO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'fechaNac');
                contenido = document.createTextNode(clientes[i].fechaNac);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda EMAIL:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'email');
                contenido = document.createTextNode(clientes[i].email);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda CONTRASEÑA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'contrasenya');
                contenido = document.createTextNode(clientes[i].contrasenya);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda BORRADO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'campoBorrado');
                nuevaCelda.setAttribute('hidden', 'false');
                contenido = document.createTextNode(clientes[i].borrado);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la septa celda BOTON EDITAR:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('id', 'celda1');
                nuevaCelda.innerHTML = '<button id="Editar">Editar</button>';
                nuevaCelda.addEventListener("click", function(){
                                                        id = this.parentNode.getAttribute("id");

                                                        document.getElementById("id").value = id;                                         
                                                        editarCliente(id);
                                                    });
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la septima celda BOTON BORRAR:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('id', 'celda2');
                nuevaCelda.innerHTML = '<button id="baja">Dar de baja</button>';
                nuevaCelda.addEventListener("click", function(){
                                                        
                                                        id = this.parentNode.getAttribute("id");

                                                        // Selecionamos la tabla de clientes
                                                        var tabla = document.querySelector('#tablaClientes');

                                                        // Seleccionamos todas las filas y las guardamos en la variable filas
                                                        filas = tabla.getElementsByTagName('tr');

                                                        // Seleccionamos todas las celdas de la fila en cada iteración
                                                        casillas = filas[id].getElementsByTagName("td");

                                                        casillas[7].innerText = true;

                                                        // this se refiere al botón que llama a la acción. Al poner parent node
                                                        // subimos al tr que lo contiene y lo borramos con remove.
                                                        //this.parentNode.remove();
                                                        // Aquí ejecutamos la función borrarCliente que en realidad lo que hace
                                                        // es recorrer otra vez la tabla y sobreescribir Clientes en Localstorage
                                                        borrarCliente();
                                                    });
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
            }
        }    
    }
}

function borrarCliente(){
    // Creamos un array vacío donde guardaremos todos los clientes de la tabla.
    var listaClientes = [];

    // Selecionamos la tabla de clientes
    var tabla = document.querySelector('#tablaClientes');

    // Seleccionamos todas las filas y las guardamos en la variable filas
    filas = tabla.getElementsByTagName('tr');

    // Recorremos las filas
    for (var i = 1; i < filas.length; i++) {

        // Seleccionamos todas las celdas de la fila en cada iteración
        casillas = filas[i].getElementsByTagName("td");

            obj = {        
                    id:casillas[0].innerText,
                    nombre:casillas[1].innerText,
                    apellidos:casillas[2].innerText,
                    dni:casillas[3].innerText,
                    fechaNac: casillas[4].innerText, 
                    email: casillas[5].innerText, 
                    contrasenya: casillas[6].innerText,
                    borrado: casillas[7].innerText

                    }; 
                    
            // Subimos al array el objeto
            listaClientes.push(obj);
    }

    // Una vez tenemos el array de objetos lo pasamos a cadena de texto con stringify
    clientes = JSON.stringify(listaClientes);

    // Y sobreescribimos en localStorage.
    localStorage.Clientes = clientes;

    //Redirecciona a la tabla actualizada: 
    window.location.href = "formularioClientes.html";
}

function editarCliente(id){
    //Lo primero vamos a coger el form y sus items: 
    //alert(id);
        document.getElementById("nombre").value = arrayTotal[id-1].nombre;
        document.getElementById("apellidos").value = arrayTotal[id-1].apellidos;
        document.getElementById("dni").value = arrayTotal[id-1].dni;
        document.getElementById("fechaNac").value = arrayTotal[id-1].fechaNac;
        document.getElementById("email").value = arrayTotal[id-1].email;


        // document.getElementById("apellidos").value = apellidos;
        // document.getElementById("dni").value = dni;
        // document.getElementById("fechaNac").value = fechaNac;
        // document.getElementById("email").value = email;
        // document.getElementById("contrasenyaP").value = contrasenyaP;
        // document.getElementById("contrasenyaR").value = contrasenyaR;
    

}
