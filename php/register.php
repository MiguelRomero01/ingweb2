<?php
require 'db.php'; // Asegúrate de que este archivo tenga la conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['usuario']; // Cambia esto a 'usuario' para que coincida con el formulario
    $password = password_hash($_POST['clave'], PASSWORD_DEFAULT); // Cambia a 'clave'

    $stmt = $conn->prepare("INSERT INTO usuarios (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        echo "<div class='alert alert-success text-center'>Usuario registrado con éxito.</div>";
    } else {
        echo "<div class='alert alert-danger text-center'>Error: " . $stmt->error . "</div>";
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
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: url('https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXkBuNYdMGF4tl3U0%25z8rMHIspbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmHlCgI7Zl2dioCxkF%25vUqCNwuWXsOs8IeV6iTxjgzhRc2GaWqA7fQr7DOJtWFnQbNWMbdJ6gzyel2Pz3BZhUynAYM') no-repeat center center fixed;
            background-size: cover;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Arial', sans-serif;
        }
        .register-container {
            background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro transparente */
            padding: 50px;
            border-radius: 15px;
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
            width: 100%;
            max-width: 450px;
            color: white;
        }
        .register-container h1 {
            font-weight: bold;
            margin-bottom: 40px;
            text-align: center;
            color: #e0e0e0; /* Gris claro metálico */
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .form-control {
            border-radius: 30px;
            background-color: rgba(255, 255, 255, 0.15);
            color: white;
            border: 1px solid #bdc3c7; /* Borde gris claro */
            transition: background-color 0.3s ease-in-out;
        }
        .form-control:focus {
            background-color: rgba(255, 255, 255, 0.3);
        }
        .form-control::placeholder {
            color: #95a5a6; /* Placeholder en gris */
        }
        .btn-primary {
            background-color: #ff4757; /* Rojo Porsche */
            border: none;
            border-radius: 30px;
            padding: 15px;
            font-weight: bold;
            color: white;
            width: 100%;
            font-size: 18px;
        }
        .btn-primary:hover {
            background-color: #e84118;
            transition: 0.3s;
        }
        .form-label {
            font-weight: bold;
            color: #bdc3c7; /* Color gris claro */
        }
        .form-check-label {
            color: #ecf0f1;
        }
        .alert {
            margin-top: 15px;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="register-container">
        <h1>Regístrate</h1>
        <form action="register.php" method="post">
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

    <!-- Bootstrap JS and Popper.js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
