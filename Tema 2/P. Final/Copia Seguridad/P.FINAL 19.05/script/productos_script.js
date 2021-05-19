
    const ajax = new XMLHttpRequest();

window.onload = function(){
    //Variables necesarias: 
    tabla = document.getElementById('tablaProductos');
    tbodyProductos = document.getElementById('tablaProductos_tbody');

    arrayProductos = []; 

    //Botones formulario: 
    btnCancelar = document.getElementById('cancelar');
    btnGuardar = document.getElementById('guardar');
    btnGestion = document.getElementById('gestion');     

    //Botones productos: 
    btnBaja = document.getElementById("borrarProducto");
    
    //Funciones en funcionamiento: 
    btnCancelar.onclick = LimpiarForm;
    btnGuardar.onclick = AlmacenarProductos;
    //btnGestion.addEventListener("click", RecuperarAlmacenamiento);

    //Cargar archivo con datos de productos: 
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 404) {

            var newRow = tbodyProductos.insertRow(1); 
            contenido = document.createTextNode("No hay productos en stock");
            newRow.appendChild(contenido); 
            
        } else if(this.readyState == 4 && this.status == 200){ 
            //Pasar de texto a JSON
			arrayProductos = JSON.parse(this.responseText);
            console.log(arrayProductos);

            RecuperarAlmacenamiento();
        }
    }; 

    ajax.open("GET", "php/infoProductos.json", true); 
    ajax.send();
}

function ValidarCampos(){
    //Recogemos los campos a validar: 
    let referencia = document.getElementById('referencia');
    let descripcion = document.getElementById('descripcion');
    let familia = document.getElementById('familia');
    let stock = document.getElementById('stock'); 
    let precio = document.getElementById('precio');

    //Recogemos los campos donde anoraremos errores: 
    let errorReferencia = document.getElementById('errorReferencia');
    let errorDescripcion = document.getElementById('errorDescripcion');
    let errorFamilia = document.getElementById('errorFamilia');
    let errorStock = document.getElementById('errorStock'); 
    let errorPrecio = document.getElementById('errorPrecio');
    
    //Asignamos una variable para comprobar el estado de las validaciones: 
    let resultado = true;
    
    //Validamos los campos: 
    if (referencia.value == null || referencia.value.length == 0 || /^\s+$/.test(referencia.value)) {
        referencia.style.backgroundColor = "rgba(255,155,155,0.4)";
        referencia.focus();
        errorReferencia.innerHTML = "El nº de referencia no es correcto.";
		resultado = false;
    } else {
        referencia.innerHTML = referencia.value;
        errorReferencia.innerHTML = "";
        referencia.style.backgroundColor = "#FFF";
    }
    
    if (descripcion.value == null || descripcion.value.length == 0 || /^\s+$/.test(descripcion.value)) {
        descripcion.style.backgroundColor = "rgba(255,155,155,0.4)";
        descripcion.focus();
        errorDescripcion.innerHTML = "El campo descripción no puede estar vacío.";
		resultado = false;
    } else {
        descripcion.innerHTML = descripcion.value;
        errorDescripcion.innerHTML = "";
        descripcion.style.backgroundColor = "#FFF";
    }

    if (familia.value == null || familia.value.length == 0 || /^\s+$/.test(familia.value)) {
        familia.style.backgroundColor = "rgba(255,155,155,0.4)";
        familia.focus();
        errorFamilia.innerHTML = "El campo familia no puede estar vacío.";
		resultado = false;
    } else {
        familia.innerHTML = familia.value;
        errorFamilia.innerHTML = "";
        familia.style.backgroundColor = "#FFF";
    }

    if (stock.value == null || stock.value <= 0 || stock.value.length == 0 || isNaN(stock.value)) {
        stock.style.backgroundColor = "rgba(255,155,155,0.4)";
        stock.focus();
        errorStock.innerHTML = "La cantidad de stock no es correcta";
		resultado = false;
    } else {
        stock.innerHTML = precio.value;
        errorStock.innerHTML = "";
        stock.style.backgroundColor = "#FFF";
    }
    
    if (precio.value == null || precio.value.length == 0 || isNaN(precio.value)) {
        precio.style.backgroundColor = "rgba(255,155,155,0.4)";
        precio.focus();
        errorPrecio.innerHTML = "El campo precio no puede estar vacío.";
		resultado = false;
    } else {
        precio.innerHTML = precio.value;
        errorPrecio.innerHTML = "";
        precio.style.backgroundColor = "#FFF";
    }

    return resultado;
}

function LimpiarForm(){
    //Obtenemos el formulario y lo ponemos en blanco: 
	form = document.getElementById('productosForm');
	form.reset();
}

