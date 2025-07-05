// stickers.js - Full Code (Updated with Sorting and Notification)
document.addEventListener('DOMContentLoaded', () => {
    console.log("stickers.js: DOMContentLoaded fired. Initializing page elements.");

    // IMPORTANT: allProducts is now LOCALIZED to this file, removed from script.js
    const allProducts = [
        // --- NEW STICKERS COLLECTION (total 10 products with specific pricing) ---
        { id: 's1', name: "Stickers Pack 1", image: "images/sticker_collection1.jpg", category: "Sticker", price: 25 },
        { id: 's2', name: "CUSTOM STICKER PACK", image: "images/sticker_collection2.jpg", category: "Sticker", price: 25, isCustomizable: true }, // Made custom
        { id: 's3', name: "Stickers Pack 3", image: "images/sticker_collection3.jpg", category: "Sticker", price: 25 },
        { id: 's4', name: "Stickers Pack 4", image: "images/sticker_collection4.jpg", category: "Sticker", price: 25 },
        { id: 's5', name: "Stickers Pack 5", image: "images/sticker_collection5.jpg", category: "Sticker", price: 25 },
        { id: 's6', name: "Stickers Pack 6", image: "images/sticker_collection6.jpg", category: "Sticker", price: 25 },
        { id: 's7', name: "Stickers Pack 7", image: "images/sticker_collection7.jpg", category: "Sticker", price: 25 },
        { id: 's8', name: "Stickers Pack 8", image: "images/sticker_collection8.jpg", category: "Sticker", price: 25 },
        { id: 's9', name: "Stickers Pack 9", image: "images/sticker_collection9.jpg", category: "Sticker", price: 25 },
        { id: 's10', name: "Stickers Pack 10", image: "images/sticker_collection10.jpg", category: "Sticker", price: 25 },
    ];

   const initialProductsData = allProducts.filter(p => p.category === "Sticker");
    let currentFilteredProducts = [...initialProductsData];

    const container = document.getElementById("productsContainer");
    const productCountSpan = document.getElementById("productCount");
    const notificationContainer = document.getElementById('notificationContainer'); // Unused in this snippet but kept for consistency

    const filterIcon = document.getElementById('filterIcon');
    const filterOverlay = document.getElementById('filterOverlay');
    const filterCloseBtn = document.getElementById('filterCloseBtn');
    const priceRangeSlider = document.getElementById('priceRangeSlider');
    const minPriceOutput = document.getElementById('minPrice');
    const maxPriceOutput = document.getElementById('maxPrice');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    const sortLowToHighRadio = document.getElementById('sortLowToHigh');
    const sortHighToLowRadio = document.getElementById('sortHighToLow');
    const sortDefaultRadio = document.getElementById('sortDefault');

    let currentMinPrice = 0;
    let currentMaxPrice = parseInt(priceRangeSlider ? priceRangeSlider.max : 50);
    let currentSortOrder = 'default';

    // Define custom sticker fee (assuming it's 0 as per previous request)
    const CUSTOM_DESIGN_FEE = 0; // The fee for custom designs

    if (!container || !productCountSpan) { // Removed notificationContainer as it's handled globally
        console.error("stickers.js: CRITICAL ERROR: Essential DOM elements not found. Page might not render correctly.");
        return;
    }
    console.log("stickers.js: All major DOM elements identified.");


    function renderProducts(productsToRender) {
        console.log(`renderProducts() called. Rendering ${productsToRender.length} products.`);
        container.innerHTML = ''; // Clear existing products
        if (productsToRender.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #aaa; padding: 50px;">No products found matching your criteria.</p>';
        }

        productsToRender.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            const customDesignHtml = product.isCustomizable ? `
                <div class="custom-design-option">
                    <label>
                        <input type="checkbox" id="custom-${product.id}" class="custom-design-checkbox">
                        Custom Design (+${CUSTOM_DESIGN_FEE} L.E)
                    </label>
                    <div class="custom-image-upload" id="upload-section-${product.id}" style="display:none;">
                        <input type="file" id="image-${product.id}" accept="image/*">
                        <p class="custom-design-info">
                            After ordering, please send your image via WhatsApp to **01070083963**, including your **full name from the order** and **shipment number**.
                        </p>
                    </div>
                </div>
            ` : '';

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img" style="cursor:pointer;">
                <div class="product-name">${product.name}</div>
                <p class="price">${product.price} L.E</p>
                <label class="quantity-label">Qty:
                    <input type="number" min="1" value="1" id="qty-${product.id}">
                </label>
                ${customDesignHtml}
                <button class="add-btn" data-id="${product.id}">Add to Basket</button>
            `;
            container.appendChild(productDiv);

            if (product.isCustomizable) {
                const customCheckbox = productDiv.querySelector(`#custom-${product.id}`);
                const uploadSection = productDiv.querySelector(`#upload-section-${product.id}`);
                const imageInput = productDiv.querySelector(`#image-${product.id}`);
                const addBtn = productDiv.querySelector('.add-btn');

                if (customCheckbox && uploadSection && imageInput && addBtn) {
                    addBtn.disabled = customCheckbox.checked && imageInput.files.length === 0;

                    customCheckbox.addEventListener('change', () => {
                        uploadSection.style.display = customCheckbox.checked ? 'block' : 'none';
                        addBtn.disabled = customCheckbox.checked && imageInput.files.length === 0;
                        console.log(`Custom checkbox for ${product.name} changed to: ${customCheckbox.checked}. Button disabled: ${addBtn.disabled}`);
                    });

                    imageInput.addEventListener('change', () => {
                        addBtn.disabled = customCheckbox.checked && imageInput.files.length === 0;
                        console.log(`Image input for ${product.name} changed. File selected: ${imageInput.files.length > 0}. Button disabled: ${addBtn.disabled}`);
                    });
                }
            }
        });
        updateProductCount(productsToRender.length);
    }

    function updateProductCount(count) {
        if (productCountSpan) {
            productCountSpan.innerText = `${count} Products`;
            console.log(`Product count updated to: ${count}`);
        }
    }

    function filterProducts() {
        console.log("filterProducts() called.");
        console.log(`Filter criteria: Min Price=${currentMinPrice}, Max Price=${currentMaxPrice}, Sort Order='${currentSortOrder}'`);

        let filtered = initialProductsData.filter(product => {
            const productPrice = product.price;
            const matchesPrice = productPrice >= currentMinPrice && productPrice <= currentMaxPrice;
            return matchesPrice;
        });

        console.log(`After price filtering: ${filtered.length} products.`);

        if (currentSortOrder === 'lowToHigh') {
            filtered.sort((a, b) => a.price - b.price);
            console.log("Products sorted: Low to High.");
        } else if (currentSortOrder === 'highToLow') {
            filtered.sort((a, b) => b.price - a.price);
            console.log("Products sorted: High to Low.");
        } else {
            // Default sort, keep custom products at the top if they exist, then by original index
            filtered.sort((a, b) => {
                if (a.isCustomizable && !b.isCustomizable) return -1;
                if (!a.isCustomizable && b.isCustomizable) return 1;
                return initialProductsData.indexOf(a) - initialProductsData.indexOf(b);
            });
            console.log("Products sorted: Default Order (original index, custom on top).");
        }
        currentFilteredProducts = filtered;
        renderProducts(currentFilteredProducts);
        console.log("filterProducts() finished. renderProducts() called.");
    }

    function clearFilters() {
        console.log("clearFilters() called. Resetting filter state.");
        if (priceRangeSlider) {
            priceRangeSlider.value = priceRangeSlider.max;
            currentMaxPrice = parseInt(priceRangeSlider.max);
            minPriceOutput.innerText = `${priceRangeSlider.min} L.E`;
            maxPriceOutput.innerText = `${priceRangeSlider.max} L.E`;
            console.log("Price slider reset.");
        }

        if (sortDefaultRadio) sortDefaultRadio.checked = true;
        currentSortOrder = 'default';
        console.log("Sort order reset to 'default'.");

        filterProducts();
        console.log("filterProducts() called from clearFilters().");
    }

    container.addEventListener('click', e => {
        if (!e.target.classList.contains('add-btn')) return;
        if (e.target.disabled) { // Check if button is disabled
            const productId = e.target.getAttribute('data-id');
            const product = initialProductsData.find(p => p.id === productId);
            if (product && product.isCustomizable) {
                const customCheckbox = document.getElementById(`custom-${productId}`);
                if (customCheckbox && !customCheckbox.checked) {
                    window.showNotification('You must select "Custom Design" for this product.', 'warning');
                } else {
                    window.showNotification('Please select your custom image file first.', 'warning');
                }
            } else {
                 window.showNotification('Item cannot be added to cart.', 'warning');
            }
            return;
        }
        console.log("Add to Basket button CLICKED!");

        const productId = e.target.getAttribute('data-id');
        const product = initialProductsData.find(p => p.id === productId);

        if (!product) {
            console.error("stickers.js: Product not found in initialProductsData for ID:", productId);
            return;
        }

        const qtyInput = document.getElementById(`qty-${productId}`);
        const qty = qtyInput ? parseInt(qtyInput.value) : 1;

        let pricePerUnit = product.price;
        let isCustomDesign = false;
        let customImageFileName = 'N/A';

        // Handle custom design logic for stickers
        if (product.isCustomizable) {
            const customCheckbox = document.getElementById(`custom-${productId}`);
            isCustomDesign = customCheckbox ? customCheckbox.checked : false;

            if (isCustomDesign) {
                const imageInput = document.getElementById(`image-${productId}`);
                customImageFileName = (imageInput && imageInput.files.length > 0) ?
                                      imageInput.files[0].name : 'Image not provided on order, client must send via WhatsApp.';
                pricePerUnit += CUSTOM_DESIGN_FEE; // Add custom fee if applicable
            }
        }

        const totalItemPrice = pricePerUnit * qty;

        let basket = window.basket;

        const existingIndex = basket.findIndex(item =>
            item.id === product.id &&
            item.category === "Sticker" &&
            item.isCustomDesign === isCustomDesign // Crucial for distinguishing custom vs non-custom same product
        );

        if (existingIndex > -1) {
            basket[existingIndex].qty += qty;
            basket[existingIndex].total += totalItemPrice;
            // If it's a custom design being added to an existing custom design, update filename if it changed
            if (isCustomDesign) {
                basket[existingIndex].customImageFileName = customImageFileName;
            }
            console.log(`Updated existing item in basket: ${product.name}. New Qty: ${basket[existingIndex].qty}`);
        } else {
            basket.push({
                id: product.id,
                name: product.name,
                image: product.image,
                originalPrice: product.price,
                price: pricePerUnit,
                qty: qty,
                total: totalItemPrice,
                category: "Sticker",
                isCustomDesign: isCustomDesign,
                customImageFileName: customImageFileName
            });
            console.log(`Added new item to basket: ${product.name}.`);
        }

        window.basket = basket;
        window.updateBasketDisplay();
        console.log("Basket display updated globally.");

        window.showNotification(`${product.name} added to cart!`);

        const basketMenu = document.getElementById("basketMenu");
        if (basketMenu) {
            window.toggleMenuWithAnimation(basketMenu, true);
            if (window.settingsMenu && window.settingsMenu.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(window.settingsMenu, false);
                window.toggleMenuWithAnimation(window.categorySubMenu, false);
                window.settingsIcon && window.settingsIcon.classList.remove('rotated');
            }
            if (window.searchOverlay && window.searchOverlay.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(window.searchOverlay, false);
                window.searchInput.value = '';
                window.searchResults.innerHTML = '';
            }
            if (filterOverlay && filterOverlay.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(filterOverlay, false);
            }
        }
    });

    if (filterIcon && filterOverlay && filterCloseBtn && priceRangeSlider && applyFiltersBtn && clearFiltersBtn) {
        console.log("Filter elements found. Attaching filter event listeners.");

        filterIcon.onclick = (e) => {
            e.stopPropagation();
            console.log("Filter icon CLICKED!");
            if (filterOverlay.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(filterOverlay, false);
            } else {
                window.toggleMenuWithAnimation(filterOverlay, true);
                window.toggleMenuWithAnimation(window.settingsMenu, false);
                window.toggleMenuWithAnimation(window.basketMenu, false);
                window.toggleMenuWithAnimation(window.searchOverlay, false);
                window.settingsIcon && window.settingsIcon.classList.remove('rotated');
            }
        };

        filterCloseBtn.onclick = () => {
            window.toggleMenuWithAnimation(filterOverlay, false);
            console.log("Filter close button CLICKED. Filter overlay closing.");
        };

        minPriceOutput.innerText = `${priceRangeSlider.min} L.E`;
        maxPriceOutput.innerText = `${currentMaxPrice} L.E`;
        priceRangeSlider.oninput = () => {
            currentMaxPrice = parseInt(priceRangeSlider.value);
            maxPriceOutput.innerText = `${currentMaxPrice} L.E`;
            filterProducts(); // Apply filters immediately on slider change for better UX
        };

        if (sortLowToHighRadio) sortLowToHighRadio.addEventListener('change', filterProducts);
        if (sortHighToLowRadio) sortHighToLowRadio.addEventListener('change', filterProducts);
        if (sortDefaultRadio) sortDefaultRadio.addEventListener('change', filterProducts);
        console.log("Sort By radio button listeners attached.");


        applyFiltersBtn.onclick = () => {
            console.log("Apply Filters button CLICKED! Initiating filtering process...");
            filterProducts();
            window.toggleMenuWithAnimation(filterOverlay, false);
            console.log("Filter overlay closed after applying filters.");
        };

        clearFiltersBtn.onclick = () => {
            console.log("Clear Filters button CLICKED! Resetting filters...");
            clearFilters();
            window.toggleMenuWithAnimation(filterOverlay, false);
            console.log("Filter overlay closed after clearing filters.");
        };

        filterOverlay.addEventListener('click', (e) => e.stopPropagation());
        console.log("Event listeners attached for filter overlay controls.");

    } else {
        console.warn("stickers.js: One or more filter elements not found. Filtering functionality might be disabled.");
    }

    // Initial render of products and update count
    filterProducts(); // Call filterProducts initially to apply any default filters and render products based on initial UI state
    // renderProducts(currentFilteredProducts); // Redundant, filterProducts calls this
    // updateProductCount(currentFilteredProducts.length); // Redundant, filterProducts calls this
    window.updateBasketDisplay();
    console.log("stickers.js: Initial product render and basket update complete.");
});