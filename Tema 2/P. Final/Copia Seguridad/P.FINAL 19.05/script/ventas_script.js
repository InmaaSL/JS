
    //Para arrayClientes: 
    const ajax = new XMLHttpRequest(); 
    //Para arayProductos:
    const ajax2 = new XMLHttpRequest();
    //Para arrayVentas: 
    const ajax3 = new XMLHttpRequest();

window.onload = function(){
    //Creamos los arrays necesarios: 
    arrayClientes = []; 
    arrayProductos = []; 
    arrayVentas = []; 

    //Cargamos esos arrays con la información que tenemos guardada en los archivos JSON:
    obtenerClientes();
    obtenerProductos();
    obtenerVentas();

    //Recogemos div productos para rellenarlo con los que tenemos en el arrayProductos: 
    productosDIV = document.getElementById("productos");

    /***************************************
     * 
     * Comienza la magia: 
     * 
     ***************************************/
    
    //Obtenemos los botones grabar y cancelar: 
    botonGrabar = document.getElementById('grabar');
    botonCancelar = document.getElementById('cancelar');
    botonAlmacenar = document.getElementById('almacenar');
    botonRecuperar = document.getElementById('recuperar');
    botonEliminar = document.getElementById('eliminar');
    botonBorrarCarrito = document.getElementById("BorrarCarrito");

    //Click: 
    botonGrabar.onclick = anyadirFila;
    botonCancelar.onclick = LimpiarForm;
    botonAlmacenar.onclick = realizarCOMPRA;
    botonEliminar.onclick = eliminarCOMPRA;
    botonBorrarCarrito.onclick = BorrarCarrito;

    //Obtenemos datos del formulario: 
	referencia = document.getElementById("ref");
    precio = document.getElementById("precio");
    cantidad = document.getElementById("cantidad");

    //Obtenemos la tabla de Facturas: 
    tabla = document.getElementsByTagName("tbody")[0];

    //Obtenemos cada fila de la tabla que nos interesa: 
    filas = tabla.getElementsByClassName("nuevo_Articulo");

    //Obtenemos la tabla de gestionVentas: 
    tablaGVentas = document.getElementById("gestionVentas"); 
    
    //Cogemos las filas: 
    filasGVentas = tablaGVentas.getElementsByTagName("tr");
}

function obtenerClientes(){
    //Cargar archivo con datos de clientes: 
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 404) {
            alert("No hay clientes registrados");
        } else if(this.readyState == 4 && this.status == 200){ 
            //Pasar de texto a JSON
			arrayClientes = JSON.parse(this.responseText);
            //console.log(arrayClientes);
        }
    }; 
    ajax.open("GET", "php/infoClientes.json", true); 
    ajax.send();
}

function obtenerProductos(){
    //Cargar archivo con datos de productos: 
    ajax2.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 404) {
            alert("No hay productos en stock");  
        } else if(this.readyState == 4 && this.status == 200){ 
            //Pasar de texto a JSON
			arrayProductos = JSON.parse(this.responseText);
            RecuperarProductos();
        }
    }; 
    ajax2.open("GET", "php/infoProductos.json", true); 
    ajax2.send();
}

function obtenerVentas(){
        //Cargar archivo con datos de productos: 
        ajax3.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 404) {
                alert("No hay ventas realizadas");  
            } else if(this.readyState == 4 && this.status == 200){ 
                //Pasar de texto a JSON
                arrayVentas = JSON.parse(this.responseText);

                //Cargamos las ventas realizadas: 
                ListadoCompras();
            }
        }; 
    
        ajax3.open("GET", "php/infoVentas.json", true); 
        ajax3.send();
}

