document.addEventListener("DOMContentLoaded", function () {
    const metodoEntrega = document.getElementById("metodo-entrega");
    const direccion = document.getElementById("direccion");
    const telefono = document.getElementById("telefono");
    const cantidad = document.getElementById("cantidad");
    const producto = document.getElementById("producto");
    const telefonoError = document.getElementById("telefonoError");

    // Función para validar el teléfono
    function validarTelefono() {
        const telefonoValue = telefono.value;
        const telefonoPattern = /^[0-9]{8}$/; // 8 dígitos numéricos
        if (telefonoValue && !telefonoPattern.test(telefonoValue)) {
            telefonoError.textContent = "El número de teléfono debe ser de 8 dígitos numéricos.";
            return false;
        } else {
            telefonoError.textContent = "";
            return true;
        }
    }

    // Función para actualizar los campos según el método de entrega
    function actualizarCampos() {
        if (metodoEntrega.value === "Domicilio") {
            direccion.removeAttribute("disabled");
            telefono.removeAttribute("disabled");
        } else {
            direccion.setAttribute("disabled", "disabled");
            telefono.setAttribute("disabled", "disabled");
        }
    }

    // Validación de cantidad (mayor o igual a 1)
    cantidad.addEventListener("input", function () {
        if (cantidad.value < 1) {
            cantidad.setCustomValidity("La cantidad debe ser mayor o igual a 1.");
        } else {
            cantidad.setCustomValidity(""); // Resetea la validación si la cantidad es válida
        }
    });

    // Validar que los campos obligatorios son producto y cantidad
    function validarFormulario(event) {
        let valid = true;
        
        // Verificar producto
        if (producto.value === "") {
            valid = false;
        }

        // Validar cantidad
        if (cantidad.value < 1) {
            valid = false;
        }

        // Validar teléfono (8 dígitos)
        if (!validarTelefono()) {
            valid = false;
        }

        // Si no es válido, prevenir el envío del formulario
        if (!valid) {
            event.preventDefault();
        }
    }

    // Ejecutar la función al enviar el formulario
    const form = document.getElementById("pedidoForm");
    form.addEventListener("submit", validarFormulario);

    metodoEntrega.addEventListener("change", actualizarCampos);
    actualizarCampos(); // Ejecutar al cargar la página
});
