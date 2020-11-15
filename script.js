function inicio(){
    var botonAnyadir = document.getElementById("anyadir");
    var botonConsultar = document.getElementById("consultar")
    var botonModificar = document.getElementById("modificar");
    var botonBorrar = document.getElementById("borrar");

    var lista = document.getElementById("lista");

    botonAnyadir.onclick = anyadirCookies;
    botonConsultar.onclick = mostrarCookies;
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
    var lasCookies = document.cookie;

    // var arrayCookies = cookies.split(";");

    // if (arrayCookies != null){ 
    //     var lista = document.getElementsByName("li");
    //     lista.parentNode.removeChild(lista);
    // } else {
        // for(let i = 0; i < arrayCookies.length; i++ ){
        //         alert(arrayCookies[i]);
        //         lista.innerHTML = "<li>" + arrayCookies[i] + "</li>";
        //     }

    }

window.onload=function(){
    inicio();
}