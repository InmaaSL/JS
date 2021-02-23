
window.onload = function(){
    //Botones formulario: 
    btnCancelar = document.getElementById('cancelar');
    btnGuardar = document.getElementById('guardar');
    btnGestion = document.getElementById('gestion');     

    //Botones clientes: 
    btnBaja = document.getElementById("borrarProducto");
    
    //Funciones en funcionamiento: 
    btnCancelar.onclick = limpiarForm;
    btnGuardar.onclick = almacenarProductos;
    btnGestion.addEventListener("click", recuperarAlmacenamiento);


    //Cargamos el localStorage: 
    arrayTotal = JSON.parse(localStorage.getItem("Productos"));
}

function validarCampos(){
    //Recogemos los campos a validar: 
    let referencia = document.getElementById('referencia');
    let descripcion = document.getElementById('descripcion');
    let familia = document.getElementById('familia');
    let precio = document.getElementById('precio');

    //Recogemos los campos donde anoraremos errores: 
    let errorReferencia = document.getElementById('errorReferencia');
    let errorDescripcion = document.getElementById('errorDescripcion');
    let errorFamilia = document.getElementById('errorFamilia');
    let errorPrecio = document.getElementById('errorPrecio');
    
    //Asignamos una variable para comprobar el estado de las validaciones: 
    let resultado = true;
    
    //Validamos los campos: 
    if (referencia.value == null || referencia.value.length == 0 || /^\s+$/.test(referencia.value)) {
        referencia.style.backgroundColor = "rgba(255,155,155,0.4)";
        referencia.focus();
        errorReferencia.innerHTML = "El nombre no puede estar vacío";
		resultado = false;
    } else {
        referencia.innerHTML = referencia.value;
        errorReferencia.innerHTML = "";
        referencia.style.backgroundColor = "#FFF";
    }
    
    if (descripcion.value == null || descripcion.value.length == 0 || /^\s+$/.test(descripcion.value)) {
        descripcion.style.backgroundColor = "rgba(255,155,155,0.4)";
        descripcion.focus();
        errorDescripcion.innerHTML = "Los apellidos no pueden estar vacíos";
		resultado = false;
    } else {
        descripcion.innerHTML = descripcion.value;
        errorDescripcion.innerHTML = "";
        descripcion.style.backgroundColor = "#FFF";
    }

    if (familia.value == null || familia.value.length == 0 || /^\s+$/.test(familia.value)) {
        familia.style.backgroundColor = "rgba(255,155,155,0.4)";
        familia.focus();
        errorFamilia.innerHTML = "El nombre no puede estar vacío";
		resultado = false;
    } else {
        familia.innerHTML = familia.value;
        errorFamilia.innerHTML = "";
        familia.style.backgroundColor = "#FFF";
    }
    
    if (precio.value == null || precio.value.length == 0 || isNaN(precio.value)) {
        precio.style.backgroundColor = "rgba(255,155,155,0.4)";
        precio.focus();
        errorPrecio.innerHTML = "Los apellidos no pueden estar vacíos";
		resultado = false;
    } else {
        precio.innerHTML = precio.value;
        errorPrecio.innerHTML = "";
        precio.style.backgroundColor = "#FFF";
    }

    return resultado;
}

function limpiarForm(){
    //Obtenemos el formulario y lo ponemos en blanco: 
	form = document.getElementById('productosForm');
	form.reset();
}

function almacenarProductos(event){
    //Validamos primero los datos, para ello recogemos el resultado de validar en una variable.
    resultado = validarCampos();

    Productos = [];

    //Recogemos las variables necesarias:
    let referenciaC = document.getElementById('referencia').value;
    let descripcionC = document.getElementById('descripcion').value;
    let familiaC = document.getElementById('familia').value;
    let precioC = document.getElementById('precio').value;


    if(resultado){

        if(localStorage.getItem("Productos") == null){
            //Creamos un objeto de tipo productos: 
            var id = 1;
            newProducto = {"id" : id,
                        "referencia" : referenciaC, 
                        "descripcion" : descripcionC, 
                        "familia" : familiaC, 
                        "precio" : precioC, 
                        "borrado" : false
                    };
            Productos.push(newProducto);
            localStorage.setItem("Productos", JSON.stringify(Productos));
        } else {
            var arrayProductos;
            id = document.getElementById("id").value;

            if (id==null || id == ""){
                arrayProductos = JSON.parse(localStorage.getItem("Productos"));
                miObj = { id : arrayProductos.length + 1,
                                referencia : referenciaC, 
                                descripcion : descripcionC, 
                                familia : familiaC, 
                                precio : precioC, 
                                borrado: false
                };
                //Añadimos el nuevo producto al array: 
                arrayProductos.push(miObj);
            } else {
                arrayProductos = JSON.parse(localStorage.getItem("Productos"));
                idProductoMod = id - 1; 
                arrayProductos[idProductoMod] = {
                                                id : id,
                                                referencia : referenciaC, 
                                                descripcion : descripcionC, 
                                                familia : familiaC, 
                                                precio : precioC, 
                                                borrado: false
                };
            }
            localStorage.setItem("Productos", JSON.stringify(arrayProductos));
        }
        limpiarForm();
    }
}

