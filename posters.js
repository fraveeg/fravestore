// posters.js - Specific to Posters
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        // Example Poster products. Add your actual poster images and names here.
        { id: 'p1', name: "Vintage Car Poster", image: "images/poster_example1.jpg", price: 100 },
        { id: 'p2', name: "Abstract Art Poster", image: "images/poster_example2.jpg", price: 100 },
        { id: 'p3', name: "Minimalist City Poster", image: "images/poster_example3.jpg", price: 100 },
        { id: 'p4', name: "Nature Landscape Poster", image: "images/poster_example4.jpg", price: 100 },
        // Add more poster products as needed
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
        const existingIndex = basket.findIndex(item => item.id === product.id && item.category === "Poster");

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
                category: "Poster" // Add category
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