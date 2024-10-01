// Function to add item to the cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    let found = cart.find(cartItem => cartItem.name === item.name);

    if (found) {
        // Increase quantity if item already exists
        found.quantity += 1;
    } else {
        // Add new item to the cart
        item.quantity = 1;
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} has been added to your cart.`);
}

// Function to update total price
function updateTotal(cartItem, index) {
    let totalElement = document.getElementById(`total-${index}`);
    let total = cartItem.price * cartItem.quantity;
    totalElement.innerText = `PHP ${total.toFixed(2)}`;
}

// Function to update cart quantity and total
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItem = cart[index];

    if (cartItem.quantity + change > 0) {
        cartItem.quantity += change;
    } else {
        // Ask for confirmation before removing the item
        let confirmRemoval = confirm(`Do you really want to remove "${cartItem.name}" from your cart?`);
        if (confirmRemoval) {
            cart.splice(index, 1); // Remove item if confirmed
        } else {
            return; // Do nothing if user cancels the removal
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Re-render cart
}

// Function to display cart items on the cart page and update the order summary
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let summaryItemsContainer = document.getElementById('summary-items');
    let subtotalElement = document.getElementById('subtotal');
    let totalElement = document.getElementById('total');

    cartItemsContainer.innerHTML = ''; // Clear the cart items container
    summaryItemsContainer.innerHTML = ''; // Clear the summary items container

    let subtotal = 0;
    let shippingFee = 50; // Fixed shipping fee

    cart.forEach((item, index) => {
        let total = item.price * item.quantity;
        subtotal += total;

        // Populate cart items
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img class="cart-album-photo" src="./assets/${item.photo}" alt="${item.name}">
                <div class="cart-album-details">
                    <h3>${item.name}</h3>
                    <div class="cart-quantity">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-prices">
                    <p>Price: PHP ${item.price.toFixed(2)}</p>
                    <p id="total-${index}">Total: PHP ${total.toFixed(2)}</p>
                </div>
            </div>
        `;

        // Populate order summary items
        summaryItemsContainer.innerHTML += `
            <div class="summary-item">
                <p>${item.name} x ${item.quantity}</p>
                <p>PHP ${total.toFixed(2)}</p>
            </div>
        `;
    });

    // Update subtotal and total in order summary
    subtotalElement.innerText = `PHP ${subtotal.toFixed(2)}`;
    totalElement.innerText = `PHP ${(subtotal + shippingFee).toFixed(2)}`;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        summaryItemsContainer.innerHTML = '<p>No items in the cart.</p>';
    }
}

// Get the button element
const checkoutButton = document.getElementById('checkoutButton');

// Add event listener to the button
checkoutButton.addEventListener('click', function() {
    alert('You have successfully checked out your order!');

     // Clear the cart from local storage
     localStorage.removeItem('cart');

     // Re-render the cart to show that it's empty
     displayCart();
});

// Call displayCart if on the cart page
if (window.location.href.includes('cart.html')) {
    displayCart();
}

