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
