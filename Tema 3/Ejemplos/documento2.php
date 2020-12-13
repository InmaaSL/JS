<?php
 if(!empty($_POST)){
 echo '$_POST '."<br>";
 echo "Tu nombre es " . $_POST["nombre"]."<br>";
 echo "y eres " . $_POST["oficio"];
 } elseif( !empty($_GET)) {
 echo '$_GET '."<br>";
 echo "Tu nombre es " . $_GET["nombre"]."<br>";
 echo "y eres " . $_GET["oficio"];
 }
 ?>