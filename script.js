// Global product data - Centralize product data for search functionality
// This is a simplified example. In a real application, you'd fetch this from a database.
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
    // Posters (example - add more actual posters here)
    { id: 'p1', name: "Vintage Car Poster", image: "images/poster_example1.jpg", category: "Poster", basePrice: 100 },
    { id: 'p2', name: "Abstract Art Poster", image: "images/poster_example2.jpg", category: "Poster", basePrice: 100 },
    // Stickers (example - add more actual stickers here)
    { id: 's1', name: "Cool Sticker Pack", image: "images/sticker_example1.jpg", category: "Sticker", basePrice: 20 },
    { id: 's2', name: "Gaming Decal", image: "images/sticker_example2.jpg", category: "Sticker", basePrice: 20 },
];

const settingsIcon = document.getElementById('settingsIcon');
const basketIcon = document.getElementById('basketIcon');
const settingsMenu = document.getElementById('settingsMenu');
const basketMenu = document.getElementById('basketMenu');
const categoryLink = document.querySelector('.category-link');
const categorySubMenu = document.getElementById('categorySubMenu');
const checkoutBtn = document.getElementById('checkoutBtn'); // Get the checkout button

// Search elements
const searchIcon = document.getElementById('searchIcon');
const searchOverlay = document.getElementById('searchOverlay');
const searchCloseBtn = document.getElementById('searchCloseBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Carousel elements
const carouselSlide = document.getElementById('carouselSlide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

let currentIndex = 0;
let slideInterval;

// Function to smoothly toggle display with fade/slide animation
function toggleMenuWithAnimation(el, show) {
    if (show) {
        el.style.display = 'block';
        setTimeout(() => { // Allow display to take effect before starting animation
            el.classList.add('is-visible');
        }, 10);
    } else {
        el.classList.remove('is-visible');
        el.addEventListener('transitionend', function handler() {
            el.style.display = 'none';
            el.removeEventListener('transitionend', handler);
        }, { once: true });
    }
}

// Function to initialize page entry animation
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


// --- Menu Toggling Logic ---
settingsIcon.onclick = () => {
    if (settingsMenu.classList.contains('is-visible')) {
        toggleMenuWithAnimation(settingsMenu, false);
        toggleMenuWithAnimation(categorySubMenu, false); // Hide sub-menu if open
        settingsIcon.classList.remove('rotated'); // Remove rotation
    } else {
        toggleMenuWithAnimation(settingsMenu, true);
        toggleMenuWithAnimation(basketMenu, false); // Close basket if open
        settingsIcon.classList.add('rotated'); // Add rotation
    }
};

basketIcon.onclick = () => {
    if (basketMenu.classList.contains('is-visible')) {
        toggleMenuWithAnimation(basketMenu, false);
    } else {
        toggleMenuWithAnimation(basketMenu, true);
        toggleMenuWithAnimation(settingsMenu, false); // Close settings if open
        settingsIcon.classList.remove('rotated'); // Remove rotation
    }
};

// Toggle Category Sub-menu
categoryLink.onclick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    if (categorySubMenu.classList.contains('is-visible')) {
        toggleMenuWithAnimation(categorySubMenu, false);
    } else {
        toggleMenuWithAnimation(categorySubMenu, true);
    }
};

// Close menus when clicking outside
document.addEventListener('click', (event) => {
    if (!settingsMenu.contains(event.target) && event.target !== settingsIcon && !categorySubMenu.contains(event.target)) {
        toggleMenuWithAnimation(settingsMenu, false);
        toggleMenuWithAnimation(categorySubMenu, false);
        settingsIcon.classList.remove('rotated');
    }
    if (!basketMenu.contains(event.target) && event.target !== basketIcon) {
        toggleMenuWithAnimation(basketMenu, false);
    }
    if (!searchOverlay.contains(event.target) && event.target !== searchIcon && event.target !== searchInput) {
        toggleMenuWithAnimation(searchOverlay, false);
        searchInput.value = ''; // Clear search input
        searchResults.innerHTML = ''; // Clear search results
    }
});

// Prevent clicks inside menus from closing them
settingsMenu.addEventListener('click', (e) => e.stopPropagation());
basketMenu.addEventListener('click', (e) => e.stopPropagation());
searchOverlay.addEventListener('click', (e) => e.stopPropagation());


// --- Search Functionality ---
searchIcon.onclick = () => {
    toggleMenuWithAnimation(searchOverlay, true);
    searchInput.focus(); // Focus the input when it appears
    toggleMenuWithAnimation(settingsMenu, false); // Close other menus
    toggleMenuWithAnimation(basketMenu, false);
    settingsIcon.classList.remove('rotated');
};

searchCloseBtn.onclick = () => {
    toggleMenuWithAnimation(searchOverlay, false);
    searchInput.value = ''; // Clear search input
    searchResults.innerHTML = ''; // Clear search results
};

searchInput.oninput = () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = ''; // Clear previous results

    if (query.length < 2) { // Require at least 2 characters for search
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
            productLink.href = `${product.category.toLowerCase().replace(/\s/g, '_')}.html`; // Link to category page
            if(product.category === "Framed Poster") productLink.href = "shop.html"; // Special case for shop.html
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


// --- Basket Logic (Shared) ---
let basket = JSON.parse(localStorage.getItem('fraveBasket')) || [];

function updateBasketDisplay() {
    const basketItemsContainer = document.getElementById("basketItems");
    const totalDisplay = document.getElementById("totalPrice");
    basketItemsContainer.innerHTML = '';
    let total = 0;

    if (basket.length === 0) {
        basketItemsContainer.innerHTML = '<p>Your basket is empty.</p>';
        totalDisplay.innerText = 'Total: 0 L.E';
        return;
    }

    basket.forEach((item, i) => {
        total += item.total;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'basket-item';
        itemDiv.innerHTML = `
            <div class="basket-item-details">
                <img src="${item.image}" alt="${item.name}" class="basket-img">
                <div>
                    <p class="basket-item-name">${item.name}</p>
                    <p class="basket-item-price">${item.size ? item.size + ' L.E' : item.price + ' L.E'} x ${item.qty} = ${item.total} L.E</p>
                </div>
            </div>
            <button onclick="window.removeFromBasket(${i})" class="remove-btn">Remove</button>
        `;
        basketItemsContainer.appendChild(itemDiv);
    });

    totalDisplay.innerText = `Total: ${total} L.E`;
    localStorage.setItem('fraveBasket', JSON.stringify(basket)); // Save to localStorage
}

// Attach removeFromBasket to window for easy access from inline onclick
window.removeFromBasket = function(i) {
    basket.splice(i, 1);
    updateBasketDisplay();
};

// Checkout button handler
checkoutBtn.onclick = () => {
    if (basket.length > 0) {
        window.location.href = 'checkout.html'; // Redirect to checkout page
    } else {
        alert('Your basket is empty. Please add items before checking out.');
    }
};


// --- Carousel Logic ---
function updateCarousel() {
    carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;
}

function startSlideShow() {
    clearInterval(slideInterval); // Clear any existing interval
    slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        updateCarousel();
    }, 4000); // Change image every 4 seconds
}

carouselPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
    startSlideShow(); // Reset interval on manual click
});

carouselNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel();
    startSlideShow(); // Reset interval on manual click
});


// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updateBasketDisplay(); // Load basket on all pages
    initializePageAnimation(); // Apply page entry animation

    // Only start slideshow on homepage
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        startSlideShow();
    }
});