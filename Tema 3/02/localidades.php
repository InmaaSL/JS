<?php

//Localidades: 
$localidades = array("ADSUBIA", "AGOST","AGRES","AIGÜES","ALBATERA","ALCALALI","ALCOCER DE PLANES","ALCOLEJA","ALCOI",
"ALFAFARA","ALGORFA","ALGUEÑA LA","ALICANTE","ALMORADI","ALMUDAINA","ALTEA","ASPE", "BALONES","BANYERES DE MARIOLA",
"BENASAU", "BENEIXAMA", "BENEJUZAR", "BENFERRI", "BENIARBEIG", "BENIARDA","BENIARRES","BENICHEMBLA","BENIDOLEIG",
"BENIDORM","BENIFALLIM", "BENIFATO",  "BENIJOFAR", "BENILLOBA", "BENILLUP","BENIMANTELL", "BENIMARFULL","BENIMASSOT",  
"BENIMELI","BENISSA","BENITACHELL","BIAR","BIGASTRO","BOLULLA","BUSOT","CALLOSA DE SEGURA", 
"CALLOSA D'EN SARRIA","CALPE","CAÑADA","CASTALLA","CASTELL DE CASTELLS","CATRAL","COCENTAINA","CONFRIDES","COX",
"CREVILLENTE","DAYA NUEVA","DAYA VIEJA","DENIA","DOLORES","EL CAMP DE MIRRA","EL CAMPELLO","EL VERGER","ELCHE","ELX",
"ELDA","ELS POBLETS","FACHECA","FAMORCA","FINESTRAT","FORMENTERA DEL SEGURA","GAIANES","GATA DE GORGOS","GORGA","GRANJA DE ROCAMORA",
"GUADALEST","GUARDAMAR DEL SEGURA","HONDON DE LAS NIEVES","HONDON DE LOS FRAILES","IBI","JACARILLA","JALON","XALO",
"JAVEA","XABIA","JIJONA","XIXONA","LA NUCIA","LA ROMANA","LA TORRE DE LES MAÇANES","LA VILLAJOYOSA","VILA JOIOSA",
"L'ALFAS DEL PI","L'ALQUERIA DE ASNAR","LLIBER","LORCHA","L'ORXA","LOS MONTESINOS","MILLENA","MONFORTE DEL CID","MONOVAR",
"MONOVER","MURLA","MURO DE ALCOY","MUTXAMEL","NOVELDA","ONDARA","ONIL","ORBA","ORIHUELA","ORXETA","PARCENT",
"PEDREGUER","PEGO","PENAGUILA","PETRER","PILAR DE LA HORADADA","PINOSO","PLANES","POLOP","QUATRETONDETA","RAFAL",
"RAFOL DE ALMUNIA","REDOVAN","RELLEU","ROJALES","SAGRA","SALINAS","SAN FULGENCIO","SAN ISIDRO","SAN JUAN DE ALICANTE",
"SAN MIGUEL DE SALINAS","SAN VICENTE DEL RASPEIG","SANET Y NEGRALS","SANTA POLA","SAX","SELLA","SENIJA","TARBENA","TEULADA",
"TIBI","TOLLOS","TORMOS","TORREVIEJA","VALL DE ALCALA","VALL DE EBO","VALL DE GALLINERA","VALL DE LAGUART","VILLENA");

//Obtenemos la cadena de texto: 
$ciudad = $_REQUEST["ciudad"];
$sugerencia = "";

//Recorremos el array para obtener cada localidad: 
foreach($localidades as $nombre){
    if(stristr($ciudad, substr($nombre, 0, strlen($ciudad)))){
        if($sugerencia === ""){
            $sugerencia = $nombre;
        } else {
            $sugerencia = $sugerencia . ", $nombre";
        }
    }
}

//Escribimos la sugerencia:
if ($sugerencia === ""){
    echo "No se encuentran sugerencias.";
} else { 
    echo $sugerencia;
}
?> 