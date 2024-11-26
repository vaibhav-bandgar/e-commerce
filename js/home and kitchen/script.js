// Product Data
const products = [
    {
        id: 1,
        title: "Amazon Brand - Solimo Prim Engineered Wood Coffee Table (Wenge)",
        description: "<p> <mark>34% off</mark>  <span>Limited time deal</span></p>",
        price: 1989,
        category: "home",
        image: "image/home and kitchen/table.jpg"
    },
    {
        id: 2,
        title: "Godrej Security Solutions Forte Pro 15 Litres Safe Locker for Home & Office with Mechanical Key Lock (Grey)",
        description: "<p> <mark>23% off</mark>  <span>Limited time deal</span></p>",
        price: 7899,
        category: "home",
        image: "image/home and kitchen/locker.jpg"
    },
    {
        id: 3,
        title: "LAPO Heavy Duty Aluminium Automatic Hydraulic Double Speed Door Closer for Home Office | Aluminium and Wooden Soft Door Closers with Fitting Set for All..",
        description: "<p> <mark>62% off</mark>  <span>Limited time deal</span></p>",
        price: 975,
        category: "home",
        image: "image/home and kitchen/door closer.jpg"
    },
    {
        id: 4,
        title: "Pigeon by Stovekraft Favourite Outer Lid Non Induction Aluminium Pressure Cooker, 3 Litres, Silver",
        description: "<p> <mark>50% off</mark>  <span>Limited time deal</span></p>",
        price: 699,
        category: "kitchen",
        image: "image/home and kitchen/cooker.jpg"
    },
    {
        id: 5,
        title: "HomeEssentials Cast Iron Frypan - Skillet Pan for Frying/Natural Non Stick Pan/Induction & Gas Base/Pre Seasoned, 100% Toxin Free, Naturally Long.",
        description: "<p> <mark>53% off</mark>  <span>Limited time deal</span></p>",
        price: 1424,
        category: "kitchen",
        image: "image/home and kitchen/pan.jpg"
    },
    {
        id: 6,
        title: "Sujata Gas Stove 4 Burners | 9 Years Warranty | 4 Burner Gas Stove Glass Top, ISI Certified, 4 Burner Gas Stove, Hob Gas Stove 4 Burners, LPG & PNG",
        description: "<p> <mark>40% off</mark>  <span>Limited time deal</span></p>",
        price: 13779,
        category: "kitchen",
        image: "image/home and kitchen/gas.jpg"
    },
    {
        id: 7,
        title: "Wonderchef Stainless Steel Gas Igniter, Long Lasting, Rust Proof, Unbreakable, Soft & Long Grip, Red",
        description: "<p> <mark>36% off</mark>  <span>Limited time deal</span></p>",
        price: 129,
        category: "kitchen",
        image: "image/home and kitchen/lgniter.jpg"
    },
    {
        id: 8,
        title: "Qubo Instaview New Age Doorphone from Hero Group | Video Doorbell Pro 2K + Home Tab | Instant Phone & Tab Visitor Video Call | 3MP 1296P Resolution |.",
        description: "<p> <mark>47% off</mark>  <span>Limited time deal</span></p>",
        price: 14299,
        category: "home",
        image: "image/home and kitchen/door phone.jpg"
    },

    {
        id: 9,
        title: "MILTON Aura 1000 Thermosteel Bottle, 1050 ml Water Bottles, 24 Hours Hot and Cold, Easy to Carry, Easy Grip, Rust Proof, Tea, Coffee, Office, Travel Bottle",
        description: "<p> <mark>20% off</mark>  <span>Limited time deal</span></p>",
        price: 931,
        category: "kitchen",
        image: "image/home and kitchen/bottles.jpg"
    },
    {
        id: 10,
        title: "Plantex Ladder for Home - Premium Steel Foldable 5-Step Ladder - Anti Skid Strong Steps with 5 Years Manufacturer Warranty (Blue & Black)",
        description: "<p> <mark>61% off</mark>  <span>Limited time deal</span></p>",
        price: 3499,
        category: "home",
        image: "image/home and kitchen/ladder.jpg"
    },
    {
        id: 11,
        title: "Milton Pro Lunch Tiffin (3 Microwave Safe Inner Steel Containers, 180/320/450 ml; 1 Plastic Chutney Dabba,100 ml; 1 Aqua Steel Bottle, 750 ml, Steel Spoon",
        description: "<p> <mark>55% off</mark>  <span>Limited time deal</span></p>",
        price: 899,
        category: "kitchen",
        image: "image/home and kitchen/lunch bag.jpg"
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