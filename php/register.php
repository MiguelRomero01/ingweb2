<?php
require 'db.php'; // Asegúrate de que este archivo tenga la conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['usuario']; // Cambia esto a 'usuario' para que coincida con el formulario
    $password = password_hash($_POST['clave'], PASSWORD_DEFAULT); // Cambia a 'clave'

    $stmt = $conn->prepare("INSERT INTO usuarios (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        echo "Usuario registrado con éxito.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrarse</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../styles/register.css">
</head>
<body>
    <div class="container mt-5">
        <form action="register.php" method="post">
            <h1 class="text-center">Regístrate</h1>

            <div class="mb-3">
                <label for="Usuario" class="form-label">Usuario:</label>
                <input type="text" id="Usuario" name="usuario" class="form-control" placeholder="Ingrese su usuario" required>
            </div>
            
            <div class="mb-3">
                <label for="Contraseña" class="form-label">Contraseña:</label>
                <input type="password" id="contraseña" name="clave" class="form-control" placeholder="•••••••••••••" required>
            </div>
            
            <div class="form-check mb-3">
                <input type="checkbox" id="checheado" name="acepto" class="form-check-input" required>
                <label for="checheado" class="form-check-label">Acepto Términos y Condiciones</label>
            </div>

            <div class="text-center">
                <input type="submit" id="btn-signIn" class="btn btn-primary" value="Regístrate">
            </div>
        </form>
    </div>

    <script src="../index.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
