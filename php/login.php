<?php
require 'db.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            
            // Redirigir a la página principal después de un inicio de sesión exitoso
            header("Location: http://127.0.0.1:5501/html/index.html");

            exit(); // Asegura que el script se detenga después de la redirección
        } else {
            echo "<div class='alert alert-danger text-center'>Contraseña incorrecta.</div>";
        }
    } else {
        echo "<div class='alert alert-danger text-center'>Usuario no encontrado.</div>";
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión - Concesionario</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: url('https://f1rstmotors.com/_next/image?url=https%3A%2F%2Ff1rst-motors.s3.me-central-1.amazonaws.com%2Fblog%2F1709548217671-blob&w=3840&q=100') no-repeat center center fixed;
            background-size: cover;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .login-container {
            background-color: rgba(0, 0, 0, 0.7); /* Fondo oscuro transparente */
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 400px;
            color: white;
        }
        .login-container h2 {
            font-weight: bold;
            margin-bottom: 30px;
            text-align: center;
            color: #f1c40f; /* Color dorado */
        }
        .form-control {
            border-radius: 20px;
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
        }
        .form-control::placeholder {
            color: #ccc;
        }
        .btn-primary {
            background-color: #f1c40f;
            border: none;
            border-radius: 20px;
            padding: 10px 0;
            font-weight: bold;
        }
        .btn-primary:hover {
            background-color: #d4ac0d;
            transition: 0.3s;
        }
        .form-label {
            font-weight: bold;
            color: #ccc;
        }
        .alert {
            margin-top: 15px;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Iniciar sesión</h2>
        <form method="POST">
            <div class="mb-3">
                <label for="username" class="form-label">Nombre de usuario</label>
                <input type="text" class="form-control" id="username" name="username" placeholder="Nombre de usuario" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Contraseña" required>
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-primary">Iniciar sesión</button>
            </div>
        </form>
    </div>
    <!-- Bootstrap JS and Popper.js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
