window.onload = function(){

    //Conseguir los valores del usuario: 
    //Recuperar Usuario con las cookies: 
    dniCaja = document.getElementById("dni");
    var x = document.cookie;
    var arrayCookies = x.split('=');
    nombreUsuario = arrayCookies[0];

    // alert(arrayCookies[0] + "valor de x")
    // if(arrayCookies[0].value == null){
    //     alert("Ha expirado la sesión");
    //     borrarCarrito();
    // }

    //Cargamos el localStorage para buscar el dni del cliente: 
    arrayTotal = JSON.parse(localStorage.getItem("Clientes"));
    for (let i = 0; i < arrayTotal.length; i++) {
        if(arrayTotal[i].email == nombreUsuario){
            dniCliente = arrayTotal[i].dni;
            dniCaja.value = dniCliente;
        }
    }


    //Cargamos el localStorage: 
    productos = JSON.parse(localStorage.getItem("Productos"));

    //Recogemos div productos: 
    productosDIV = document.getElementById("productos");

    //Recuperamos los productos y los ponemos bonitos:        
    for (var i = 0; i < productos.length; i++) {
        //Cogemos la información relevante; 
        contenidoReferencia = document.createTextNode(productos[i].referencia);
        contenidoDescripcion = document.createTextNode(productos[i].descripcion);
        contenidoFamilia = document.createTextNode(productos[i].familia);
        contenidoPrecio = document.createTextNode(productos[i].precio);   

        productosBorrados = productos[i].borrado;

        if(productosBorrados == "true"){
            nuevoDIV = document.createElement('div');
            nuevoDIV.setAttribute('id', productos[i].id)
            nuevoDIV.setAttribute('class', 'fpeque');
            nuevoDIV.setAttribute('hidden', 'false');

                hijoDIV = document.createElement('div');

                    parrafoHijo1 = document.createElement('p');
                        codigoRef = document.createTextNode("Ref.");
                        parrafoHijo1.appendChild(codigoRef);

                        spanHijo1 = document.createElement("span");
                        spanHijo1.appendChild(contenidoReferencia);
                        parrafoHijo1.appendChild(spanHijo1);
                        hijoDIV.appendChild(parrafoHijo1);
                        //productosDIV.appendChild(nuevoDIV);

                    parrafoHijo2 = document.createElement('p');
                        codigoDesc = document.createTextNode("Desc.");
                        parrafoHijo2.appendChild(codigoDesc);

                        spanHijo2 = document.createElement("span");
                        spanHijo2.appendChild(contenidoDescripcion);
                        parrafoHijo2.appendChild(spanHijo2);
                        hijoDIV.appendChild(parrafoHijo2);
                        //productosDIV.appendChild(nuevoDIV);
                        
                    parrafoHijo3 = document.createElement('p');
                        codigoFam = document.createTextNode("Familia:");
                        parrafoHijo3.appendChild(codigoFam);

                        spanHijo3 = document.createElement("span");
                        spanHijo3.appendChild(contenidoFamilia);
                        parrafoHijo3.appendChild(spanHijo3);
                        hijoDIV.appendChild(parrafoHijo3);
                        //productosDIV.appendChild(nuevoDIV);
                        
                    parrafoHijo4 = document.createElement('p');
                        codigoPrecio = document.createTextNode("Precio:");
                        parrafoHijo4.appendChild(codigoPrecio);

                        spanHijo4 = document.createElement("span");
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
            nuevoDIV.setAttribute('id', productos[i].id)
            nuevoDIV.setAttribute('class', 'fpeque');

                hijoDIV = document.createElement('div');

                    parrafoHijo1 = document.createElement('p');
                        codigoRef = document.createTextNode("Ref.");
                        parrafoHijo1.appendChild(codigoRef);

                        spanHijo1 = document.createElement("span");
                        spanHijo1.appendChild(contenidoReferencia);
                        parrafoHijo1.appendChild(spanHijo1);
                        hijoDIV.appendChild(parrafoHijo1);
                        //productosDIV.appendChild(nuevoDIV);

                    parrafoHijo2 = document.createElement('p');
                        codigoDesc = document.createTextNode("Desc.");
                        parrafoHijo2.appendChild(codigoDesc);

                        spanHijo2 = document.createElement("span");
                        spanHijo2.appendChild(contenidoDescripcion);
                        parrafoHijo2.appendChild(spanHijo2);
                        hijoDIV.appendChild(parrafoHijo2);
                        //productosDIV.appendChild(nuevoDIV);
                        
                    parrafoHijo3 = document.createElement('p');
                        codigoFam = document.createTextNode("Familia:");
                        parrafoHijo3.appendChild(codigoFam);

                        spanHijo3 = document.createElement("span");
                        spanHijo3.appendChild(contenidoFamilia);
                        parrafoHijo3.appendChild(spanHijo3);
                        hijoDIV.appendChild(parrafoHijo3);
                        //productosDIV.appendChild(nuevoDIV);
                        
                    parrafoHijo4 = document.createElement('p');
                        codigoPrecio = document.createTextNode("Precio:");
                        parrafoHijo4.appendChild(codigoPrecio);

                        spanHijo4 = document.createElement("span");
                        spanHijo4.appendChild(contenidoPrecio);
                        parrafoHijo4.appendChild(spanHijo4);

                        simboloEuro = document.createTextNode("€");
                        parrafoHijo4.appendChild(simboloEuro);
                        hijoDIV.appendChild(parrafoHijo4);
                        //productosDIV.appendChild(nuevoDIV);
            
            nuevoDIV.appendChild(hijoDIV);
            productosDIV.appendChild(nuevoDIV);
        }
    }    

    //*******************************************************************************/
    //Recuperamos las compras realizadas: 
    //Obtenemos primero la cantidad de elementos guardados en el storage:
    arrayItems = JSON.parse(localStorage.getItem("Compras"));

    //Obtenemos la tabla:
    tabla = document.getElementsByTagName("tbody")[0];
    
    //Obtenemos cada fila de la tabla que nos interesa: 
    filas = tabla.getElementsByClassName("nuevo_Articulo");
    
    //Nos quedamos solo con los artículos y no con la "fila enunciado":
    articulos = filas.length;

    if(arrayItems != null){
        if(articulos == 0){
            //Recogemos en un objeto la información que haya en el localStorage pasandolo a string con parse:
            for (var i = 0; i < arrayItems.length; i++) {	

                //Para ir añanadiendo filas primero cogemos la referencia de donde las queremos insertar:  
                tbody = document.getElementsByTagName('tbody')[1];
        
                //Creamos la fila: 
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('class', 'nuevo_Articulo');
                contenidoREF = document.createTextNode(arrayItems[i].dni);
                nuevaFila.appendChild(contenidoREF);


                //Añadimos la cuarta celda TOTAL:
                nuevaCeldaTOT = document.createElement('td');
                nuevaCeldaTOT.setAttribute('class', 'total');
                total = (parseFloat(cantidad.value) * parseFloat(precio.value)).toFixed(2);
                contenidoTOT = document.createTextNode(arrayItems[i].total);
                nuevaCeldaTOT.appendChild(contenidoTOT);
                nuevaFila.appendChild(nuevaCeldaTOT);
                tbody.appendChild(nuevaFila);
            } 
            calculaTotal();
        }else {
            alert('Almacenamiento recuperado');
        }

    } else {
        alert('No hay informacion en el Storage')
    }
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

    //Obtenemos el valor de los cuadrados con la fruta para cuando hagamos doble click:
    botones = document.getElementsByClassName('fpeque');

    //Dobleclick:
    for (let x = 0; x < botones.length; x++){
        botones[x].ondblclick = ponerProducto;
    }

    //Click: 
    botonGrabar.onclick = anyadirFila;
    botonCancelar.onclick = limpiarForm;
    botonAlmacenar.onclick = realizarCOMPRA;
    botonEliminar.onclick = eliminarCOMPRA;
    botonRecuperar.onclick = recuperarCOMPRA;
    botonBorrarCarrito.onclick = borrarCarrito;

}

