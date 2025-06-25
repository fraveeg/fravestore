// checkout.js - Handles checkout page logic
document.addEventListener('DOMContentLoaded', () => {
    // console.log("checkout.js DOMContentLoaded fired.");

    const checkoutOrderItems = document.getElementById('checkoutOrderItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutShipping = document.getElementById('checkoutShipping');
    const finalTotal = document.getElementById('finalTotal');
    const checkoutForm = document.getElementById('checkoutForm');
    const placeOrderBtn = checkoutForm ? checkoutForm.querySelector('.place-order-btn') : null;
    const citySelect = document.getElementById('city');

    // Use global basket
    let basket = window.basket || [];
    let subtotalPrice = 0;
    let shippingFee = 0;
    let totalOrderPrice = 0;

    // Shipping rates
    const shippingRates = {
        'Cairo': 70,
        'Alexandria': 100,
        'Other Regions': 110
    };

    if (!checkoutOrderItems || !checkoutSubtotal || !checkoutShipping || !finalTotal || !checkoutForm || !placeOrderBtn || !citySelect) {
        console.error("One or more critical checkout page elements not found. Cannot proceed with checkout logic.");
        return; // Exit if critical elements are missing
    }

    // Function to update order summary and totals
    function updateOrderSummary() {
        checkoutOrderItems.innerHTML = ''; // Clear current items
        subtotalPrice = 0;

        if (basket.length === 0) {
            checkoutOrderItems.innerHTML = '<p style="text-align: center; color: #aaa;">Your basket is empty. Please add items to proceed to checkout.</p>';
            checkoutSubtotal.innerText = 'Subtotal: 0 L.E';
            checkoutShipping.innerText = 'Shipping: 0 L.E';
            finalTotal.innerText = 'Total: 0 L.E';
            placeOrderBtn.disabled = true; // Disable button if empty
            return;
        }

        basket.forEach(item => {
            subtotalPrice += item.total;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'checkout-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="checkout-item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-qty-price">${item.category === "Framed Poster" && item.size ? 'Size: ' + item.size : 'Price: ' + item.price} L.E x ${item.qty} = ${item.total} L.E</p>
                </div>
            `;
            checkoutOrderItems.appendChild(itemDiv);
        });

        // Calculate shipping fee based on selected city
        const selectedCity = citySelect.value;
        shippingFee = shippingRates[selectedCity] || 0; // Default to 0 if no city selected or unknown

        totalOrderPrice = subtotalPrice + shippingFee;

        checkoutSubtotal.innerText = `Subtotal: ${subtotalPrice} L.E`;
        checkoutShipping.innerText = `Shipping: ${shippingFee} L.E`;
        finalTotal.innerText = `Total: ${totalOrderPrice} L.E`;
        placeOrderBtn.disabled = false; // Enable button if basket has items and city is selected
        if (!selectedCity) { // Disable if no city is chosen
            placeOrderBtn.disabled = true;
        }
    }

    // Event listener for city selection change
    citySelect.addEventListener('change', updateOrderSummary);

    // Initial load of order summary
    updateOrderSummary();

    // Handle form submission
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Re-calculate totals just before submission to be safe
        updateOrderSummary();

        // Check if city is selected and products are in basket
        if (!citySelect.value) {
            alert('Please select your city to calculate shipping.');
            return;
        }
        if (basket.length === 0) {
            alert('Your basket is empty. Please add items before placing an order.');
            return;
        }

        // Collect form data
        const formData = new FormData(checkoutForm);
        const orderDetails = {};
        formData.forEach((value, key) => {
            orderDetails[key] = value;
        });

        // Add basket details and all total breakdowns to orderDetails
        orderDetails['Basket Items'] = basket.map(item => ({
            name: item.name,
            category: item.category,
            quantity: item.qty,
            unitPrice: item.category === "Framed Poster" && item.size ? item.size : item.price,
            totalItemPrice: item.total
        }));
        orderDetails['Subtotal Price'] = subtotalPrice + ' L.E';
        orderDetails['Shipping Fee'] = shippingFee + ' L.E';
        orderDetails['Final Total Price'] = totalOrderPrice + ' L.E';


        // Store order details in session storage for the confirmation page
        sessionStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));

        // Convert to JSON for sending to Formspree
        const jsonData = JSON.stringify(orderDetails, null, 2);

        // IMPORTANT: Replace "https://formspree.io/f/xpwryvlg" with your actual Formspree endpoint
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
                localStorage.removeItem('fraveBasket'); // Clear basket after successful order
                window.location.href = 'order_confirmation.html'; // Redirect to confirmation page
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