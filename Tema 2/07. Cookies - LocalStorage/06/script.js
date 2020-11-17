function inicio(){
    var botonGuardar = document.getElementById("guardar");
    var botonRecuperar = document.getElementById("recuperar");
    var botonBorrar = document.getElementById("borrar");

    var nombre = document.getElementById("nombre");
    var apellidos = document.getElementById("apellidos");
    var dni = document.getElementById("dni");
    var idioma = document.getElementById("idioma").selectedIndex;
    var idiomaSelect = document.getElementById("idioma").options;

    var mostrar = document.getElementById("mostrar");

    botonGuardar.onclick = guardar;
    botonRecuperar.onclick = recuperar;
    botonBorrar.onclick = borrar;
}

function guardar(elEvento){
    var idioma = document.getElementById("idioma").selectedIndex;
    var idiomaSelect = document.getElementById("idioma").options;

    localStorage.setItem("Nombre", nombre.value);
    localStorage.setItem("Apellidos", apellidos.value);
    localStorage.setItem("DNI", dni.value);
    localStorage.setItem("Idioma", idiomaSelect[idioma].text);

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
}


window.onload=function(){
    inicio();
}