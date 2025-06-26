// Global product data - Centralize ALL product data for search functionality
// IMPORTANT: You MUST populate this array with your actual products, including correct image paths.
// Example placeholders are provided. Make sure image paths like "images/frames1.jpg" and "images/poster_example1.jpg" exist.
// Global product data - Centralize ALL product data for search functionality
// IMPORTANT: You MUST populate this array with your actual products, including correct image paths.
// Example placeholders are provided. Make sure image paths like "images/frames1.jpg" and "images/poster_example1.jpg" exist.
// script.js - Updated allProducts array with more items and new stickers
const allProducts = [
    // --- CUSTOM FRAMED POSTER (TOP PRODUCT) ---
    { id: 'fp_custom', name: "CUSTOM FRAMED POSTER", image: "images/frame_custom.jpg", category: "Framed Poster", basePrice: 250, isCustomizable: true },

    // Existing Framed Posters (total 10)
    { id: 'fp1', name: "PORSCHE 911 RS", image: "images/frames1.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp2', name: "CR7 X NIKE", image: "images/frames2.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp3', name: "Mclaren 7205", image: "images/frames3.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp4', name: "TOYOTA SUPRA MK4", image: "images/frames4.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp5', name: "NISSAN SKYLINE", image: "images/frames5.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp6', name: "PORSCHE GT3 RS", image: "images/frames6.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp7', name: "AMERICA PSYCHO", image: "images/frames7.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp8', name: "INTERSTELLAR", image: "images/frames8.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp9', name: "SHAMS ELZNATY", image: "images/frames9.jpg", category: "Framed Poster", basePrice: 250 },
    // If you have fewer than 10 Framed Posters in total, you could add one more generic here:
    // { id: 'fp11', name: "GENERIC FRAMED POSTER", image: "images/frames_generic.jpg", category: "Framed Poster", basePrice: 250 },


    // --- CUSTOM POSTER (TOP PRODUCT) ---
    { id: 'p_custom', name: "CUSTOM POSTER DESIGN", image: "images/poster_custom.jpg", category: "Poster", price: 100, isCustomizable: true },

    // Existing Posters (total 5)
    { id: 'p1', name: "Vintage Music Poster", image: "images/poster_example1.jpg", category: "Poster", price: 100 },
    { id: 'p2', name: "Sci-Fi Movie Poster", image: "images/poster_example2.jpg", category: "Poster", price: 100 },
    { id: 'p3', name: "Anime Character Poster", image: "images/poster_example3.jpg", category: "Poster", price: 100 },
    { id: 'p4', name: "Nature Scenery Poster", image: "images/poster_example4.jpg", category: "Poster", price: 100 },


    // --- NEW STICKERS COLLECTION (total 10 products with specific pricing) ---
    // Make sure these image files exist in your 'images' folder!
    { id: 's1', name: "Stickers Collection 1", image: "images/sticker_collection1.jpg", category: "Sticker", price: 25 },
    { id: 's2', name: "Stickers Collection 2", image: "images/sticker_collection2.jpg", category: "Sticker", price: 25 },
    { id: 's3', name: "Stickers Collection 3", image: "images/sticker_collection3.jpg", category: "Sticker", price: 25 },
    { id: 's4', name: "Stickers Collection 4", image: "images/sticker_collection4.jpg", category: "Sticker", price: 25 },
    { id: 's5', name: "Stickers Collection 5", image: "images/sticker_collection5.jpg", category: "Sticker", price: 25 },
    { id: 's6', name: "Stickers Collection 6", image: "images/sticker_collection6.jpg", category: "Sticker", price: 25 },
    { id: 's7', name: "Stickers Collection 7", image: "images/sticker_collection7.jpg", category: "Sticker", price: 25 },
    { id: 's8', name: "Stickers Collection 8", image: "images/sticker_collection8.jpg", category: "Sticker", price: 25 },
    { id: 's9', name: "Stickers Collection 9", image: "images/sticker_collection9.jpg", category: "Sticker", price: 25 },
    { id: 's10', name: "Stickers Collection 10", image: "images/sticker_collection10.jpg", category: "Sticker", price: 25 },
];

// ... rest of script.js code ...

// ... rest of script.js code ...


// Global element references (will be assigned inside DOMContentLoaded for safety)
let settingsIcon, basketIcon, settingsMenu, basketMenu, categoryLink, categorySubMenu, checkoutBtn;
let searchIcon, searchOverlay, searchCloseBtn, searchInput, searchResults;
let carouselSlide, carouselImages, carouselPrev, carouselNext;
let currentIndex = 0; // For carousel
let slideInterval; // For carousel auto-play


// --- Global Utility Functions (made available via window.functionName) ---

/**
 * Toggles the display and animation classes for a given HTML element.
 * @param {HTMLElement} el The element to toggle (e.g., settingsMenu, basketMenu, searchOverlay).
 * @param {boolean} show True to show the element, false to hide it.
 */
window.toggleMenuWithAnimation = function(el, show) {
    if (!el) {
        // console.warn("toggleMenuWithAnimation: Target element not found.", el);
        return; // Exit if the element doesn't exist on this page
    }

    try {
        if (show) {
            el.style.display = 'block'; // Make it visible for animation to start
            requestAnimationFrame(() => { // Use requestAnimationFrame to ensure CSS display property is applied
                el.classList.add('is-visible'); // Trigger CSS transition
            });
        } else {
            el.classList.remove('is-visible'); // Start reverse CSS transition
            el.addEventListener('transitionend', function handler() {
                el.style.display = 'none'; // Hide element completely after transition
                el.removeEventListener('transitionend', handler); // Remove listener to prevent memory leaks
            }, { once: true }); // { once: true } ensures the listener runs only once then removes itself
        }
    } catch (error) {
        console.error("Error in toggleMenuWithAnimation:", error);
        console.trace(); // Show call stack
    }
};

/**
 * Applies a subtle fade-in/slide-up animation to the main body content when the page loads.
 * Enhances the professional feel of page transitions.
 */
function initializePageAnimation() {
    const mainContent = document.body;
    if (!mainContent) return; // Safety check

    try {
        mainContent.style.opacity = '0'; // Initial state: invisible
        mainContent.style.transform = 'translateY(20px)'; // Initial state: slightly below final position
        // After a short delay, apply the final state which triggers the CSS transition
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100); // Small delay to ensure initial styles are painted
    } catch (error) {
        console.error("Error in initializePageAnimation:", error);
        console.trace();
    }
}

