document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        var email = document.getElementById('Nombre').value;
        var password = document.getElementById('Contraseña').value;

        
        if (email === 'ejemplo@gmail.com' && password === 'contraseña123') {
            document.getElementById('message').textContent = 'Login exitoso';
            document.getElementById('message').style.color = 'green';
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            document.getElementById('message').textContent = 'Email o contraseña incorrectos';
            document.getElementById('message').style.color = 'red';
        }
    });
});
