window.onload = function(){

	//Guardo botones
	var btn_grabar = document.getElementById('grabar');
	var btn_cancelar = document.getElementById('cancelar');
	var btn_almacenar = document.getElementById('almacenar');
	var btn_recuperar = document.getElementById('recuperar');
	var btn_borrar = document.getElementById('borrar');
	
	//Añado EventListener
	btn_grabar.addEventListener("click", sumaFila);
	btn_cancelar.addEventListener("click", limpiarForm);
	
	var fruits = document.querySelectorAll("#izquierda > div");
	for (var i = 0; i < fruits.length; i++) {
		fruits[i].addEventListener('dblclick', muestraFruta);
	}
	
	btn_almacenar.addEventListener('click', almacenaTabla);
	btn_recuperar.addEventListener('click', recuperaTabla);
	btn_borrar.addEventListener('click', borraTabla);

	
}

/*
 Función para mostrar imagen de la fruta seleccionada 
*/

function muestraFruta(){

	//Guardo el atributo id del contenedor seleccionado 
	selectedFruit = this.getAttribute('id');

	//Selecciono contenedor de imagen en parte derecha
	cuadroFruta = document.getElementById('ffac');
	
	//Creo una nueva imagen
	nuevoNodo = document.createElement('img');
	
	//Añado a la imagen el atributo src con su imagen
	nuevoNodo.setAttribute('src', 'imagenes/'+ selectedFruit +'.jpg'); 

	//Compruebo que exista imagen	
	if(cuadroFruta.childNodes[0] == null){
		//Si no existe la creo
		cuadroFruta.appendChild(nuevoNodo);
	}else{
		//Si existe la reemplazo
		cuadroFruta.replaceChild(nuevoNodo, cuadroFruta.childNodes[0]);
	}

	//Selecciono el contenido de la etiqueta span con el precio
	precio = this.querySelector("div").querySelectorAll("span")[1].innerText;
	
	//Muestro precio y referencia en los inputs
	document.getElementById("precio").value = precio;
	document.getElementById("ref").value = selectedFruit;
}

/*
 Función para validar DNI correcto 
*/

function validadorDni(dni) {
	let numero;
	let letr;
	let letra;
	let expresion_regular_dni;

	//Creo el patrón de 8 números y 1 una letra
	expresion = /^\d{8}[a-zA-Z]$/;

	//Commpruebo si se cumple el patrón
	if(expresion.test(dni) == true){
		//Extraigo el número
		numero = dni.substr(0,dni.length-1);
		
		//Extraigo la letra
		letraDni = dni.substr(dni.length-1,1);
		
		//Calculo el resto de la división del número entre 23
		numero = numero % 23;
		letra='TRWAGMYFPDXBNJZSQVHLCKET';
		
		//Compruebo la letra que coincida con la posición que resulte de la operación anterior 
		letra=letra.substring(numero,numero+1);
		
		//Si es diferente sale
		if (letra!=letraDni.toUpperCase()) {
			return false;
	 	}
	}
}

/*
 Función para validar campos correctos 
*/

function validator(){
	//Establezco el fondo de los inputs a comprobar en blanco
	cantidad.style.backgroundColor = "#FFF";
	dni.style.backgroundColor = "#FFF";

	//Creo el patrón para sólo números
	let pNumero = /^\d*$/gi;
	
	let resultado = true;
		
	//Compruebo si el input de cantidad cumple el patrón de sólo números o si está vacío
	if(!pNumero.test(cantidad.value) || cantidad.value.length == 0){
		//Si no cumple o está vacío pinto el fondo rojo
		cantidad.style.backgroundColor = "rgba(255,155,155,0.4)";
		//Pongo el foco en el input
		cantidad.focus();

		resultado = false;
	}
	//Compruebo si el input de dni no está vacío y lo paso por la funcion que comprueba que es correcto
	if(dni.value.length == 0 || validadorDni(dni.value) == false){
		dni.style.backgroundColor = "rgba(255,155,155,0.4)";
		dni.focus();
		resultado = false;		
	}	
	return resultado;
}

/*
 Función para limpiar formulario y foto 
*/
function limpiarForm(){
	//Resetea el formulario
	form = document.getElementById('miform');
	form.reset();
	//Limpia el contenedor de imagen
	cuadroFruta = document.getElementById('ffac');
	cuadroFruta.childNodes[0].remove();
}

/*
 Función para caluclar el total de totales 
*/		 
function calculaTotal(){

	let	totalPedido = 0;

	tabla = document.getElementById("lineas");
	
	//Selecciona todas las filas 
	filas = tabla.getElementsByTagName("tr");
	
	//Saco número de filas existentes
	articulos = filas.length-1;

	//Si hay filas
	if(articulos > 1){		
		for (var i = 1; i < articulos; i++) {			
			//Extraigo el valor del total de cada fila
			subtotal = filas[i].getElementsByTagName("td")[4].innerText;
			//Sumo al subtotal anterior
			totalPedido += parseFloat(subtotal);		 
		}
	}	

	//Imprimo total de totales
	casillas = document.getElementsByClassName("total a_derecha");
	casillas[0].innerHTML = totalPedido + "€";	
}

