window.onload = function(){
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
                        spanHijo1 = document.createElement('span');
                        parrafoHijo1.appendChild(contenidoReferencia);
                        hijoDIV.appendChild(parrafoHijo1);
                        //productosDIV.appendChild(nuevoDIV);

                    parrafoHijo2 = document.createElement('p');
                        codigoDesc = document.createTextNode("Desc.");
                        parrafoHijo2.appendChild(codigoDesc);
                        spanHijo2 = document.createElement('span');
                        parrafoHijo2.appendChild(contenidoDescripcion);
                        hijoDIV.appendChild(parrafoHijo2);
                        //productosDIV.appendChild(nuevoDIV);
                        
                    parrafoHijo3 = document.createElement('p');
                        codigoFam = document.createTextNode("Familia:");
                        parrafoHijo3.appendChild(codigoFam);
                        spanHijo3 = document.createElement('span');
                        parrafoHijo3.appendChild(contenidoFamilia);
                        hijoDIV.appendChild(parrafoHijo3);
                        //productosDIV.appendChild(nuevoDIV);
                        
                    parrafoHijo4 = document.createElement('p');
                        codigoPrecio = document.createTextNode("Precio:");
                        parrafoHijo4.appendChild(codigoPrecio);
                        spanHijo4 = document.createElement('span');
                        parrafoHijo4.appendChild(contenidoPrecio);
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
            //nuevoDIV.setAttribute('hidden', 'false');

                hijoDIV = document.createElement('div');

                    parrafoHijo1 = document.createElement('p');
                        codigoRef = document.createTextNode("Ref.");
                        parrafoHijo1.appendChild(codigoRef);
                        spanHijo1 = document.createElement('span');
                        parrafoHijo1.appendChild(contenidoReferencia);
                        hijoDIV.appendChild(parrafoHijo1);

                    parrafoHijo2 = document.createElement('p');
                        codigoDesc = document.createTextNode("Desc.");
                        parrafoHijo2.appendChild(codigoDesc);
                        spanHijo2 = document.createElement('span');
                        parrafoHijo2.appendChild(contenidoDescripcion);
                        hijoDIV.appendChild(parrafoHijo2);                 
                        
                    parrafoHijo3 = document.createElement('p');
                        codigoFam = document.createTextNode("Familia:");
                        parrafoHijo3.appendChild(codigoFam);
                        spanHijo3 = document.createElement('span');
                        parrafoHijo3.appendChild(contenidoFamilia);
                        hijoDIV.appendChild(parrafoHijo3);
                        
                    parrafoHijo4 = document.createElement('p');
                        codigoPrecio = document.createTextNode("Precio:");
                        parrafoHijo4.appendChild(codigoPrecio);
                        spanHijo4 = document.createElement('span');
                        parrafoHijo4.appendChild(contenidoPrecio);
                        simboloEuro = document.createTextNode("€");
                        parrafoHijo4.appendChild(simboloEuro);
                        hijoDIV.appendChild(parrafoHijo4);
            
            nuevoDIV.appendChild(hijoDIV);
            productosDIV.appendChild(nuevoDIV);
        }
    }    

    
}