var cursos = '['+ 
    '{"iniciales":"SMR" ,"titulo":"Sistemas microinformáticos y redes"},' + 
    '{"iniciales":"ASIR","titulo":"Administración de sistemas informáticos y redes"},' +
    '{"iniciales":"DAW" , "titulo":"Desarrollo de aplicaciones Web"},' +
    '{"iniciales":"DAM" , "titulo":"Desarrollo de aplicaciones multiplataforma"}'+
']';

window.onload = function(){
    cargar = document.getElementById('cargar');
    //Probamos nueva forma de llamar a los eventos: 
    cargar.addEventListener('click', cargarJSON);
}

function cargarJSON(){
    //Transformamos el objeto JSON en una cadena de texto:
    var miObj = JSON.parse(cursos);
    //Generamos una varibale que almacenará el mensaje:
    mensaje = "";

    var lista = document.createElement('ul');
    
    //Recorremos el objeto para que muestre todas las parejas:
    for (let i = 0; i < miObj.length; i++){
        var punto = document.createElement('li');
        var mensaje = document.createTextNode(miObj[i].iniciales + " - " + miObj[i].titulo);
        punto.appendChild(mensaje);
        lista.appendChild(punto);
    }

    var mostrar = document.getElementById('mostrar');
    mostrar.appendChild(lista);
}