
    const ajax = new XMLHttpRequest(); 

window.onload = function(){
    //Variables necesarias: 
    tabla = document.getElementById('tablaClientes');
    tbodyClientes = document.getElementById('tablaClientes_tbody');
    
    arrayClientes = [];

    //Botones formulario: 
    btnCancelar = document.getElementById('cancelar');
    btnGuardar = document.getElementById('guardar');
    btnGestion = document.getElementById('gestion');     

    //Botones clientes: 
    btnBaja = document.getElementById("borrarCliente");
    
    //Funciones en funcionamiento: 
    btnCancelar.onclick = LimpiarForm;
    btnGuardar.onclick = almacenarClientes;
    //btnGestion.addEventListener("click", recuperarAlmacenamiento);

    //Cargar archivo con datos de clientes: 
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 404) {

            var newRow = tbodyClientes.insertRow(1); 
            contenido = document.createTextNode("No hay clientes registrados");
            newRow.appendChild(contenido); 
            
        } else if(this.readyState == 4 && this.status == 200){ 
            //Pasar de texto a JSON
			arrayClientes = JSON.parse(this.responseText);
            console.log(arrayClientes);

            recuperarAlmacenamiento();
        }
    }; 

    ajax.open("GET", "php/infoClientes.json", true); 
    ajax.send();

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

function LimpiarForm(){
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

    Clientes = []; 

    if(resultado){
        if (arrayClientes.length == 0 ){ 
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
            arrayClientes.push(newCliente);
            alert("Cliente almacenado correctamente");

        } else { 
            var idCliente = arrayClientes[arrayClientes.length - 1]; 
            //console.log("idCliente " + idCliente);
    
            //Obtenemos el valor del id: 
            let id_JSON = idCliente.id;
            //console.log("id_JSON " + id_JSON);

            //Obtenemos el campo id del form: 
            let id = document.getElementById("id").value;
            //console.log("id tabla: " + id); 
    
            //Cuando creamos los siguientes clientes:
            if (id == null || id == ""){
                //alert("Creamos nuevo cliente");
                console.log(id);

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
                alert("Cliente almacenado correctamente");
                
            } else {
                //alert("Editamos cliente");
                //Cuando editamos un cliente: 
                idClienteMod = id - 1; 
                console.log(idClienteMod); 

                arrayClientes[idClienteMod] = {
                                                id : parseInt(id),
                                                nombre : nombreC, 
                                                apellidos : apellidosC, 
                                                dni : dniC, 
                                                fechaNac : fechaNacC, 
                                                email: emailC, 
                                                contrasenya: contrasenyaPC,
                                                borrado: false
                };
                alert("Cliente editado correctamente");
                
            }
        }
        
        //Actualizamos la página:
        LimpiarForm();
        ActualizarClientes();
        window.location.reload();
    }
}

function recuperarAlmacenamiento(){

    console.log(arrayClientes);

    var fila = tabla.getElementsByTagName("tr");
    //console.log(fila.length);

    for (let i = fila.length-1; i > 0; i--) {
        tabla.removeChild(fila[i]);
    }
    
    if(arrayClientes.length == 0){ 
        alert("No hay clientes registrados");
    } else { 
        //Para ir añanadiendo filas primero cogemos la referencia de donde las queremos insertar:  
        //tbody = document.getElementsByTagName('tbody')[0];

        for(item of arrayClientes){

            if(item.borrado) { 
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('id', item.id)
                nuevaFila.setAttribute('class', 'nuevo_Cliente');
                nuevaFila.setAttribute('hidden', 'false');

                //Añadimos la primera celda ID:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'idN');
                contenido = document.createTextNode(item.id);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la segunda celda NOMBRE:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'nombre');
                contenido = document.createTextNode(item.nombre);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la tercera celda APELLIDOS:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'apellidos');
                contenido = document.createTextNode(item.apellidos);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la cuarta celda DNI:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'dni');
                contenido = document.createTextNode(item.dni);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda FECHA NACIMIENTO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'fechaNac');
                contenido = document.createTextNode(item.fechaNac);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda EMAIL:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'email');
                contenido = document.createTextNode(item.email);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda CONTRASEÑA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'contrasenya');
                contenido = document.createTextNode(item.contrasenya);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda BORRADO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'campoBorrado');
                //nuevaCelda.setAttribute('hidden', 'true');
                contenido = document.createTextNode(item.borrado);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);

                tabla.appendChild(nuevaFila);

            } else { 
                //Creamos la fila: 
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('id', item.id)
                nuevaFila.setAttribute('class', 'nuevo_Cliente');

                //Añadimos la primera celda ID:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'idN');
                contenido = document.createTextNode(item.id);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la segunda celda NOMBRE:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'nombre');
                contenido = document.createTextNode(item.nombre);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la tercera celda APELLIDOS:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'apellidos');
                contenido = document.createTextNode(item.apellidos);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la cuarta celda DNI:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'dni');
                contenido = document.createTextNode(item.dni);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda FECHA NACIMIENTO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'fechaNac');
                contenido = document.createTextNode(item.fechaNac);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda EMAIL:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'email');
                contenido = document.createTextNode(item.email);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda CONTRASEÑA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'contrasenya');
                contenido = document.createTextNode(item.contrasenya);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda BORRADO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'campoBorrado');
                nuevaCelda.setAttribute('hidden', 'false');
                contenido = document.createTextNode(item.borrado);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la sexta celda BOTON EDITAR:
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

                                                        console.log(arrayClientes[id-1].id); 

                                                        arrayClientes[id-1].borrado = true; 
                                                        console.log(arrayClientes[id-1].borrado);

                                                        ActualizarClientes();

                                                        //Actualizamos la página:
                                                        location.reload();
                                                        
                                                    });
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
            }
        }
    }

}

function editarCliente(id){
    //usar arrayclientes! 

    //Lo primero vamos a coger el form y sus items: 
        document.getElementById("nombre").value = arrayClientes[id-1].nombre;
        document.getElementById("apellidos").value = arrayClientes[id-1].apellidos;
        document.getElementById("dni").value = arrayClientes[id-1].dni;
        document.getElementById("fechaNac").value = arrayClientes[id-1].fechaNac;
        document.getElementById("email").value = arrayClientes[id-1].email;

}

function ActualizarClientes(){ 
    //Actualizar archivo con datos de clientes: 
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 404) {
            alert("Ha ocurrido un error al actualizar el registro"); 

        } else if(this.readyState == 4 && this.status == 200){ 
            console.log("Registro de clientes actualizado"); 
        }
    }; 

    nuevoArray = JSON.stringify(arrayClientes); 
    ajax.open("POST", "php/datos_clientes.php?param=" + nuevoArray, true); 
    ajax.send();
    console.log(arrayClientes);
}
