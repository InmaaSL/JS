window.onload=function(){
    //Obtenemos los botones grabar y cancelar: 
    var botonGrabar = document.getElementById('grabar');
    var botonCancelar = document.getElementById('cancelar');

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

    //Seleccionamos el nombre de la fruta a través del id: 
    frutaSeleccionada = this.getAttribute('id');

    //Obtenemos el cuadrado donde va a ir la imagne: 
    huecoFruta = document.getElementById('ffac');

    //Creamos el nuevo nodo para insertarla imagen: 
    nuevaImagen = document.createElement('img');
    nuevaImagen.setAttribute('src', 'imagenes/' + frutaSeleccionada + '.jpg');

    //Comprobamos si ya hay una imagen, para que la reemplace si existe y ponga la nueva: 
    if (huecoFruta.hasChildNodes()) {
        //Reemplazamos la iamgen que haya:
        huecoFruta.replaceChild(nuevaImagen, huecoFruta.childNodes[0]);
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
    }
}

function validarCampos(elEvento){

    cantidad.style.backgroundColor = "#FFF";
	dni.style.backgroundColor = "#FFF";
	//let pNumero = /^\d*$/gi;
	
	let resultado = true;
    
    //Comprobamos primero que la cantidad sea un número y que sea mayor que 0:
	if( isNaN (cantidad.value) || cantidad.value.length == 0){
		cantidad.style.backgroundColor = "rgba(255,155,155,0.4)";
		cantidad.focus();
		resultado = false;
    }

    //Comprobamos el DNI usando nuestra función: 
	if(dni.value.length == 0 || nif(dni.value) == false){
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
	huecoFruta.childNodes[0].remove();
}

function calculaTotal(){
    //Declaramos una variable en 0:
	let	totalPedido = 0;

    //Obtenemos la tabla:
	tabla = document.getElementById("lineas");
    
    //Obtenemos cada fila de la tabla: 
	filas = tabla.getElementsByTagName("tr");
    
    //Nos quedamos solo con los artículos y no con la "fila enunciado":
	articulos = filas.length-1;

    //Calculamos:
	if(articulos > 1){		
		for (var i = 1; i < articulos; i++) {			
			subtotal = filas[i].getElementsByTagName("td")[4].innerText;
			totalPedido += parseFloat(subtotal);		 
		}
	}	

    //Insertamos en la casilla correspondiente: 
	casillaTotal = document.getElementsByClassName("total a_derecha");
	casillaTotal[0].innerHTML = totalPedido + "€";

}

function anyadirFila(){

    //Obtenemos el cuadrado donde va a ir la imagne: 
    huecoFruta = document.getElementById('ffac');

    //Obtenemos el resultado de validar: 
	resultado = validarCampos();

    if (huecoFruta.hasChildNodes()) {
        if(resultado){
			form = document.getElementById('miform');
			dni = document.getElementById("dni");
			referencia = document.getElementById("ref");
			precio = document.getElementById("precio");
			cantidad = document.getElementById("cantidad");
			
			//Crear nueva fila 
			tabla = document.getElementById("lineas");
			
			nuevaFila = tabla.insertRow(1);
			
			nuevaCelda = nuevaFila.insertCell(0); 
			valorCelda = document.createTextNode(dni.value);
			nuevaCelda.appendChild(valorCelda);

			nuevaCelda = nuevaFila.insertCell(1); 
			valorCelda = document.createTextNode(referencia.value);
			nuevaCelda.appendChild(valorCelda);

			nuevaCelda = nuevaFila.insertCell(2); 
			valorCelda = document.createTextNode(precio.value);
			nuevaCelda.appendChild(valorCelda);

			nuevaCelda = nuevaFila.insertCell(3); 
			valorCelda = document.createTextNode(cantidad.value);
			nuevaCelda.appendChild(valorCelda);

			nuevaCelda = nuevaFila.insertCell(4);		
			total = (parseFloat(cantidad.value) * parseFloat(precio.value)).toFixed(2); 
			valorCelda = document.createTextNode(total);
			nuevaCelda.appendChild(valorCelda);

			nuevaCelda = nuevaFila.insertCell(5);
			nuevaCelda.innerHTML = '<button class="boton">Borrar</button>';		
            nuevaCelda.addEventListener("click",borraFila);
            

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