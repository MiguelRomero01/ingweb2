<?php
$servername = "localhost";
$username = "root";
$password = "";  // Contraseña vacía
$dbname = "mi_base_datos";  // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>