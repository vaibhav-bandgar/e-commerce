// Product Data
const products = [
    {
        id: 1,
        title: "Tharrat | थार्राट | सुहास शिरवळकर | Suhas Shirvalkar",
        description: "Marathi Edition | by Suhas Shirvalkar | 1 January 2021",
        price: 160,
        category: "Action",
        image: "image/book/action/thartharat.webp"
    },
    {
        id: 2,
        title: "Ram : Scion of Ikshvaku (Marathi) ",
        description: " Marathi Edition | by Amish  | 9 December 2022",
        price: 241,
        category: "Action",
        image: "image/book/action/ram.webp"
    },
    {
        id: 3,
        title: "The Secret Of The Nagas (Marathi) ",
        description: "Marathi Edition | by Amish  | 13 December 2022",
        price: 242,
        category: "Action",
        image: "image/book/action/the snake.webp"
    },
    {
        id: 4,
        title: "Raavan : Enemy of Aryavarta (Marathi) ",
        description: " Marathi Edition | by Amish  | 6 December 2022",
        price: 130,
        category: "Action",
        image: "image/book/action/ravan.webp"
    },
    {
        id: 5,
        title: "Sita : Warrior of Mithila (Marathi)",
        description: "Marathi Edition | by Amish  | 6 December 2022",
        price: 241,
        category: "Action",
        image: "image/book/action/sita.webp"
    },
    {
        id: 6,
        title: "Krishnaniti - Krishna Niti Book in Marathi",
        description: "Marathi Edition | by Girish Jakhotiya | 1 January 2019",
        price: 224,
        category: "History",
        image: "image/book/History/Krishnaniti.webp"
    },
    {
        id: 7,
        title: "Mantarlele Divas : मंतरलेले दिवस Book",
        description: "Marathi Edition | by G. D. Madgulkar  | 1 November 2021",
        price: 169,
        category: "History",
        image: "image/book/History/mantarlrlr divas.webp"
    },
    {
        id: 8,
        title: "MRUTYUNJAY BY SHIVAJI SAWANT | MRITYUNJAY",
        description: "Marathi Edition | by SHIVAJI SAWANT  | 4 May 2023",
        price: 399,
        category: "History",
        image: "image/book/History/mrityunjay.webp"
    },

    {
        id: 9,
        title: "Urmila, Marathi Novel | उर्मिला Marathi Novel",
        description: "Marathi Edition | by Samar  | 25 September 2022",
        price: 249,
        category: "History",
        image: "image/book/History/urmila.webp"
    },
    {
        id: 10,
        title: "YUGANDHAR- SHIVAJI SAWANT | युगंधर- शिवाजी सावंत",
        description: "Marathi Edition | by SHIVAJI SAWANT  | 4 May 2023",
        price: 650,
        category: "History",
        image: "image/book/History/yugandhar.webp"
    },
    {
        id: 11,
        title: "Sherlock Holmes chya Rahasyakatha",
        description: "Marathi Edition | Arthur Conan Doyle and Dileep Chaware | 1 July 2015",
        price: 183,
        category: "Thriller",
        image: "image/book/Thriller/sherlock holmes.webp"
    },
    {
        id: 12,
        title: "Sherlock Holmes : A Study in Scarlet (Sherlock Holmes)",
        description: "Marathi Edition | Arthur Conan Doyle and Pravin Joshi | 1 October 2013",
        price: 149,
        category: "Thriller",
        image: "image/book/Thriller/a study in scarlet.webp"
    },
    {
        id: 13,
        title: "Detective Alfa aani The 'Moonlight Murder' Prakaran ",
        description: "Marathi Edition | by Sourabh Wagale  | 24 December 2019",
        price: 120,
        category: "Thriller",
        image: "image/book/Thriller/moon light murder.webp"
    },
    {
        id: 14,
        title: "Talghar : Bhaykatha, तळघर भयकथा पुस्तक Narayan Dharap",
        description: "Marathi Edition | by Narayan Dharap  | 1 January 2022",
        price: 131,
        category: "Thriller",
        image: "image/book/Thriller/talghar.webp"
    },
    {
        id: 15,
        title: "बुक ऑफ लव्ह (Book Of Love - Marathi)",
        description: "Marathi Edition | by StoryMirror Author | 18 October 2020",
        price: 150,
        category: "Love",
        image: "image/book/love/book of love.webp"
    },
    {
        id: 16,
        title: "तिया | Tiya (Marathi Novel) Love story | मराठी कादंबरी",
        description: "Marathi Edition | by Vipul Mahapurush | 1 January 2016",
        price: 150,
        category: "Love",
        image: "image/book/love/tiya.webp"
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