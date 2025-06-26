// order_confirmation.js (Updated to display custom design details)
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
    const receiptBuildingNo = document.getElementById('receiptBuildingNo');
    const receiptFloorNo = document.getElementById('receiptFloorNo');
    const receiptApartmentNo = document.getElementById('receiptApartmentNo');
    const receiptLandmark = document.getElementById('receiptLandmark');
    const receiptAddressText = document.getElementById('receiptAddressText');

    // Retrieve order details from sessionStorage
    const lastOrderDetailsJSON = sessionStorage.getItem('lastOrderDetails');

    if (lastOrderDetailsJSON) {
        try {
            const orderDetails = JSON.parse(lastOrderDetailsJSON);

            // Display order items
            if (receiptItems && orderDetails['Basket Items'] && orderDetails['Basket Items'].length > 0) {
                receiptItems.innerHTML = '<h4>Items:</h4>';
                orderDetails['Basket Items'].forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'receipt-item';
                    let customDetail = '';
                    if (item.isCustomDesign) {
                        customDetail = ` (Custom + Image: ${item.customImageFileName})`;
                    }
                    itemDiv.innerHTML = `
                        <span>${item.name} (${item.quantity}x)${customDetail}</span>
                        <span>${item.totalItemPrice} L.E</span>
                    `;
                    receiptItems.appendChild(itemDiv);
                });
            } else if (receiptItems) {
                receiptItems.innerHTML = '<p>No items found for this order.</p>';
            }


            // Display totals
            if (receiptSubtotal) receiptSubtotal.innerText = `Subtotal: ${orderDetails['Subtotal Price'] || '0 L.E'}`;
            if (receiptShipping) receiptShipping.innerText = `Shipping: ${orderDetails['Shipping Fee'] || '0 L.E'}`;
            if (receiptFinalTotal) receiptFinalTotal.innerText = `Total: ${orderDetails['Final Total Price'] || '0 L.E'}`;

            // Display shipping information
            if (receiptFullName) receiptFullName.innerText = orderDetails['Full Name'] || 'N/A';
            if (receiptEmail) receiptEmail.innerText = orderDetails['Email'] || 'N/A';
            if (receiptPhone) receiptPhone.innerText = orderDetails['Phone Number'] || 'N/A';
            if (receiptCity) receiptCity.innerText = orderDetails['City'] || 'N/A';
            if (receiptBuildingNo) receiptBuildingNo.innerText = orderDetails['Building Number'] || '';
            if (receiptFloorNo) receiptFloorNo.innerText = orderDetails['Floor Number'] || '';
            if (receiptApartmentNo) receiptApartmentNo.innerText = orderDetails['Apartment Number'] || '';
            if (receiptLandmark) receiptLandmark.innerText = orderDetails['Nearest Landmark'] || 'N/A';
            if (receiptAddressText) receiptAddressText.innerText = orderDetails['Street Address'] || 'N/A';

            // sessionStorage.removeItem('lastOrderDetails'); // Uncomment to clear after display
        } catch (error) {
            console.error("Error parsing or displaying order details:", error);
            console.trace();
            if (receiptItems) receiptItems.innerHTML = '<p style="text-align: center; color: #f88;">Error loading order details. Please contact support.</p>';
            if (receiptSubtotal) receiptSubtotal.style.display = 'none';
            if (receiptShipping) receiptShipping.style.display = 'none';
            if (receiptFinalTotal) receiptFinalTotal.style.display = 'none';
            const receiptAddressDiv = document.getElementById('receiptAddress');
            if (receiptAddressDiv) receiptAddressDiv.style.display = 'none';
        }
    } else {
        if (receiptItems) receiptItems.innerHTML = '<p style="text-align: center; color: #aaa;">No recent order details found. Please place an order first.</p>';
        if (receiptSubtotal) receiptSubtotal.style.display = 'none';
        if (receiptShipping) receiptShipping.style.display = 'none';
        if (receiptFinalTotal) receiptFinalTotal.style.display = 'none';
        const receiptAddressDiv = document.getElementById('receiptAddress');
        if (receiptAddressDiv) receiptAddressDiv.style.display = 'none';
    }

    if (typeof initializePageAnimation === 'function') {
        initializePageAnimation();
    }
});