function RecuperarProductos(){ 
    if(arrayProductos.length == 0){
        alert("No hay productos de stock");
    } else {         
        for(item of arrayProductos){
            if(item.borrado){
                nuevoDIV = document.createElement('div');
                nuevoDIV.setAttribute('id', item.id)
                nuevoDIV.setAttribute('class', 'fpeque');
                nuevoDIV.setAttribute('hidden', 'false');

                hijoDIV = document.createElement('div');

                parrafoHijo1 = document.createElement('p');
                    codigoRef = document.createTextNode("Ref.");
                    parrafoHijo1.appendChild(codigoRef);

                    spanHijo1 = document.createElement("span");
                    contenidoReferencia = document.createTextNode(item.referencia);
                    spanHijo1.appendChild(contenidoReferencia);
                    parrafoHijo1.appendChild(spanHijo1);
                    hijoDIV.appendChild(parrafoHijo1);
                    //productosDIV.appendChild(nuevoDIV);

                parrafoHijo2 = document.createElement('p');
                    codigoDesc = document.createTextNode("Desc.");
                    parrafoHijo2.appendChild(codigoDesc);

                    spanHijo2 = document.createElement("span");
                    contenidoDescripcion = document.createTextNode(item.descripcion);
                    spanHijo2.appendChild(contenidoDescripcion);
                    parrafoHijo2.appendChild(spanHijo2);
                    hijoDIV.appendChild(parrafoHijo2);
                    //productosDIV.appendChild(nuevoDIV);
                    
                parrafoHijo3 = document.createElement('p');
                    codigoFam = document.createTextNode("Familia:");
                    parrafoHijo3.appendChild(codigoFam);

                    spanHijo3 = document.createElement("span");
                    contenidoFamilia = document.createTextNode(item.familia);
                    spanHijo3.appendChild(contenidoFamilia);
                    parrafoHijo3.appendChild(spanHijo3);
                    hijoDIV.appendChild(parrafoHijo3);
                    //productosDIV.appendChild(nuevoDIV);
                    
                parrafoHijo4 = document.createElement('p');
                    codigoPrecio = document.createTextNode("Precio:");
                    parrafoHijo4.appendChild(codigoPrecio);

                    spanHijo4 = document.createElement("span");
                    contenidoPrecio = document.createTextNode(item.precio);   
                    spanHijo4.appendChild(contenidoPrecio);
                    parrafoHijo4.appendChild(spanHijo4);

                    simboloEuro = document.createTextNode("€");
                    parrafoHijo4.appendChild(simboloEuro);
                    hijoDIV.appendChild(parrafoHijo4);
                    //productosDIV.appendChild(nuevoDIV);
        
        nuevoDIV.appendChild(hijoDIV);
        productosDIV.appendChild(nuevoDIV);

            }else {
                nuevoDIV = document.createElement('div');
                nuevoDIV.setAttribute('id', item.id)
                nuevoDIV.setAttribute('class', 'fpeque');

                hijoDIV = document.createElement('div');

                parrafoHijo1 = document.createElement('p');
                    codigoRef = document.createTextNode("Ref.");
                    parrafoHijo1.appendChild(codigoRef);

                    spanHijo1 = document.createElement("span");
                    contenidoReferencia = document.createTextNode(item.referencia);
                    spanHijo1.appendChild(contenidoReferencia);
                    parrafoHijo1.appendChild(spanHijo1);
                    hijoDIV.appendChild(parrafoHijo1);
                    //productosDIV.appendChild(nuevoDIV);

                parrafoHijo2 = document.createElement('p');
                    codigoDesc = document.createTextNode("Desc.");
                    parrafoHijo2.appendChild(codigoDesc);

                    spanHijo2 = document.createElement("span");
                    contenidoDescripcion = document.createTextNode(item.descripcion);
                    spanHijo2.appendChild(contenidoDescripcion);
                    parrafoHijo2.appendChild(spanHijo2);
                    hijoDIV.appendChild(parrafoHijo2);
                    //productosDIV.appendChild(nuevoDIV);
                    
                parrafoHijo3 = document.createElement('p');
                    codigoFam = document.createTextNode("Familia:");
                    parrafoHijo3.appendChild(codigoFam);

                    spanHijo3 = document.createElement("span");
                    contenidoFamilia = document.createTextNode(item.familia);
                    spanHijo3.appendChild(contenidoFamilia);
                    parrafoHijo3.appendChild(spanHijo3);
                    hijoDIV.appendChild(parrafoHijo3);
                    //productosDIV.appendChild(nuevoDIV);
                    
                parrafoHijo4 = document.createElement('p');
                    codigoPrecio = document.createTextNode("Precio:");
                    parrafoHijo4.appendChild(codigoPrecio);

                    spanHijo4 = document.createElement("span");
                    contenidoPrecio = document.createTextNode(item.precio);   
                    spanHijo4.appendChild(contenidoPrecio);
                    parrafoHijo4.appendChild(spanHijo4);

                    simboloEuro = document.createTextNode("€");
                    parrafoHijo4.appendChild(simboloEuro);
                    hijoDIV.appendChild(parrafoHijo4);
                    //productosDIV.appendChild(nuevoDIV);

                parrafoHijo5 = document.createElement('p');
                    parrafoHijo5.setAttribute('hidden', 'true');
                    codigoFam = document.createTextNode("Cantidad:");
                    parrafoHijo5.appendChild(codigoFam);

                    spanHijo5 = document.createElement("span");
                    contenidoStock = document.createTextNode(item.stock);
                    spanHijo5.appendChild(contenidoStock);
                    parrafoHijo5.appendChild(spanHijo5);
                    hijoDIV.appendChild(parrafoHijo5);
                    //productosDIV.appendChild(nuevoDIV);
                
                nuevoDIV.appendChild(hijoDIV);
                productosDIV.appendChild(nuevoDIV);
            }
        }
    }

    //Obtenemos el valor de los cuadrados con los productos para cuando hagamos doble click:
    botonesProductos = document.getElementsByClassName("fpeque");

    //Dobleclick:
    for (let x = 0; x < botonesProductos.length; x++){
        botonesProductos[x].ondblclick = ponerProducto;
    }

}

