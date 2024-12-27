// register-product-modal.js
import { initializeRegisterAndSaveProduct } from "./register-product-modal.js";
import { initializeEditProductModal } from "./edit-product-modal.js";
import { initializeDeleteProductRow } from "../../modules/tabla/deleteProductRow.js";

// Función genérica para cargar modales
function loadModal(htmlPath, containerId, initializeCallback) {
  fetch(htmlPath)
    .then((response) => response.text())
    .then((html) => {
      const modalContainer = document.getElementById(containerId);
      if (!modalContainer) {
        console.error(`No se encontró el contenedor con ID: ${containerId}`);
        return;
      }
      modalContainer.innerHTML = html;
      initializeCallback(); // Llamar a la función de inicialización específica
    })
    .catch((error) => console.error(`Error al cargar el modal desde ${htmlPath}:`, error));
}

document.addEventListener("DOMContentLoaded", () => {
  // Cargar y inicializar modales
  loadModal(
    "./components/modal/register-product-modal.html",
    "register-product-modal-container",
    initializeRegisterAndSaveProduct
  );

  loadModal(
    "./components/modal/edit-product-modal.html",
    "edit-product-modal-container",
    initializeEditProductModal
  );

  loadModal(
    "./modules/tabla/deleteProduct-confirmation-modal.html",
    "delete-product-confirmation-modal-container",
    initializeDeleteProductRow
  );

});
