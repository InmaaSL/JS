<?php
	$contenido = $_REQUEST['param'];

	$archivo = fopen('pedidos.json','w+b');
	fwrite($archivo, $contenido);
	fclose($archivo);

?>