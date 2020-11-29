function inicio(){

    //Recogemos los botones importantes para poder usarlos posteriormente:
    var botonGuardar = document.getElementById("guardar");
    var botonRecuperar = document.getElementById("recuperar");
    var botonBorrar = document.getElementById("borrar");

    //Obtenemos la varibale que recoge los checkbox de los idiomas:
    idiomas = document.getElementsByName("checkbox");

    //Le damos funcionamiento a los botones:
    botonGuardar.onclick = guardar;
    botonRecuperar.onclick = recuperar;
    botonBorrar.onclick = borrar;
}

function guardar(elEvento){
    //Recogemos las variables necesarias:
    var nombre = document.getElementById("nombre");
    var apellidos = document.getElementById("apellidos");
    var dni = document.getElementById("dni");
    var email = document.getElementById('email');

    //Creamos un array con los objetos que vamos a usar:
    miObj = { nombre, apellidos, dni, email, idiomas};
        miObj.nombre = nombre.value;
        miObj.apellidos = apellidos.value;
        miObj.dni = dni.value;
        miObj.email = email.value; 
        miObj.idiomas = new Array();

        idiomas.forEach(idioma => {
            if(idioma.checked){
                miObj.idiomas.push(idioma.value);
            }
        });

        //Lo guardamos en el localStorage como JSON con la función stringifi:
        localStorage.setItem('formulario', JSON.stringify(miObj));
    
    //Volvemos a la ventana local:
    window.location.href = "formulario.html";

}

function recuperar(elEvento){
    //Comprobamos previamente que haya algo almacenado en el localstorage:
    if(localStorage.getItem('formulario')){

        //Recogemos en un objeto la información que haya en el localStorage pasandolo a string con parse:
        miObj = JSON.parse(localStorage.getItem('formulario')); 

        //Colocamos cada valor en su caja:
        nombre.value = miObj.nombre;
		apellidos.value = miObj.apellidos;
		dni.value = miObj.dni;
		email.value = miObj.email;

        //Seleccionamos los idiomas que estén guardados: 
		idiomas.forEach(idiomas => {
			miObj.idiomas.forEach(value => {
				if (idiomas.value == value) {
					idiomas.checked = true;
				}
			});
		});
	}
	else {
		alert('No se encuentran datos en el registro');
	}     
}

function borrar(elEvento){
    //Comprobamos previamente que haya algo almacenado en el localstorage:
    if(localStorage.getItem('formulario')){
        localStorage.clear();
        alert("¡LocalStorage borrado!")
        window.location.href = "formulario.html";
    } else {
        alert('No se encuentran datos en el registro');
    }
}

window.onload=function(){
    inicio();
}