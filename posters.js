// posters.js - Specific to Posters
document.addEventListener('DOMContentLoaded', () => {
    // console.log("posters.js DOMContentLoaded fired.");

    // Filter allProducts to get only Posters
    const products = allProducts.filter(p => p.category === "Poster");

    const container = document.getElementById("productsContainer");
    if (!container) {
        console.error("productsContainer not found on posters.html!");
        return;
    }

    // Render products on page
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img" style="cursor:pointer;">
            <div class="product-name">${product.name}</div>
            <p class="price">${product.price} L.E</p>
            <label class="quantity-label">Qty:
                <input type="number" min="1" value="1" id="qty-${product.id}">
            </label>
            <button class="add-btn" data-id="${product.id}" data-index="${index}">Add to Basket</button>
        `;
        container.appendChild(productDiv);
    });

    // Add event listener on container for Add to Basket buttons
    container.addEventListener('click', e => {
        if (!e.target.classList.contains('add-btn')) return;

        const productId = e.target.getAttribute('data-id');
        const product = products.find(p => p.id === productId);

        if (!product) {
            console.error("Product not found:", productId);
            return;
        }

        const qty = parseInt(document.getElementById(`qty-${productId}`).value);
        const totalItemPrice = product.price * qty;

        // Use global basket
        let basket = window.basket;

        const existingIndex = basket.findIndex(item => item.id === product.id && item.category === "Poster");

        if (existingIndex > -1) {
            basket[existingIndex].qty += qty;
            basket[existingIndex].total += totalItemPrice;
        } else {
            basket.push({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                qty: qty,
                total: totalItemPrice,
                category: "Poster"
            });
        }

        // Update global basket and its display
        window.basket = basket;
        window.updateBasketDisplay();

        // Show basket with animation using global function
        const basketMenu = document.getElementById("basketMenu");
        if (basketMenu) {
            window.toggleMenuWithAnimation(basketMenu, true);
            // Close other menus if open
            window.toggleMenuWithAnimation(settingsMenu, false);
            window.toggleMenuWithAnimation(categorySubMenu, false);
            settingsIcon && settingsIcon.classList.remove('rotated');
            window.toggleMenuWithAnimation(searchOverlay, false);
        }
    });

    // Initial update of basket display when page loads
    window.updateBasketDisplay();
});