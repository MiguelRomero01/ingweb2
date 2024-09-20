document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartListElement = document.getElementById('cart-list');
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemsElement = document.getElementById('cart-items');

    // Variable para saber cuántos pedidos lleva el carrito
    let currentSales = 0;

    // Recuperar el carrito desde localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartUI();
    }

    // Recuperar currentSales desde localStorage
    const storedSales = localStorage.getItem('currentSales');
    if (storedSales) {
        currentSales = parseInt(storedSales);
    }

    // Función para agregar al carrito
    function addToCart(productName, productPrice) {
        cart.push({ name: productName, price: parseFloat(productPrice) });
        updateCartUI();
        localStorage.setItem('cart', JSON.stringify(cart)); // Guardar carrito en localStorage
    }

    // Actualizar la interfaz del carrito
    function updateCartUI() {
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
            cartCountElement.innerHTML = currentSales;
        }
        currentSales += 1;
        localStorage.setItem('currentSales', currentSales); // Guardar currentSales en localStorage

        // Limpiar la lista
        cartListElement.innerHTML = '';

        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            cartListElement.appendChild(li);
            total += item.price; // Sumar los precios correctamente
        });

        // Actualizar el total
        cartTotalElement.textContent = total.toFixed(2);
    }

    // Usar event delegation en el contenedor padre
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('boton-item')) {
            const productName = e.target.getAttribute('data-name');
            const productPrice = e.target.getAttribute('data-price');
            addToCart(productName, productPrice);
        }
    });

    // Mostrar/ocultar el carrito
    document.getElementById('cart-button').addEventListener('click', function() {
        cartItemsElement.style.display = cartItemsElement.style.display === 'none' ? 'block' : 'none';
    });

    // Vaciar el carrito
    document.getElementById('clear-cart').addEventListener('click', function() {
        currentSales = 0;
        cart = [];
        updateCartUI();
        localStorage.removeItem('cart');
        localStorage.removeItem('currentSales');
    });
});