// Global basket array (data persists across pages using localStorage)
window.basket = JSON.parse(localStorage.getItem('fraveBasket')) || [];

/**
 * Updates the visual representation of the shopping basket in the basket menu.
 * This function is called on every page load and when items are added/removed.
 */
window.updateBasketDisplay = function() {
    const basketItemsContainer = document.getElementById("basketItems");
    const totalDisplay = document.getElementById("totalPrice");

    // Check if basket display elements exist on the current page before trying to update them
    if (!basketItemsContainer || !totalDisplay) {
        // These elements might not be on every page (e.g., checkout page has its own summary)
        // console.warn("Basket display elements not found on this page (normal for checkout/confirmation).");
        return;
    }

    try {
        basketItemsContainer.innerHTML = ''; // Clear existing basket items
        let total = 0; // Reset total price

        // If basket is empty, show empty message and reset total
        if (window.basket.length === 0) {
            basketItemsContainer.innerHTML = '<p>Your basket is empty.</p>';
            totalDisplay.innerText = 'Total: 0 L.E';
            return;
        }

        // Populate basket with current items
        window.basket.forEach((item, i) => {
            total += item.total; // Accumulate total price

            const itemDiv = document.createElement('div');
            itemDiv.className = 'basket-item'; // Apply CSS styling
            itemDiv.innerHTML = `
                <div class="basket-item-details">
                    <img src="${item.image}" alt="${item.name}" class="basket-img">
                    <div>
                        <p class="basket-item-name">${item.name}</p>
                        <p class="basket-item-price">${item.category === "Framed Poster" && item.size ? 'Size: ' + item.size : 'Price: ' + item.price} L.E x ${item.qty} = ${item.total} L.E</p>
                    </div>
                </div>
                <button onclick="window.removeFromBasket(${i})" class="remove-btn">Remove</button>
            `;
            basketItemsContainer.appendChild(itemDiv);
        });

        totalDisplay.innerText = `Total: ${total} L.E`; // Update total display
        localStorage.setItem('fraveBasket', JSON.stringify(window.basket)); // Save updated basket to localStorage
    } catch (error) {
        console.error("Error in updateBasketDisplay:", error);
        console.trace();
    }
};

