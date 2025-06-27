// shop.js - Specific to Framed Posters (Updated for single custom product & WhatsApp instruction & Add to Cart notification)
document.addEventListener('DOMContentLoaded', () => {
    console.log("shop.js: DOMContentLoaded fired. Initializing page elements.");

    // Define initial product data for Framed Posters
    // Filter and then SORT to put the custom product first (assuming allProducts is global from script.js)
    const initialProductsData = allProducts
        .filter(p => p.category === "Framed Poster")
        .sort((a, b) => (b.isCustomizable || false) - (a.isCustomizable || false));

    let currentFilteredProducts = [...initialProductsData]; // This will hold the products displayed after filtering/sorting

    const container = document.getElementById("productsContainer");
    const productCountSpan = document.getElementById("productCount");
    const notificationContainer = document.getElementById('notificationContainer'); // Get the global notification container

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
    let currentMaxPrice = parseInt(priceRangeSlider ? priceRangeSlider.max : 500);
    let currentSortOrder = 'default';

    const CUSTOM_DESIGN_FEE = 20;

    if (!container || !productCountSpan || !notificationContainer) { // Check for notificationContainer
        console.error("shop.js: CRITICAL ERROR: Essential DOM elements not found. Page might not render correctly.");
        return;
    }
    console.log("shop.js: All major DOM elements identified.");


    /**
     * Renders products to the page.
     */
    function renderProducts(productsToRender) {
        console.log(`renderProducts() called. Rendering ${productsToRender.length} products.`);
        container.innerHTML = '';
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
                            After ordering, please send your image via WhatsApp to **01285272577**, including your **name from the order** and **shipment number**.
                        </p>
                    </div>
                </div>
            ` : '';

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img" style="cursor:pointer;">
                <div class="product-name">${product.name}</div>
                <label class="price">Size:
                    <select id="size-${product.id}">
                        <option value="${product.basePrice}">Small - ${product.basePrice} L.E</option>
                        <option value="${product.basePrice + 50}">Medium - ${product.basePrice + 50} L.E</option>
                    </select>
                </label>
                <label class="quantity-label">Qty:
                    <input type="number" min="1" value="1" id="qty-${product.id}">
                </label>
                ${customDesignHtml}
                <button class="add-btn" data-id="${product.id}">Add to Basket</button>
            `;
            container.appendChild(productDiv);

            // Conditional logic for custom design elements
            if (product.isCustomizable) {
                const customCheckbox = productDiv.querySelector(`#custom-${product.id}`);
                const uploadSection = productDiv.querySelector(`#upload-section-${product.id}`);
                const imageInput = productDiv.querySelector(`#image-${product.id}`);
                const addBtn = productDiv.querySelector('.add-btn');

                if (customCheckbox && uploadSection && imageInput && addBtn) {
                    // Initially disable button if checkbox is checked AND no file is selected
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

    /**
     * Updates the displayed number of products.
     */
    function updateProductCount(count) {
        if (productCountSpan) {
            productCountSpan.innerText = `${count} Products`;
            console.log(`Product count updated to: ${count}`);
        }
    }

    /**
     * Filters and sorts products based on current filter criteria.
     */
    function filterProducts() {
        console.log("filterProducts() called.");
        console.log(`Filter criteria: Min Price=${currentMinPrice}, Max Price=${currentMaxPrice}, Sort Order='${currentSortOrder}'`);

        let filtered = initialProductsData.filter(product => {
            const productPrice = product.basePrice;
            return productPrice >= currentMinPrice && productPrice <= currentMaxPrice;
        });

        console.log(`After price filtering: ${filtered.length} products.`);

        // Apply sorting based on currentSortOrder
        if (currentSortOrder === 'lowToHigh') {
            filtered.sort((a, b) => a.basePrice - b.basePrice);
            console.log("Products sorted: Low to High.");
        } else if (currentSortOrder === 'highToLow') {
            filtered.sort((a, b) => b.basePrice - a.basePrice);
            console.log("Products sorted: High to Low.");
        } else {
            // Re-sort to default (custom product first, then original order)
            filtered.sort((a, b) => {
                const defaultSort = initialProductsData.indexOf(a) - initialProductsData.indexOf(b);
                if (a.isCustomizable && !b.isCustomizable) return -1;
                if (!a.isCustomizable && b.isCustomizable) return 1;
                return defaultSort;
            });
            console.log("Products sorted: Default Order.");
        }

        currentFilteredProducts = filtered;
        renderProducts(currentFilteredProducts);
        console.log("filterProducts() finished. renderProducts() called.");
    }

    /**
     * Resets all filters to their default state.
     */
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

    // --- Add to Basket Event Listener ---
    container.addEventListener('click', e => {
        if (!e.target.classList.contains('add-btn')) return;
        // Check if button is disabled (for custom products without selected file)
        if (e.target.disabled) {
            console.log("Add to Basket button is disabled. Preventing action.");
            showNotification('Please select your custom image first.', 'warning');
            return;
        }
        console.log("Add to Basket button CLICKED!");

        const productId = e.target.getAttribute('data-id');
        const product = initialProductsData.find(p => p.id === productId);

        if (!product) {
            console.error("shop.js: Product not found in initialProductsData for ID:", productId);
            return;
        }

        const sizeSelect = document.getElementById(`size-${productId}`);
        const size = sizeSelect ? sizeSelect.value : product.basePrice.toString();
        const qtyInput = document.getElementById(`qty-${productId}`);
        const qty = qtyInput ? parseInt(qtyInput.value) : 1;

        let isCustomDesign = false;
        let customImageFileName = 'N/A';

        if (product.isCustomizable) {
            const customCheckbox = document.getElementById(`custom-${productId}`);
            isCustomDesign = customCheckbox ? customCheckbox.checked : false;

            if (isCustomDesign) {
                const imageInput = document.getElementById(`image-${productId}`);
                customImageFileName = (imageInput && imageInput.files.length > 0) ?
                                      imageInput.files[0].name : 'Image not provided on order, client must send via WhatsApp.';
            }
        }

        let pricePerUnit = parseInt(size);
        if (isCustomDesign) {
            pricePerUnit += CUSTOM_DESIGN_FEE;
        }

        const totalItemPrice = pricePerUnit * qty;

        let basket = window.basket;

        const existingIndex = basket.findIndex(item =>
            item.id === product.id &&
            item.size === size &&
            item.isCustomDesign === isCustomDesign &&
            item.category === "Framed Poster"
        );

        if (existingIndex > -1) {
            basket[existingIndex].qty += qty;
            basket[existingIndex].total += totalItemPrice;
            console.log(`Updated existing item in basket: ${product.name}. New Qty: ${basket[existingIndex].qty}`);
        } else {
            basket.push({
                id: product.id,
                name: product.name,
                image: product.image,
                size: size,
                originalPrice: product.basePrice,
                price: pricePerUnit,
                qty: qty,
                total: totalItemPrice,
                category: "Framed Poster",
                isCustomDesign: isCustomDesign,
                customImageFileName: customImageFileName
            });
            console.log(`Added new item to basket: ${product.name}.`);
        }

        window.basket = basket;
        window.updateBasketDisplay();
        console.log("Basket display updated globally.");

        // Show "Item Added" notification
        showNotification(`${product.name} added to cart!`);

        const basketMenu = document.getElementById("basketMenu");
        if (basketMenu) {
            window.toggleMenuWithAnimation(basketMenu, true);
            // Close other menus if open
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
            // Close filter menu if open
            if (filterOverlay && filterOverlay.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(filterOverlay, false);
            }
        }
    });

    // ... (rest of Filter Event Listeners, no changes here) ...

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
        maxPriceOutput.innerText = `${priceRangeSlider.max} L.E`;
        priceRangeSlider.oninput = () => {
            currentMaxPrice = parseInt(priceRangeSlider.value);
            maxPriceOutput.innerText = `${currentMaxPrice} L.E`;
            console.log(`Price slider input: Max Price set to ${currentMaxPrice} L.E.`);
            filterProducts(); // Apply filters immediately on slider change for better UX
        };

        if (sortLowToHighRadio) sortLowToHighRadio.addEventListener('change', (e) => currentSortOrder = e.target.value);
        if (sortHighToLowRadio) sortHighToLowRadio.addEventListener('change', (e) => currentSortOrder = e.target.value);
        if (sortDefaultRadio) sortDefaultRadio.addEventListener('change', (e) => currentSortOrder = e.target.value);


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
        console.warn("shop.js: One or more filter elements not found. Filtering functionality might be disabled.");
    }

    // Initial render of products and update count
    renderProducts(currentFilteredProducts);
    updateProductCount(currentFilteredProducts.length);
    window.updateBasketDisplay();
    console.log("shop.js: Initial product render and basket update complete.");
});