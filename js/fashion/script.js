const products = [
    {
        id: 1,
        title: "Allen Solly Men's Casual Crew Neck Sweatshirt",
        description: " <p> <mark>53% off</mark>  <span>Limited time deal</span></p> ",
        price: 699,
        category: "man",
        image: "image/fashion/tshirt.jpg"
    },
    {
        id: 2,
        title: "MIMOSA Women's Traditional Art Silk Saree Kanjivaram Style With Blouse Color:Off White(3300-225-HWT-RNI)",
        description: "<p> <mark>64% off</mark>  <span>Limited time deal</span></p>",
        price: 2199,
        category: "woman",
        image: "image/fashion/saree.jpg"
    },
    {
        id: 3,
        title: "Vaamsi Rayon Blend Women's Floral Printed A-Line Kurta Pant With Dupatta Set",
        description: "<p> <mark>71% off</mark>  <span>Limited time deal</span></p>",
        price: 1299,
        category: "woman",
        image: "image/fashion/salwar.jpg"
    },
    {
        id: 4,
        title: "Lymio Hoodies || Sweatshirt for Unisex || Unisex Hoodie (H-46-47)",
        description: "<p> <mark>86% off</mark>  <span>Limited time deal</span></p>",
        price: 579,
        category: "man",
        image: "image/fashion/hoodies.jpg"
    },
    {
        id: 5,
        title: "Lymio men jackets || bomber jacket for men || Lightweight Outwear Sportswear Bomber Jacket (J4-6)",
        description: "<p> <mark>84% off</mark>  <span>Limited time deal</span></p>",
        price: 799,
        category: "man",
        image: "image/fashion/jacket.jpg"
    },
    {
        id: 6,
        title: "Lymio Men Cargo || Men Cargo Pants || Men Cargo Pants Cotton || Cargos for Men (Cargo-01-04)",
        description: "<p> <mark>87% off</mark>  <span>Limited time deal</span></p>",
        price: 649,
        category: "man",
        image: "image/fashion/cargo.jpg"
    },
    {
        id: 7,
        title: "Janasya Women's Peach Georgette Thread Work Kurta with Sharara",
        description: "<p> <mark>73% off</mark>  <span>Limited time deal</span></p>",
        price: 849,
        category: "woman",
        image: "image/fashion/fusion.jpg"
    },
    {
        id: 8,
        title: "Baby Girls Cotton Floral Print T-shirt And Shorts Set in Fuchsia Color",
        description: "<p> <mark>53% off</mark>  <span>Limited time deal</span></p>",
        price: 499,
        category: "kids",
        image: "image/fashion/baby girl.jpg"
    },

    {
        id: 9,
        title: "Cotton Boys All-Over Print Shirt And Shorts Set",
        description: "<p> <mark>46% off</mark>  <span>Limited time deal</span></p>",
        price: 781,
        category: "kids",
        image: "image/fashion/cotton boy.jpg"
    },
    {
        id: 10,
        title: "Boys Overall and Dress Set",
        description: "<p> <mark>39% off</mark>  <span>Limited time deal</span></p>",
        price: 792,
        category: "kids",
        image: "image/fashion/boys overall.jpg"
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