function ponerProducto(){

    //Seleccionamos el nombre de los productos a través del id: 
    productoSeleccionado = this.getAttribute('id');

    //Obtenemos la ref y precio:
    precio = this.querySelector('div').querySelectorAll('span')[3].innerText;

    //Insertamos el precio y la referencia: 
    document.getElementById('ref').value = productoSeleccionado;
    document.getElementById('precio').value = precio; 

}

function validarCampos(){
    cantidad.style.backgroundColor = "#FFF";
	
	let resultado = true;
    
    //Comprobamos primero que la cantidad sea un número y que sea distinta de 0:
	if( isNaN (cantidad.value) || cantidad.value == 0){
		cantidad.style.backgroundColor = "rgba(255,155,155,0.4)";
		cantidad.focus();
		resultado = false;
    }
    
	return resultado;
}

function limpiarForm(){
    //Obtenemos el formulario y lo ponemos en blanco: 
	referencia = document.getElementById("ref");
    precio = document.getElementById("precio");
    cantidad = document.getElementById("cantidad");

    referencia.value = "";
    precio.value = "";
    cantidad.value = "";
}

function calculaTotal(){

    //Declaramos una variable en 0:
	let	totalPedido = 0;

    //Obtenemos la tabla:
    tabla = document.getElementsByTagName("tbody")[0];
    
    //Obtenemos cada fila de la tabla que nos interesa: 
    filas = tabla.getElementsByClassName("nuevo_Articulo");
    
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

    // var x = document.cookie;
    // var arrayCookies = x.split('=');

    //     if(arrayCookies[1] == null){
    //         alert("Queda poco!");
    //     }

    //     if(arrayCookies[2] == null){
    //         alert("Se borra la venta");
    //         borrarCarrito();
    //     }

    // //Creamos cookie de tiempo: 
    // document.cookie = "tiempoVenta1=aviso1; max-age=90";
    // document.cookie = "tiempoVenta2=aviso2; max-age=120";

    
    //Obtenemos la imagen que se crea al hacer dobloclick, ya que si esta no está no se ha seleccionado ningun producto: 
    refHueco = document.getElementById('ref');

    //Cogemos primero las variables importantes para el proceso: 
    form = document.getElementById('miform');
    dni = document.getElementById("dni");
    referencia = document.getElementById("ref");
    precio = document.getElementById("precio");
    cantidad = document.getElementById("cantidad");

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

            limpiarForm();
        }
    } else {
        alert("No has seleccionado producto");	
    }	
    calculaTotal();	
}

