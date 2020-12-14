// window.onload = function(){
//     document.getElementById('nombre_ciudad').addEventListener("keyup", mostrarSugerencia);
// }

function mostrarSugerencia(sugerencia){
    if(sugerencia.length == 0){
        document.getElementById('sugerencias').innerHTML = "";
        return;
    } else {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                document.getElementById('sugerencias').innerHTML = this.resposeText;
            }
        }; 
        xhr.open("GET", "localidades.php?ciudad=" + sugerencia, true);
        xhr.send();
    }
}
