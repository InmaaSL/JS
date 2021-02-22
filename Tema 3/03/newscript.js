function recuperarAlmacenamiento(){

    //Iniciar petición AJAX
	const ajax = new XMLHttpRequest(); 
	ajax.open('GET', 'pedidos.json', true);
	ajax.send();

    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //Pasar de texto a JSON
			let datos = JSON.parse(this.responseText);

                    //Iniciar petición AJAX
                    const ajax = new XMLHttpRequest(); 
                    ajax.open('GET', 'pedidos.json', true);
                    ajax.send();

                    ajax.onreadystatechange = function(){
                        //Para ir añanadiendo filas primero cogemos la referencia de donde las queremos insertar:  
                        tbody = document.getElementsByTagName('tbody')[0];

                        for( item of datos){
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
                        }
                    }

                
        }

    }
}
