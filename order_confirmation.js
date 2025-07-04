// order_confirmation.js - Handles displaying order details after successful checkout
document.addEventListener('DOMContentLoaded', () => {
    console.log("order_confirmation.js: DOMContentLoaded fired. Attempting to display order details.");

    const shipmentNumberDisplay = document.getElementById('shipmentNumberDisplay');
    const receiptItemsContainer = document.getElementById('receiptItems');
    const receiptSubtotal = document.getElementById('receiptSubtotal');
    const receiptShipping = document.getElementById('receiptShipping');
    const receiptFinalTotal = document.getElementById('receiptFinalTotal');

    // Shipping Address Elements
    const receiptFullName = document.getElementById('receiptFullName');
    const receiptEmail = document.getElementById('receiptEmail');
    const receiptPhone = document.getElementById('receiptPhone');
    const receiptCity = document.getElementById('receiptCity');
    const receiptBuildingNo = document.getElementById('receiptBuildingNo');
    const receiptFloorNo = document.getElementById('receiptFloorNo');
    const receiptApartmentNo = document.getElementById('receiptApartmentNo');
    const receiptLandmark = document.getElementById('receiptLandmark');
    const receiptAddressText = document.getElementById('receiptAddressText');


    // Retrieve order details from session storage
    const lastOrderDetailsJSON = sessionStorage.getItem('lastOrderDetails');
    let orderDetails = null;

    if (lastOrderDetailsJSON) {
        orderDetails = JSON.parse(lastOrderDetailsJSON);
        console.log("Loaded order details:", orderDetails);

        // Display Shipment Number
        if (shipmentNumberDisplay) {
            shipmentNumberDisplay.innerText = orderDetails['Shipment Number'] || 'N/A';
        }

        // Display Order Items
        if (receiptItemsContainer && orderDetails['Basket Items']) {
            receiptItemsContainer.innerHTML = ''; // Clear existing content
            orderDetails['Basket Items'].forEach(item => {
                let itemDescription = `${item.quantity}x ${item.name}`;
                if (item.category === "Framed Poster") {
                    itemDescription += ` (Size: ${item.size})`;
                    if (item.isCustomDesign) {
                        itemDescription += ` (Custom: ${item.customImageFileName || 'Image to be sent via WhatsApp'})`;
                    }
                } else if (item.category === "Poster Pack") {
                    itemDescription += ` (${item.packPosterCount} posters)`;
                    if (item.selectedDesigns && item.selectedDesigns.length > 0) {
                        itemDescription += `<br><span style="font-size:0.9em; color:#bbb;">Designs: ${item.selectedDesigns.map(d => d.name).join(', ')}</span>`;
                    }
                }
                
                receiptItemsContainer.innerHTML += `
                    <div class="receipt-item">
                        <span>${itemDescription}</span>
                        <span>${item.totalItemPrice} L.E</span>
                    </div>
                `;
            });
        }

        // Display Totals
        if (receiptSubtotal) receiptSubtotal.innerText = `Subtotal: ${orderDetails['Subtotal Price'] || '0 L.E'}`;
        if (receiptShipping) receiptShipping.innerText = `Shipping: ${orderDetails['Shipping Fee'] || '0 L.E'}`;
        if (receiptFinalTotal) receiptFinalTotal.innerText = `Total: ${orderDetails['Final Total Price'] || '0 L.E'}`;

        // Display Shipping Information
        if (receiptFullName) receiptFullName.innerText = orderDetails['Full Name'] || 'N/A';
        if (receiptEmail) receiptEmail.innerText = orderDetails['Email'] || 'N/A';
        if (receiptPhone) receiptPhone.innerText = orderDetails['Phone Number'] || 'N/A';
        if (receiptCity) receiptCity.innerText = orderDetails['City'] || 'N/A';
        if (receiptBuildingNo) receiptBuildingNo.innerText = orderDetails['Building Number'] || 'N/A';
        if (receiptFloorNo) receiptFloorNo.innerText = orderDetails['Floor Number'] || 'N/A';
        if (receiptApartmentNo) receiptApartmentNo.innerText = orderDetails['Apartment Number'] || 'N/A';
        if (receiptLandmark) receiptLandmark.innerText = orderDetails['Nearest Landmark'] || 'N/A';
        if (receiptAddressText) receiptAddressText.innerText = orderDetails['Street Address'] || 'N/A';

        // Optionally, clear the lastOrderDetails from session storage after displaying
        // to prevent it from showing up on subsequent visits if not intended.
        // sessionStorage.removeItem('lastOrderDetails');

    } else {
        console.warn("No order details found in sessionStorage. Displaying fallback message.");
        // Fallback for when no order details are found
        if (shipmentNumberDisplay) shipmentNumberDisplay.innerText = 'Order details not found.';
        if (receiptItemsContainer) receiptItemsContainer.innerHTML = '<p style="text-align: center; color: #ccc;">No order details to display.</p>';
        if (receiptSubtotal) receiptSubtotal.innerText = 'Subtotal: N/A';
        if (receiptShipping) receiptShipping.innerText = 'Shipping: N/A';
        if (receiptFinalTotal) receiptFinalTotal.innerText = 'Total: N/A';

        // Hide address section if no details
        const receiptAddressDiv = document.getElementById('receiptAddress');
        if (receiptAddressDiv) receiptAddressDiv.style.display = 'none';
    }

    // Ensure basket is clear for a fresh start or if user returns to shop
    localStorage.removeItem('fraveBasket');
    window.updateBasketDisplay(); // Update global basket display to show it's empty
});
