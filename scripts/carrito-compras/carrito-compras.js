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
        cartCountElement.textContent = cart.length;

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

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            addToCart(productName, productPrice);
        });
    });

    document.getElementById('cart-button').addEventListener('click', function() {
        cartItemsElement.style.display = cartItemsElement.style.display === 'none' ? 'block' : 'none';
    });
    
    document.getElementById('clear-cart').addEventListener('click', function() {
        cart = [];
        updateCartUI();
    });
});

