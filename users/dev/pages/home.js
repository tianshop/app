import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database, auth } from "../../../environment/firebaseConfig.js";
import { checkAuth } from "../../../modules/accessControl/authCheck.js";
import { getUserEmail } from "../../../modules/accessControl/getUserEmail.js";
import { setupInstallPrompt } from '../../../modules/installPrompt.js';

import { createTableRow } from "./modules/tabla/createTableRow.js";
import { initializePopovers } from "./modules/popover/popover.js";
import { initializeSearchProduct } from "./modules/tabla/search-product.js";
import { initializeDeleteProductRow } from "./modules/tabla/deleteProductRow.js";
import { initializeDuplicateProductRow } from "./modules/tabla/duplicateProductRow.js";
import { initializePagination } from "./components/pagination/pagination.js";

// Constantes y variables de estado
const tabla = document.getElementById("contenidoTabla");

export function mostrarDatos(callback) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("El usuario no ha iniciado sesión.");
    return;
  }

  const userId = currentUser.uid;
  const userProductsRef = ref(database, `users/${userId}/productData`);

  onValue(userProductsRef, async (snapshot) => {
    tabla.innerHTML = "";

    const data = [];
    snapshot.forEach((childSnapshot) => {
      data.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    data.sort((b, a) => new Date(a.fecha) - new Date(b.fecha));

    let filaNumero = 1;

    for (let i = 0; i < data.length; i++) {
      const productData = data[i];
      tabla.innerHTML += createTableRow(productData, filaNumero++);
    }

    // Inicializar popovers después de renderizar la tabla
    initializePopovers();

    // Llama al callback para actualizar la paginación
    if (callback) callback();
  });
}

// Inicializa la tabla y eventos al cargar el documento
document.addEventListener("DOMContentLoaded", async () => {
  checkAuth(); // Verificar autenticación
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const { updatePagination } = initializePagination("contenidoTabla", 5);

      mostrarDatos(() => {
        updatePagination(); // Actualiza la paginación después de mostrar los datos
      });

      initializeDeleteProductRow(); // Inicializar eliminación de productos
      initializeSearchProduct(); // Inicializar la funcionalidad de búsqueda
      initializeDuplicateProductRow();

      setupInstallPrompt('installButton');
      try {
        const email = await getUserEmail(); // Obtener correo del usuario
        console.log(`Correo del usuario: ${email}`); // Mostrar correo en la consola
      } catch (error) {
        console.error("Error al obtener el correo del usuario:", error);
      }
    } else {
      console.error("Usuario no autenticado.");
    }
  });
});
