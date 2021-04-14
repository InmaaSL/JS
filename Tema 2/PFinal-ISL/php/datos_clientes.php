<?php
	$contenido = $_REQUEST['param'];

	$archivo = fopen('infoClientes.json','w+b');
	fwrite($archivo, $contenido);
	fclose($archivo);
?>