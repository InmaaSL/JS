function inicio(){

    //Obtenemos el valor de los cuadrados con la fruta para cuando hagamos doble click:
    botones = document.getElementsByClassName('fpeque');

    //Obtenemos la imagen: 
    imagen = document.getElementsByClassName('peque');

    //Obtenemos ref de la fruta: 
    referencia = document.getElementById

    //Obtenemos el hueco de la imagen parte derecha: 
    huecoImagen = document.getElementById('ffac');

    //Dobleclick:
    for (let x = 0; x < botones.length; x++){
        botones[x].ondblclick = ponerImagen;
        imagenSeleccionada = imagen[x];
    } 

}

function ponerImagen(elEvento){

    alert(imagen);

    // for (let x = 0; x < imagen.length; x++){
    //         if (huecoImagen.hasChildNodes()) {
    //             //Eliminamos la foto que haya:
    //             nuevaImagen.parentNode.removeChild(nuevaImagen);
    //             //Creamos la siguiente: 
    //             nuevaImagen = document.createElement('img');
    //             fotoImagen = document.createTextNode(imagenSeleccionada);
    //             nuevaImagen.appendChild(fotoImagen);
    //             huecoImagen.appendChild(nuevaImagen);

    //         } else {
    //             nuevaImagen = document.createElement('img');
    //             nuevaImagen.setAttribute("src", "imagenes/" + imagen + ".jpg");
    //             fotoImagen = document.createTextNode(imagenSeleccionada);
    //             nuevaImagen.appendChild(fotoImagen);
    //             huecoImagen.appendChild(nuevaImagen);
    //         }
    //     }

    //Ponemos valor y precio: 
    
}


window.onload=function(){
    inicio();
}