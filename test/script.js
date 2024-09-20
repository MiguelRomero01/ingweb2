document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartListElement = document.getElementById('cart-list');
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemsElement = document.getElementById('cart-items');

    function addToCart(productName, productPrice) {
        cart.push({ name: productName, price: productPrice });
        updateCartUI();
    }

    function updateCartUI() {
        // Actualiza el número de artículos en el carrito
        cartCountElement.textContent = cart.length;

        // Limpia la lista antes de agregar nuevos elementos
        cartListElement.innerHTML = '';

        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            cartListElement.appendChild(li);
            total += parseFloat(item.price);
        });

        cartTotalElement.textContent = total.toFixed(2);
    }

    
    // Usar event delegation en el contenedor padre
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-to-cart')) {
            const productName = e.target.getAttribute('data-name');
            const productPrice = e.target.getAttribute('data-price');
            addToCart(productName, productPrice);
        }
    });
    
    // Maneja los clics en el botón "Añadir al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            addToCart(productName, productPrice);
        });
    });

    // Muestra/oculta el carrito cuando se hace clic en el botón del carrito
    document.getElementById('cart-button').addEventListener('click', function() {
        cartItemsElement.style.display = cartItemsElement.style.display === 'none' ? 'block' : 'none';
    });

    // Vaciar carrito
    document.getElementById('clear-cart').addEventListener('click', function() {
        cart = [];
        updateCartUI();
    });
});
