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

    sessionStorage.setItem("Nombre", nombre.value);
    sessionStorage.setItem("Apellidos", apellidos.value);
    sessionStorage.setItem("DNI", dni.value);
    sessionStorage.setItem("Idioma", idiomaSelect[idioma].text);

}

function recuperar(elEvento){
    mostrar.innerHTML = "";
    for( let i = 0; i < sessionStorage.length; i++){
        mostrar.innerHTML = mostrar.innerHTML + sessionStorage.key(i) + " - " + sessionStorage[sessionStorage.key(i)] + "</br>";
    }
}

function borrar(elEvento){
    sessionStorage.clear();
    alert("SessionStorage borrado!")
    recuperar();
}


window.onload=function(){
    inicio();
}