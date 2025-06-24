// checkout.js - Handles checkout page logic
document.addEventListener('DOMContentLoaded', () => {
    const checkoutOrderItems = document.getElementById('checkoutOrderItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const checkoutForm = document.getElementById('checkoutForm');

    // Load basket from localStorage
    let basket = JSON.parse(localStorage.getItem('fraveBasket')) || [];
    let totalOrderPrice = 0;

    if (basket.length === 0) {
        checkoutOrderItems.innerHTML = '<p style="text-align: center; color: #aaa;">Your basket is empty. Please add items to proceed to checkout.</p>';
        checkoutTotal.innerText = 'Total: 0 L.E';
        checkoutForm.querySelector('.place-order-btn').disabled = true; // Disable button if empty
    } else {
        basket.forEach(item => {
            totalOrderPrice += item.total;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'checkout-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="checkout-item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-qty-price">${item.category === "Framed Poster" ? 'Size: ' + item.size : 'Price: ' + item.price} L.E x ${item.qty} = ${item.total} L.E</p>
                </div>
            `;
            checkoutOrderItems.appendChild(itemDiv);
        });

        checkoutTotal.innerText = `Order Total: ${totalOrderPrice} L.E`;
    }

    // Handle form submission
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = new FormData(checkoutForm);
        const orderDetails = {};
        formData.forEach((value, key) => {
            orderDetails[key] = value;
        });

        // Add basket details and total to orderDetails
        orderDetails['Basket Items'] = basket.map(item => ({
            name: item.name,
            category: item.category,
            quantity: item.qty,
            unitPrice: item.category === "Framed Poster" ? item.size : item.price,
            totalItemPrice: item.total
        }));
        orderDetails['Total Order Price'] = totalOrderPrice + ' L.E';

        // Convert to JSON for sending (e.g., to Formspree)
        const jsonData = JSON.stringify(orderDetails, null, 2);

        // --- Important: Replace "YOUR_FORMSPREE_ENDPOINT_HERE" with your actual Formspree endpoint ---
        // Go to Formspree.io, create a new form, and copy the endpoint URL.
        // It will look something like: https://formspree.io/f/YOUR_UNIQUE_HASH
        fetch(checkoutForm.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: jsonData
        })
        .then(response => {
            if (response.ok) {
                alert('Order placed successfully! We will contact you shortly.');
                localStorage.removeItem('fraveBasket'); // Clear basket after successful order
                window.location.href = 'index.html'; // Redirect to home page
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Failed to place order.');
                });
            }
        })
        .catch(error => {
            console.error('Error placing order:', error);
            alert('There was an error placing your order. Please try again later. ' + error.message);
        });
    });
});