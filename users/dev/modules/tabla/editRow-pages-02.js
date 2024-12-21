// Importa funciones y referencias necesarias de Firebase y módulos personalizados
import { update, ref } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../environment/firebaseConfig.js";
import { mostrarDatos } from '../../pages-02/script.js';

// Función para añadir event listeners a los botones de editar
export function addEditEventListeners() {
  const editButtons = document.querySelectorAll(".edit-user-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", handleEdit);
  });
}

// Función que maneja la edición de un usuario
function handleEdit(event) {
  const button = event.target.closest(".edit-user-button"); // Asegura que se selecciona el botón correctamente
  const id = button.getAttribute("data-id");
  const userRow = button.closest("tr");
  
  // Verifica si el ID es válido
  if (!id) {
    console.error("ID de usuario no encontrado o inválido.");
    return;
  }

  // Captura los nuevos valores con prompts
  const nombre = prompt("Nuevo nombre:", userRow.children[1].textContent) || userRow.children[1].textContent;

  // Asegúrate de que los campos esenciales no estén vacíos
  if (!nombre) {
    alert("Todos los campos deben ser llenados.");
    return;
  }

  // Mostrar confirmación antes de proceder
  const confirmar = confirm("¿Estás seguro de que deseas actualizar este usuario?");
  
  if (confirmar) {
    const updates = { nombre };

    // Actualiza los datos en Firebase
    update(ref(database, `${collection}/${id}`), updates)
      .then(() => {
        alert("Usuario actualizado correctamente");
        mostrarDatos(); // Refresca los datos en la tabla
      })
      .catch((error) => {
        console.error("Error al actualizar usuario: ", error);
      });
  } else {
    alert("Actualización cancelada.");
  }
}
