document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartListElement = document.getElementById('cart-list');
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemsElement = document.getElementById('cart-items');

    let currentSales = 0;

    function addToCart(productName, productPrice) {
        cart.push({ name: productName, price: parseFloat(productPrice) });
        updateCartUI();
    }

    function updateCartUI() {
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
            cartCountElement.innerHTML = currentSales;
        }
        currentSales += 1;

        cartListElement.innerHTML = '';

        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            cartListElement.appendChild(li);
            total += item.price;
        });

        cartTotalElement.textContent = total.toFixed(2);
    }

    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-to-cart')) {
            const productName = e.target.getAttribute('data-name');
            const productPrice = e.target.getAttribute('data-price');
            addToCart(productName, productPrice);
        }
    });

    const carritoContainer = document.querySelector('.cart');
    console.log(carritoContainer); // Verifica si el elemento se selecciona correctamente

    if (carritoContainer) {
        carritoContainer.addEventListener('click', function() {
            cartItemsElement.style.display = cartItemsElement.style.display === 'none' ? 'block' : 'none';
        });
    } else {
        console.log("El contenedor del carrito no se encuentra.");
    }

    document.getElementById('clear-cart').addEventListener('click', function() {
        currentSales = 0;
        cart = [];
        updateCartUI();
    });
});
