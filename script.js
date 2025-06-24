// Global product data - Centralize ALL product data for search functionality
// You MUST populate this with your actual products, including images.
const allProducts = [
    // Framed Posters (from shop.js)
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
    // Posters (Example - ADD YOUR REAL POSTER PRODUCTS HERE)
    { id: 'p1', name: "Vintage Music Poster", image: "images/poster_example1.jpg", category: "Poster", price: 100 },
    { id: 'p2', name: "Sci-Fi Movie Poster", image: "images/poster_example2.jpg", category: "Poster", price: 100 },
    { id: 'p3', name: "Anime Character Poster", image: "images/poster_example3.jpg", category: "Poster", price: 100 },
    { id: 'p4', name: "Nature Scenery Poster", image: "images/poster_example4.jpg", category: "Poster", price: 100 },
    // Stickers (Example - ADD YOUR REAL STICKER PRODUCTS HERE)
    { id: 's1', name: "Vinyl Decal Pack", image: "images/sticker_example1.jpg", category: "Sticker", price: 20 },
    { id: 's2', name: "Laptop Sticker Bomb", image: "images/sticker_example2.jpg", category: "Sticker", price: 20 },
    { id: 's3', name: "Abstract Sticker Art", image: "images/sticker_example3.jpg", category: "Sticker", price: 20 },
    { id: 's4', name: "Gaming Controller Stickers", image: "images/sticker_example4.jpg", category: "Sticker", price: 20 },
];


// Get elements (safely check if they exist on the current page)
const settingsIcon = document.getElementById('settingsIcon');
const basketIcon = document.getElementById('basketIcon');
const settingsMenu = document.getElementById('settingsMenu');
const basketMenu = document.getElementById('basketMenu');
const categoryLink = document.querySelector('.category-link');
const categorySubMenu = document.getElementById('categorySubMenu');
const checkoutBtn = document.getElementById('checkoutBtn');

const searchIcon = document.getElementById('searchIcon');
const searchOverlay = document.getElementById('searchOverlay');
const searchCloseBtn = document.getElementById('searchCloseBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const carouselSlide = document.getElementById('carouselSlide');
const carouselImages = carouselSlide ? carouselSlide.querySelectorAll('img') : []; // Check if carouselSlide exists
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

let currentIndex = 0;
let slideInterval;


// Global function for animations - accessible by all scripts
window.toggleMenuWithAnimation = function(el, show) {
    if (!el) {
        console.warn("toggleMenuWithAnimation: Target element not found.", el);
        return;
    }

    // console.log(`toggleMenuWithAnimation for ${el.id || el.className}: show = ${show}`); // For debugging

    if (show) {
        el.style.display = 'block';
        requestAnimationFrame(() => { // Ensure styles are applied before transition
            el.classList.add('is-visible');
        });
    } else {
        el.classList.remove('is-visible');
        // Wait for transition to complete before setting display to 'none'
        el.addEventListener('transitionend', function handler() {
            el.style.display = 'none';
            el.removeEventListener('transitionend', handler);
        }, { once: true });
    }
};

// Page entry animation
function initializePageAnimation() {
    const mainContent = document.body;
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
        mainContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    }, 100);
}


