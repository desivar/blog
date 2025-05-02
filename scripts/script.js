document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const logoutButton = document.getElementById('logoutButton');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const closeButtons = document.querySelectorAll('.close-modal');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    
    // Check if user is already logged in (from localStorage)
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            loginButton.style.display = 'none';
            signupButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
            
            // Get and display username if available
            const username = localStorage.getItem('username');
            if (username) {
                // You could add a welcome message or username display here
                console.log(`Logged in as: ${username}`);
            }
        } else {
            loginButton.style.display = 'inline-block';
            signupButton.style.display = 'inline-block';
            logoutButton.style.display = 'none';
        }
    }
    
    // Check login status on page load
    checkLoginStatus();
    
    // Toggle mobile menu
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });
    }
    
    // Open login modal
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'flex';
    });
    
    // Open signup modal
    signupButton.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'flex';
    });
    
    // Close modals when clicking the X
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });
    
    // Switch between login and signup modals
    switchToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'flex';
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });
    
    // Handle login form submission
    document.querySelector('#loginModal .login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // In a real application, you would validate credentials against a backend
        // For this demo, we'll simulate a successful login
        if (email && password) {
            // Store login status in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', email.split('@')[0]);
            
            // Update UI
            loginModal.style.display = 'none';
            checkLoginStatus();
            
            // Show success message
            alert('You have successfully logged in!');
        } else {
            alert('Please enter both email and password.');
        }
    });
    
    // Handle signup form submission
    document.querySelector('#signupModal .login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const agreeTerms = document.getElementById('terms').checked;
        
        // Simple validation
        if (!fullname || !email || !password || !confirmPassword) {
            alert('Please fill out all fields.');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        
        if (!agreeTerms) {
            alert('Please agree to the Terms & Conditions.');
            return;
        }
        
        // In a real application, you would send this data to a backend
        // For this demo, we'll simulate a successful registration
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', fullname);
        
        // Update UI
        signupModal.style.display = 'none';
        checkLoginStatus();
        
        // Show success message
        alert('Account created successfully! You are now logged in.');
    });
    
    // Handle logout
    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear login data
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        
        // Update UI
        checkLoginStatus();
        
        // Show message
        alert('You have been logged out.');
    });
    
    // Initialize news marquee
    const marquee = document.querySelector('.marquee-content');
    if (marquee) {
        // Clone the content for a continuous effect
        marquee.innerHTML = marquee.innerHTML + marquee.innerHTML;
    }
});