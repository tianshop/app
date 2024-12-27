import "../modal/register-product-modal.js"

function loadSearchComponent() {
    fetch('./components/buttons/search-component.html')
        .then(response => response.text())
        .then(html => {
            const modalContainer = document.getElementById('search-container');
            modalContainer.innerHTML = html;
        })
}

loadSearchComponent();