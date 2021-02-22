<?php

	// $archivo = fopen('pedidos.json','w');
	// fwrite($archivo, 'Hola');
	// fclose($archivo);

	$contenido = $_REQUEST['param'];

	$archivo = fopen('pedidos.json','w+b');
	fwrite($archivo, $contenido);
	fclose($archivo);

?>