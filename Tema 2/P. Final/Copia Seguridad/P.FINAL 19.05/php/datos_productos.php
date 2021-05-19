<?php
	$contenido = $_REQUEST['param'];

	$archivo = fopen('infoProductos.json','w+b');
	fwrite($archivo, $contenido);
	fclose($archivo);
?>