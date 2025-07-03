// order_confirmation.js - Full Code (Updated to display Shipment Number and all details including Poster Packs)
document.addEventListener('DOMContentLoaded', () => {
    // console.log("order_confirmation.js DOMContentLoaded fired.");

    const shipmentNumberDisplay = document.getElementById('shipmentNumberDisplay');
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

            // Display Shipment Number
            if (shipmentNumberDisplay) {
                shipmentNumberDisplay.innerText = orderDetails['Shipment Number'] || 'N/A';
            }

            // Display order items
            if (receiptItems && orderDetails['Basket Items'] && orderDetails['Basket Items'].length > 0) {
                receiptItems.innerHTML = '<h4>Items:</h4>';
                orderDetails['Basket Items'].forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'receipt-item';
                    let itemDetailText = '';

                    if (item.category === "Poster Pack") {
                        let designsSummary = '';
                        if (item.selectedDesigns && item.selectedDesigns.length > 0) {
                            // Display up to 3 design names directly, then " and X more" if many
                            const designNames = item.selectedDesigns.map(d => d.name);
                            if (designNames.length <= 3) {
                                designsSummary = ` (${designNames.join(', ')})`;
                            } else {
                                designsSummary = ` (${designNames.slice(0, 3).join(', ')} and ${designNames.length - 3} more)`;
                            }
                        }
                        itemDetailText = `<span>${item.name} (${item.size}, ${item.packPosterCount} posters)${designsSummary} (${item.quantity}x)</span>`;
                    } else if (item.category === "Framed Poster") {
                        let customDetail = '';
                        if (item.isCustomDesign) {
                            const originalBasePrice = item.originalPrice; // Use stored originalPrice
                            const customFee = item.unitPrice - originalBasePrice; // Calculate actual custom fee added
                            customDetail = ` (Custom +${customFee}L.E - Image: ${item.customImageFileName})`;
                        }
                        let sizeDisplay = item.size && item.size !== 'N/A' ? `Size: ${item.size}` : `Price: ${item.originalPrice}`;
                        let subcategoryDisplay = item.subcategory && item.subcategory !== 'N/A' ? ` (${item.subcategory})` : '';

                        itemDetailText = `<span>${item.name}${subcategoryDisplay} (${item.quantity}x) [${sizeDisplay}]${customDetail}</span>`;
                    } else { // For Stickers (and any other categories)
                        // For stickers, item.price is the final unit price, originalPrice for base
                        let priceDisplay = `Price: ${item.originalPrice}`;
                        itemDetailText = `<span>${item.name} (${item.quantity}x) [${priceDisplay}]</span>`;
                    }

                    itemDiv.innerHTML = `
                        ${itemDetailText}
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
            if (receiptBuildingNo) receiptBuildingNo.innerText = orderDetails['Building Number'] || 'N/A';
            if (receiptFloorNo) receiptFloorNo.innerText = orderDetails['Floor Number'] || 'N/A';
            if (receiptApartmentNo) receiptApartmentNo.innerText = orderDetails['Apartment Number'] || 'N/A';
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