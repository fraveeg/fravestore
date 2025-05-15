// Wrap everything inside DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { name: "PORSCHE 911 RS", image: "images/frames1.jpg" },
    { name: "CR7 X NIKE", image: "images/frames2.jpg" },
    { name: "Mclaren 7205", image: "images/frames3.jpg" },
    { name: "TOYOTA SUPRA MK4", image: "images/frames4.jpg" },
    { name: "NISSAN SKYLINE", image: "images/frames5.jpg" },
    { name: "PORSCHE GT3 RS", image: "images/frames6.jpg" },
    { name: "AMERICA PSYCHO", image: "images/frames7.jpg" },
    { name: "INTERSTELLAR", image: "images/frames8.jpg" },
    { name: "SHAMS ELZNATY", image: "images/frames9.jpg" },
    { name: "PULP FICTION", image: "images/frames10.jpg" },
  ];

  const container = document.getElementById("productsContainer");
  const basketItems = document.getElementById("basketItems");
  const totalPrice = document.getElementById("totalPrice");
  const basketMenu = document.getElementById("basketMenu");

  let basket = [];

  // Render products on page
  products.forEach((product, index) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img" style="cursor:pointer;">
      <div class="product-name">${product.name}</div>
      <label class="price">Size:
        <select id="size-${index}">
          <option value="250">Small - 250 L.E</option>
          <option value="300">Medium - 300 L.E</option>
        </select>
      </label>
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
    const size = document.getElementById(`size-${index}`).value;
    const qty = parseInt(document.getElementById(`qty-${index}`).value);
    const pricePerUnit = parseInt(size);
    const totalItemPrice = pricePerUnit * qty;

    // Check if item with same name and size is already in basket
    const existingIndex = basket.findIndex(item => item.name === product.name && item.size === size);

    if (existingIndex > -1) {
      // Update existing item quantity and total
      basket[existingIndex].qty += qty;
      basket[existingIndex].total += totalItemPrice;
    } else {
      // Add new item
      basket.push({
        name: product.name,
        image: product.image,
        size: size,
        qty: qty,
        total: totalItemPrice,
      });
    }

    updateBasket();

    // Show basket with animation
    basketMenu.style.display = 'block';
    basketMenu.style.opacity = '0';
    basketMenu.style.animation = 'fadeIn 0.3s ease forwards';
  });

  // Remove item function attached to window (for inline onclick)
  window.removeFromBasket = function(i) {
    basket.splice(i, 1);
    updateBasket();
  };

  function updateBasket() {
    basketItems.innerHTML = '';
    if (basket.length === 0) {
      basketItems.innerHTML = '<p>Your basket is empty.</p>';
      totalPrice.innerText = 'Total: 0 L.E';
      return;
    }

    let total = 0;

    basket.forEach((item, i) => {
      total += item.total;

      const itemDiv = document.createElement('div');
      itemDiv.className = 'basket-item';
      itemDiv.style.display = 'flex';
      itemDiv.style.alignItems = 'center';
      itemDiv.style.justifyContent = 'space-between';
      itemDiv.style.marginBottom = '10px';

      itemDiv.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${item.image}" alt="${item.name}" style="width:60px; border-radius:8px;">
          <div>
            <p style="margin:0; font-weight:bold;">${item.name}</p>
            <p style="margin:0;">${item.size} L.E x ${item.qty} = ${item.total} L.E</p>
          </div>
        </div>
        <button onclick="removeFromBasket(${i})" style="background:red; border:none; color:#fff; padding:5px 10px; border-radius:5px; cursor:pointer;">Remove</button>
      `;

      basketItems.appendChild(itemDiv);
    });

    totalPrice.innerText = `Total: ${total} L.E`;
  }
});
