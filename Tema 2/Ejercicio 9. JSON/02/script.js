function inicio(){
    var botonGuardar = document.getElementById("guardar");
    var botonRecuperar = document.getElementById("recuperar");
    var botonBorrar = document.getElementById("borrar");

    var nombre = document.getElementById("nombre");
    var apellidos = document.getElementById("apellidos");
    var dni = document.getElementById("dni");

    var mostrar = document.getElementById("mostrar");

    botonGuardar.onclick = guardar;
    botonRecuperar.onclick = recuperar;
    botonBorrar.onclick = borrar;
}

function guardar(elEvento){
    var idioma = document.getElementsByName("checkbox");
    var seleccionados="";

    let checked = document.querySelectorAll('input[type=checkbox]:checked');
    
    if (checked.length == 0) {
        //SINO HA SELECCIONADO
        alert("¡ERROR! No ha seleccinado ningún idioma");
    } else {
        for (var x = 0; x < idioma.length; x++){
            if(idioma[x].checked){
                console.log(idioma[x].checked);
                seleccionados = seleccionados + idioma[x].value + " ";
            }
        }
    }

    localStorage.setItem("Nombre", nombre.value);
    localStorage.setItem("Apellidos", apellidos.value);
    localStorage.setItem("DNI", dni.value);
    localStorage.setItem("Idioma", seleccionados);

}

function recuperar(elEvento){
    mostrar.innerHTML = "";
    for( let i = 0; i < localStorage.length; i++){
        mostrar.innerHTML = mostrar.innerHTML + localStorage.key(i) + " - " + localStorage[localStorage.key(i)] + "</br>";
    }
}

function borrar(elEvento){
    localStorage.clear();
    alert("¡LocalStorage borrado!")
    recuperar();
    window.location.href = "formulario.html";
}


window.onload=function(){
    inicio();
}