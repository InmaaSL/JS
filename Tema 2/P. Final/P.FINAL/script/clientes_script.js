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
    /* Esta función aunque funciona me da dos errores: 
    -VM767:1 Uncaught SyntaxError: Unexpected end of JSON input at JSON.parse (<anonymous>)
    at XMLHttpRequest.ajax.onload (clientes_script.js:233)

    -clientes_script.js:227 GET http://localhost/js/Tema%202/P.%20Final/P.FINAL/php/infoClientes.json 404 
    (Not Found)
    */


    //Validamos primero los datos, para ello recogemos el resultado de validar en una variable.
    resultado = validarCampos();

    //Recogemos las variables necesarias:
    let nombreC = document.getElementById('nombre').value;
    let apellidosC = document.getElementById('apellidos').value;
    let dniC = document.getElementById('dni').value;
    let fechaNacC = document.getElementById('fechaNac').value;
    let emailC = document.getElementById('email').value;
    let contrasenyaPC = document.getElementById('contrasenyaP').value;

    //Creamos la petición al servidor:
    const ajax = new XMLHttpRequest();


    Clientes = []; 
    var arrayClientes;

    if(resultado){
        //Comprobamos si existe o no el archivo json: 
        ajax.onload = function(){
            if(this.readyState == 4 && this.status == 200){ 
                //alert("Hay archivo");

                    //Pasamos los datos de JSON a array: 
                    arrayClientes = JSON.parse(this.responseText); 
                    //console.log(arrayClientes.length); 

                    var idCliente = arrayClientes[arrayClientes.length - 1]; 
    
                    //Obtenemos el valor del id: 
                    let id_JSON = idCliente.id;
                    //console.log(id_JSON); 
    
                    //Obtenemos el campo id del form: 
                    let id = document.getElementById("id").value;
    
                    //Cuando creamos los siguientes clientes:
                    if (id == null || id == ""){
                        alert("Creamos nuevo cliente");
                        console.log(id)
    
                        miObj = { id : id_JSON + 1,
                                        nombre : nombreC, 
                                        apellidos : apellidosC, 
                                        dni : dniC, 
                                        fechaNac : fechaNacC, 
                                        email: emailC, 
                                        contrasenya: contrasenyaPC,
                                        borrado: false
                        };
    
                        arrayClientes.push(miObj);
                        /*cadenaClientes =JSON.stringify(arrayClientes); 
                        ajax.open('POST', 'php/datos_clientes.php?param=' + cadenaClientes, true); 
                        ajax.send(cadenaClientes); */
    
                    } else {
                        alert("Editamos cliente");
                        //Cuando editamos un cliente: 
                        idClienteMod = id - 1; 
                        console.log(idClienteMod); 
    
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
    
                    cadenaClientes = JSON.stringify(arrayClientes); 
                    ajax.open('POST', 'php/datos_clientes.php?param=' + cadenaClientes, true); 
                    ajax.send(cadenaClientes); 
            } 
            
            if(this.readyState == 4 && this.status == 404) {
                //alert("Creo el archivo");

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
                cadenaClientes = JSON.stringify(Clientes); 

                //Abrimos el archivo json e introducimos los datos: 
                ajax.open('POST', 'php/datos_clientes.php?param=' + cadenaClientes, true); 
                ajax.send(cadenaClientes); 
                alert("Cliente almacenado correctamente");

                //Limpiamos el formulario: 
            }
        }; 

        ajax.open("GET", "php/infoClientes.json", true); 
        ajax.send();
    }
    limpiarForm();
}

