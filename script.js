// Global product data - Centralize ALL product data for search functionality
// IMPORTANT: You MUST populate this array with your actual products, including correct image paths.
// Example placeholders are provided. Make sure image paths like "images/frames1.jpg" and "images/poster_example1.jpg" exist.
const allProducts = [
    // Framed Posters (example products from shop.js)
    { id: 'fp1', name: "PORSCHE 911 RS", image: "images/frames1.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp2', name: "CR7 X NIKE", image: "images/frames2.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp3', name: "Mclaren 7205", image: "images/frames3.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp4', name: "TOYOTA SUPRA MK4", image: "images/frames4.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp5', name: "NISSAN SKYLINE", image: "images/frames5.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp6', name: "PORSCHE GT3 RS", image: "images/frames6.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp7', name: "AMERICA PSYCHO", image: "images/frames7.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp8', name: "INTERSTELLAR", image: "images/frames8.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp9', name: "SHAMS ELZNATY", image: "images/frames9.jpg", category: "Framed Poster", basePrice: 250 },
    { id: 'fp10', name: "PULP FICTION", image: "images/frames10.jpg", category: "Framed Poster", basePrice: 250 },

    // Posters (Example products - Add your real poster products here with correct image paths)
    { id: 'p1', name: "Vintage Music Poster", image: "images/poster_example1.jpg", category: "Poster", price: 100 },
    { id: 'p2', name: "Sci-Fi Movie Poster", image: "images/poster_example2.jpg", category: "Poster", price: 100 },
    { id: 'p3', name: "Anime Character Poster", image: "images/poster_example3.jpg", category: "Poster", price: 100 },
    { id: 'p4', name: "Nature Scenery Poster", image: "images/poster_example4.jpg", category: "Poster", price: 100 },
    // Add more poster products as needed (e.g., p5, p6, etc.)

    // Stickers (Example products - Add your real sticker products here with correct image paths)
    { id: 's1', name: "Vinyl Decal Pack", image: "images/sticker_example1.jpg", category: "Sticker", price: 20 },
    { id: 's2', name: "Laptop Sticker Bomb", image: "images/sticker_example2.jpg", category: "Sticker", price: 20 },
    { id: 's3', name: "Abstract Sticker Art", image: "images/sticker_example3.jpg", category: "Sticker", price: 20 },
    { id: 's4', name: "Gaming Controller Stickers", image: "images/sticker_example4.jpg", category: "Sticker", price: 20 },
    // Add more sticker products as needed (e.g., s5, s6, etc.)
];


// Get global elements (safely check if they exist on the current page later before using)
const settingsIcon = document.getElementById('settingsIcon');
const basketIcon = document.getElementById('basketIcon');
const settingsMenu = document.getElementById('settingsMenu');
const basketMenu = document.getElementById('basketMenu');
const categoryLink = document.querySelector('.category-link'); // For the "Category" link in settings menu
const categorySubMenu = document.getElementById('categorySubMenu');
const checkoutBtn = document.getElementById('checkoutBtn');

const searchIcon = document.getElementById('searchIcon');
const searchOverlay = document.getElementById('searchOverlay');
const searchCloseBtn = document.getElementById('searchCloseBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const carouselSlide = document.getElementById('carouselSlide');
// Ensure carouselImages is only populated if carouselSlide exists to avoid errors on other pages
const carouselImages = carouselSlide ? carouselSlide.querySelectorAll('img') : [];
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

let currentIndex = 0; // For carousel
let slideInterval; // For carousel auto-play


// --- Global Utility Functions (made available via window.functionName) ---

/**
 * Toggles the display and animation classes for a given HTML element.
 * Applies 'block' or 'none' for display and adds/removes 'is-visible' for transitions.
 * @param {HTMLElement} el The element to toggle (e.g., settingsMenu, basketMenu, searchOverlay).
 * @param {boolean} show True to show the element, false to hide it.
 */
window.toggleMenuWithAnimation = function(el, show) {
    if (!el) {
        // console.warn("toggleMenuWithAnimation: Target element not found.", el);
        return; // Exit if the element doesn't exist on this page
    }

    if (show) {
        el.style.display = 'block'; // Make it visible for animation to start
        requestAnimationFrame(() => { // Use requestAnimationFrame to ensure CSS display property is applied
            el.classList.add('is-visible'); // Trigger CSS transition
        });
    } else {
        el.classList.remove('is-visible'); // Start reverse CSS transition
        // Wait for the transition to complete before setting display to 'none'
        el.addEventListener('transitionend', function handler() {
            el.style.display = 'none'; // Hide element completely after transition
            el.removeEventListener('transitionend', handler); // Remove listener to prevent memory leaks
        }, { once: true }); // { once: true } ensures the listener runs only once then removes itself
    }
};

/**
 * Applies a subtle fade-in/slide-up animation to the main body content when the page loads.
 * Enhances the professional feel of page transitions.
 */
function initializePageAnimation() {
    const mainContent = document.body;
    mainContent.style.opacity = '0'; // Initial state: invisible
    mainContent.style.transform = 'translateY(20px)'; // Initial state: slightly below final position
    // After a short delay, apply the final state which triggers the CSS transition
    setTimeout(() => {
        mainContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    }, 100); // Small delay to ensure initial styles are painted
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
        // console.warn("Basket display elements not found on this page (normal for checkout/confirmation).");
        return;
    }

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
};

/**
 * Removes an item from the global basket array and updates the display.
 * Accessible from inline HTML 'onclick' attributes.
 * @param {number} i The index of the item to remove from the basket.
 */
window.removeFromBasket = function(i) {
    // console.log(`Removing item ${i} from basket.`);
    window.basket.splice(i, 1); // Remove item from array
    window.updateBasketDisplay(); // Update UI
};


// --- Main DOMContentLoaded Listener ---
// Ensures all HTML elements are loaded before attempting to access them with JavaScript.
document.addEventListener('DOMContentLoaded', () => {
    // console.log("script.js DOMContentLoaded fired. Attaching global event listeners.");

    initializePageAnimation(); // Apply page entry animation on load for all pages

    // --- Settings Menu Toggle Logic ---
    // Check if necessary elements exist on the page
    if (settingsIcon && settingsMenu && categorySubMenu) {
        settingsIcon.onclick = (e) => {
            e.stopPropagation(); // Prevents click from bubbling to document and closing menu immediately
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

        // Toggle Category Sub-menu within Settings Menu
        if (categoryLink) {
            categoryLink.onclick = (e) => {
                e.preventDefault(); // Prevent default link navigation
                if (categorySubMenu.classList.contains('is-visible')) {
                    window.toggleMenuWithAnimation(categorySubMenu, false);
                } else {
                    window.toggleMenuWithAnimation(categorySubMenu, true);
                }
            };
        }
    }

    // --- Basket Menu Toggle Logic ---
    // Check if necessary elements exist on the page
    if (basketIcon && basketMenu) {
        basketIcon.onclick = (e) => {
            e.stopPropagation(); // Prevents click from bubbling to document and closing menu immediately
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

        // Checkout Button in Basket Menu
        if (checkoutBtn) {
            checkoutBtn.onclick = () => {
                if (window.basket.length > 0) {
                    window.location.href = 'checkout.html'; // Redirect to checkout page
                } else {
                    alert('Your basket is empty. Please add items before checking out.');
                }
            };
        }
    }

    // --- Search Overlay Toggle Logic and Functionality ---
    // Check if necessary elements exist on the page
    if (searchIcon && searchOverlay && searchInput && searchResults && searchCloseBtn) {
        searchIcon.onclick = (e) => {
            e.stopPropagation(); // Prevents click from bubbling to document and closing overlay immediately
            if (searchOverlay.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(searchOverlay, false);
                searchInput.value = ''; // Clear search input
                searchResults.innerHTML = ''; // Clear search results
            } else {
                window.toggleMenuWithAnimation(searchOverlay, true); // Open search overlay
                searchInput.focus(); // Focus input for immediate typing
                // Close other menus/overlays if they are open
                window.toggleMenuWithAnimation(settingsMenu, false);
                window.toggleMenuWithAnimation(basketMenu, false);
                if (settingsIcon) { settingsIcon.classList.remove('rotated'); }
            }
        };

        // Close button for search overlay
        searchCloseBtn.onclick = () => {
            window.toggleMenuWithAnimation(searchOverlay, false);
            searchInput.value = '';
            searchResults.innerHTML = '';
        };

        // Live search filtering as user types
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
    }

    // --- Global Click Listener to Close Menus/Overlays When Clicking Outside ---
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

    // --- Stop Propagation for Clicks *Inside* Menus/Overlays ---
    // These listeners prevent clicks within the actual menu/overlay content from bubbling up
    // to the document and inadvertently triggering the "click outside to close" logic for *that same menu*.
    settingsMenu && settingsMenu.addEventListener('click', (e) => e.stopPropagation());
    basketMenu && basketMenu.addEventListener('click', (e) => e.stopPropagation());
    searchOverlay && searchOverlay.addEventListener('click', (e) => e.stopPropagation());


    // --- Homepage Specific Logic (Shop Now button, Product Carousel) ---
    const shopButton = document.querySelector('.shop-button');
    if (shopButton) {
        // The 'Shop Now' button is a simple <a> tag; its navigation works by default.
        // If you intended custom JS behavior (e.g., smooth scroll), you'd add it here.
    }

    // Carousel Logic (only runs if carousel elements exist, typically only on index.html)
    if (carouselSlide && carouselImages.length > 0 && carouselPrev && carouselNext) {
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
    }

    // --- Initial Load of Basket Display ---
    // This ensures the basket icon shows correct item count/total when any page loads
    window.updateBasketDisplay();
});