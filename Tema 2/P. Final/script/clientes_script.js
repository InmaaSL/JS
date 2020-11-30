window.onload = function(){

    recuperarAlmacenamiento();
    nombre = document.getElementById('nombre');
    apellidos = document.getElementById('apellidos');
    dni = document.getElementById('dni');
    fechaNac = document.getElementById('fechaNac');
    email = document.getElementById('email');
    contrasenyaP = document.getElementById('contrasenyaP');

}

function recuperarAlmacenamiento(){

    //Obtenemos primero la cantidad de elementos guardados en el storage:
    cantidadItems = localStorage.length;

    //Obtenemos la tabla:
    tabla = document.getElementById('tablaClientes');
    // tabla = document.getElementsByTagName('tbody')[0];

    if(cantidadItems > 0){
            for (var i = 0; i < cantidadItems; i++) {	
            //Recogemos en un objeto la información que haya en el localStorage pasandolo a string con parse:
            cliente = JSON.parse(localStorage.getItem('cliente['+i+']')); 
    
                // //Para ir añanadiendo filas primero cogemos la referencia de donde las queremos insertar:  
                // tbody = document.getElementsByTagName('tbody')[0];
        
                //Creamos la fila: 
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('class', 'nuevo_Cliente');

                //Añadimos la primera celda ID:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'id');
                contenido = document.createTextNode(cliente.id);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la segunda celda NOMBRE:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'nombre');
                contenido = document.createTextNode(cliente.nombre);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
    
                //Añadimos la tercera celda APELLIDOS:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'apellidos');
                contenido = document.createTextNode(cliente.apellidos);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la cuarta celda DNI:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'dni');
                contenido = document.createTextNode(cliente.dni);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
    
                //Añadimos la quinta celda FECHA NACIMIENTO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'fechaNac');
                contenido = document.createTextNode(cliente.fechaNac);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda EMAIL:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'fechaNac');
                contenido = document.createTextNode(cliente.email);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda EMAIL:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'contrasenya');
                contenido = document.createTextNode(cliente.contrasenya);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
    
                // //Añadimos la sesta celda BOTONES:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'celda');
                nuevaCelda.innerHTML = '<button id="borrarCliente">Borrar</button> <button id="Editar">Editar</button>';
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                // //tabla.appendChild(nuevaFila);
    
                //Al ser un botón que creamos de forma instantánea, lo mejor es poner un evento: 
                btnBorrarCliente = document.getElementById('borrarCliente');
                btnBorrarCliente.addEventListener("click",borraFila);

        }
    }
}

function borraFila(){

    this.parentNode.remove();

    //Primero borramos lo que haya y así guardamos actualizando los datos: 
    //localStorage.clear();

    almacenarTabla();

}

function almacenarTabla(){
    //Primero borramos lo que haya y así guardamos actualizando los datos: 
    localStorage.clear();

    //cliente = {id, nombre, apellidos, dni, fechaNac, email, contrasenyaP};

    //Obtenemos la tabla:
    tabla = document.getElementById('tablaClientes');
    
    //Obtenemos cada fila de la tabla que nos interesa: 
    filas = tabla.getElementsByClassName("nuevo_Cliente");
    
    //Nos quedamos solo con los artículos y no con la "fila enunciado":
    clientes = filas.length;

    //Calculamos:
    //Como no cogemos todas las filas, sino solo las de los artículos creados podemos comenzar en 0.
    //Obtenemos el valor de la celda que tiene como clase total.  
    //parseFloat ->  convertir una cadena en un número.	
    for (var i = 0; i < clientes; i++) {	
        id = filas[i].getElementsByClassName('id')[0].innerText;
        
        cliente = {id, nombre, apellidos, dni, fechaNac, email, contrasenyaP};

        cliente.id = filas[i].getElementsByClassName('id')[0].innerText;
        cliente.nombre = filas[i].getElementsByClassName('nombre')[0].innerText;
        cliente.apellitos = filas[i].getElementsByClassName('apellidos')[0].innerText;
        cliente.fechaNac = filas[i].getElementsByClassName('fechaNac')[0].innerText;
        cliente.email = filas[i].getElementsByClassName('email')[0].innerText;
        cliente.contrasenya = filas[i].getElementsByClassName('contrasenya')[0].innerText;

        localStorage.setItem('pedido['+i+']', JSON.stringify(miObj));
    }
}