// --- Event Listeners for common elements ---
document.addEventListener('DOMContentLoaded', () => {
    // console.log("script.js DOMContentLoaded fired.");

    initializePageAnimation(); // Apply page entry animation

    // Settings Menu
    if (settingsIcon && settingsMenu && categorySubMenu) {
        settingsIcon.onclick = () => {
            // console.log("Settings icon CLICKED!");
            if (settingsMenu.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(settingsMenu, false);
                window.toggleMenuWithAnimation(categorySubMenu, false);
                settingsIcon.classList.remove('rotated');
            } else {
                window.toggleMenuWithAnimation(settingsMenu, true);
                window.toggleMenuWithAnimation(basketMenu, false); // Close basket if open
                window.toggleMenuWithAnimation(searchOverlay, false); // Close search if open
                settingsIcon.classList.add('rotated');
                searchInput.value = ''; // Clear search
                searchResults.innerHTML = '';
            }
        };

        if (categoryLink) {
            categoryLink.onclick = (e) => {
                e.preventDefault(); // Prevent default link behavior
                // console.log("Category link CLICKED!");
                if (categorySubMenu.classList.contains('is-visible')) {
                    window.toggleMenuWithAnimation(categorySubMenu, false);
                } else {
                    window.toggleMenuWithAnimation(categorySubMenu, true);
                }
            };
        }
    } else {
        // console.warn("Settings or Category related elements not found (normal on product pages).");
    }

    // Basket Menu
    if (basketIcon && basketMenu) {
        basketIcon.onclick = () => {
            // console.log("Basket icon CLICKED!");
            if (basketMenu.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(basketMenu, false);
            } else {
                window.toggleMenuWithAnimation(basketMenu, true);
                window.toggleMenuWithAnimation(settingsMenu, false); // Close settings if open
                window.toggleMenuWithAnimation(categorySubMenu, false); // Close sub-menu
                window.toggleMenuWithAnimation(searchOverlay, false); // Close search if open
                settingsIcon && settingsIcon.classList.remove('rotated'); // Remove rotation if settings icon exists
                searchInput.value = ''; // Clear search
                searchResults.innerHTML = '';
            }
        };

        if (checkoutBtn) {
            checkoutBtn.onclick = () => {
                // console.log("Checkout button clicked!");
                if (basket.length > 0) {
                    window.location.href = 'checkout.html';
                } else {
                    alert('Your basket is empty. Please add items before checking out.');
                }
            };
        }
    } else {
        // console.warn("Basket related elements not found (normal on checkout page).");
    }

    // Search Functionality
    if (searchIcon && searchOverlay && searchInput && searchResults && searchCloseBtn) {
        searchIcon.onclick = () => {
            // console.log("Search icon CLICKED!");
            if (searchOverlay.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(searchOverlay, false);
                searchInput.value = '';
                searchResults.innerHTML = '';
            } else {
                window.toggleMenuWithAnimation(searchOverlay, true);
                searchInput.focus();
                window.toggleMenuWithAnimation(settingsMenu, false); // Close other menus
                window.toggleMenuWithAnimation(basketMenu, false);
                settingsIcon && settingsIcon.classList.remove('rotated'); // Remove rotation
            }
        };

        searchCloseBtn.onclick = () => {
            // console.log("Search close button CLICKED!");
            window.toggleMenuWithAnimation(searchOverlay, false);
            searchInput.value = '';
            searchResults.innerHTML = '';
        };

        searchInput.oninput = () => {
            const query = searchInput.value.toLowerCase();
            searchResults.innerHTML = '';

            if (query.length < 2) {
                searchResults.innerHTML = '<p class="search-tip">Type at least 2 characters to search.</p>';
                return;
            }

            const filteredProducts = allProducts.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );

            if (filteredProducts.length === 0) {
                searchResults.innerHTML = '<p class="search-tip">No products found.</p>';
            } else {
                filteredProducts.forEach(product => {
                    const productLink = document.createElement('a');
                    // Determine correct link based on category
                    if (product.category === "Framed Poster") {
                        productLink.href = "shop.html";
                    } else if (product.category === "Poster") {
                        productLink.href = "posters.html";
                    } else if (product.category === "Sticker") {
                        productLink.href = "stickers.html";
                    } else {
                        productLink.href = "all_products.html"; // Fallback
                    }

                    productLink.className = 'search-result-item';
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
    } else {
        // console.warn("Search related elements not found (normal on pages without search input).");
    }

    // Close menus/search when clicking outside (global click listener)
    document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        // Settings menu close logic
        if (settingsMenu && settingsIcon && categorySubMenu && categoryLink &&
            !settingsMenu.contains(clickedElement) && clickedElement !== settingsIcon &&
            !categorySubMenu.contains(clickedElement) && clickedElement !== categoryLink)
        {
            if (settingsMenu.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(settingsMenu, false);
                window.toggleMenuWithAnimation(categorySubMenu, false);
                settingsIcon.classList.remove('rotated');
            }
        }

        // Basket menu close logic
        if (basketMenu && basketIcon && checkoutBtn &&
            !basketMenu.contains(clickedElement) && clickedElement !== basketIcon && clickedElement !== checkoutBtn)
        {
            if (basketMenu.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(basketMenu, false);
            }
        }

        // Search overlay close logic
        if (searchOverlay && searchIcon && searchInput && searchCloseBtn &&
            !searchOverlay.contains(clickedElement) && clickedElement !== searchIcon)
        {
            if (searchOverlay.classList.contains('is-visible')) {
                window.toggleMenuWithAnimation(searchOverlay, false);
                searchInput.value = '';
                searchResults.innerHTML = '';
            }
        }
    });

    // Prevent clicks inside menus/overlays from bubbling up and closing
    settingsMenu && settingsMenu.addEventListener('click', (e) => e.stopPropagation());
    basketMenu && basketMenu.addEventListener('click', (e) => e.stopPropagation());
    searchOverlay && searchOverlay.addEventListener('click', (e) => e.stopPropagation());


    // Shop Now button on Homepage
    const shopButton = document.querySelector('.shop-button');
    if (shopButton) {
        shopButton.addEventListener('click', (e) => {
            // console.log("Shop Now button clicked!"); // Log to confirm click
            // e.preventDefault(); // Remove this line if you want the link to work naturally
            // window.location.href = 'shop.html'; // Or keep it if you want to explicitly control navigation
        });
    }

    // --- Basket Logic (Shared across all product pages) ---
    // Make basket globally accessible and manage storage
    window.basket = JSON.parse(localStorage.getItem('fraveBasket')) || [];

    window.updateBasketDisplay = function() {
        // console.log("Updating basket display.");
        const basketItemsContainer = document.getElementById("basketItems");
        const totalDisplay = document.getElementById("totalPrice");

        if (!basketItemsContainer || !totalDisplay) {
            // console.warn("Basket display elements not found on this page.");
            return; // Exit if elements don't exist (e.g., on checkout page where a different display is used)
        }

        basketItemsContainer.innerHTML = '';
        let total = 0;

        if (window.basket.length === 0) {
            basketItemsContainer.innerHTML = '<p>Your basket is empty.</p>';
            totalDisplay.innerText = 'Total: 0 L.E';
            return;
        }

        window.basket.forEach((item, i) => {
            total += item.total;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'basket-item';
            itemDiv.innerHTML = `
                <div class="basket-item-details">
                    <img src="${item.image}" alt="${item.name}" class="basket-img">
                    <div>
                        <p class="basket-item-name">${item.name}</p>
                        <p class="basket-item-price">${item.size ? 'Size: ' + item.size : 'Price: ' + item.price} L.E x ${item.qty} = ${item.total} L.E</p>
                    </div>
                </div>
                <button onclick="window.removeFromBasket(${i})" class="remove-btn">Remove</button>
            `;
            basketItemsContainer.appendChild(itemDiv);
        });

        totalDisplay.innerText = `Total: ${total} L.E`;
        localStorage.setItem('fraveBasket', JSON.stringify(window.basket));
    };

    window.removeFromBasket = function(i) {
        // console.log(`Removing item ${i} from basket.`);
        window.basket.splice(i, 1);
        window.updateBasketDisplay();
    };

    window.updateBasketDisplay(); // Initial load of basket display


    // --- Carousel Logic (Only on homepage) ---
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        function updateCarousel() {
            if (carouselSlide) {
                carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;
            }
        }

        function startSlideShow() {
            clearInterval(slideInterval);
            if (carouselImages.length > 0 && carouselSlide) {
                slideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % carouselImages.length;
                    updateCarousel();
                }, 4000);
            }
        }

        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
                updateCarousel();
                startSlideShow(); // Reset interval on manual click
            });
        }

        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % carouselImages.length;
                updateCarousel();
                startSlideShow(); // Reset interval on manual click
            });
        }
        startSlideShow(); // Start the slideshow when on homepage
    }
});