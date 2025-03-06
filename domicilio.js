document.addEventListener("DOMContentLoaded", function () {
    const cantidad = document.getElementById("cantidad");
    const direccion = document.getElementById("direccion");
    const telefono = document.getElementById("telefono");

    // Asegurar que dirección y teléfono no sean obligatorios
    direccion.removeAttribute("required");
    telefono.removeAttribute("required");

    // Validación de cantidad (mayor o igual a 1)
    cantidad.addEventListener("input", function () {
        if (cantidad.value < 1) {
            cantidad.setCustomValidity("La cantidad debe ser mayor o igual a 1.");
        } else {
            cantidad.setCustomValidity(""); // Resetea la validación si la cantidad es válida
        }
    });

    // Validar solo la cantidad al enviar el formulario
    document.getElementById("pedidoForm").addEventListener("submit", function (event) {
        if (cantidad.value < 1) {
            event.preventDefault();
        }
    });
});
