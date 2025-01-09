import { ref, get, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database, auth } from "../../../../../../../environment/firebaseConfig.js";
import { showToast } from "../toast/toastLoader.js";
import { formatInputAsDecimal } from "./utils/utils.js";


export function initializeEditPurchase() {
  const editPurchaseModal = document.getElementById("editPurchaseModal");
  const editPurchaseForm = document.getElementById("editPurchaseForm");

  if (!editPurchaseModal || !editPurchaseForm) {
    console.error("No se encontró el modal o el formulario para editar facturas de compra.");
    return;
  }

  let currentPurchaseId = null; // Declaración de currentPurchaseId

  // Elementos del formulario
  const fecha = editPurchaseForm.fecha;
  const empresa = editPurchaseForm.empresa;
  const metodo = editPurchaseForm.metodo;
  const monto = editPurchaseForm.monto;

  formatInputAsDecimal(monto);

  // Asignar valores iniciales al abrir el modal
  document.addEventListener("click", async (e) => {
    if (e.target.closest(".edit-purchase-button")) {
      const button = e.target.closest(".edit-purchase-button");
      currentPurchaseId = button.dataset.id; // Asignar valor a currentPurchaseId

      const currentUser = auth.currentUser;
      if (!currentUser) {
        showToast("Debes iniciar sesión para editar una factura.", "error");
        return;
      }

      const userId = currentUser.uid;
      const purchaseRef = ref(database, `users/${userId}/recordData/purchaseData/${currentPurchaseId}`);

      try {
        const snapshot = await get(purchaseRef);

        if (snapshot.exists()) {
          const purchaseData = snapshot.val();

          // Asignar valores al formulario
          fecha.value = purchaseData.fecha || "";
          metodo.value = purchaseData.factura?.metodo || "";
          empresa.value = purchaseData.factura?.empresa || "";
          monto.value = purchaseData.factura?.monto || "";

          // Mostrar el modal
          const bootstrapModal = new bootstrap.Modal(editPurchaseModal);
          bootstrapModal.show();
        } else {
          showToast("No se encontraron datos de la factura seleccionada.", "error");
        }
      } catch (error) {
        console.error("Error al obtener datos de la factura:", error);
        showToast("Hubo un error al cargar los datos de la factura.", "error");
      }
    }
  });

  // Guardar datos editados
  editPurchaseForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!currentPurchaseId) {
      showToast("No se seleccionó ninguna factura para editar.", "error");
      return;
    }

    const updatedPurchaseData = {
      fecha: fecha.value,
      factura: {
        metodo: metodo.value.trim(),
        empresa: empresa.value.trim(),
        monto: new Intl.NumberFormat("en-US", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(parseFloat(monto.value.replace(/,/g, ""))),
      },
    };

    // Confirmar antes de guardar
    const confirmar = confirm("¿Estás seguro de que deseas actualizar esta factura?");
    if (!confirmar) {
      showToast("Actualización cancelada.", "info");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        showToast("Debes iniciar sesión para editar una factura.", "error");
        return;
      }

      const userId = currentUser.uid;
      const purchaseRef = ref(database, `users/${userId}/recordData/purchaseData/${currentPurchaseId}`);

      await update(purchaseRef, updatedPurchaseData);

      showToast("Factura actualizada con éxito.", "success");

      // Cerrar el modal y resetear el formulario
      const bootstrapModal = bootstrap.Modal.getInstance(editPurchaseModal);
      bootstrapModal.hide();
      editPurchaseForm.reset();
    } catch (error) {
      console.error("Error al actualizar los datos de la factura:", error);
      showToast("Hubo un error al actualizar la factura.", "error");
    }
  });
}