function recuperarAlmacenamiento(){
    var tabla = document.getElementById('tablaClientes');

    //tabla = document.getElementById('tablaClientes');
    var fila = tabla.getElementsByTagName("tr");

    for (let i = fila.length-1; i > 0; i--) {
        tabla.removeChild(fila[i]);
    }

    //Iniciar petición AJAX
	const ajax = new XMLHttpRequest(); 
	ajax.open('GET', 'php/infoClientes.json', true);
	ajax.send();

    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //Pasar de texto a JSON
			let datos = JSON.parse(this.responseText);

            if(datos.length == 0){ 
                alert("No hay clientes registrados");
            } else { 
                //Para ir añanadiendo filas primero cogemos la referencia de donde las queremos insertar:  
                tbody = document.getElementsByTagName('tbody')[0];
    
                for(item of datos){

                    
                    //Creamos la fila: 
                    nuevaFila = document.createElement('tr');
                    nuevaFila.setAttribute('class', 'nuevo_Articulo');
        
                    //Añadimos la primera celda DNI:
                    nuevaCeldaDNI = document.createElement('td');
                    nuevaCeldaDNI.setAttribute('class', 'dni');
                    contenidoDNI = document.createTextNode(item.dni);
                    nuevaCeldaDNI.appendChild(contenidoDNI);
                    nuevaFila.appendChild(nuevaCeldaDNI);
                    tbody.appendChild(nuevaFila);
                    //tabla.appendChild(nuevaFila);
        
                    //Añadimos la segunda celda REFERNCIA:
                    nuevaCeldaREF = document.createElement('td');
                    nuevaCeldaREF.setAttribute('class', 'ref');
                    contenidoREF = document.createTextNode(item.ref);
                    nuevaCeldaREF.appendChild(contenidoREF);
                    nuevaFila.appendChild(nuevaCeldaREF);
                    tbody.appendChild(nuevaFila);
                    //tabla.appendChild(nuevaFila);
                    
                    //Añadimos la tercera celda PRECIO:
                    nuevaCeldaPRE = document.createElement('td');
                    nuevaCeldaPRE.setAttribute('class', 'precio');
                    contenidoPRE = document.createTextNode(item.precio);
                    nuevaCeldaPRE.appendChild(contenidoPRE);
                    nuevaFila.appendChild(nuevaCeldaPRE);
                    tbody.appendChild(nuevaFila);
                    //tabla.appendChild(nuevaFila);
        
                    //Añadimos la cuarta celda CANTIDAD:
                    nuevaCeldaCAN = document.createElement('td');
                    nuevaCeldaCAN.setAttribute('class', 'cantidad');
                    contenidoCAN = document.createTextNode(item.cantidad);
                    nuevaCeldaCAN.appendChild(contenidoCAN);
                    nuevaFila.appendChild(nuevaCeldaCAN);
                    tbody.appendChild(nuevaFila);
                    //tabla.appendChild(nuevaFila);
        
                    //Añadimos la quinta celda TOTAL:
                    nuevaCeldaTOT = document.createElement('td');
                    nuevaCeldaTOT.setAttribute('class', 'total');
                    contenidoTOT = document.createTextNode(item.total);
                    nuevaCeldaTOT.appendChild(contenidoTOT);
                    nuevaFila.appendChild(nuevaCeldaTOT);
                    tbody.appendChild(nuevaFila);
                    //tabla.appendChild(nuevaFila);
        
                    //Añadimos la cuarta celda BOTON:
                    nuevaCeldaBOT = document.createElement('td');
                    nuevaCeldaBOT.setAttribute('class', 'celda');
                    nuevaCeldaBOT.innerHTML = '<button class="boton">Borrar</button>';
                    nuevaFila.appendChild(nuevaCeldaBOT);
                    tbody.appendChild(nuevaFila);
                    //tabla.appendChild(nuevaFila);
        
                    //Al ser un botón que creamos de forma instantánea, lo mejor es poner un evento: 
                    nuevaCeldaBOT.addEventListener("click",borraFila);
                    
                    calculaTotal();	
                }
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
        document.getElementById("nombre").value = arrayTotal[id-1].nombre;
        document.getElementById("apellidos").value = arrayTotal[id-1].apellidos;
        document.getElementById("dni").value = arrayTotal[id-1].dni;
        document.getElementById("fechaNac").value = arrayTotal[id-1].fechaNac;
        document.getElementById("email").value = arrayTotal[id-1].email;

}
