// stickers.js - Specific to Stickers
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        // Example Sticker products. Add your actual sticker images and names here.
        { id: 's1', name: "Cool Sticker Pack", image: "images/sticker_example1.jpg", price: 20 },
        { id: 's2', name: "Gaming Decal", image: "images/sticker_example2.jpg", price: 20 },
        { id: 's3', name: "Anime Sticker Set", image: "images/sticker_example3.jpg", price: 20 },
        { id: 's4', name: "Abstract Shape Stickers", image: "images/sticker_example4.jpg", price: 20 },
        // Add more sticker products as needed
    ];

    const container = document.getElementById("productsContainer");

    // Render products on page
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img" style="cursor:pointer;">
            <div class="product-name">${product.name}</div>
            <p class="price">${product.price} L.E</p>
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
        const qty = parseInt(document.getElementById(`qty-${index}`).value);
        const totalItemPrice = product.price * qty;

        // Load basket from localStorage (defined in script.js)
        let basket = JSON.parse(localStorage.getItem('fraveBasket')) || [];

        // Check if item with same ID is already in basket
        const existingIndex = basket.findIndex(item => item.id === product.id && item.category === "Sticker");

        if (existingIndex > -1) {
            basket[existingIndex].qty += qty;
            basket[existingIndex].total += totalItemPrice;
        } else {
            basket.push({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price, // Store individual item price
                qty: qty,
                total: totalItemPrice,
                category: "Sticker" // Add category
            });
        }

        localStorage.setItem('fraveBasket', JSON.stringify(basket)); // Save updated basket
        updateBasketDisplay(); // Call global function to update basket UI
        const basketMenu = document.getElementById("basketMenu");
        if (basketMenu) {
            toggleMenuWithAnimation(basketMenu, true);
             if(settingsMenu.classList.contains('is-visible')) {
                toggleMenuWithAnimation(settingsMenu, false);
                settingsIcon.classList.remove('rotated');
            }
        }
    });

    // Ensure initial basket display is updated
    updateBasketDisplay();
});