function ponerProducto(){

    //Seleccionamos el nombre de los productos a través del id: 
    productoSeleccionadoID = this.getAttribute('id');

    idProducto = arrayProductos[productoSeleccionadoID - 1].id;
    refProducto = arrayProductos[productoSeleccionadoID - 1].referencia;
    descripcionProducto = arrayProductos[productoSeleccionadoID - 1].descripcion;

    //Obtenemos la ref y precio:
    precioProductoSelec = this.querySelector('div').querySelectorAll('span')[3].innerText;

    //Insertamos el precio, la referencia y el id: 
    document.getElementById('id').value = idProducto;
    document.getElementById('ref').value = refProducto + " - " + descripcionProducto;
    document.getElementById('precio').value = precioProductoSelec; 
    
    //Obtenemos el stock:
    stockProductoSelec = arrayProductos[productoSeleccionadoID - 1].stock; 
    //console.log("Desde el array stock: " + stockProductoSelec); 

    
}

function validarCampos(){
    cantidad.style.backgroundColor = "#FFF";

    cantidadValor = document.getElementById("cantidad").value;

    let resultado = true;

    //console.log("Desde el validator: " + stockProductoSelec); 

    // console.log("Cantidad: " + cantidadValor); 
    // console.log("Cantidad stock: " + stockProductoSelec);
    
    //Comprobamos primero que la cantidad sea un número, que sea distinta de 0 y el stock:
	if( isNaN (cantidad.value) || cantidad.value == 0 || stockProductoSelec < cantidadValor){
		cantidad.style.backgroundColor = "rgba(255,155,155,0.4)";
		cantidad.focus();
		resultado = false;
        document.getElementById("errorCantidad").style.display = "inline";
    } else {
        document.getElementById("errorCantidad").style.display = "none";
        resultado = true;
    }
    
	return resultado;
}

function LimpiarForm(){
    //Dejamos en blanco el formulario: 
    referencia.value = "";
    precio.value = "";
    cantidad.value = "";
}

function CalculaTotal(){

    //Declaramos una variable en 0:
	let	totalPedido = 0;

    //Obtenemos la tabla:
    //tabla = document.getElementsByTagName("tbody")[0];
    
    // //Obtenemos cada fila de la tabla que nos interesa: 
    // filas = tabla.getElementsByClassName("nuevo_Articulo");
    
    //Nos quedamos solo con los artículos y no con la "fila enunciado":
    articulos = filas.length;

    //Calculamos:
    //Como no cogemos todas las filas, sino solo las de los artículos creados podemos comenzar en 0.
    //Obtenemos el valor de la celda que tiene como clase total.  
    //parseFloat ->  convertir una cadena en un número.
	if(articulos > 0){		
		for (var i = 0; i < articulos; i++) {	
			subtotal = filas[i].getElementsByClassName('total')[0].innerText;
			totalPedido += parseFloat(subtotal);		 
		}
	}	

    //Insertamos en la casilla correspondiente: 
    casillaTotal = document.getElementsByClassName("total a_derecha");
    casillaTotal[0].style.color = 'red';
	casillaTotal[0].innerHTML = totalPedido + "€";

}

