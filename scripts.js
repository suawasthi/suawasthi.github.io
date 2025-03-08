function search() {
    const query = document.getElementById('search-input').value;
    alert('Search for: ' + query);
}

function animateSearchPlaceholder() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return; // Add this check

    const placeholders = ["Birthday Theme", "Wedding Gift", "Farewell"];
    let index = 0;

    setInterval(() => {
        searchInput.placeholder = placeholders[index];
        index = (index + 1) % placeholders.length;
    }, 2000);
}

document.addEventListener('DOMContentLoaded', animateSearchPlaceholder);

// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const loadImage = (image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = () => {
            image.removeAttribute('data-src');
        };
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach(image => {
        imageObserver.observe(image);
    });
});

// Insert header content
document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header>
                <h1>Gift Guru</h1>
                <p>Your one-stop inspiration for thoughtful gifting.</p>
            </header>
            <nav>
                <a href="index.html">Home</a>
                <a href="#trending">Trending Ideas</a>
                <a href="guide.html">Gifting Guide</a>
                <a href="about.html">About Us</a>
                <a href="contact.html">Contact</a>
                <a href="blog.html">Blog</a>
                <input type="text" placeholder="Search..." id="search-input">
                <button onclick="search()">Search</button>
            </nav>
        `;
    }
});

// Guide page script
const questions = [
    { question: "Which gender are you looking to gift?", options: ["Male", "Female", "Skip"], background: './pexels-wordsurfer-842876.jpg' },
    { question: "What age group are you looking to gift?", options: ["Under 10", "Under 20", "Under 30"], background: './pexels-wordsurfer-842876.jpg' },
    { question: "What is the occasion?", options: ["Birthday", "Anniversary", "Festival"], background: './pexels-wordsurfer-842876.jpg' },
    { question: "What is the recipient's hobby?", options: ["Reading", "Sports", "Music", "Art"], background: './pexels-wordsurfer-842876.jpg' },
    { question: "What is your budget?", options: ["Under $20", "$20-$50", "$50-$100", "Above $100"], background: './pexels-wordsurfer-842876.jpg' },
];
let currentIndex = 0;
const selections = {
    "Which gender are you looking to gift?": "Skip",
    "What age group are you looking to gift?": "Under 20",
    "What is the occasion?": "Birthday",
    "What is the recipient's hobby?": "Reading",
    "What is your budget?": "$20-$50",
};

function startQuiz() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    if (currentIndex < questions.length) {
        document.getElementById('question-text').innerText = questions[currentIndex].question;
        document.getElementById('body').style.transition = "background 0.8s ease-in-out";
        setTimeout(() => {
            document.getElementById('body').style.background = `url('${questions[currentIndex].background}') no-repeat center center/cover`;
            document.getElementById('body').style.backgroundSize = "cover";
        }, 100);

        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        questions[currentIndex].options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => {
                selections[questions[currentIndex].question] = option;
                nextQuestion();
            };
            optionsContainer.appendChild(button);
        });
    } else {
        localStorage.setItem('selections', JSON.stringify(selections));
        location.href = "suggestions.html"; // Redirect to suggestions page
    }
}

function nextQuestion() {
    currentIndex++;
    showQuestion();
}

// Suggestions page script
document.addEventListener('DOMContentLoaded', () => {
    const suggestionsContainer = document.getElementById('suggestions');
    if (!suggestionsContainer) return; // Add this check

    const selections = JSON.parse(localStorage.getItem('selections'));
    const suggestions = getSuggestions(selections);
    suggestions.forEach(suggestion => {
        const card = document.createElement('div');
        card.className = 'suggestion-card';
        card.innerHTML = `<h3>${suggestion.name}</h3><p>${suggestion.description}</p>`;
        suggestionsContainer.appendChild(card);
    });
});

function getSuggestions(selections) {
    const gender = selections["Which gender are you looking to gift?"] || "Neutral";
    const age = selections["What age group are you looking to gift?"] || "20-30";
    const occasion = selections["What is the occasion?"] || "Just Because";

    const suggestions = [];

    // Logic for real gift suggestions based on selections
    if (gender === "Male" || gender === "Neutral") {
        if (age === "Under 10") {
            suggestions.push({ name: "LEGO Building Set", description: "A fun and creative toy for kids." });
            suggestions.push({ name: "Superhero Action Figure", description: "Perfect for imaginative play." });
            suggestions.push({ name: "Remote Control Car", description: "Exciting and fun for young boys." });
        } else if (age === "10-20") {
            suggestions.push({ name: "Gaming Headset", description: "Great for teen gamers." });
            suggestions.push({ name: "Sports Water Bottle", description: "Stylish and practical for active teens." });
            suggestions.push({ name: "Bluetooth Speaker", description: "Portable and perfect for music lovers." });
        } else if (age === "20-30") {
            suggestions.push({ name: "Leather Wallet", description: "A sleek, everyday essential." });
            suggestions.push({ name: "Craft Beer Kit", description: "For the beer enthusiast." });
            suggestions.push({ name: "Fitness Tracker", description: "Ideal for health-conscious individuals." });
        } else if (age === "30+") {
            suggestions.push({ name: "Grilling Tool Set", description: "Perfect for BBQ lovers." });
            suggestions.push({ name: "Smartwatch", description: "A tech-savvy gift for adults." });
            suggestions.push({ name: "Luxury Shaving Kit", description: "A premium grooming experience." });
        }
    }

    if (gender === "Female" || gender === "Neutral") {
        if (age === "Under 10") {
            suggestions.push({ name: "DIY Jewelry Kit", description: "Spark creativity with beads and charms." });
            suggestions.push({ name: "Stuffed Animal", description: "A cuddly companion for kids." });
            suggestions.push({ name: "Art Supplies Set", description: "Encourage artistic expression." });
        } else if (age === "10-20") {
            suggestions.push({ name: "Skincare Gift Set", description: "Gentle products for teens." });
            suggestions.push({ name: "Polaroid Camera", description: "Capture memories in style." });
            suggestions.push({ name: "Fashion Accessories", description: "Trendy items for young fashionistas." });
        } else if (age === "20-30") {
            suggestions.push({ name: "Aromatherapy Diffuser", description: "Relaxation for busy adults." });
            suggestions.push({ name: "Statement Necklace", description: "A bold accessory for any occasion." });
            suggestions.push({ name: "Yoga Mat", description: "Perfect for fitness enthusiasts." });
        } else if (age === "30+") {
            suggestions.push({ name: "Luxury Candle Set", description: "Elegant scents for the home." });
            suggestions.push({ name: "Wine Subscription", description: "A treat for wine lovers." });
            suggestions.push({ name: "Spa Gift Basket", description: "Indulgent self-care items." });
        }
    }

    // Occasion-specific tweaks
    if (occasion === "Birthday") {
        suggestions.push({ name: "Personalized Cake Topper", description: "Make their day extra special." });
        suggestions.push({ name: "Birthday Balloon Bouquet", description: "Festive and fun decoration." });
    } else if (occasion === "Anniversary") {
        suggestions.push({ name: "Custom Photo Frame", description: "A sentimental keepsake." });
        suggestions.push({ name: "Couple's Massage Voucher", description: "A relaxing experience for two." });
    } else if (occasion === "Festival") {
        suggestions.push({ name: "Festive Gift Basket", description: "Filled with seasonal goodies." });
        suggestions.push({ name: "Holiday Ornament Set", description: "Decorative and festive." });
    } else {
        suggestions.push({ name: "Handwritten Note Set", description: "A simple, heartfelt gesture." });
        suggestions.push({ name: "Gourmet Chocolate Box", description: "Delicious and indulgent." });
    }

    // Limit to 4-6 suggestions for display
    return suggestions.slice(0, 6);
}

function changeCriteria() {
    location.href = "guide.html"; // Redirect back to guide page
}

document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the start guide button
    const startGuideButton = document.getElementById('start-guide');
    if (startGuideButton) {
        startGuideButton.addEventListener('click', startQuiz);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Load header and navigation
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });

    // Add event listener for the start guide button
    const startGuideButton = document.getElementById('start-guide');
    if (startGuideButton) {
        startGuideButton.addEventListener('click', startQuiz);
    }
});
