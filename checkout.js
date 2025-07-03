// checkout.js - Full Code (Updated to Generate Order Shipment Number and handle all fields including Poster Packs, and updated Cairo shipping price)
document.addEventListener('DOMContentLoaded', () => {
    // console.log("checkout.js DOMContentLoaded fired.");

    const checkoutOrderItems = document.getElementById('checkoutOrderItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutShipping = document.getElementById('checkoutShipping');
    const finalTotal = document.getElementById('finalTotal');
    const checkoutForm = document.getElementById('checkoutForm');
    const placeOrderBtn = checkoutForm ? checkoutForm.querySelector('.place-order-btn') : null;
    const citySelect = document.getElementById('city');

    // Use global basket (from script.js)
    let basket = window.basket || [];
    let subtotalPrice = 0;
    let shippingFee = 0;
    let totalOrderPrice = 0;

    // Shipping rates (UPDATED CAIRO PRICE)
    const shippingRates = {
        'Cairo': 75, // Changed from 70 to 75
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

            let itemDetailsHtml = '';
            // Handle display based on category
            if (item.category === "Poster Pack") {
                let designsList = '';
                if (item.selectedDesigns && item.selectedDesigns.length > 0) {
                    designsList = `<br><span style="font-size:0.8em; color:#bbb;">Designs: ${item.selectedDesigns.map(d => d.name).join(', ')}</span>`;
                }
                itemDetailsHtml = `
                    <p class="item-name">${item.name}</p>
                    <p class="item-qty-price">Size: ${item.size} x ${item.qty} = ${item.total} L.E${designsList}</p>
                `;
            } else if (item.category === "Framed Poster") {
                let customDetail = '';
                if (item.isCustomDesign) {
                    const originalBasePrice = item.originalPrice;
                    const customFee = item.price - originalBasePrice;
                    customDetail = ` (Custom +${customFee}L.E)`;
                }
                itemDetailsHtml = `
                    <p class="item-name">${item.name}</p>
                    <p class="item-qty-price">Size: ${item.size} L.E x ${item.qty} = ${item.total} L.E${customDetail}</p>
                `;
            } else { // For Stickers
                itemDetailsHtml = `
                    <p class="item-name">${item.name}</p>
                    <p class="item-qty-price">Price: ${item.originalPrice} L.E x ${item.qty} = ${item.total} L.E</p>
                `;
            }

            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="checkout-item-details">
                    ${itemDetailsHtml}
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

        // Enable button if basket has items AND city is selected (required field)
        placeOrderBtn.disabled = !(basket.length > 0 && selectedCity);
    }

    // Event listener for city selection change
    citySelect.addEventListener('change', updateOrderSummary);

    // Initial load of order summary
    updateOrderSummary();

    // --- Function to Generate 9-Digit Shipment Number ---
    function generateShipmentNumber() {
        // Generate a random number between 100,000,000 (10^8) and 999,999,999 (10^9 - 1)
        return Math.floor(Math.random() * (900000000)) + 100000000;
    }


    // Handle form submission
    try {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // Re-calculate totals just before submission to be safe
            updateOrderSummary();

            // Additional client-side validation for required fields if needed,
            // though HTML 'required' handles most of it.
            if (!citySelect.value) {
                alert('Please select your city to calculate shipping.');
                return;
            }
            if (basket.length === 0) {
                alert('Your basket is empty. Please add items before placing an order.');
                return;
            }

            // Generate the shipment number
            const shipmentNumber = generateShipmentNumber();
            console.log("Generated Shipment Number:", shipmentNumber); // For debugging

            // Collect form data. FormData automatically handles inputs with 'name' attributes.
            const formData = new FormData(checkoutForm);
            const orderDetails = {};
            formData.forEach((value, key) => {
                orderDetails[key] = value || ''; // Ensure all form fields are collected, use empty string for optional blanks
            });

            // Add basket details and all total breakdowns to orderDetails
            orderDetails['Shipment Number'] = shipmentNumber; // Add the generated number
            orderDetails['Basket Items'] = basket.map(item => {
                const itemData = {
                    id: item.id, // Include ID for tracking
                    name: item.name,
                    category: item.category,
                    quantity: item.qty,
                    totalItemPrice: item.total
                };

                // Add category-specific details
                if (item.category === "Poster Pack") {
                    itemData.size = item.size;
                    itemData.packPosterCount = item.posterCount; // Number of posters in the pack
                    itemData.selectedDesigns = item.selectedDesigns; // Array of selected designs
                } else if (item.category === "Framed Poster") {
                    itemData.subcategory = item.subcategory || 'N/A';
                    itemData.size = item.size || 'N/A';
                    itemData.originalPrice = item.originalPrice;
                    itemData.unitPrice = item.price;
                    itemData.isCustomDesign = item.isCustomDesign;
                    itemData.customImageFileName = item.customImageFileName;
                } else if (item.category === "Sticker") {
                    itemData.originalPrice = item.originalPrice;
                    itemData.unitPrice = item.price;
                }
                return itemData;
            });
            orderDetails['Subtotal Price'] = subtotalPrice + ' L.E';
            orderDetails['Shipping Fee'] = shippingFee + ' L.E';
            orderDetails['Final Total Price'] = totalOrderPrice + ' L.E';

            // Store order details in session storage for the confirmation page
            sessionStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));

            // Convert to JSON for sending to Formspree
            const jsonData = JSON.stringify(orderDetails, null, 2);

            // IMPORTANT: Replace "YOUR_FORMSPREE_ENDPOINT_HERE" with your actual Formspree endpoint
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
    } catch (error) { console.error("Error setting checkoutForm.addEventListener('submit'):", error); console.trace(); }
});
