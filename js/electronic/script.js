// Product Data
const products = [
    {
        id: 1,
        title: "4K Smart TV",
        description: "Ultra HD Smart TV with HDR <br> <p> <mark>53% off</mark>  <span>Limited time deal</span></p>",
        price: 65000,
        category: "Television",
        image: "image/electronic/tv.jpg"
    },
    {
        id: 2,
        title: "Wireless Headphones",
        description: "Noise Cancelling Headphones <br> <p> <mark>43% off</mark>  <span>Limited time deal</span></p>",
        price: 2499,
        category: "Audio",
        image: "image/electronic/wheadphone.jpg"
    },
    {
        id: 3,
        title: "Gaming Laptop",
        description: "High Performance Gaming Laptop <br> <p> <mark>25% off</mark>  <span>Limited time deal</span></p>",
        price: 69000,
        category: "Computers",
        image: "image/electronic/laptop.avif"
    },
    {
        id: 4,
        title: "Smartphone",
        description: "Latest Model Smartphone <br> <p> <mark>23% off</mark>  <span>Limited time deal</span></p>",
        price: 15000,
        category: "Television",
        image: "image/electronic/phone.avif"
    },
    {
        id: 5,
        title: "Fan",
        description: "CG Champair Pedestal Fan 450mm offers a powerful cooling solution for your home. It features a 450mm sweep and 100W power inputs. <br> <p> <mark>45% off</mark>  <span>Limited time deal</span></p>",
        price: 1500,
        category: "Mobile",
        image: "image/electronic/fan.webp"
    },
    {
        id: 6,
        title: "Refrigerator",
        description: "Equipped with an automatic defrost system, it includes an evaporator coil and fan that circulates cold air when the freezer is closed. <br> <p> <mark>55% off</mark>  <span>Limited time deal</span></p>",
        price: 24999,
        category: "Mobile",
        image: "image/electronic/refrigerator.webp"
    },
    {
        id: 7,
        title: "Washing machine",
        description: "The AI DD detects not only the weight but also senses the softness of fabric, and it chooses the optimal motions for the fabric by itself<br> <p> <mark>43% off</mark>  <span>Limited time deal</span></p> ",
        price: 18000,
        category: "Mobile",
        image: "image/electronic/washing.png"
    },
    {
        id: 8,
        title: "Computer ",
        description: "Computer all in one PC hardware software 24 inch latest cheap ultra thin desktop computer. Size : 23.8''/27''	Resolution	1920*1080 <br> <p> <mark>53% off</mark>  <span>Limited time deal</span></p>",
        price: 50000,
        category: "Computers",
        image: "image/electronic/computerphoto.avif"
    },
    {
        id: 9,
        title: "Tab ",
        description: "base model with 8 GB RAM and 256 GB of internal storage. It comes in the following colors: Storm Grey, black and sliver. <br> <p> <mark>24% off</mark>  <span>Limited time deal</span></p>",
        price: 9999,
        category: "Computers",
        image: "image/electronic/tab.avif"
    },
    {
        id: 10,
        title: "Sound bar ",
        description: "Be surrounded by a complete audio environment with the 3.1.2ch Soundbar. With object-based sound playbacks like Dolby Atmos. <br> <p> <mark>36% off</mark>  <span>Limited time deal</span></p>",
        price: 4500,
        category: "Audio",
        image: "image/electronic/sound bar.avif"
    },
    {
        id: 11,
        title: "Apple iPad Pro 13 (M4)",
        description: "Ultra Retina XDR Display, 512GB, 12MP Front Camera / 12MP Back Camera, LiDAR Scanner, Wi-Fi 6E + 5G Cellular with eSIM, All-Day. <br> <p> <mark>5% off</mark>  <span>Limited time deal</span></p>",
        price: 169000,
        category: "Computers",
        image: "image/electronic/ipad.jpg"
    }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update Cart Item Count
function updateCartCount() {
    const cartItemCount = document.getElementById('cartItemCount');
    cartItemCount.textContent = cart.length;
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    // Check if product already in cart
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Optional: Show alert
    alert(`${product.title} added to cart!`);
}

// Render Products
function renderProducts(filteredProducts = products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = ''; // Clear existing products

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="col-md-3 product-card" data-category="${product.category}">
                <div class="card h-100">
                     <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text fw-bold">₨${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

// Search Products
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
}

// Filter Products
function filterProducts() {
    const categorySelect = document.getElementById('categorySelect').value;
    const minPrice = parseFloat(document.getElementById('minPriceInput').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPriceInput').value) || Infinity;

    const filteredProducts = products.filter(product => {
        const matchesCategory = categorySelect ? product.category === categorySelect : true;
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        return matchesCategory && matchesPrice;
    });
    renderProducts(filteredProducts);
}

// Initial Render
updateCartCount();
renderProducts();

// prevent data copy 
document.addEventListener("copy",(Event)=>{
    const selecteddata=window.getSelection().toString();
    Event.clipboardData.setData(
        "text/plain",
        "kya copy kar rahe ho"
    );
    Event.preventDefault();
});