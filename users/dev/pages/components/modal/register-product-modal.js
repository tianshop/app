function loadRegisterModal() {
  // Ruta al archivo HTML del modal
  fetch("./components/modal/register-product-modal.html")
    .then((response) => response.text())
    .then((html) => {
      const modalContainer = document.getElementById("register-product-modal-container");
      modalContainer.innerHTML = html;

      // Inicializar los cálculos después de cargar el modal
      initializeRealTimeCalculations();
    })
    .catch((error) => console.error("Error loading the modal:", error));
}

// Llama a la función para cargar el modal
loadRegisterModal();

function initializeRealTimeCalculations() {
  // Elementos del formulario
  const ventaInput = document.getElementById("venta");
  const costoInput = document.getElementById("costo");
  const unidadesInput = document.getElementById("unidades");
  const costoUnitarioInput = document.getElementById("costoUnitario");
  const gananciaInput = document.getElementById("ganancia");
  const porcentajeInput = document.getElementById("porcentaje");
  const costoConItbmsDescuentoInput = document.getElementById("costoConItbms-Descuento");
  const itbmsSelect = document.getElementById("itbms");
  const descuentoInput = document.getElementById("descuento");
  const costoConItbmsDescuentoLabel = document.querySelector("label[for='costoConItbms-Descuento']");

  // Validar que los elementos existan
  if (
    !costoInput ||
    !unidadesInput ||
    !costoUnitarioInput ||
    !itbmsSelect ||
    !ventaInput ||
    !gananciaInput ||
    !porcentajeInput ||
    !descuentoInput ||
    !costoConItbmsDescuentoInput ||
    !costoConItbmsDescuentoLabel
  ) {
    console.error("Elementos del formulario no encontrados.");
    return;
  }

  // Ocultar inicialmente el campo y el label
  costoConItbmsDescuentoInput.style.display = "none";
  costoConItbmsDescuentoLabel.style.display = "none";

  function formatInputAsDecimal(input) {
    input.addEventListener("input", () => {
      const rawValue = input.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
      const numericValue = parseFloat(rawValue) / 100; // Interpretar como decimal
      input.value = numericValue.toFixed(2); // Formatear como decimal con dos dígitos
    });
  }

  // Aplicar formato a los campos de "costo", "venta" y "descuento"
  formatInputAsDecimal(costoInput);
  formatInputAsDecimal(ventaInput);
  formatInputAsDecimal(descuentoInput);

  function calcularCostoConItbmsYGanancia() {
    const costo = parseFloat(costoInput.value) || 0;
    const unidades = parseFloat(unidadesInput.value) || 1;
    const itbmsPorcentaje = parseFloat(itbmsSelect.value) || 0;
    const venta = parseFloat(ventaInput.value) || 0;
    const descuento = parseFloat(descuentoInput.value) || 0;

    // Calcular costo con ITBMS y descuento
    const costoConItbms = costo + (costo * itbmsPorcentaje) / 100 - descuento;

    // Actualizar el campo "costoConItbms-Descuento"
    costoConItbmsDescuentoInput.value = costoConItbms.toFixed(2);

    // Mostrar u ocultar el campo basado en las condiciones
    if (itbmsPorcentaje > 0 || descuento > 0) {
      costoConItbmsDescuentoInput.style.display = "block";
      costoConItbmsDescuentoLabel.style.display = "block";

      // Actualizar el texto del label
      if (itbmsPorcentaje > 0 && descuento > 0) {
        costoConItbmsDescuentoLabel.textContent = "Costo con Itbms & Descuento";
      } else if (itbmsPorcentaje > 0) {
        costoConItbmsDescuentoLabel.textContent = "Costo con Itbms";
      } else if (descuento > 0) {
        costoConItbmsDescuentoLabel.textContent = "Costo con Descuento";
      }
    } else {
      costoConItbmsDescuentoInput.style.display = "none";
      costoConItbmsDescuentoLabel.style.display = "none";
    }

    // Calcular y actualizar el costo unitario
    const costoUnitario = unidades > 0 ? (costoConItbms / unidades).toFixed(2) : 0;
    costoUnitarioInput.value = costoUnitario;

    // Calcular y actualizar ganancia
    const ganancia = (venta - costoUnitario).toFixed(2);
    gananciaInput.value = ganancia;

    // Calcular y actualizar el porcentaje de ganancia con el símbolo %
    const porcentajeGanancia =
      costoUnitario > 0
        ? (((venta - costoUnitario) / costoUnitario) * 100).toFixed(2)
        : 0;
    porcentajeInput.value = `${porcentajeGanancia}%`;
  }

  // Escuchar cambios en los inputs y el selector
  costoInput.addEventListener("input", calcularCostoConItbmsYGanancia);
  unidadesInput.addEventListener("input", calcularCostoConItbmsYGanancia);
  itbmsSelect.addEventListener("change", calcularCostoConItbmsYGanancia);
  ventaInput.addEventListener("input", calcularCostoConItbmsYGanancia);
  descuentoInput.addEventListener("input", calcularCostoConItbmsYGanancia);

  // Realizar el cálculo inicial
  calcularCostoConItbmsYGanancia();
}

document.addEventListener("DOMContentLoaded", () => {
  // Cargar cálculos al cargar el DOM
  initializeRealTimeCalculations();
});
