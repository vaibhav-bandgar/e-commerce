class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.render();
        this.initCheckoutPopup();
    }

    render() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartCountElement = document.getElementById('cart-count');
        const navCartCountElement = document.getElementById('nav-cart-count');
        const subtotalElement = document.getElementById('subtotal');
        const taxElement = document.getElementById('tax');
        const totalElement = document.getElementById('total');

        // Clear existing items
        cartItemsContainer.innerHTML = '';

        // If cart is empty
        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            cartCountElement.textContent = '0 items';
            navCartCountElement.textContent = '0';
            subtotalElement.textContent = '₨0.00';
            taxElement.textContent = '₨0.00';
            totalElement.textContent = '₨0.00';
            return;
        }

        // Render cart items
        let subtotal = 0;
        this.cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-details">
                <h4>${item.title}</h4>
                <p>Price: ₨${item.price.toFixed(2)}</p>
            </div>
            <div class="item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="cartManager.decreaseQuantity(${index})">-</button>
                    <span>${item.quantity || 1}</span>
                    <button class="quantity-btn" onclick="cartManager.increaseQuantity(${index})">+</button>
                </div>
                <button onclick="cartManager.removeItem(${index})">Remove</button>
            </div>
        `;
            cartItemsContainer.appendChild(cartItemElement);
            subtotal += item.price * (item.quantity || 1);
        });

        // Update summary
        const tax = subtotal * 0.08;
        const total = subtotal + tax;

        cartCountElement.textContent = `${this.cart.length} items`;
        navCartCountElement.textContent = this.cart.length;
        subtotalElement.textContent = `₨${subtotal.toFixed(2)}`;
        taxElement.textContent = `₨${tax.toFixed(2)}`;
        totalElement.textContent = `₨${total.toFixed(2)}`;
    }

    removeItem(index) {
        // Remove the item from the cart
        this.cart.splice(index, 1);

        // Update local storage and render updated cart
        this.updateLocalStorage();
        this.render();
    }

    increaseQuantity(index) {
        this.cart[index].quantity = (this.cart[index].quantity || 1) + 1;
        this.updateLocalStorage();
        this.render();
    }

    decreaseQuantity(index) {
        if (this.cart[index].quantity > 1) {
            this.cart[index].quantity--;
        } else {
            this.removeItem(index); // If quantity is 1, remove the item
        }
        this.updateLocalStorage();
        this.render();
    }

    clearCart() {
        this.cart = [];
        this.updateLocalStorage();
        this.render();
    }

    qrdisplay() {
        const qrpopup = document.querySelector('.qr-payment-popup');
        qrpopup.classList.add('active');
        const qrpopupclose = document.querySelector('.qr-submit-btn');
        qrpopupclose.addEventListener('click', () => {
            qrpopup.classList.remove('active');
            this.thankyoumsg();
            this.clearCart();
        });
    }

    cardpaymentmethod() {
        const cardopen = document.querySelector('.card-payment-popup');
        cardopen.classList.add('active');
        const closecard = document.querySelector('.card-close-btn');
        closecard.addEventListener('click', () => {
            cardopen.classList.remove('active');
        });
        const cardpaybtn = document.querySelector('.submit-card-btn');
        cardpaybtn.addEventListener('click', () => {
            this.thankyoumsg();
            this.clearCart();
        });
    }

    paymentmethod() {
        const paynowbtn = document.querySelector('.pay-now-btn');
        const paymentinput = document.querySelectorAll('.input[name="paymentMethod"]');
        const newpop = document.getElementById('paymentPopup');
        newpop.classList.add('active');
        const closepopup = document.querySelector('.close-btn');
        closepopup.addEventListener('click', () => {
            newpop.classList.remove('active');
        });

        paynowbtn.addEventListener('click', () => {
            const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
            if (selectedPaymentMethod) {
                if (selectedPaymentMethod.value == "Credit Card") {
                    this.cardpaymentmethod();
                    newpop.classList.remove('active');
                }
                else if (selectedPaymentMethod.value == "UPI" || selectedPaymentMethod.value == "Google Pay") {
                    this.qrdisplay();
                    newpop.classList.remove('active');
                }
                else if (selectedPaymentMethod.value == "Cash") {
                    newpop.classList.remove('active');
                    this.thankyoumsg();
                    this.clearCart();
                }
                else {
                    alert("Invalid payment method. Try again...");
                }
            }
            else {
                alert('Please select a payment method');
            }
        });
    }

    thankyoumsg() {
        const thankyou = document.querySelector('.thank-you-popup');
        thankyou.classList.add('active');
        let count = 3;
        const interval = setInterval(() => {
            if (count <= 0) {
                clearInterval(interval);
                thankyou.classList.remove('active');
            } 
            else {
                count--;
            }
        }, 1000);
    }

    initCheckoutPopup() {
        const checkoutButton = document.querySelector('.checkout-btn');
        checkoutButton.addEventListener('click', () => {
            const popup = document.getElementById('checkout-popup');
            const popupText = document.getElementById('popup-text');
            popup.classList.add('active');
            popupText.textContent = "Processing your order...";
            let countdown = 3;
            const interval = setInterval(() => {
                if (countdown <= 0) {
                    clearInterval(interval);
                    popup.classList.remove('active');
                    this.paymentmethod();
                } else {
                    popupText.textContent = `Redirecting in ${countdown}...`;
                    countdown--;
                }
            }, 1000);
        });
    }

    updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// prevent data copy 
document.addEventListener("copy",(Event)=>{
    const selecteddata=window.getSelection().toString();
    Event.clipboardData.setData(
        "text/plain",
        "kya copy kar rahe ho"
    );
    Event.preventDefault();
});