function AlmacenarProductos(event){
    //Validamos primero los datos, para ello recogemos el resultado de validar en una variable.
    resultado = ValidarCampos();

    //Recogemos las variables necesarias:
    let referenciaC = document.getElementById('referencia').value;
    let descripcionC = document.getElementById('descripcion').value;
    let familiaC = document.getElementById('familia').value;
    let stockC = document.getElementById('stock').value; 
    let precioC = document.getElementById('precio').value;

    if(resultado){

        if(arrayProductos.length == 0){
            //Creamos un objeto de tipo productos: 
            var id = 1;
            newProducto = {"id" : id,
                        "referencia" : referenciaC, 
                        "descripcion" : descripcionC, 
                        "familia" : familiaC, 
                        "stock" : stockC,
                        "precio" : precioC, 
                        "borrado" : false
                    };
            arrayProductos.push(newProducto);
            alert("Producto almacenado correctamente"); 

        } else {
            var idProducto = arrayProductos[arrayProductos.length - 1]; 

            //Obtenemos el valor del id del producto: 
            let id_JSON = idProducto.id; 

            let id = document.getElementById("id").value; 

            if (id == null || id == ""){

                miObj = { id : id_JSON + 1,
                                referencia : referenciaC, 
                                descripcion : descripcionC, 
                                familia : familiaC, 
                                stock : stockC,
                                precio : precioC, 
                                borrado: false
                };
                //Añadimos el nuevo producto al array: 
                arrayProductos.push(miObj);
                alert("Producto alamacenado correctamente"); 

            } else {
                idProductoMod = id - 1; 
                arrayProductos[idProductoMod] = {
                                                id : parseInt(id),
                                                referencia : referenciaC, 
                                                descripcion : descripcionC, 
                                                familia : familiaC, 
                                                stock : stockC,
                                                precio : precioC, 
                                                borrado: false
                };
                alert("Producto editado correctamente"); 
            }
        }
        LimpiarForm();
        ActualizarProductos();
        window.location.reload();
    }
}

function RecuperarAlmacenamiento(){

    var fila = tabla.getElementsByTagName("tr");

    for (let i = fila.length-1; i > 0; i--) {
        tabla.removeChild(fila[i]);
    }

    if(arrayProductos.length == 0){
        alert("No hay productos de stock");
    } else {         
        for(item of arrayProductos){
            if(item.borrado){
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('id', item.id)
                nuevaFila.setAttribute('class', 'nuevo_Producto');
                nuevaFila.setAttribute('hidden', 'false');

                //Añadimos la primera celda ID:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'idN');
                contenido = document.createTextNode(item.id);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la segunda celda REFERENCIA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'referencia');
                contenido = document.createTextNode(item.referencia);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la tercera celda DESCRIPCION:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'descripcion');
                contenido = document.createTextNode(item.descripcion);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la cuarta celda FAMILIA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'familia');
                contenido = document.createTextNode(item.familia);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la cuarta celda STOCK:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'stock');
                contenido = document.createTextNode(item.stock);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda PRECIO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'precio');
                contenido = document.createTextNode(item.precio + "€");
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda BORRADO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'campoBorrado');
                //nuevaCelda.setAttribute('hidden', 'true');
                contenido = document.createTextNode(item.borrado);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);

                tabla.appendChild(nuevaFila);
            } else {
                //Creamos la fila: 
                nuevaFila = document.createElement('tr');
                nuevaFila.setAttribute('id', item.id)
                nuevaFila.setAttribute('class', 'nuevo_Producto');

                //Añadimos la primera celda ID:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'idN');
                contenido = document.createTextNode(item.id);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la segunda celda REFERENCIA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'referencia');
                contenido = document.createTextNode(item.referencia);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la tercera celda DESCRIPCION:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'descripcion');
                contenido = document.createTextNode(item.descripcion);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
                
                //Añadimos la cuarta celda FAMILIA:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'familia');
                contenido = document.createTextNode(item.familia);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la cuarta celda STOCK:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'stock');
                contenido = document.createTextNode(item.stock);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda PRECIO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'precio');
                contenido = document.createTextNode(item.precio + "€");
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la quinta celda BORRADO:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('class', 'campoBorrado');
                nuevaCelda.setAttribute('hidden', 'false');
                contenido = document.createTextNode(item.borrado);
                nuevaCelda.appendChild(contenido);
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la septa celda BOTON EDITAR:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('id', 'celda1');
                nuevaCelda.innerHTML = '<button id="Editar">Editar</button>';
                nuevaCelda.addEventListener("click", function(){
                                                        id = this.parentNode.getAttribute("id");

                                                        document.getElementById("id").value = id;                                         
                                                        EditarProducto(id);
                                                    });
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);

                //Añadimos la septima celda BOTON BORRAR:
                nuevaCelda = document.createElement('td');
                nuevaCelda.setAttribute('id', 'celda2');
                nuevaCelda.innerHTML = '<button id="baja">Dar de baja</button>';
                nuevaCelda.addEventListener("click", function(){
                                                        
                                                        id = this.parentNode.getAttribute("id");

                                                        arrayProductos[id - 1].borrado = true; 

                                                        ActualizarProductos();

                                                        alert("Producto eliminado"); 

                                                        location.reload();
                                                    });
                nuevaFila.appendChild(nuevaCelda);
                tabla.appendChild(nuevaFila);
            }
        }
    }
}   

function EditarProducto(id){
    //Lo primero vamos a coger el form y sus items: 
    //alert(id);
        document.getElementById("referencia").value = arrayProductos[id-1].referencia;
        document.getElementById("descripcion").value = arrayProductos[id-1].descripcion;
        document.getElementById("familia").value = arrayProductos[id-1].familia;
        document.getElementById("stock").value = arrayProductos[id-1].stock;
        document.getElementById("precio").value = arrayProductos[id-1].precio;
}

function ActualizarProductos(){
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 404) {
            alert("Ha ocurrido un error al actualizar el registro"); 

        } else if(this.readyState == 4 && this.status == 200){ 
            console.log("Registro de productos actualizado"); 
        }
    };

    nuevoArray = JSON.stringify(arrayProductos); 
    ajax.open("POST", "php/datos_productos.php?param=" + nuevoArray, true); 
    ajax.send();
    console.log(arrayProductos);
}