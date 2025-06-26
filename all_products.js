// all_products.js - Full Code (CRITICAL FIX FOR "NO PRODUCTS FOUND" & SORTING)
document.addEventListener('DOMContentLoaded', () => {
    console.log("all_products.js: DOMContentLoaded fired. Initializing page elements.");

    // --- CRITICAL DEBUGGING START ---
    // Check the global allProducts array from script.js
    console.log("DEBUG: allProducts array from script.js:", window.allProducts);
    if (!window.allProducts || window.allProducts.length === 0) {
        console.error("DEBUG: Global 'allProducts' array is empty or undefined. Products won't display.");
    }
    // --- CRITICAL DEBUGGING END ---


    const initialProductsData = allProducts; // This should be populated from window.allProducts
    console.log("DEBUG: initialProductsData after assignment:", initialProductsData);
    if (initialProductsData.length === 0) {
        console.warn("DEBUG: initialProductsData is empty, which will result in 'No products found'.");
    }

    let currentFilteredProducts = [...initialProductsData]; // This will hold the products displayed after filtering/sorting

    // Get DOM elements for product display
    const container = document.getElementById("productsContainer");
    const productCountSpan = document.getElementById("productCount");

    // Get DOM elements for filter overlay and its controls
    const filterIcon = document.getElementById('filterIcon');
    const filterOverlay = document.getElementById('filterOverlay');
    const filterCloseBtn = document.getElementById('filterCloseBtn');

    // Get DOM elements for Product Type filters
    const filterFramedCheckbox = document.getElementById('filterFramed');
    const filterPostersCheckbox = document.getElementById('filterPosters');
    const filterStickersCheckbox = document.getElementById('filterStickers');

    // Get DOM elements for Price Range filter
    const priceRangeSlider = document.getElementById('priceRangeSlider');
    const minPriceOutput = document.getElementById('minPrice');
    const maxPriceOutput = document.getElementById('maxPrice');

    // Get DOM elements for Sort By filter
    const sortLowToHighRadio = document.getElementById('sortLowToHigh');
    const sortHighToLowRadio = document.getElementById('sortHighToLow');
    const sortDefaultRadio = document.getElementById('sortDefault');

    // Filter state variables - IMPORTANT for persistent state
    let currentMinPrice = 0;
    // Ensure max price is correctly initialized from the slider's max attribute
    let currentMaxPrice = parseInt(priceRangeSlider ? priceRangeSlider.max : 500);
    let selectedTypes = []; // This will be populated in filterProducts based on checkbox state
    let currentSortOrder = 'default';

    // Critical check: Ensure the main containers are present
    if (!container || !productCountSpan) {
        console.error("all_products.js: CRITICAL ERROR: Products container or product count span not found. Page might not render correctly.");
        return;
    }
    console.log("all_products.js: All major DOM elements identified.");


    /**
     * Helper function to get the correct base price of a product based on its category.
     * This ensures consistent price comparison for sorting and filtering.
     */
    function getProductBasePrice(product) {
        // Return product.basePrice for Framed Posters, otherwise product.price
        return product.category === "Framed Poster" ? product.basePrice : product.price;
    }


    /**
     * Renders products to the page based on the provided array.
     */
    function renderProducts(productsToRender) {
        console.log(`renderProducts() called. Attempting to render ${productsToRender.length} products.`);
        container.innerHTML = ''; // Clear existing products

        if (productsToRender.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #aaa; padding: 50px;">No products found matching your criteria.</p>';
        } else {
            productsToRender.forEach((product) => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                let priceHtml = '';
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

                // Custom design HTML is explicitly NOT included for all_products.js
                // as per previous requirement, so it's omitted here.
                // If it were needed, it would be:
                // const customDesignHtml = product.isCustomizable ? `...` : '';

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-img" style="cursor:pointer;">
                    <div class="product-name">${product.name}</div>
                    ${priceHtml}
                    <label class="quantity-label">Qty:
                        <input type="number" min="1" value="1" id="qty-${product.id}">
                    </label>
                    <button class="add-btn" data-id="${product.id}" data-category="${product.category}">Add to Basket</button>
                `;
                container.appendChild(productDiv);
            });
        }
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

        // 1. Read current filter states from UI
        currentMinPrice = 0; // Assuming min is always 0 for now
        // IMPORTANT: Read price slider value here, as it might have changed
        currentMaxPrice = parseInt(priceRangeSlider.value);
        console.log(`Filter price range: ${currentMinPrice} to ${currentMaxPrice} L.E.`);

        selectedTypes = []; // Reset selected types based on current checkbox state
        if (filterFramedCheckbox && filterFramedCheckbox.checked) {
            selectedTypes.push('Framed Poster');
        }
        if (filterPostersCheckbox && filterPostersCheckbox.checked) {
            selectedTypes.push('Poster');
        }
        if (filterStickersCheckbox && filterStickersCheckbox.checked) {
            selectedTypes.push('Sticker');
        }

        // --- CRITICAL DEBUGGING START ---
        if (selectedTypes.length === 0 && (filterFramedCheckbox || filterPostersCheckbox || filterStickersCheckbox)) {
            console.warn("DEBUG: No product types are currently selected for filtering. This will result in 0 products.");
        }
        console.log("DEBUG: Selected product types for filtering:", selectedTypes);
        // --- CRITICAL DEBUGGING END ---

        // Determine current sort order
        if (sortLowToHighRadio && sortLowToHighRadio.checked) {
            currentSortOrder = 'lowToHigh';
        } else if (sortHighToLowRadio && sortHighToLowRadio.checked) {
            currentSortOrder = 'highToLow';
        } else {
            currentSortOrder = 'default';
        }
        console.log("Current sort order:", currentSortOrder);


        // 2. Apply filtering
        let filtered = initialProductsData.filter(product => {
            // Get the correct base price for filtering comparison
            const productPrice = getProductBasePrice(product);

            const matchesPrice = productPrice >= currentMinPrice && productPrice <= currentMaxPrice;
            const matchesType = selectedTypes.includes(product.category);

            // console.log(`Product: ${product.name}, Price: ${productPrice}, Match Price: ${matchesPrice}, Type: ${product.category}, Match Type: ${matchesType}`); // Detailed debug
            return matchesPrice && matchesType;
        });

        console.log(`After initial filtering (price & type): ${filtered.length} products.`);


        // 3. Apply sorting
        if (currentSortOrder === 'lowToHigh') {
            filtered.sort((a, b) => getProductBasePrice(a) - getProductBasePrice(b));
            console.log("Products sorted: Low to High.");
        } else if (currentSortOrder === 'highToLow') {
            filtered.sort((a, b) => getProductBasePrice(b) - getProductBasePrice(a));
            console.log("Products sorted: High to Low.");
        } else {
            // Default sort: relies on the original `allProducts` array order
            // This is important because `allProducts` itself is ordered with custom products first.
            filtered.sort((a, b) => initialProductsData.indexOf(a) - initialProductsData.indexOf(b));
            console.log("Products sorted: Default Order (original index).");
        }

        currentFilteredProducts = filtered;
        renderProducts(currentFilteredProducts); // Re-render with filtered products
        console.log("filterProducts() finished. renderProducts() called with updated data.");
    }

    /**
     * Resets all filters to their default state.
     */
    function clearFilters() {
        console.log("clearFilters() called. Resetting filter state.");

        // Reset Price Range Slider to max and update state
        if (priceRangeSlider) {
            priceRangeSlider.value = priceRangeSlider.max;
            currentMaxPrice = parseInt(priceRangeSlider.max);
            minPriceOutput.innerText = `${priceRangeSlider.min} L.E`;
            maxPriceOutput.innerText = `${priceRangeSlider.max} L.E`;
            console.log("Price slider reset to max.");
        }

        // Reset Product Type Checkboxes to all checked
        // Make sure these checkboxes exist before trying to check them
        if (filterFramedCheckbox) filterFramedCheckbox.checked = true;
        if (filterPostersCheckbox) filterPostersCheckbox.checked = true;
        if (filterStickersCheckbox) filterStickersCheckbox.checked = true;
        console.log("Product type checkboxes reset to all checked.");
        // Re-initialize selectedTypes for clear filter application - this happens inside filterProducts() now based on checked state


        // Reset Sort Order to Default
        if (sortDefaultRadio) sortDefaultRadio.checked = true;
        currentSortOrder = 'default';
        console.log("Sort order reset to 'default'.");

        filterProducts(); // Re-apply filters with cleared state
        console.log("filterProducts() called from clearFilters().");
    }


    // --- Add to Basket Event Listener ---
    container.addEventListener('click', e => {
        if (!e.target.classList.contains('add-btn')) return;
        console.log("Add to Basket button CLICKED!");

        const productId = e.target.getAttribute('data-id');
        const productCategory = e.target.getAttribute('data-category');
        // Find product in the global allProducts array
        const product = allProducts.find(p => p.id === productId);

        if (!product) {
            console.error("all_products.js: Product not found in allProducts for ID:", productId);
            return;
        }

        let pricePerUnit;
        if (productCategory === "Framed Poster") {
            const sizeSelect = document.getElementById(`size-${productId}`);
            pricePerUnit = sizeSelect ? parseInt(sizeSelect.value) : product.basePrice;
        } else {
            pricePerUnit = product.price;
        }

        const qtyInput = document.getElementById(`qty-${productId}`);
        const qty = qtyInput ? parseInt(qtyInput.value) : 1;

        const totalItemPrice = pricePerUnit * qty;

        // Use global basket (from script.js)
        let basket = window.basket;

        const existingIndex = basket.findIndex(item =>
            item.id === product.id &&
            item.category === productCategory &&
            (productCategory !== "Framed Poster" || item.size === pricePerUnit.toString())
        );

        if (existingIndex > -1) {
            basket[existingIndex].qty += qty;
            basket[existingIndex].total += totalItemPrice;
            console.log(`Updated existing item in basket: ${product.name}. New Qty: ${basket[existingIndex].qty}`);
        } else {
            const newItem = {
                id: product.id,
                name: product.name,
                image: product.image,
                price: pricePerUnit,
                qty: qty,
                total: totalItemPrice,
                category: productCategory,
                isCustomDesign: false, // Explicitly set to false for these pages
                customImageFileName: 'N/A' // No image upload for these pages
            };
            if (productCategory === "Framed Poster") {
                newItem.size = pricePerUnit.toString();
                newItem.originalPrice = product.basePrice;
            } else {
                 newItem.originalPrice = product.price;
            }
            basket.push(newItem);
            console.log(`Added new item to basket: ${product.name}.`);
        }

        window.basket = basket;
        window.updateBasketDisplay();
        console.log("Basket display updated globally.");

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

    // --- Filter Event Listeners ---
    // Added null checks to ensure all elements are present before attaching listeners.
    if (filterIcon && filterOverlay && filterCloseBtn && priceRangeSlider && applyFiltersBtn && clearFiltersBtn &&
        filterFramedCheckbox && filterPostersCheckbox && filterStickersCheckbox &&
        sortLowToHighRadio && sortHighToLowRadio && sortDefaultRadio) {

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

        // Price range slider initialization and update
        // Ensure initial output matches slider's default value
        minPriceOutput.innerText = `${priceRangeSlider.min} L.E`;
        maxPriceOutput.innerText = `${currentMaxPrice} L.E`; // Set to initial value of slider
        priceRangeSlider.oninput = () => {
            currentMaxPrice = parseInt(priceRangeSlider.value);
            maxPriceOutput.innerText = `${currentMaxPrice} L.E`;
            console.log(`Price slider input: Max Price set to ${currentMaxPrice} L.E.`);
            filterProducts(); // Apply filters immediately on slider change for better UX
        };

        // Checkbox event listeners (these will trigger filterProducts directly)
        filterFramedCheckbox.addEventListener('change', filterProducts);
        filterPostersCheckbox.addEventListener('change', filterProducts);
        filterStickersCheckbox.addEventListener('change', filterProducts);
        console.log("Product type checkbox listeners attached.");

        // Sort By Radio Buttons (these will trigger filterProducts directly)
        sortLowToHighRadio.addEventListener('change', filterProducts);
        sortHighToLowRadio.addEventListener('change', filterProducts);
        sortDefaultRadio.addEventListener('change', filterProducts);
        console.log("Sort By radio button listeners attached.");


        applyFiltersBtn.onclick = () => {
            console.log("Apply Filters button CLICKED! Initiating filtering process...");
            // filterProducts() is already called on change events for checkboxes/radios/slider
            // This button primarily closes the filter overlay
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
        console.warn("all_products.js: One or more filter elements not found. Filtering functionality might be disabled.");
    }

    // Initial render of products and update count
    // Call filterProducts initially to apply any default filters and render products based on initial UI state
    filterProducts();
    window.updateBasketDisplay();
    console.log("all_products.js: Initial product render and basket update complete.");
});