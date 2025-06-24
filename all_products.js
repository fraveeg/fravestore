// all_products.js - Combines all product types
document.addEventListener('DOMContentLoaded', () => {
    // console.log("all_products.js DOMContentLoaded fired.");

    // Use the global 'allProducts' array from script.js
    const products = allProducts;

    const container = document.getElementById("productsContainer");
    if (!container) {
        console.error("productsContainer not found on all_products.html!");
        return;
    }

    // Render all products
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        let priceHtml = '';
        let inputId = `qty-${product.id}`; // Unique ID for quantity input

        // Determine price display and input based on category
        if (product.category === "Framed Poster") {
            priceHtml = `
                <label class="price">Size:
                    <select id="size-${product.id}">
                        <option value="${product.basePrice}">Small - ${product.basePrice} L.E</option>
                        <option value="${product.basePrice + 50}">Medium - ${product.basePrice + 50} L.E</option>
                    </select>
                </label>
            `;
        } else {
            priceHtml = `<p class="price">${product.price} L.E</p>`;
        }

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img" style="cursor:pointer;">
            <div class="product-name">${product.name}</div>
            ${priceHtml}
            <label class="quantity-label">Qty:
                <input type="number" min="1" value="1" id="${inputId}">
            </label>
            <button class="add-btn" data-id="${product.id}" data-category="${product.category}">Add to Basket</button>
        `;
        container.appendChild(productDiv);
    });

    // Add event listener on container for Add to Basket buttons
    container.addEventListener('click', e => {
        if (!e.target.classList.contains('add-btn')) return;

        const productId = e.target.getAttribute('data-id');
        const productCategory = e.target.getAttribute('data-category');
        const product = products.find(p => p.id === productId);

        if (!product) {
            console.error("Product not found:", productId);
            return;
        }

        let pricePerUnit;
        if (productCategory === "Framed Poster") {
            const sizeSelect = document.getElementById(`size-${productId}`);
            pricePerUnit = parseInt(sizeSelect.value);
        } else {
            pricePerUnit = product.price;
        }

        const qty = parseInt(document.getElementById(`qty-${productId}`).value);
        const totalItemPrice = pricePerUnit * qty;

        // Use global basket
        let basket = window.basket;

        const existingIndex = basket.findIndex(item =>
            item.id === product.id &&
            item.category === productCategory &&
            (productCategory !== "Framed Poster" || item.size === pricePerUnit.toString()) // Compare size for framed posters
        );

        if (existingIndex > -1) {
            basket[existingIndex].qty += qty;
            basket[existingIndex].total += totalItemPrice;
        } else {
            const newItem = {
                id: product.id,
                name: product.name,
                image: product.image,
                price: pricePerUnit, // Store the final unit price here
                qty: qty,
                total: totalItemPrice,
                category: productCategory
            };
            if (productCategory === "Framed Poster") {
                newItem.size = pricePerUnit.toString(); // Store size value if applicable
            }
            basket.push(newItem);
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