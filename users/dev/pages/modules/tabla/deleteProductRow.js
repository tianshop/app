import { ref, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database, auth } from "../../../../../environment/firebaseConfig.js";
import { showToast } from "../../components/toast/toastLoader.js";

export function initializeDeleteProductRow() {
  // Delegar el evento para manejar clics en botones de eliminación
  document.addEventListener("click", async (e) => {
    const deleteButton = e.target.closest(".delete-product-button");
    if (!deleteButton) return;

    const productId = deleteButton.dataset.id; // Obtener el ID del producto a eliminar

    if (!productId) {
      console.error("ID del producto no encontrado.");
      return;
    }

    // Mostrar modal de confirmación
    const confirmationModalElement = document.getElementById("deleteConfirmationModal");
    const confirmationModal = new bootstrap.Modal(confirmationModalElement);
    const confirmButton = document.getElementById("confirmDeleteButton");
    const cancelButton = document.querySelector(".btn-secondary[data-bs-dismiss='modal']");

    if (!confirmationModal || !confirmButton || !cancelButton) {
      console.error("No se encontró el modal o los botones necesarios.");
      return;
    }

    confirmationModal.show();

    // Cerrar correctamente al cancelar
    cancelButton.addEventListener("click", () => {
      confirmationModal.hide(); // Cierra el modal
      removeBackdrop(); // Elimina cualquier fondo gris sobrante
    });

    confirmButton.onclick = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          showToast("Debes iniciar sesión para eliminar un producto.", "error");
          return;
        }

        const userId = currentUser.uid;
        const productRef = ref(database, `users/${userId}/productData/${productId}`);

        // Eliminar el producto de la base de datos
        await remove(productRef);

        // Mostrar un mensaje de éxito
        showToast("Producto eliminado con éxito.", "success");

        // Ocultar el modal de confirmación
        confirmationModal.hide();
        removeBackdrop(); // Asegura que el fondo gris se elimine correctamente

      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        showToast("Hubo un error al eliminar el producto.", "error");
      }
    };

    // Función para limpiar el fondo gris
    function removeBackdrop() {
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());
    }

  });
}
