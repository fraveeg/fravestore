// poster_packs.js - Handles displaying poster packs and linking to selection page (Updated with pricing from user's image)
document.addEventListener('DOMContentLoaded', () => {
    console.log("poster_packs.js: DOMContentLoaded fired. Initializing poster packs page.");

    const allProducts = [
        // Define your Poster Pack products here with exact pricing from the image.
        {
            id: 'pack5',
            name: "5 Posters Pack",
            image: "images/poster_pack_5.jpg", // Ensure this image exists
            category: "Poster Pack",
            posterCount: 5,
            basePrice: 40, // Price for 15x20
            sizePrices: {
                '15x20(mini)': 0,
                '20x30(small)': 20, // 60 - 40 = 20
                '30x40(medium)': 60 // 100 - 40 = 60
            }
        },
        {
            id: 'pack10',
            name: "10 Posters Pack",
            image: "images/poster_pack_10.jpg", // Ensure this image exists
            category: "Poster Pack",
            posterCount: 10,
            basePrice: 70, // Price for 15x20
            sizePrices: {
                '15x20(mini)': 0,
                '20x30(small)': 30, // 100 - 70 = 30
                '30x40(medium)': 105 // 175 - 70 = 105
            }
        },
        {
            id: 'pack20',
            name: "20 Posters Pack",
            image: "images/poster_pack_20.jpg", // Ensure this image exists
            category: "Poster Pack",
            posterCount: 20,
            basePrice: 110, // Price for 15x20
            sizePrices: {
                '15x20(mini)': 0,
                '20x30(small)': 40, // 150 - 110 = 40
                '30x40(medium)': 240 // 350 - 110 = 240 (assuming the second 20x30 in image is 30x40)
            }
        },
        {
            id: 'pack40',
            name: "40 Posters Pack",
            image: "images/poster_pack_40.jpg", // Ensure this image exists
            category: "Poster Pack",
            posterCount: 40,
            basePrice: 200, // Price for 15x20 (assuming 14x20 is 15x20)
            sizePrices: {
                '15x20(mini)': 0, // Assuming 14x20 is 15x20 here
                '20x30(small)': 50, // 250 - 200 = 50
                '30x40(medium)': 450 // 650 - 200 = 450
            }
        },
    ];

    const initialProductsDataFiltered = allProducts.filter(p => p.category === "Poster Pack");
    let currentFilteredProducts = [...initialProductsDataFiltered];

    const container = document.getElementById("productsContainer");
    const productCountSpan = document.getElementById("productCount");

    const filterIcon = document.getElementById('filterIcon');
    const filterOverlay = document.getElementById('filterOverlay');
    const filterCloseBtn = document.getElementById('filterCloseBtn');
    const priceRangeSlider = document.getElementById('priceRangeSlider');
    const minPriceOutput = document.getElementById('minPrice');
    const maxPriceOutput = document.getElementById('maxPrice');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    // Pack Size filter elements
    const pack5Checkbox = document.getElementById('pack5');
    const pack10Checkbox = document.getElementById('pack10');
    const pack20Checkbox = document.getElementById('pack20');
    const pack40Checkbox = document.getElementById('pack40');

    const sortLowToHighRadio = document.getElementById('sortLowToHigh');
    const sortHighToLowRadio = document.getElementById('sortHighToLow');
    const sortDefaultRadio = document.getElementById('sortDefault');

    let currentMinPrice = 0;
    // Set max price based on the highest possible pack price from the new list
    let highestPackPrice = 0;
    allProducts.forEach(pack => {
        for (const sizeKey in pack.sizePrices) {
            const price = pack.basePrice + pack.sizePrices[sizeKey];
            if (price > highestPackPrice) {
                highestPackPrice = price;
            }
        }
    });
    // Add a buffer to the max price slider
    currentMaxPrice = highestPackPrice + 100; // Adding 100 L.E buffer for flexibility

    let currentSortOrder = 'default';

    if (!container || !productCountSpan) {
        console.error("poster_packs.js: CRITICAL ERROR: Essential DOM elements not found. Page might not render correctly.");
        return;
    }
    console.log("poster_packs.js: All major DOM elements identified.");


    /**
     * Renders poster packs to the page.
     */
    function renderProducts(productsToRender) {
        console.log(`renderProducts() called. Rendering ${productsToRender.length} products.`);
        container.innerHTML = '';
        if (productsToRender.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #aaa; padding: 50px;">No poster packs found matching your criteria.</p>';
        }

        productsToRender.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            let sizeOptionsHtml = '';
            // Generate size options dynamically from product.sizePrices
            for (const sizeKey in product.sizePrices) {
                const priceIncrease = product.sizePrices[sizeKey];
                const displayPrice = product.basePrice + priceIncrease;
                sizeOptionsHtml += `<option value="${sizeKey}" data-price="${displayPrice}">${sizeKey} - ${displayPrice} L.E</option>`;
            }

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="product-name">${product.name}</div>
                <p class="pack-details">Includes ${product.posterCount} posters</p>
                <label class="size-label">Size:
                    <select id="size-${product.id}">
                        ${sizeOptionsHtml}
                    </select>
                </label>
                <label class="quantity-label">Qty of packs:
                    <input type="number" min="1" value="1" id="qty-${product.id}">
                </label>
                <button class="select-design-btn" data-id="${product.id}" data-poster-count="${product.posterCount}">Select Designs</button>
            `;
            container.appendChild(productDiv);
        });
        updateProductCount(productsToRender.length);
    }

    /**
     * Updates the displayed number of products.
     */
    function updateProductCount(count) {
        if (productCountSpan) {
            productCountSpan.innerText = `${count} Packs`;
            console.log(`Product count updated to: ${count} packs.`);
        }
    }

    /**
     * Filters and sorts poster packs based on current filter criteria.
     */
    function filterProducts() {
        console.log("filterProducts() called.");
        console.log(`Filter criteria: Min Price=${currentMinPrice}, Max Price=${currentMaxPrice}, Sort Order='${currentSortOrder}'`);

        // Read selected pack sizes
        selectedPackSizes = [];
        if (pack5Checkbox && pack5Checkbox.checked) selectedPackSizes.push(5);
        if (pack10Checkbox && pack10Checkbox.checked) selectedPackSizes.push(10);
        if (pack20Checkbox && pack20Checkbox.checked) selectedPackSizes.push(20);
        if (pack40Checkbox && pack40Checkbox.checked) selectedPackSizes.push(40);

        console.log("DEBUG: Selected pack sizes for filtering:", selectedPackSizes);

        let filtered = initialProductsDataFiltered.filter(pack => {
            const packPriceAtMinSize = pack.basePrice; // Use basePrice for filtering against price range
            const matchesPrice = packPriceAtMinSize >= currentMinPrice && packPriceAtMinSize <= currentMaxPrice;
            const matchesPackSize = selectedPackSizes.includes(pack.posterCount);

            return matchesPrice && matchesPackSize;
        });

        console.log(`After filtering: ${filtered.length} products.`);

        // Apply sorting based on currentSortOrder
        if (currentSortOrder === 'lowToHigh') {
            filtered.sort((a, b) => a.basePrice - b.basePrice);
            console.log("Products sorted: Low to High.");
        } else if (currentSortOrder === 'highToLow') {
            filtered.sort((a, b) => b.basePrice - a.basePrice);
            console.log("Products sorted: High to Low.");
        } else {
            // Default sort by posterCount ascending
            filtered.sort((a, b) => a.posterCount - b.posterCount);
            console.log("Products sorted: Default Order (by poster count).");
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

        // Reset Price Range Slider to max and update state
        if (priceRangeSlider) {
            priceRangeSlider.value = priceRangeSlider.max;
            currentMaxPrice = parseInt(priceRangeSlider.max);
            minPriceOutput.innerText = `${priceRangeSlider.min} L.E`;
            maxPriceOutput.innerText = `${priceRangeSlider.max} L.E`;
            console.log("Price slider reset.");
        }

        // Reset Pack Size Checkboxes to all checked
        if (pack5Checkbox) pack5Checkbox.checked = true;
        if (pack10Checkbox) pack10Checkbox.checked = true;
        if (pack20Checkbox) pack20Checkbox.checked = true;
        if (pack40Checkbox) pack40Checkbox.checked = true;
        console.log("Pack size checkboxes reset to all checked.");

        if (sortDefaultRadio) sortDefaultRadio.checked = true;
        currentSortOrder = 'default';
        console.log("Sort order reset to 'default'.");

        filterProducts();
        console.log("filterProducts() called from clearFilters().");
    }


    // --- Select Designs Button Event Listener ---
    container.addEventListener('click', e => {
        if (!e.target.classList.contains('select-design-btn')) return;
        console.log("Select Designs button CLICKED!");

        const packId = e.target.getAttribute('data-id');
        const posterCount = e.target.getAttribute('data-poster-count');
        const packProduct = allProducts.find(p => p.id === packId);

        if (!packProduct) {
            console.error("poster_packs.js: Pack product not found for ID:", packId);
            return;
        }

        const sizeSelect = document.getElementById(`size-${packId}`);
        const selectedSizeKey = sizeSelect ? sizeSelect.value : '15x20(mini)'; // Default to mini if not found
        const selectedSizePrice = sizeSelect ? parseInt(sizeSelect.options[sizeSelect.selectedIndex].getAttribute('data-price')) : packProduct.basePrice;

        const qtyInput = document.getElementById(`qty-${packId}`);
        const qtyOfPacks = qtyInput ? parseInt(qtyInput.value) : 1;

        // Store selected pack details in sessionStorage to retrieve on poster_selection.html
        sessionStorage.setItem('currentPosterPackSelection', JSON.stringify({
            packId: packId,
            packName: packProduct.name,
            packImage: packProduct.image,
            posterCount: parseInt(posterCount),
            selectedSize: selectedSizeKey,
            selectedSizePrice: selectedSizePrice,
            qtyOfPacks: qtyOfPacks,
            selectedDesigns: [] // Initialize an empty array for selected designs
        }));

        console.log("Navigating to poster_selection.html with pack details.");
        window.location.href = 'poster_selection.html';
    });


    // --- Filter Event Listeners ---
    if (filterIcon && filterOverlay && filterCloseBtn && priceRangeSlider && applyFiltersBtn && clearFiltersBtn &&
        pack5Checkbox && pack10Checkbox && pack20Checkbox && pack40Checkbox &&
        sortLowToHighRadio && sortHighToLowRadio && sortDefaultRadio) {

        console.log("Filter elements found. Attaching filter event listeners.");

        // Update max attribute of price range slider dynamically
        priceRangeSlider.max = currentMaxPrice; // Set max attribute
        priceRangeSlider.value = currentMaxPrice; // Set initial value to max


        filterIcon.onclick = (e) => {
            e.stopPropagation();
            console.log("Filter icon CLICKED!");
            if (filterOverlay.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(filterOverlay, false);
            } else {
                window.toggleMenuWithAnimation(filterOverlay, true);
                // Close other global overlays if open
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
            // Call filterProducts immediately on slider change for better UX
            filterProducts();
        };

        // Pack size checkbox listeners
        if (pack5Checkbox) pack5Checkbox.addEventListener('change', filterProducts);
        if (pack10Checkbox) pack10Checkbox.addEventListener('change', filterProducts);
        if (pack20Checkbox) pack20Checkbox.addEventListener('change', filterProducts);
        if (pack40Checkbox) pack40Checkbox.addEventListener('change', filterProducts);
        console.log("Pack size checkbox listeners attached.");

        // Sort By Radio Buttons
        if (sortLowToHighRadio) sortLowToHighRadio.addEventListener('change', (e) => { currentSortOrder = e.target.value; filterProducts(); });
        if (sortHighToLowRadio) sortHighToLowRadio.addEventListener('change', (e) => { currentSortOrder = e.target.value; filterProducts(); });
        if (sortDefaultRadio) sortDefaultRadio.addEventListener('change', (e) => { currentSortOrder = e.target.value; filterProducts(); });
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
        console.warn("poster_packs.js: One or more filter elements not found. Filtering functionality might be disabled.");
    }

    // Initial render of products and update count
    filterProducts(); // Call filterProducts initially to apply any default filters
    window.updateBasketDisplay(); // Ensure global basket display is updated
    console.log("poster_packs.js: Initial product render and basket update complete.");
});