/*
 Función para añadir fila a la tabla 
*/
function sumaFila(){
	cuadroFruta = document.getElementById('ffac');

	imagen = cuadroFruta.getElementsByTagName('img');

	//Copruebo si existe fruta seleccionada
	if(imagen.length>0){

		//Compruebo que pasa el validador
		resultado = validator();
		
		if(resultado){
	
			form = document.getElementById('miform');
			dni = document.getElementById("dni");
			referencia = document.getElementById("ref");
			precio = document.getElementById("precio");
			cantidad = document.getElementById("cantidad");
			
			tabla = document.getElementById("lineas");
			
			//Creo una nueva fila 
			nuevaFila = tabla.insertRow(1);
			
			//Creo cada celda con su contenido y la añado a la fila
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

			//Añado botón de borrar a la fila y lo pongo a la escucha
			nuevaCelda = nuevaFila.insertCell(5);
			nuevaCelda.innerHTML = '<button class="boton">Borrar</button>';		
			nuevaCelda.addEventListener("click",borraFila);
		
			//limpio el formulario
			limpiarForm();
		}
			//Calculo el total de totales
			calculaTotal();	
	}else{

		//Si no ha seleecionado fruta aviso al ausuario
		alert("No has seleccionado producto");		
	}		
	
}

/*
 Función para alamacenar la tabla en localstorage 
*/
function almacenaTabla(){	
	
	const ajax = new XMLHttpRequest(); 
	
	tabla = document.querySelector('#lineas');

	//Guardo todas las filas
	filas = tabla.querySelectorAll('tr');

	//Creo un array vacío para almacenar las filas
	articulos = [];

	for (var i = 1; i < filas.length-1; i++) {
		//Guardo todas las celdas en un array
		casillas = filas[i].querySelectorAll('td');
		//Creo un objeto por cada fila			
		fila = {dni:casillas[0].innerText,ref:casillas[1].innerText,precio:casillas[2].innerText,cantidad:casillas[3].innerText};
		//Añado cada objeto al array
		articulos.push(fila);
	}		
	//Parseo a cadena el array de objetos
	cadena = JSON.stringify(articulos);

	//Abro archivo php y envío los datos
	ajax.open('POST', 'subirDatos.php?param=' + cadena, true);
	ajax.send(cadena);
}

/*
 Función para borrar tabla de localstorage 
*/
function borraTabla(){
	const ajax = new XMLHttpRequest(); 

	let cadena = '';

	ajax.open('POST', 'subirDatos.php?param=' + cadena, true);

	ajax.send(cadena);
}

/*
 Función para recuperar tabla de localstorage 
*/
function recuperaTabla(){

	//Borrar filas de la tabla
	let tablaBorrar = document.querySelector('#lineas');
	filas = tablaBorrar.querySelectorAll('tr');
	for (var i = 1; i < filas.length-1; i++) {
		filas[i].remove();
	}

	//Iniciar petición AJAX
	const ajax = new XMLHttpRequest(); 
	ajax.open('GET', 'pedidos.json', true);
	ajax.send();

	ajax.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){			
			//Pasar de texto a JSON
			let datos = JSON.parse(this.responseText);
			
			//Insertar filas con los valores
			let tabla = document.querySelector('#lineas');	
						
			for(let item of datos){
				//Añado fila a la tabla
				nuevaFila = tabla.insertRow(1);		
				
				//Añado casillas con los datos de cada objeto 
				nuevaCelda = nuevaFila.insertCell(0); 
				valorCelda = document.createTextNode(item.dni);
				nuevaCelda.appendChild(valorCelda);

				nuevaCelda = nuevaFila.insertCell(1); 
				valorCelda = document.createTextNode(item.ref);
				nuevaCelda.appendChild(valorCelda);

				nuevaCelda = nuevaFila.insertCell(2); 
				valorCelda = document.createTextNode(item.precio);
				nuevaCelda.appendChild(valorCelda);

				nuevaCelda = nuevaFila.insertCell(3); 
				valorCelda = document.createTextNode(item.cantidad);
				nuevaCelda.appendChild(valorCelda);

				nuevaCelda = nuevaFila.insertCell(4);		
				total = (parseFloat(item.cantidad) * parseFloat(item.precio)).toFixed(2); 
				valorCelda = document.createTextNode(total);
				nuevaCelda.appendChild(valorCelda);

				nuevaCelda = nuevaFila.insertCell(5);
				nuevaCelda.innerHTML = '<button class="boton">Borrar</button>';		
				nuevaCelda.addEventListener("click",borraFila);

				//Calculo total
				calculaTotal();					
			}
		}							
	}
}

/*
 Función para borrar filas 
*/
function borraFila(){
	//Selecciono el padre del botón pulsado (tr) con this y lo remuevo
	this.parentNode.remove();
	//Vuelvo a calcular total
	calculaTotal();
}


