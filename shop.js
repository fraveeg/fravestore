// shop.js - Specific to Framed Posters
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        // These are your Framed Poster products.
        // The `basePrice` is now explicitly set for each, and the select option values will be relative to this.
        { id: 'fp1', name: "PORSCHE 911 RS", image: "images/frames1.jpg", basePrice: 250 },
        { id: 'fp2', name: "CR7 X NIKE", image: "images/frames2.jpg", basePrice: 250 },
        { id: 'fp3', name: "Mclaren 7205", image: "images/frames3.jpg", basePrice: 250 },
        { id: 'fp4', name: "TOYOTA SUPRA MK4", image: "images/frames4.jpg", basePrice: 250 },
        { id: 'fp5', name: "NISSAN SKYLINE", image: "images/frames5.jpg", basePrice: 250 },
        { id: 'fp6', name: "PORSCHE GT3 RS", image: "images/frames6.jpg", basePrice: 250 },
        { id: 'fp7', name: "AMERICA PSYCHO", image: "images/frames7.jpg", basePrice: 250 },
        { id: 'fp8', name: "INTERSTELLAR", image: "images/frames8.jpg", basePrice: 250 },
        { id: 'fp9', name: "SHAMS ELZNATY", image: "images/frames9.jpg", basePrice: 250 },
        { id: 'fp10', name: "PULP FICTION", image: "images/frames10.jpg", basePrice: 250 },
    ];

    const container = document.getElementById("productsContainer");
    const basketItems = document.getElementById("basketItems"); // Already present in script.js, but good to have local reference
    const totalPrice = document.getElementById("totalPrice"); // Already present in script.js

    // Load basket from localStorage
    let basket = JSON.parse(localStorage.getItem('fraveBasket')) || [];

    // Render products on page
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img" style="cursor:pointer;">
            <div class="product-name">${product.name}</div>
            <label class="price">Size:
                <select id="size-${index}">
                    <option value="${product.basePrice}">Small - ${product.basePrice} L.E</option>
                    <option value="${product.basePrice + 50}">Medium - ${product.basePrice + 50} L.E</option>
                </select>
            </label>
            <label class="quantity-label">Qty:
                <input type="number" min="1" value="1" id="qty-${index}">
            </label>
            <button class="add-btn" data-index="${index}">Add to Basket</button>
        `;

        container.appendChild(productDiv);
    });

    // Add event listener on container for Add to Basket buttons
    container.addEventListener('click', e => {
        if (!e.target.classList.contains('add-btn')) return;

        const index = parseInt(e.target.getAttribute('data-index'));
        const product = products[index];
        const size = document.getElementById(`size-${index}`).value;
        const qty = parseInt(document.getElementById(`qty-${index}`).value);
        const pricePerUnit = parseInt(size);
        const totalItemPrice = pricePerUnit * qty;

        // Check if item with same name and size is already in basket
        const existingIndex = basket.findIndex(item => item.id === product.id && item.size === size);

        if (existingIndex > -1) {
            // Update existing item quantity and total
            basket[existingIndex].qty += qty;
            basket[existingIndex].total += totalItemPrice;
        } else {
            // Add new item
            basket.push({
                id: product.id, // Add ID for better tracking
                name: product.name,
                image: product.image,
                size: size, // For Framed Posters, size is also the price
                price: pricePerUnit, // Store individual item price
                qty: qty,
                total: totalItemPrice,
                category: "Framed Poster" // Add category
            });
        }

        updateBasketDisplay(); // Call global function
        const basketMenu = document.getElementById("basketMenu");
        if (basketMenu) {
            toggleMenuWithAnimation(basketMenu, true); // Use global animation function
            // Close settings if open
            if(settingsMenu.classList.contains('is-visible')) {
                toggleMenuWithAnimation(settingsMenu, false);
                settingsIcon.classList.remove('rotated');
            }
        }
    });

    // Initial update of basket display when page loads
    updateBasketDisplay();
});