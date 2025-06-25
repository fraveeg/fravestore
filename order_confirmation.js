// order_confirmation.js
document.addEventListener('DOMContentLoaded', () => {
    // console.log("order_confirmation.js DOMContentLoaded fired.");

    const receiptItems = document.getElementById('receiptItems');
    const receiptSubtotal = document.getElementById('receiptSubtotal');
    const receiptShipping = document.getElementById('receiptShipping');
    const receiptFinalTotal = document.getElementById('receiptFinalTotal');

    const receiptFullName = document.getElementById('receiptFullName');
    const receiptEmail = document.getElementById('receiptEmail');
    const receiptPhone = document.getElementById('receiptPhone');
    const receiptCity = document.getElementById('receiptCity');
    const receiptAddressText = document.getElementById('receiptAddressText');

    // Retrieve order details from sessionStorage
    const lastOrderDetailsJSON = sessionStorage.getItem('lastOrderDetails');

    if (lastOrderDetailsJSON) {
        const orderDetails = JSON.parse(lastOrderDetailsJSON);

        // Display order items
        if (orderDetails['Basket Items'] && orderDetails['Basket Items'].length > 0) {
            orderDetails['Basket Items'].forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'receipt-item';
                itemDiv.innerHTML = `
                    <span>${item.name} (${item.quantity}x)</span>
                    <span>${item.totalItemPrice} L.E</span>
                `;
                receiptItems.appendChild(itemDiv);
            });
        } else {
            receiptItems.innerHTML = '<p>No items found for this order.</p>';
        }

        // Display totals
        receiptSubtotal.innerText = `Subtotal: ${orderDetails['Subtotal Price'] || '0 L.E'}`;
        receiptShipping.innerText = `Shipping: ${orderDetails['Shipping Fee'] || '0 L.E'}`;
        receiptFinalTotal.innerText = `Total: ${orderDetails['Final Total Price'] || '0 L.E'}`;

        // Display shipping information
        receiptFullName.innerText = orderDetails['Full Name'] || 'N/A';
        receiptEmail.innerText = orderDetails['Email'] || 'N/A';
        receiptPhone.innerText = orderDetails['Phone Number'] || 'N/A';
        receiptCity.innerText = orderDetails['City'] || 'N/A';
        receiptAddressText.innerText = orderDetails['Shipping Address'] || 'N/A';

        // Clear sessionStorage after displaying, so it doesn't show old orders on refresh
        // sessionStorage.removeItem('lastOrderDetails'); // Keep commented for easier testing/debugging
    } else {
        // If no order details found, redirect or show an error
        receiptItems.innerHTML = '<p style="text-align: center; color: #aaa;">No recent order details found. Please place an order first.</p>';
        receiptSubtotal.style.display = 'none';
        receiptShipping.style.display = 'none';
        receiptFinalTotal.style.display = 'none';
        document.getElementById('receiptAddress').style.display = 'none';
        // Optionally redirect to home or shop
        // setTimeout(() => { window.location.href = 'index.html'; }, 3000);
    }

    // Initialize page animation (from script.js)
    if (typeof initializePageAnimation === 'function') {
        initializePageAnimation();
    }
});