window.onload = function(){

    //Conseguir los valores del usuario: 


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

    //Obtenemos el valor de los cuadrados con la fruta para cuando hagamos doble click:
    botones = document.getElementsByClassName('fpeque');

    //Dobleclick:
    for (let x = 0; x < botones.length; x++){
        botones[x].ondblclick = ponerProducto;
    }

    //Click: 
    // botonGrabar.onclick = anyadirFila;
    // botonCancelar.onclick = limpiarForm;
    // botonAlmacenar.onclick = almacenarTabla;
    // botonEliminar.onclick = borrarAlmacenamiento;
    // botonRecuperar.onclick = recuperarAlmacenamiento;

}

function ponerProducto(){
    //Recuperar Usuario con las cookies: 
    dniCaja = document.getElementById("dni");
    var x = document.cookie;
    var arrayCookies = x.split('=');
    nombreUsuario = arrayCookies[0];

    //Cargamos el localStorage para buscar el dni del cliente: 
    arrayTotal = JSON.parse(localStorage.getItem("Clientes"));
    for (let i = 0; i < arrayTotal.length; i++) {
        if(arrayTotal[i].email == nombreUsuario){
            dniCliente = arrayTotal[i].dni;
        }
    }

    dniCaja.value = dniCliente;

    //Seleccionamos el nombre de los productos a través del id: 
    productoSeleccionado = this.getAttribute('id');

    //Obtenemos la ref y precio:
    precio = this.querySelector('div').querySelectorAll('span')[3].innerText;

    //Insertamos el precio y la referencia: 
    document.getElementById('ref').value = productoSeleccionado;
    document.getElementById('precio').value = precio; 

}

