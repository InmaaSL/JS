<?php
	$contenido = $_REQUEST['param'];

	$archivo = fopen('infoVentas.json','w+b');
	fwrite($archivo, $contenido);
	fclose($archivo);
?>