function anyadirFila(){   
    //Obtenemos la imagen que se crea al hacer dobloclick, ya que si esta no está no se ha seleccionado ningun producto: 
    refHueco = document.getElementById('ref');

    //Cogemos primero las variables importantes para el proceso: 
    form = document.getElementById('miform');
    dni = document.getElementById("dni");
    idP = document.getElementById("id");
    referencia = document.getElementById("ref");
    precio = document.getElementById("precio");
    cantidad = document.getElementById("cantidad");

    //Control de stock:
    cantidadRestante = stockProductoSelec - cantidad.value;
    arrayProductos[productoSeleccionadoID - 1].stock = cantidadRestante;
    // console.log(cantidadRestante);
    // console.log(arrayProductos[productoSeleccionadoID - 1].stock);
    //console.log(arrayProductos);

    //Obtenemos el resultado de validar: 
	resultado = validarCampos();

    //Igual que en el punto anterio, comprobamos si hay una iamgen metida dentro del div correspondiente 
    //de esta manera comprobamos que si hay o no un elemento. 
    if (refHueco.value != "") {
        //Si las validaciones dan true, es decir, todo está correcto, procedemos a introducir los valores: 
        if(resultado){
			//Para ir añanadiendo filas primero cogemos la referencia de donde las queremos insertar:  
            tbody = document.getElementsByTagName('tbody')[0];
            
            //Creamos la fila: 
            nuevaFila = document.createElement('tr');
            nuevaFila.setAttribute('class', 'nuevo_Articulo');

            //Añadimos la primera celda DNI:
            nuevaCeldaREF = document.createElement('td');
            nuevaCeldaREF.setAttribute('class', 'dniCliente');
            contenidoREF = document.createTextNode(dni.value);
            nuevaCeldaREF.appendChild(contenidoREF);
            nuevaFila.appendChild(nuevaCeldaREF);
            tbody.appendChild(nuevaFila);

            //Añadimos la primera celda ID:
            nuevaCeldaID = document.createElement('td');
            nuevaCeldaID.setAttribute('class', 'id');
            nuevaCeldaID.setAttribute('hidden', 'true');           
            contenidoID = document.createTextNode(id.value);
            nuevaCeldaID.appendChild(contenidoID);
            nuevaFila.appendChild(nuevaCeldaID);
            tbody.appendChild(nuevaFila);

            //Añadimos la primera celda REFERNCIA:
            nuevaCeldaREF = document.createElement('td');
            nuevaCeldaREF.setAttribute('class', 'ref');
            contenidoREF = document.createTextNode(referencia.value);
            nuevaCeldaREF.appendChild(contenidoREF);
            nuevaFila.appendChild(nuevaCeldaREF);
            tbody.appendChild(nuevaFila);
            
            //Añadimos la segunda celda PRECIO:
            nuevaCeldaPRE = document.createElement('td');
            nuevaCeldaPRE.setAttribute('class', 'precio');
            contenidoPRE = document.createTextNode(precio.value);
            nuevaCeldaPRE.appendChild(contenidoPRE);
            nuevaFila.appendChild(nuevaCeldaPRE);
            tbody.appendChild(nuevaFila);

            //Añadimos la tercera celda CANTIDAD:
            nuevaCeldaCAN = document.createElement('td');
            nuevaCeldaCAN.setAttribute('class', 'cantidad');
            contenidoCAN = document.createTextNode(cantidad.value);
            nuevaCeldaCAN.appendChild(contenidoCAN);
            nuevaFila.appendChild(nuevaCeldaCAN);
            tbody.appendChild(nuevaFila);

            //Añadimos la cuarta celda TOTAL:
            nuevaCeldaTOT = document.createElement('td');
            nuevaCeldaTOT.setAttribute('class', 'total');
            total = (parseFloat(cantidad.value) * parseFloat(precio.value)).toFixed(2);
            contenidoTOT = document.createTextNode(total);
            nuevaCeldaTOT.appendChild(contenidoTOT);
            nuevaFila.appendChild(nuevaCeldaTOT);
            tbody.appendChild(nuevaFila);

            //Añadimos la quinta celda BOTON:
            nuevaCeldaBOT = document.createElement('td');
            nuevaCeldaBOT.setAttribute('class', 'celda');
            nuevaCeldaBOT.innerHTML = '<button class="boton">Borrar</button>';
            nuevaFila.appendChild(nuevaCeldaBOT);
            tbody.appendChild(nuevaFila);

            //Al ser un botón que creamos de forma instantánea, lo mejor es poner un evento: 
            nuevaCeldaBOT.addEventListener("click", borraFila);

            LimpiarForm();
        }
    } else {
        alert("No has seleccionado producto");	
    }	
    CalculaTotal();	
    ActualizarProductos();
    //console.log(arrayProductos);
}

