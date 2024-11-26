function filterItems() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const categorySelect = document.getElementById('categorySelect').value;
    const items = document.querySelectorAll('.category-item');

    items.forEach(item => {
        const itemName = item.querySelector('h5').textContent.toLowerCase();
        const itemCategory = item.getAttribute('data-category');

        if ((categorySelect === 'all' || categorySelect === itemCategory) && itemName.includes(input)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}


  // Function to open login popup
  function openLoginPopup() {
    document.getElementById('loginPopup').style.display = 'flex';
    document.getElementById('signupPopup').style.display = 'none';
}

// Function to close login popup
function closeLoginPopup() {
    document.getElementById('loginPopup').style.display = 'none';
}

// Function to open signup popup
function openSignupPopup() {
    document.getElementById('signupPopup').style.display = 'flex';
    document.getElementById('loginPopup').style.display = 'none';
}

// Function to close signup popup
function closeSignupPopup() {
    document.getElementById('signupPopup').style.display = 'none';
}

// Add event listeners after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select login link and add click event
    const loginLinks = document.querySelectorAll('.loginlink');
    loginLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            openLoginPopup();
        });
    });

    // Select signup link and add click event
    const signupLinks = document.querySelectorAll('.signup');
    signupLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            openSignupPopup();
        });
    });

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Example simple validation
            if (email && password) {
                alert('Login Successful!');
                closeLoginPopup();
            } else {
                alert('Please enter email and password');
            }
        });
    }

    // Handle signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;

            // Example simple validation
            if (name && email && password) {
                alert('Sign Up Successful!');
                closeSignupPopup();
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // Close button event listeners
    const closeLoginBtn = document.querySelector('#loginPopup .close-btn');
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', closeLoginPopup);
    }

    const closeSignupBtn = document.querySelector('#signupPopup .close-btn');
    if (closeSignupBtn) {
        closeSignupBtn.addEventListener('click', closeSignupPopup);
    }

    // Handling login/signup links within popups
    const popupLoginLinks = document.querySelectorAll('#signupPopup .signup-link a');
    popupLoginLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            openLoginPopup();
        });
    });

    const popupSignupLinks = document.querySelectorAll('#loginPopup .signup-link a');
    popupSignupLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            openSignupPopup();
        });
    });
});

// privent copy data 
document.addEventListener("copy",(Event)=>{
    const selecteddata=window.getSelection().toString();
    Event.clipboardData.setData(
        "text/plain",
        "kya copy kar rahe ho"
    );
    Event.preventDefault();
});