function borraFila(){
    this.parentNode.remove();
	calculaTotal();
}

function realizarCOMPRA(){

    //Recogemos en una variable los datos importantes:
    total = document.getElementsByClassName('total');

    Compras = [];
    
    miObj = {ref, precio, cantidad, total};

    //Obtenemos la tabla:
    tabla = document.getElementsByTagName("tbody")[0];
    
    //Obtenemos cada fila de la tabla que nos interesa: 
    filas = tabla.getElementsByClassName("nuevo_Articulo");
    
    //Nos quedamos solo con los artículos y no con la "fila enunciado":
    articulos = filas.length;

    //Calculamos:
    //Como no cogemos todas las filas, sino solo las de los artículos creados podemos comenzar en 0.
    //Obtenemos el valor de la celda que tiene como clase total.  
    //parseFloat ->  convertir una cadena en un número.
    if (articulos > 0) {

        if(articulos > 0){		
            for (var i = 0; i < articulos; i++) {
                miObj.dni = filas[i].getElementsByClassName('dniCliente')[0].innerText;
                miObj.ref = filas[i].getElementsByClassName('ref')[0].innerText;
                miObj.precio = filas[i].getElementsByClassName('precio')[0].innerText;
                miObj.cantidad = filas[i].getElementsByClassName('cantidad')[0].innerText;
                miObj.total = filas[i].getElementsByClassName('total')[0].innerText;
                
                Compras.push(miObj);
            }

            localStorage.setItem("Compras", JSON.stringify(Compras));

            alert('Datos almacenados correctamente');
            window.location.href = "ventas.html";
        }	
    } else {
        alert('No hay productos que almacenar');
    }
}

function eliminarCOMPRA(){
    //Comprobamos previamente que haya algo almacenado en el localstorage parte PEDIDOS:
    //Para ello recogemos en una variable el numero de elementos guardados en el storage:
        //Cargamos el localStorage: 
    arrayItems = JSON.parse(localStorage.getItem("Compras"));

    if(arrayItems != null){
        localStorage.removeItem('Compras');

        alert("¡Compra eliminada!")
        window.location.href = "ventas.html";
    } else {
        alert('No se encuentran datos en el registro');
    }
}