function borraFila(){
    this.parentNode.remove();
	CalculaTotal();
    
    //Recuperar el stock: 
    productoSelecBorrar = this.parentNode.getElementsByClassName("id")[0].innerText;
    //console.log( "productoSelecBorrar " + productoSelecBorrar);

    cantidadSumar = this.parentNode.getElementsByClassName("cantidad")[0].innerText;
    //console.log(" cantidadSumar " + cantidadSumar);

    stockProductoSelecBorrar = arrayProductos[productoSelecBorrar - 1].stock;
    //console.log("stockProductoSelecBorrar " + stockProductoSelecBorrar);

    cantidadSuma = parseInt(stockProductoSelecBorrar) + parseInt(cantidadSumar);
    //console.log("cantidadSuma " + cantidadSuma);

    arrayProductos[productoSelecBorrar - 1].stock = cantidadSuma;
    //console.log(arrayProductos[productoSelecBorrar - 1].stock);

    ActualizarProductos();

    stockProductoSelecBorrar = arrayProductos[productoSelecBorrar - 1].stock;
    //console.log( "productoSelecBorrar " + productoSelecBorrar);
}

function realizarCOMPRA(){

    //Recogemos en una variable los datos importantes:
    casillaTotal = document.getElementsByClassName("total a_derecha")[0].innerText;
    
    //Nos quedamos solo con los artículos y no con la "fila enunciado":
    articulos = filas.length;

    //Obtenemos los datos del cliente: 
    dniClienteTb = document.getElementById("dni").value; 

    for(x = 0; x < arrayClientes.length; x++){
        dniClienteAr = arrayClientes[x].dni;
        //console.log(dniClienteAr);

        if ( dniClienteAr == dniClienteTb){ 
            idClienteTb = arrayClientes[x].id;
            //console.log(idClienteTb); 
        } 
    }

    idCliente = arrayClientes[idClienteTb-1].id; 
    dniCliente = arrayClientes[idClienteTb-1].dni; 
    nombreCliente = arrayClientes[idClienteTb-1].nombre; 
    
    carrito = [];
    articulosVenta = {ref, precio, cantidad, total};

    if(arrayVentas.length == 0){

        if(articulos > 0){
            //Creamos un idVentas: 
            var idVentas = 1;
            newVenta = {"idVentas" : idVentas, 
                        "idCliente" : idCliente, 
                        "DNICliente" : dniCliente, 
                        "nombreCliente" : nombreCliente, 
                        "totalCompra" : casillaTotal,
                        "carrito" : carrito,
                        "borrado" : false
            };

            arrayVentas.push(newVenta);

            if(articulos > 0){		
                for (var i = 0; i < articulos; i++) {
                    articulosVenta = {"ref" : filas[i].getElementsByClassName('ref')[0].innerText, 
                            "precio" : filas[i].getElementsByClassName('precio')[0].innerText, 
                            "cantidad" : filas[i].getElementsByClassName('cantidad')[0].innerText, 
                            "total" : filas[i].getElementsByClassName('total')[0].innerText, 
                    };
                    carrito.push(articulosVenta);
                }
                alert("Venta realizada");
                //alert('Datos almacenados correctamente');
                //window.location.href = "ventas.html";
            }	

        } else {
            alert('No hay productos que almacenar');
        }

    } else {
        //Cogemos el idVentas anterior: 
        var idVentasI = arrayVentas[arrayVentas.length-1];

        //Obtenemos el valor del idVentas: 
        var id_JSON = idVentasI.idVentas;

        //Obtenemos el campo IDVentas del form: 
        var idVentaF = document.getElementById("IDVenta").value;

        if(idVentaF == null || idVentaF == ""){
            //Cuando creemos la siguiente venta: 
            if(articulos > 0){
                newVenta = {"idVentas" : id_JSON + 1, 
                            "idCliente" : idCliente, 
                            "DNICliente" : dniCliente, 
                            "nombreCliente" : nombreCliente, 
                            "totalCompra" : casillaTotal,
                            "carrito" : carrito,
                            "borrado" : false
                };
                arrayVentas.push(newVenta);
    
                if(articulos > 0){		
                    for (var i = 0; i < articulos; i++) {
                        articulosVenta = {"ref" : filas[i].getElementsByClassName('ref')[0].innerText, 
                                "precio" : filas[i].getElementsByClassName('precio')[0].innerText, 
                                "cantidad" : filas[i].getElementsByClassName('cantidad')[0].innerText, 
                                "total" : filas[i].getElementsByClassName('total')[0].innerText, 
                        };
                        carrito.push(articulosVenta);
                    }
                    alert("Venta realizada");
                    //alert('Datos almacenados correctamente');
                    //window.location.href = "ventas.html";
                }	
    
            } else {
                alert('No hay productos que almacenar');
            }
        } else {
            //Cuando editamos una venta: 
            idVentaMod = idVentaF - 1; 

            arrayVentas[idVentaMod] = {
                "idVentas" :  parseInt(idVentaF), 
                "idCliente" : idCliente, 
                "DNICliente" : dniCliente, 
                "nombreCliente" : nombreCliente, 
                "totalCompra" : casillaTotal,
                "carrito" : carrito,
                "borrado" : false
    };
    //arrayVentas.push(newVenta);

    if(articulos > 0){		
        for (var i = 0; i < articulos; i++) {
            articulosVenta = {"ref" : filas[i].getElementsByClassName('ref')[0].innerText, 
                    "precio" : filas[i].getElementsByClassName('precio')[0].innerText, 
                    "cantidad" : filas[i].getElementsByClassName('cantidad')[0].innerText, 
                    "total" : filas[i].getElementsByClassName('total')[0].innerText, 
            };
            carrito.push(articulosVenta);
        }
        alert("Venta realizada");
            }
        }
    }
    //console.log(arrayVentas);
    ActualizarVentas();
    LimpiarForm();
    BorrarCarrito();
    ListadoCompras();
}