/**
 * Removes an item from the global basket array and updates the display.
 * Accessible from inline HTML 'onclick' attributes.
 * @param {number} i The index of the item to remove from the basket.
 */
window.removeFromBasket = function(i) {
    try {
        // console.log(`Removing item ${i} from basket.`);
        window.basket.splice(i, 1); // Remove item from array
        window.updateBasketDisplay(); // Update UI
    } catch (error) {
        console.error("Error in removeFromBasket:", error);
        console.trace();
    }
};


// --- Main DOMContentLoaded Listener ---
// Ensures all HTML elements are loaded before attempting to access them with JavaScript.
document.addEventListener('DOMContentLoaded', () => {
    // console.log("script.js DOMContentLoaded fired. Attaching global event listeners.");

    // Assign global element references once DOM is ready
    settingsIcon = document.getElementById('settingsIcon');
    basketIcon = document.getElementById('basketIcon');
    settingsMenu = document.getElementById('settingsMenu');
    basketMenu = document.getElementById('basketMenu');
    categoryLink = document.querySelector('.category-link');
    categorySubMenu = document.getElementById('categorySubMenu');
    checkoutBtn = document.getElementById('checkoutBtn');

    searchIcon = document.getElementById('searchIcon');
    searchOverlay = document.getElementById('searchOverlay');
    searchCloseBtn = document.getElementById('searchCloseBtn');
    searchInput = document.getElementById('searchInput');
    searchResults = document.getElementById('searchResults');

    carouselSlide = document.getElementById('carouselSlide');
    carouselImages = carouselSlide ? carouselSlide.querySelectorAll('img') : []; // Check if carouselSlide exists
    carouselPrev = document.getElementById('carouselPrev');
    carouselNext = document.getElementById('carouselNext');

    // Handle warning message (no refresh button logic needed here now)
    // The warning message is purely HTML/CSS controlled as per latest request.

    initializePageAnimation(); // Apply page entry animation on load for all pages

    // --- Settings Menu Toggle Logic ---
    // Check if necessary elements exist on the page
    if (settingsIcon && settingsMenu && categorySubMenu) {
        try {
            settingsIcon.onclick = (e) => {
                e.stopPropagation(); // Prevent click from bubbling to document and closing menu immediately
                if (settingsMenu.classList.contains('is-visible')) {
                    window.toggleMenuWithAnimation(settingsMenu, false);
                    window.toggleMenuWithAnimation(categorySubMenu, false); // Also close sub-menu
                    settingsIcon.classList.remove('rotated'); // Revert icon rotation
                } else {
                    window.toggleMenuWithAnimation(settingsMenu, true); // Open settings menu
                    // Close other menus/overlays if they are open
                    window.toggleMenuWithAnimation(basketMenu, false);
                    window.toggleMenuWithAnimation(searchOverlay, false);
                    settingsIcon.classList.add('rotated'); // Rotate icon
                    if (searchInput) { searchInput.value = ''; } // Clear search input if it exists
                    if (searchResults) { searchResults.innerHTML = ''; } // Clear search results if they exist
                }
            };
        } catch (error) { console.error("Error setting settingsIcon.onclick:", error); console.trace(); }

        // Toggle Category Sub-menu within Settings Menu
        if (categoryLink) {
            try {
                categoryLink.onclick = (e) => {
                    e.preventDefault(); // Prevent default link navigation
                    if (categorySubMenu.classList.contains('is-visible')) {
                        window.toggleMenuWithAnimation(categorySubMenu, false);
                    } else {
                        window.toggleMenuWithAnimation(categorySubMenu, true);
                    }
                };
            } catch (error) { console.error("Error setting categoryLink.onclick:", error); console.trace(); }
        }
    }

    // --- Basket Menu Toggle Logic ---
    // Check if necessary elements exist on the page
    if (basketIcon && basketMenu) {
        try {
            basketIcon.onclick = (e) => {
                e.stopPropagation(); // Prevent click from bubbling to document and closing menu immediately
                if (basketMenu.classList.contains('is-visible')) {
                    window.toggleMenuWithAnimation(basketMenu, false);
                } else {
                    window.toggleMenuWithAnimation(basketMenu, true); // Open basket menu
                    // Close other menus/overlays if they are open
                    window.toggleMenuWithAnimation(settingsMenu, false);
                    window.toggleMenuWithAnimation(categorySubMenu, false);
                    window.toggleMenuWithAnimation(searchOverlay, false);
                    if (settingsIcon) { settingsIcon.classList.remove('rotated'); } // Revert settings icon rotation
                    if (searchInput) { searchInput.value = ''; }
                    if (searchResults) { searchResults.innerHTML = ''; }
                }
            };
        } catch (error) { console.error("Error setting basketIcon.onclick:", error); console.trace(); }

        // Checkout Button in Basket Menu
        if (checkoutBtn) {
            try {
                checkoutBtn.onclick = () => {
                    if (window.basket.length > 0) {
                        window.location.href = 'checkout.html'; // Redirect to checkout page
                    } else {
                        alert('Your basket is empty. Please add items before checking out.');
                    }
                };
            } catch (error) { console.error("Error setting checkoutBtn.onclick:", error); console.trace(); }
        }
    }

    // --- Search Overlay Toggle Logic and Functionality ---
    // Check if necessary elements exist on the page
    if (searchIcon && searchOverlay && searchInput && searchResults && searchCloseBtn) {
        try {
            searchIcon.onclick = (e) => {
                e.stopPropagation(); // Prevent click from bubbling to document and closing overlay immediately
                if (searchOverlay.classList.contains('is-visible')) {
                    window.toggleMenuWithAnimation(searchOverlay, false);
                    searchInput.value = '';
                    searchResults.innerHTML = '';
                } else {
                    window.toggleMenuWithAnimation(searchOverlay, true); // Open search overlay
                    searchInput.focus(); // Focus input for immediate typing
                    // Close other menus/overlays if they are open
                    window.toggleMenuWithAnimation(settingsMenu, false);
                    window.toggleMenuWithAnimation(basketMenu, false);
                    if (settingsIcon) { settingsIcon.classList.remove('rotated'); }
                }
            };
        } catch (error) { console.error("Error setting searchIcon.onclick:", error); console.trace(); }

        // Close button for search overlay
        try {
            searchCloseBtn.onclick = () => {
                window.toggleMenuWithAnimation(searchOverlay, false);
                searchInput.value = '';
                searchResults.innerHTML = '';
            };
        } catch (error) { console.error("Error setting searchCloseBtn.onclick:", error); console.trace(); }

        // Live search filtering as user types
        try {
            searchInput.oninput = () => {
                const query = searchInput.value.toLowerCase();
                searchResults.innerHTML = ''; // Clear previous results

                if (query.length < 2) { // Require at least 2 characters to start searching
                    searchResults.innerHTML = '<p class="search-tip">Type at least 2 characters to search.</p>';
                    return;
                }

                // Filter products based on name or category
                const filteredProducts = allProducts.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );

                if (filteredProducts.length === 0) {
                    searchResults.innerHTML = '<p class="search-tip">No products found.</p>';
                } else {
                    // Display search results as clickable links to their respective product pages
                    filteredProducts.forEach(product => {
                        const productLink = document.createElement('a');
                        // Determine the correct href based on product category
                        if (product.category === "Framed Poster") {
                            productLink.href = "shop.html"; // Your existing framed poster page
                        } else if (product.category === "Poster") {
                            productLink.href = "posters.html";
                        } else if (product.category === "Sticker") {
                            productLink.href = "stickers.html";
                        } else {
                            productLink.href = "all_products.html"; // Fallback for "All Products" or other
                        }

                        productLink.className = 'search-result-item'; // Apply CSS styling
                        productLink.innerHTML = `
                            <img src="${product.image}" alt="${product.name}">
                            <div>
                                <p class="search-result-name">${product.name}</p>
                                <p class="search-result-category">${product.category}</p>
                            </div>
                        `;
                        searchResults.appendChild(productLink);
                    });
                }
            };
        } catch (error) { console.error("Error setting searchInput.oninput:", error); console.trace(); }
    }

    // --- Global Click Listener to Close Menus/Overlays When Clicking Outside ---
    // This listener manages closing menus if a click occurs outside of them or their direct toggling elements.
    try {
        document.addEventListener('click', (event) => {
            const clickedElement = event.target;

            // Settings menu close logic: close if settings menu is visible AND click is outside menu/its toggling icon/its sub-menu
            if (settingsMenu && settingsIcon && categorySubMenu && categoryLink &&
                settingsMenu.classList.contains('is-visible') &&
                !settingsMenu.contains(clickedElement) &&
                clickedElement !== settingsIcon &&
                !categorySubMenu.contains(clickedElement) &&
                clickedElement !== categoryLink
            ) {
                window.toggleMenuWithAnimation(settingsMenu, false);
                window.toggleMenuWithAnimation(categorySubMenu, false);
                settingsIcon.classList.remove('rotated');
            }

            // Basket menu close logic: close if basket menu is visible AND click is outside menu/its toggling icon/checkout button
            if (basketMenu && basketIcon && checkoutBtn &&
                basketMenu.classList.contains('is-visible') &&
                !basketMenu.contains(clickedElement) &&
                clickedElement !== basketIcon &&
                clickedElement !== checkoutBtn // Important: don't close if clicking checkout button
            ) {
                window.toggleMenuWithAnimation(basketMenu, false);
            }

            // Search overlay close logic: close if search overlay is visible AND click is outside overlay/its toggling icon/search input itself
            if (searchOverlay && searchIcon && searchInput && searchCloseBtn &&
                searchOverlay.classList.contains('is-visible') &&
                !searchOverlay.contains(clickedElement) &&
                clickedElement !== searchIcon &&
                clickedElement !== searchInput // Important: don't close if clicking inside search input
            ) {
                window.toggleMenuWithAnimation(searchOverlay, false);
                searchInput.value = ''; // Clear input on close
                searchResults.innerHTML = ''; // Clear results on close
            }
        });
    } catch (error) { console.error("Error setting document.addEventListener('click'):", error); console.trace(); }

    // --- Stop Propagation for Clicks *Inside* Menus/Overlays ---
    // These listeners prevent clicks within the actual menu/overlay content from bubbling up
    // to the document and inadvertently triggering the "click outside to close" logic for *that same menu*.
    try {
        settingsMenu && settingsMenu.addEventListener('click', (e) => e.stopPropagation());
        basketMenu && basketMenu.addEventListener('click', (e) => e.stopPropagation());
        searchOverlay && searchOverlay.addEventListener('click', (e) => e.stopPropagation());
    } catch (error) { console.error("Error setting stopPropagation listeners:", error); console.trace(); }


    // --- Homepage Specific Logic (Shop Now button, Product Carousel) ---
    const shopButton = document.querySelector('.shop-button');
    if (shopButton) {
        // The 'Shop Now' button is a simple <a> tag; its navigation works by default.
        // If you intended custom JS behavior (e.g., smooth scroll), you'd add it here.
    }

    // Carousel Logic (only runs if carousel elements exist, typically only on index.html)
    if (carouselSlide && carouselImages.length > 0 && carouselPrev && carouselNext) {
        try {
            function updateCarousel() {
                carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;
            }

            function startSlideShow() {
                clearInterval(slideInterval); // Clear any existing auto-play interval
                slideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % carouselImages.length; // Move to next image
                    updateCarousel();
                }, 4000); // Change image every 4 seconds
            }

            // Manual navigation for carousel
            carouselPrev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
                updateCarousel();
                startSlideShow(); // Reset auto-play timer after manual interaction
            });

            carouselNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % carouselImages.length;
                updateCarousel();
                startSlideShow(); // Reset auto-play timer after manual interaction
            });

            startSlideShow(); // Start the auto-play slideshow when on the homepage
        } catch (error) { console.error("Error in carousel logic:", error); console.trace(); }
    }

    // --- Initial Load of Basket Display ---
    // This ensures the basket icon shows correct item count/total when any page loads
    window.updateBasketDisplay();
});