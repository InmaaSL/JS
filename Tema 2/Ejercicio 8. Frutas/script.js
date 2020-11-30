window.onload=function(){
    //Obtenemos los botones grabar y cancelar: 
    botonGrabar = document.getElementById('grabar');
    botonCancelar = document.getElementById('cancelar');

    //Obtenemos el valor de los cuadrados con la fruta para cuando hagamos doble click:
    botones = document.getElementsByClassName('fpeque');

    //Dobleclick:
    for (let x = 0; x < botones.length; x++){
        botones[x].ondblclick = ponerImagen;
    }

    //Click: 
    botonGrabar.onclick = anyadirFila;
    botonCancelar.onclick = limpiarForm;
}

function ponerImagen(elEvento){
    //Tener en cuenta que this hace referencia al objeto en el que estamos haciendo dobleclick!
    //InnerText-> obtenemos el texto que hay dentro de un elemento.
    //getAttribute -> obtenemos el valor del atributo que se selecciona.
    //setAttribute -> otorgamos nosotros el valor del atributo, en este caso es una imagen a la que le ponemos el SRC.
    //hasChildNodes -> si tiene hijos el nodo, devuelve true o false. 

    //Seleccionamos el nombre de la fruta a través del id: 
    frutaSeleccionada = this.getAttribute('id');

    //Obtenemos el cuadrado donde va a ir la imagne: 
    huecoFruta = document.getElementById('ffac');

    //Creamos el nuevo nodo para insertarla imagen: 
    nuevaImagen = document.createElement('img');
    nuevaImagen.setAttribute('id', 'imagenHueco');
    nuevaImagen.setAttribute('src', 'imagenes/' + frutaSeleccionada + '.jpg');

    //Comprobamos si ya hay una imagen, para que la reemplace si existe y ponga la nueva: 
    if (huecoFruta.hasChildNodes()) {
        //Reemplazamos la iamgen que haya:
        huecoFruta.replaceChild(nuevaImagen, huecoFruta.firstChild);
    } else {
        huecoFruta.appendChild(nuevaImagen);
    }

    //Obtenemos la ref y precio:
    precio = this.querySelector('div').querySelectorAll('span')[1].innerText;

    //Insertamos el precio y la referencia: 
    document.getElementById('ref').value = frutaSeleccionada;
    document.getElementById('precio').value = precio; 
}

function nif(dni) {
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

        letra='TRWAGMYFPDXBNJZSQVHLCKET';
        letra=letra.substring(numero,numero+1);

        if (letra!=letr.toUpperCase()) {
            return false; 
        }
    } else {
        return false; 
    }
}

function validarCampos(elEvento){

    cantidad.style.backgroundColor = "#FFF";
	dni.style.backgroundColor = "#FFF";
	
	let resultado = true;
    
    //Comprobamos primero que la cantidad sea un número y que sea distinta de 0:
	if( isNaN (cantidad.value) || cantidad.value == 0){
		cantidad.style.backgroundColor = "rgba(255,155,155,0.4)";
		cantidad.focus();
		resultado = false;
    }

    //Comprobamos el DNI usando nuestra función: 
	if(dni.value == 0 || nif(dni.value) == false){
		dni.style.backgroundColor = "rgba(255,155,155,0.4)";
		dni.focus();
		resultado = false;		
    }	
    
	return resultado;
}

function limpiarForm(elEvento){
    //Obtenemos el formulario y lo ponemos en blanco: 
	form = document.getElementById('miform');
	form.reset();
    
    //Dejamos libre el hueco de la fruta:
	huecoFruta = document.getElementById('ffac');
	huecoFruta.firstChild.remove();
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
    //Obtenemos la imagen que se crea al hacer dobloclick, ya que si esta no está no se ha seleccionado ningun producto: 
    imagenHueco = document.getElementById('imagenHueco');

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
    if (imagenHueco) {
        //Si las validaciones dan true, es decir, todo está correcto, procedemos a introducir los valores: 
        if(resultado){
			
			//Para ir añanadiendo filas primero cogemos la referencia de donde las queremos insertar:  
            tbody = document.getElementsByTagName('tbody')[0];
            
            //Creamos la fila: 
            nuevaFila = document.createElement('tr');
            nuevaFila.setAttribute('class', 'nuevo_Articulo');

            //Añadimos la primera celda DNI:
            nuevaCeldaDNI = document.createElement('td');
            nuevaCeldaDNI.setAttribute('class', 'dni');
            contenidoDNI = document.createTextNode(dni.value);
            nuevaCeldaDNI.appendChild(contenidoDNI);
            nuevaFila.appendChild(nuevaCeldaDNI);
            tbody.appendChild(nuevaFila);
            //tabla.appendChild(nuevaFila);

            //Añadimos la segunda celda REFERNCIA:
            nuevaCeldaREF = document.createElement('td');
            nuevaCeldaREF.setAttribute('class', 'ref');
            contenidoREF = document.createTextNode(referencia.value);
            nuevaCeldaREF.appendChild(contenidoREF);
            nuevaFila.appendChild(nuevaCeldaREF);
            tbody.appendChild(nuevaFila);
            //tabla.appendChild(nuevaFila);
            
            //Añadimos la tercera celda PRECIO:
            nuevaCeldaPRE = document.createElement('td');
            nuevaCeldaPRE.setAttribute('class', 'precio');
            contenidoPRE = document.createTextNode(precio.value);
            nuevaCeldaPRE.appendChild(contenidoPRE);
            nuevaFila.appendChild(nuevaCeldaPRE);
            tbody.appendChild(nuevaFila);
            //tabla.appendChild(nuevaFila);

            //Añadimos la cuarta celda CANTIDAD:
            nuevaCeldaCAN = document.createElement('td');
            nuevaCeldaCAN.setAttribute('class', 'cantidad');
            contenidoCAN = document.createTextNode(cantidad.value);
            nuevaCeldaCAN.appendChild(contenidoCAN);
            nuevaFila.appendChild(nuevaCeldaCAN);
            tbody.appendChild(nuevaFila);
            //tabla.appendChild(nuevaFila);

            //Añadimos la quinta celda TOTAL:
            nuevaCeldaTOT = document.createElement('td');
            nuevaCeldaTOT.setAttribute('class', 'total');
            total = (parseFloat(cantidad.value) * parseFloat(precio.value)).toFixed(2);
            contenidoTOT = document.createTextNode(total);
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