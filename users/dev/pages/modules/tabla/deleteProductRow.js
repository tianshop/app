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

    // Confirmación del usuario
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;

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

      // Opcional: Puedes recargar los datos de la tabla aquí si no se eliminan dinámicamente
      // Ejemplo: mostrarDatos();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      showToast("Hubo un error al eliminar el producto.", "error");
    }
  });
}