function recuperarCOMPRA(){
    //Obtenemos primero la cantidad de elementos guardados en el storage:
    arrayItems = JSON.parse(localStorage.getItem("Compras"));

    //Obtenemos la tabla:
    tabla = document.getElementsByTagName("tbody")[0];
    
    //Obtenemos cada fila de la tabla que nos interesa: 
    filas = tabla.getElementsByClassName("nuevo_Articulo");
    
    //Nos quedamos solo con los artículos y no con la "fila enunciado":
    articulos = filas.length;

    if(arrayItems != null){
        if(articulos == 0){
            //Recogemos en un objeto la información que haya en el localStorage pasandolo a string con parse:
            miObj = JSON.parse(localStorage.getItem('Compras'));
            for (var i = 0; i < arrayItems.length; i++) {	

                //Para ir añanadiendo filas primero cogemos la referencia de donde las queremos insertar:  
                tbody = document.getElementsByTagName('tbody')[0];
        
                //Creamos la fila: 
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('class', 'nuevo_Articulo');
                
                //Añadimos la segunda celda REFERNCIA:
                nuevaCeldaREF = document.createElement('td');
                nuevaCeldaREF.setAttribute('class', 'dniCliente');
                contenidoREF = document.createTextNode(miObj[i].dni);
                nuevaCeldaREF.appendChild(contenidoREF);
                nuevaFila.appendChild(nuevaCeldaREF);
                tbody.appendChild(nuevaFila);

                //Añadimos la segunda celda REFERNCIA:
                nuevaCeldaREF = document.createElement('td');
                nuevaCeldaREF.setAttribute('class', 'ref');
                contenidoREF = document.createTextNode(miObj[i].ref);
                nuevaCeldaREF.appendChild(contenidoREF);
                nuevaFila.appendChild(nuevaCeldaREF);
                tbody.appendChild(nuevaFila);

                
                //Añadimos la tercera celda PRECIO:
                nuevaCeldaPRE = document.createElement('td');
                nuevaCeldaPRE.setAttribute('class', 'precio');
                contenidoPRE = document.createTextNode(miObj[i].precio);
                nuevaCeldaPRE.appendChild(contenidoPRE);
                nuevaFila.appendChild(nuevaCeldaPRE);
                tbody.appendChild(nuevaFila);

    
                //Añadimos la cuarta celda CANTIDAD:
                nuevaCeldaCAN = document.createElement('td');
                nuevaCeldaCAN.setAttribute('class', 'cantidad');
                contenidoCAN = document.createTextNode(miObj[i].cantidad);
                nuevaCeldaCAN.appendChild(contenidoCAN);
                nuevaFila.appendChild(nuevaCeldaCAN);
                tbody.appendChild(nuevaFila);

    
                //Añadimos la quinta celda TOTAL:
                nuevaCeldaTOT = document.createElement('td');
                nuevaCeldaTOT.setAttribute('class', 'total');
                contenidoTOT = document.createTextNode(miObj[i].total);
                nuevaCeldaTOT.appendChild(contenidoTOT);
                nuevaFila.appendChild(nuevaCeldaTOT);
                tbody.appendChild(nuevaFila);

    
                //Añadimos la cuarta celda BOTON:
                nuevaCeldaBOT = document.createElement('td');
                nuevaCeldaBOT.setAttribute('class', 'celda');
                nuevaCeldaBOT.innerHTML = '<button class="boton">Borrar</button>';
                nuevaFila.appendChild(nuevaCeldaBOT);
                tbody.appendChild(nuevaFila);

    
                //Al ser un botón que creamos de forma instantánea, lo mejor es poner un evento: 
                nuevaCeldaBOT.addEventListener("click",borraFila);
            } 
            calculaTotal();
        }else {
            alert('Almacenamiento recuperado');
        }

    } else {
        alert('No hay informacion en el Storage')
    }
}

function borrarCarrito(){

    tabla = document.getElementsByTagName("tbody")[0];
    
    //Obtenemos cada fila de la tabla que nos interesa: 
    filas = tabla.getElementsByClassName("nuevo_Articulo");
    for (let i = 0; i < filas.length; i++) {
        filas[i].remove();
    }
    limpiarForm();
}

function recuperarCOMPRAS(){

}