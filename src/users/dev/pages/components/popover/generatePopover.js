// generatePopover.js
import { initializePopovers } from "./action-popover/action-popover.js";

// generatePopover.js
export function initializePopoversOnce(tableHeadersElement, tableBodyElement, productDataArray) {
  // Eliminamos cualquier condición y siempre inicializamos los popovers
  initializePopovers(tableHeadersElement, tableBodyElement, productDataArray);
}

// Función para generar el popover de modos
export function generateViewModePopover() {
  return `
    <button class="btn custom-button square-btn">
    <i class="bi bi-chat-square-dots"
        data-bs-toggle="popover"
        data-bs-html="true"
        data-bs-placement="right"
        data-bs-content="
          <div class='d-flex flex-column gap-2 p-1'>
            <button class='btn btn-sm btn-secondary mode-full-button'>Modo Completo</button>
            <button class='btn btn-sm btn-danger mode-buy-button'>Modo Compra</button>
            <button class='btn btn-sm btn-warning mode-sell-button'>Modo Venta</button>
          </div>
        ">
    </i>
    </button>
  `;
}

export function generateActionButton({ id, sharedByEmail }) {
  if (sharedByEmail) return "";
  return `
    <button class="btn custom-button square-btn"
        type="button"
        data-bs-toggle="popover" 
        data-bs-html="true" data-bs-placement="right"
        data-bs-content="
          <div class='d-flex flex-row gap-2 p-1'>
            <button class='btn btn-sm btn-warning edit-product-button' data-id='${id}'>Editar</button>
            <button class='btn btn-sm btn-danger delete-product-button' data-id='${id}'>Eliminar</button>
            <button class='btn btn-sm btn-secondary duplicate-product-button' data-id='${id}'>Duplicar</button>
          </div>
        ">
      <i class="bi bi-three-dots-vertical"></i>
    </button>`;
}

export function generateSharedInfoPopover({ sharedByEmail, sharedBy, id, sharedAt, expiresAt }) {
  if (!sharedByEmail) return "";
  return `
    <button class="btn custom-button circle-btn"
        data-bs-toggle="popover"
        data-bs-html="true" data-bs-placement="right"
        title="<span class='info-shared-popover-header'>Información Compartida</span>"
        data-bs-content="
          <div class='info-shared-popover-body'>
            Compartido por: <strong>${sharedByEmail}</strong><br>
            Fecha: <strong>${sharedAt || "No definido"}</strong><br>
            Expiración: <strong style='color: red;'>${expiresAt || "Sin fecha de expiración"}</strong>
          </div>
          <button class='btn btn-sm btn-danger delete-shared-button' 
                  data-shared-by='${sharedBy}' 
                  data-id='${id}'>
            Eliminar
          </button>
        ">  
      <i class="bi bi-card-heading"></i>
    </button>`;
}