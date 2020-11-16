function inicio(){
    var botonAnyadir = document.getElementById("anyadir");
    var botonConsultar = document.getElementById("consultar");
    var botonModificar = document.getElementById("modificar");
    var botonBorrar = document.getElementById("borrar");

    var lista = document.getElementById("lista");

    botonAnyadir.onclick = anyadirCookies;
    botonConsultar.onclick = mostrarCookies;
    botonModificar.onclick = modificarCookies;
    botonBorrar.onclick = eliminarCookies;

}

function anyadirCookies(elEvento){
    var numeroCookies = prompt("¿Cuántas cookies desea crear?");

    for(let i = 0; i < numeroCookies; i++) {
        var nombreCookie = prompt("Nombre de la cookie:");
        var valorCookie = prompt("Valor de la cookie:");
        var fechaValor = prompt("¿Cuánto tiempo quieres que dure tu cookie?")
        document.cookie= nombreCookie + "=" + valorCookie + "; + max-age=" + fechaValor;
    }
}

function mostrarCookies(elEvento){
    var x = document.cookie;
    var arrayCookies = x.split(';');
    var lista = document.getElementById("lista");
    lista.innerHTML="";

        for(let i = 0; i < arrayCookies.length; i++){
            var punto = document.createElement('li');
            punto.setAttribute("id", "puntoLista");
            punto.innerHTML = arrayCookies[i];
            lista.appendChild(punto);
        }

}     

function modificarCookies(elEvento){
    var nombreCookie = prompt("Nombre de la cookie:");
    var valorCookie = prompt("Valor de la cookie:");
    var fechaValor = prompt("¿Cuánto tiempo quieres que dure tu cookie?")
    document.cookie= nombreCookie + "=" + valorCookie + "; + max-age=" + fechaValor;
}

function eliminarCookies(elEvento){
    var nombreCookie = prompt("¿Qué cookie desea eliminar?");
    document.cookie = nombreCookie +"=" + null + ";expires = 1 Jan 1970 23:59:59 GMT";
}

window.onload=function(){
    inicio();
}