function BorrarCarrito(){

    for (let i = filas.length-1; i >= 0; i-- ){
        //Recuperamos el id: 
        productoSelecBorrar = filas[i].getElementsByClassName("id")[0].innerText;
        console.log( "productoSelecBorrar " + productoSelecBorrar);

        cantidadSumar = filas[i].getElementsByClassName("cantidad")[0].innerText;
        console.log(" cantidadSumar " + cantidadSumar);

        stockProductoSelecBorrar = arrayProductos[productoSelecBorrar - 1].stock;
        console.log("stockProductoSelecBorrar " + stockProductoSelecBorrar);

        cantidadSuma = parseInt(stockProductoSelecBorrar) + parseInt(cantidadSumar);
        console.log("cantidadSuma " + cantidadSuma);

        arrayProductos[productoSelecBorrar - 1].stock = cantidadSuma;
        console.log(arrayProductos[productoSelecBorrar - 1].stock);

        ActualizarProductos();
        filas[i].remove();
    }

    CalculaTotal();
    LimpiarForm();
}

function ListadoCompras(){

    for( let i = filasGVentas.length-1; i>0; i --){
        tablaGVentas.removeChild(filasGVentas[i]);
    }

    if (arrayVentas.length == 0 ){
        alert("No hay ventas registradas");
    } else {
        for ( item of arrayVentas){
            // console.log(item);

            if(item.borrado){
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('id', item.idVentas)
                nuevaFila.setAttribute('class', 'nueva_venta');
                nuevaFila.setAttribute('hidden', 'false');

                //Añadimos la primera celda: IDVentas:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'idVentas');
                contenido = document.createTextNode(item.idVentas);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila);

                //Añadimos la segunda celda: NombreCliente:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'nombreCliente');
                contenido = document.createTextNode(item.nombreCliente);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila);

                //Añadimos la quinta celda BORRADO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'campoBorrado');
                contenido = document.createTextNode(item.borrado);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la segunda celda: totalCompra:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'nombreCliente');
                contenido = document.createTextNode(item.totalCompra);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila);

                //Añadimos la lista de productos comprados por ref: 
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'productosRef');
                nuevaLista = document.createElement('ul'); 

                for (item2 of item.carrito){
                    //Añadimos la referencia: 
                    nuevoPuntoLista = document.createElement('li'); 
                    contenido = document.createTextNode(item2.ref); 
                    nuevoPuntoLista.appendChild(contenido); 
                    nuevaLista.appendChild(nuevoPuntoLista); 
                }
                nuevaCelda.appendChild(nuevaLista);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila);

                //Añadimos la lista de productos comprados por cantidad: 
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'productos');
                nuevaLista = document.createElement('ul'); 

                for (item2 of item.carrito){
                    //Añadimos la cantidad: 
                    nuevoPuntoLista = document.createElement('li'); 
                    contenido = document.createTextNode(item2.cantidad); 
                    nuevoPuntoLista.appendChild(contenido); 
                    nuevaLista.appendChild(nuevoPuntoLista); 
                }
                nuevaCelda.appendChild(nuevaLista);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila); 

                //Añadimos la lista de productos comprados por precio: 
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'productos');
                nuevaLista = document.createElement('ul'); 

                for (item2 of item.carrito){
                    //Añadimos la cantidad: 
                    nuevoPuntoLista = document.createElement('li'); 
                    contenido = document.createTextNode(item2.precio + "€"); 
                    nuevoPuntoLista.appendChild(contenido); 
                    nuevaLista.appendChild(nuevoPuntoLista); 
                }
                nuevaCelda.appendChild(nuevaLista);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila); 
                

            } else {
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('id', item.idVentas)
                nuevaFila.setAttribute('class', 'nueva_venta');

                //Añadimos la primera celda: IDVentas:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'idVentas');
                contenido = document.createTextNode(item.idVentas);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila);

                //Añadimos la segunda celda: NombreCliente:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'nombreCliente');
                contenido = document.createTextNode(item.nombreCliente);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila);

                //Añadimos la quinta celda BORRADO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'campoBorrado');
                //nuevaCelda.setAttribute('hidden', 'false');
                contenido = document.createTextNode(item.borrado);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila);


                //Añadimos la segunda celda: totalCompra:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'totalCompra');
                contenido = document.createTextNode(item.totalCompra);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila);

                //Añadimos la lista de productos comprados por ref: 
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'productosRef');
                nuevaLista = document.createElement('ul'); 

                for (item2 of item.carrito){
                    //Añadimos la referencia: 
                    nuevoPuntoLista = document.createElement('li'); 
                    contenido = document.createTextNode(item2.ref); 
                    nuevoPuntoLista.appendChild(contenido); 
                    nuevaLista.appendChild(nuevoPuntoLista); 
                }
                nuevaCelda.appendChild(nuevaLista);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila);

                //Añadimos la lista de productos comprados por cantidad: 
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'productos');
                nuevaLista = document.createElement('ul'); 

                for (item2 of item.carrito){
                    //Añadimos la cantidad: 
                    nuevoPuntoLista = document.createElement('li'); 
                    contenido = document.createTextNode(item2.cantidad); 
                    nuevoPuntoLista.appendChild(contenido); 
                    nuevaLista.appendChild(nuevoPuntoLista); 
                }
                nuevaCelda.appendChild(nuevaLista);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila); 

                //Añadimos la lista de productos comprados por precio: 
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'productos');
                nuevaLista = document.createElement('ul'); 

                for (item2 of item.carrito){
                    //Añadimos la cantidad: 
                    nuevoPuntoLista = document.createElement('li'); 
                    contenido = document.createTextNode(item2.precio + "€"); 
                    nuevoPuntoLista.appendChild(contenido); 
                    nuevaLista.appendChild(nuevoPuntoLista); 
                }
                nuevaCelda.appendChild(nuevaLista);
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila); 

                //Añadimos la sexta celda BOTON EDITAR:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('id', 'celda1');
                nuevaCelda.innerHTML = '<button id="Editar">Editar</button>';
                nuevaCelda.addEventListener("click", function(){
                                                        id = this.parentNode.getAttribute("id");
                                                        //console.log("id " + id); 

                                                        document.getElementById("IDVenta").value = id;                                         
                                                        editarCompra(id);
                                                    });
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila);

                //Añadimos la septima celda BOTON BORRAR:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('id', 'celda2');
                nuevaCelda.innerHTML = '<button id="baja">Eliminar registro</button>';
                nuevaCelda.addEventListener("click", function(){
                                                        
                                                        id = this.parentNode.getAttribute("id");

                                                        arrayVentas[id-1].borrado = true; 

                                                        ActualizarVentas();

                                                        //Actualizamos la página:
                                                        location.reload();
                                                        
                                                    });
                nuevaFila.appendChild(nuevaCelda);
                tablaGVentas.appendChild(nuevaFila);

            }
        }
    }
}

