// image-box.js
document.addEventListener("DOMContentLoaded", function() {
    const imageBoxContainer = document.getElementById("image-box-container");

    fetch("./components/carrucel/image-box.html")
        .then(response => response.text())
        .then(data => {
            imageBoxContainer.innerHTML = data;
            // Si estás usando Bootstrap, inicializa los dropdowns después de cargar el contenido
            const dropdowns = document.querySelectorAll('.dropdown-toggle');
            dropdowns.forEach(dropdown => {
                new bootstrap.Dropdown(dropdown);
            });
        })
        .catch(error => console.error('Error al cargar el encabezado:', error));
});