function recuperarAlmacenamiento(){
    //Obtenemos la tabla:
    var tabla = document.getElementById('tablaProductos');

    var fila = tabla.getElementsByTagName("tr");

    for (let i = fila.length-1; i > 0; i--) {
        tabla.removeChild(fila[i]);
    }

    //Recuperamos el objeto del localstorage: 
    var productos = JSON.parse(localStorage.getItem("Productos"));
    if(productos == null){
        alert("No hay clientes registrados");
    } else {         
        for (var i = 0; i < productos.length; i++) {
            productosBorrados = productos[i].borrado;
            if(productosBorrados == "true"){
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('id', productos[i].id)
                nuevaFila.setAttribute('class', 'nuevo_Producto');
                nuevaFila.setAttribute('hidden', 'false');

                //Añadimos la primera celda ID:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'idN');
                contenido = document.createTextNode(productos[i].id);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la segunda celda REFERENCIA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'nombre');
                contenido = document.createTextNode(productos[i].referencia);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la tercera celda DESCRIPCION:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'apellidos');
                contenido = document.createTextNode(productos[i].descripcion);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la cuarta celda FAMILIA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'dni');
                contenido = document.createTextNode(productos[i].familia);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda FECHA PRECIO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'fechaNac');
                contenido = document.createTextNode(productos[i].precio);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda BORRADO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'campoBorrado');
                //nuevaCelda.setAttribute('hidden', 'true');
                contenido = document.createTextNode(productos[i].borrado);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);

                tabla.appendChild(nuevaFila);
            }else {
                //Creamos la fila: 
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('id', productos[i].id)
                nuevaFila.setAttribute('class', 'nuevo_Producto');

                //Añadimos la primera celda ID:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'idN');
                contenido = document.createTextNode(productos[i].id);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la segunda celda REFERENCIA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'nombre');
                contenido = document.createTextNode(productos[i].referencia);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la tercera celda DESCRIPCION:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'apellidos');
                contenido = document.createTextNode(productos[i].descripcion);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la cuarta celda FAMILIA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'dni');
                contenido = document.createTextNode(productos[i].familia);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda FECHA PRECIO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'fechaNac');
                contenido = document.createTextNode(productos[i].precio);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda BORRADO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'campoBorrado');
                nuevaCelda.setAttribute('hidden', 'false');
                contenido = document.createTextNode(productos[i].borrado);
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
                                                        editarProducto(id);
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
                                                        var tabla = document.querySelector('#tablaProductos');

                                                        // Seleccionamos todas las filas y las guardamos en la variable filas
                                                        filas = tabla.getElementsByTagName('tr');

                                                        // Seleccionamos todas las celdas de la fila en cada iteración
                                                        casillas = filas[id].getElementsByTagName("td");

                                                        // Ponemos en true la casilla de borrado: 
                                                        casillas[5].innerText = true;

                                                        // Aquí ejecutamos la función borrarCliente que en realidad lo que hace
                                                        // es recorrer otra vez la tabla y sobreescribir Clientes en Localstorage
                                                        borrarProducto();
                                                    });
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
            }
        }    
    }
}

function borrarProducto(){
    // Creamos un array vacío donde guardaremos todos los clientes de la tabla.
    var listaProductos = [];

    // Selecionamos la tabla de clientes
    var tabla = document.querySelector('#tablaProductos');

    // Seleccionamos todas las filas y las guardamos en la variable filas
    filas = tabla.getElementsByTagName('tr');

    // Recorremos las filas
    for (var i = 1; i < filas.length; i++) {

        // Seleccionamos todas las celdas de la fila en cada iteración
        casillas = filas[i].getElementsByTagName("td");

            obj = {        
                    id:casillas[0].innerText,
                    referencia:casillas[1].innerText,
                    descripcion:casillas[2].innerText,
                    familia:casillas[3].innerText,
                    precio: casillas[4].innerText, 
                    borrado: casillas[5].innerText
                    }; 
                    
            // Subimos al array el objeto
            listaProductos.push(obj);
    }

    // Una vez tenemos el array de objetos lo pasamos a cadena de texto con stringify
    productos = JSON.stringify(listaProductos);

    // Y sobreescribimos en localStorage.
    localStorage.Productos = productos;

    //Redirecciona a la tabla actualizada: 
    window.location.href = "formularioProductos.html";
}

function editarProducto(id){
    //Lo primero vamos a coger el form y sus items: 
    //alert(id);
        document.getElementById("referencia").value = arrayTotal[id-1].referencia;
        document.getElementById("descripcion").value = arrayTotal[id-1].descripcion;
        document.getElementById("familia").value = arrayTotal[id-1].familia;
        document.getElementById("precio").value = arrayTotal[id-1].precio;

}
