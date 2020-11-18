function inicio(){
    var castellano = document.getElementById("castellano");
    var ingles = document.getElementById("ingles"); 

    castellano.onclick = idiomaCastellano;
    ingles.onclick = idiomaIngles;

    var cookie = document.cookie;
    var idioma = cookie.split("=");

    switch(idioma[1]){
        case "Ingles":
            window.location.href = "indexEN.html";

            break;
        case "Castellano":
            window.location.href = "indexES.html";
            break;
    }
}

function idiomaCastellano(elEvento){
    document.cookie = "Idioma = Castellano; expires = Sun, 07 Nov 2021 17:42:35 GMT";
}

function idiomaIngles(elEvento){
    document.cookie = "Idioma = Ingles; expires = Sun, 07 Nov 2021 17:42:35 GMT";
    window.location.href = "index.html";
}


window.onload=function(){	
	inicio();
}