function eliminarCOMPRA(){
    BorrarCarrito();
    //Actualizamos la página:
    location.reload();
}

function editarCompra(id){
    BorrarCarrito();

    document.getElementById("dni").value = arrayVentas[id-1].DNICliente;
    arrayEspecial = arrayVentas[id-1].carrito; 

        for (item2 of arrayEspecial){
            			//Para ir añanadiendo filas primero cogemos la referencia de donde las queremos insertar:  
                        tbody = document.getElementsByTagName('tbody')[0];
            
                        //Creamos la fila: 
                        nuevaFila = document.createElement('tr');
                        nuevaFila.setAttribute('class', 'nuevo_Articulo');
            
                        //Añadimos la primera celda DNI:
                        nuevaCeldaREF = document.createElement('td');
                        nuevaCeldaREF.setAttribute('class', 'dniCliente');
                        contenidoREF = document.createTextNode(item.DNICliente);
                        nuevaCeldaREF.appendChild(contenidoREF);
                        nuevaFila.appendChild(nuevaCeldaREF);
                        tbody.appendChild(nuevaFila);
            
                        //Añadimos la primera celda REFERNCIA:
                        nuevaCeldaREF = document.createElement('td');
                        nuevaCeldaREF.setAttribute('class', 'ref');
                        contenidoREF = document.createTextNode(item2.ref);
                        nuevaCeldaREF.appendChild(contenidoREF);
                        nuevaFila.appendChild(nuevaCeldaREF);
                        tbody.appendChild(nuevaFila);
                        
                        //Añadimos la segunda celda PRECIO:
                        nuevaCeldaPRE = document.createElement('td');
                        nuevaCeldaPRE.setAttribute('class', 'precio');
                        contenidoPRE = document.createTextNode(item2.precio);
                        nuevaCeldaPRE.appendChild(contenidoPRE);
                        nuevaFila.appendChild(nuevaCeldaPRE);
                        tbody.appendChild(nuevaFila);
            
                        //Añadimos la tercera celda CANTIDAD:
                        nuevaCeldaCAN = document.createElement('td');
                        nuevaCeldaCAN.setAttribute('class', 'cantidad');
                        contenidoCAN = document.createTextNode(item2.cantidad);
                        nuevaCeldaCAN.appendChild(contenidoCAN);
                        nuevaFila.appendChild(nuevaCeldaCAN);
                        tbody.appendChild(nuevaFila);
            
                        //Añadimos la cuarta celda TOTAL:
                        nuevaCeldaTOT = document.createElement('td');
                        nuevaCeldaTOT.setAttribute('class', 'total');
                        total = (parseFloat(item2.cantidad) * parseFloat(item2.precio)).toFixed(2);
                        contenidoTOT = document.createTextNode(total);
                        nuevaCeldaTOT.appendChild(contenidoTOT);
                        nuevaFila.appendChild(nuevaCeldaTOT);
                        tbody.appendChild(nuevaFila);
            
                        //Añadimos la quinta celda BOTON:
                        nuevaCeldaBOT = document.createElement('td');
                        nuevaCeldaBOT.setAttribute('class', 'celda');
                        nuevaCeldaBOT.innerHTML = '<button class="boton">Borrar</button>';
                        nuevaFila.appendChild(nuevaCeldaBOT);
                        tbody.appendChild(nuevaFila);
            
                        //Al ser un botón que creamos de forma instantánea, lo mejor es poner un evento: 
                        nuevaCeldaBOT.addEventListener("click", borraFila);
    }
    CalculaTotal();
}

function ActualizarVentas(){
    ajax3.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 404){
            alert("Ha ocurrido un error al actualizar los datos"); 
        } else if (this.readyState == 4 && this.status == 200){
            console.log("Registro de ventas actualizado"); 
        }
    }; 

    nuevoArray = JSON.stringify(arrayVentas); 
    ajax3.open("POST", "php/datos_ventas.php?param=" + nuevoArray, true); 
    ajax3.send();

}

function ActualizarProductos(){
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 404) {
            alert("Ha ocurrido un error al actualizar el registro"); 

        } else if(this.readyState == 4 && this.status == 200){ 
            console.log("Registro de productos actualizado"); 
        }
    };

    nuevoArray = JSON.stringify(arrayProductos); 
    ajax.open("POST", "php/datos_productos.php?param=" + nuevoArray, true); 
    ajax.send();
    //console.log(arrayProductos);
}