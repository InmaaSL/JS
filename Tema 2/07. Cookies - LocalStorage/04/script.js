//Fecha de caducidad de las cookies
caduca = "31 Dec 2020 23:59:59 GMT";

misCookies = idioma;

function inicio(){
    var titulo = document.getElementById('titulo');
    var aceptar = document.getElementById('aceptar');
    


    aceptar.onclick = cambiarIdioma;

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";" + caduca + ";path=/";
}



cambiarIdioma(elEvento){

}




window.onload =  function() {

}