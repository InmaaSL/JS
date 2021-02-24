
window.onload = function(){
    //Botones formulario: 
    btnCancelar = document.getElementById('cancelar');
    btnEntrar = document.getElementById('entrar');
    
    //Funciones en funcionamiento: 
    btnCancelar.onclick = limpiarForm;
    btnEntrar.onclick = comprobarUsuario;


    //Cargamos el localStorage: 
    arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
}

function comprobarUsuario(event){
    usuario = document.getElementById("usuario");
    password = document.getElementById("password");
    error = document.getElementById("error");
    
    for (let i = 0; i < arrayClientes.length; i++) {
        if(arrayClientes[i].email == usuario.value && arrayClientes[i].contrasenya == password.value){
            //Redirecciona a la tabla actualizada: 
            window.location.href = "ventas.html";
            document.cookie = usuario.value + "=" + password.value + "; + max-age=3600";
        } else{
            error.innerHTML = "El usuario y la contraseña no coinciden";
        }
    }
}

function limpiarForm(){
    //Obtenemos el formulario y lo ponemos en blanco: 
	form = document.getElementById('login');
	form.reset();
}