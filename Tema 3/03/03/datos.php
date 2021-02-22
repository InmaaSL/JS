<?php
	$contenido = $_REQUEST['param'];

	$archivo = fopen('pedidosFruta.json','w+b');
	fwrite($archivo, $contenido);
	fclose($archivo);
?>