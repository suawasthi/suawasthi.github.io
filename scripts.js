function search() {
    const query = document.getElementById('search-input').value;
    alert('Search for: ' + query);
}

function animateSearchPlaceholder() {
    const searchInput = document.getElementById('search-input');
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
