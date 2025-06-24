// all_products.js - Combines all product types
document.addEventListener('DOMContentLoaded', () => {
    // We can use the 'allProducts' array defined in script.js
    // Make sure script.js is loaded BEFORE this script in your HTML
    const products = allProducts; // global variable from script.js

    const container = document.getElementById("productsContainer");

    // Render all products
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        let priceHtml = '';
        let productId = product.id; // Use the ID for product tracking

        // Determine price display and input based on category
        if (product.category === "Framed Poster") {
            priceHtml = `
                <label class="price">Size:
                    <select id="size-${productId}">
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
                <input type="number" min="1" value="1" id="qty-${productId}">
            </label>
            <button class="add-btn" data-id="${productId}" data-category="${product.category}">Add to Basket</button>
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

        // Load basket from localStorage (defined in script.js)
        let basket = JSON.parse(localStorage.getItem('fraveBasket')) || [];

        // Check if item with same ID and (for framed posters) size is already in basket
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
                price: pricePerUnit,
                qty: qty,
                total: totalItemPrice,
                category: productCategory
            };
            if (productCategory === "Framed Poster") {
                newItem.size = pricePerUnit.toString(); // Store size value if applicable
            }
            basket.push(newItem);
        }

        localStorage.setItem('fraveBasket', JSON.stringify(basket));
        updateBasketDisplay(); // Call global function
        const basketMenu = document.getElementById("basketMenu");
        if (basketMenu) {
            toggleMenuWithAnimation(basketMenu, true);
            if(settingsMenu.classList.contains('is-visible')) {
                toggleMenuWithAnimation(settingsMenu, false);
                settingsIcon.classList.remove('rotated');
            }
        }
    });

    updateBasketDisplay(); // Initial update of basket display
});