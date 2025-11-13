// ===== THEME SWITCHING =====

// Get theme toggle button
const themeToggle = document.getElementById('theme-toggle');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    // Save the theme preference
    const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);

    // Add a fun rotation animation
    themeToggle.style.transform = 'rotate(360deg) scale(1.1)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg) scale(1)';
    }, 300);
});

// ===== PRICING CALCULATOR =====

// Pricing data structure
const pricingData = {
    onetime: {
        name: 'One-Time Purchase',
        price: 999,
        frequency: '',
        annualCost: 999,
        savings: 1549
    },
    yearly: {
        name: 'Yearly Subscription',
        price: 1299,
        frequency: '/year',
        annualCost: 1299,
        savings: 1249
    },
    quarterly: {
        name: 'Quarterly Subscription',
        price: 399,
        frequency: '/quarter',
        annualCost: 1596,
        savings: 952
    },
    monthly: {
        name: 'Monthly Subscription',
        price: 149,
        frequency: '/month',
        annualCost: 1788,
        savings: 760
    },
    weekly: {
        name: 'Weekly Subscription',
        price: 49,
        frequency: '/week',
        annualCost: 2548,
        savings: 0
    }
};

// DOM elements
const paymentOptions = document.querySelectorAll('.payment-option');
const planName = document.getElementById('plan-name');
const priceAmount = document.getElementById('price-amount');
const priceFrequency = document.getElementById('price-frequency');
const annualCost = document.getElementById('annual-cost');
const savingsBadge = document.getElementById('savings-badge');
const buyButton = document.querySelector('.btn-buy');

// Current selected frequency
let currentFrequency = 'onetime';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updatePricingDisplay('onetime');
    attachEventListeners();
});

// Attach event listeners to payment options
function attachEventListeners() {
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            const frequency = option.getAttribute('data-frequency');

            // Remove active class from all options
            paymentOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to clicked option
            option.classList.add('active');

            // Update pricing display
            updatePricingDisplay(frequency);

            // Add animation to price
            priceAmount.style.animation = 'none';
            setTimeout(() => {
                priceAmount.style.animation = 'fadeInUp 0.5s ease';
            }, 10);
        });
    });

    // Buy button click handler
    buyButton.addEventListener('click', () => {
        handlePurchase();
    });
}

// Update pricing display
function updatePricingDisplay(frequency) {
    currentFrequency = frequency;
    const data = pricingData[frequency];

    // Update plan name
    planName.textContent = data.name;

    // Update price
    priceAmount.textContent = data.price.toLocaleString();
    priceFrequency.textContent = data.frequency;

    // Update annual cost
    annualCost.textContent = `$${data.annualCost.toLocaleString()}`;

    // Update savings badge
    if (data.savings > 0) {
        const savingsAmount = data.savings.toLocaleString();
        savingsBadge.innerHTML = `<span>💰 Save $${savingsAmount} vs Weekly!</span>`;
        savingsBadge.classList.remove('hidden');
    } else {
        savingsBadge.classList.add('hidden');
    }

    // Update button text based on frequency
    updateButtonText(frequency);
}

// Update buy button text
function updateButtonText(frequency) {
    const data = pricingData[frequency];
    let buttonText = 'Buy Nothing Now';

    if (frequency === 'onetime') {
        buttonText = `Buy Nothing for $${data.price}`;
    } else {
        buttonText = `Subscribe for $${data.price}${data.frequency}`;
    }

    buyButton.textContent = buttonText;
}

// Handle purchase
function handlePurchase() {
    const data = pricingData[currentFrequency];

    // Create a fun alert message
    let message = `Congratulations! 🎉\n\n`;
    message += `You've chosen the ${data.name}!\n`;
    message += `Price: $${data.price}${data.frequency}\n\n`;
    message += `You will receive:\n`;
    message += `✓ Absolutely nothing\n`;
    message += `✓ Premium emptiness\n`;
    message += `✓ Instant non-delivery\n\n`;
    message += `Thank you for your purchase of nothing!\n`;
    message += `Your nothing will not be delivered immediately.`;

    alert(message);

    // Add a fun animation to the button
    buyButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        buyButton.style.transform = 'scale(1)';
    }, 100);

    // Track the "purchase" (in a real app, this would integrate with payment processing)
    console.log('Purchase initiated:', {
        frequency: currentFrequency,
        price: data.price,
        annualCost: data.annualCost
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to hero visual
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const nothingBox = document.querySelector('.nothing-box');
    if (nothingBox) {
        nothingBox.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.05}deg)`;
    }
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and testimonials
document.querySelectorAll('.feature-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
