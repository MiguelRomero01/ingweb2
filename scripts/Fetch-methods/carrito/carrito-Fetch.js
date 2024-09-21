fetch('/layouts/components/carrito.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.carrito').innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el navbar:', error));

