window.onload = function(){

    document.getElementById('mostrar_contenido').addEventListener("click", mostrarContenido);

}

function mostrarContenido(){
    estadoPeticion = document.getElementById("estado_peticion");
    estadoPeticion.innerHTML = "";

    archivo = document.getElementById("archivo").value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = cambioEstado;
    xhr.open("GET", archivo+".txt", true);
    xhr.send();
}

function cambioEstado(){
    mostrar = document.getElementById("mostrar_archivo").innerHTML = this.responseText;
    
    if (this.readyState == 0){
        estadoPeticion.innerHTML = estadoPeticion.innerHTML + "0 - Ready State Uninitialized";
    } else if (this.readyState == 1){
        estadoPeticion.innerHTML = estadoPeticion.innerHTML + "1 - Ready State Loading \n";
    } else if (this.readyState == 2){
        estadoPeticion.innerHTML = estadoPeticion.innerHTML + "2 - Ready State Loaded \n";
    } else if ( this.readyState == 3){
        estadoPeticion.innerHTML = estadoPeticion.innerHTML + "3 - Ready State Interactive \n"; 
    } else {
        estadoPeticion.innerHTML = estadoPeticion.innerHTML + "4 - Ready State Complete \n";
    }
    
    codigoEstado = document.getElementById("codigo_estado"); 
    if (this.status == 200){
        codigoEstado.innerHTML = "200 - OK";
    } else if (this.status == 403){
        codigoEstado.innerHTML = "403 - Prohibido";
    }else {
        codigoEstado.innerHTML = "404 - No encontrado";
    }


}

