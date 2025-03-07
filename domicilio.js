function abrirFormulario() {
    document.getElementById("formularioModal").style.display = "flex";
}

function cerrarFormulario() {
    document.getElementById("formularioModal").style.display = "none";
}

function mostrarCampos() {
    const metodoEntrega = document.getElementById("metodoEntrega").value;
    const datosDomicilio = document.getElementById("datosDomicilio");

    if (metodoEntrega === "domicilio") {
        datosDomicilio.classList.remove("hidden"); // Muestra los campos de domicilio
    } else {
        datosDomicilio.classList.add("hidden"); // Oculta los campos de domicilio
    }
}

function actualizarPrecio(selectElement) {
    const precioInput = selectElement.parentElement.querySelector(".precio");
    const precio = selectElement.options[selectElement.selectedIndex].getAttribute("data-precio");

    if (precio) {
        precioInput.value = `$${precio}`;
    } else {
        precioInput.value = "";
    }

    calcularTotal();
}

document.getElementById("agregarProducto").addEventListener("click", function() {
    const productosContainer = document.getElementById("productosContainer");

    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList.add("producto");

    nuevoProducto.innerHTML = `
        <label>Producto:</label>
        <select class="productoSelect" required onchange="actualizarPrecio(this)">
            <option value="" disabled selected>Seleccione un producto</option>
            <option value="Helado de vainilla en recipiente desechable con galletas" data-precio="2.50">Helado de vainilla en recipiente desechable con galletas</option>
                            <option value="Helado de vainilla en recipiente de vidrio con chocolate y fresa" data-precio="6.00">Helado de vainilla en recipiente de vidrio con chocolate y fresa</option>
                            <option value="Helado de vainilla doble bola en cono con ralladura de coco" data-precio="1.60">Helado de vainilla doble bola en cono con ralladura de coco</option>
                            <option value="Helado de fresa en recipiente de vidrio con fresas" data-precio="5.50">Helado de fresa en recipiente de vidrio con fresas</option>
                            <option value="Helado de fresa en recipiente de vidrio" data-precio="3.75">Helado de fresa en recipiente de vidrio</option>
                            <option value="Helado de fresa en cono una bola" data-precio="1.25">Helado de fresa en cono una bola</option>
                            <option value="Helado de chocolate en recipiente de vidrio" data-precio="4.00">Helado de chocolate en recipiente de vidrio</option>
                            <option value="Helado de chocolate con chispas de chocolate" data-precio="4.75">Helado de chocolate con chispas de chocolate</option>
                            <option value="Helado de chocolate en cono con chocolate derretido" data-precio="1.45">Helado de chocolate en cono con chocolate derretido</option>
                            <option value="Caja de helado napolitano" data-precio="5.50">Caja de helado napolitano</option>
                            <option value="Caja de helado de vainilla con chispas de chocolate" data-precio="6.00">Caja de helado de vainilla con chispas de chocolate</option>
                            <option value="Caja de helado de fresa" data-precio="5.50">Caja de helado de fresa</option>
                            <option value="Caja de helado de chocolate" data-precio="5.50">Caja de helado de chocolate</option>
                            <option value="Caja de helado de chicle" data-precio="6.25">Caja de helado de chicle</option>
                            <option value="Caja de helado de pistacho" data-precio="6.75">Caja de helado de pistacho</option>
        </select>

        <label>Precio:</label>
        <input type="text" class="precio" readonly>

        <label>Cantidad:</label>
        <input type="number" class="cantidad" min="1" required oninput="calcularTotal()">

        <button type="button" class="eliminarProducto" onclick="eliminarProducto(this)">Eliminar</button>
    `;

    productosContainer.appendChild(nuevoProducto);
});

function eliminarProducto(button) {
    button.parentElement.remove();
    calcularTotal();
}

function calcularTotal() {
    let total = 0;
    let hayProducto = false;

    document.querySelectorAll(".producto").forEach(producto => {
        const selectElement = producto.querySelector(".productoSelect");
        const precio = parseFloat(selectElement.selectedOptions[0]?.getAttribute("data-precio")) || 0;
        const cantidad = parseInt(producto.querySelector(".cantidad").value) || 0;

        // Verificación de campos vacíos o incorrectos
        if (precio && cantidad > 0) {
            hayProducto = true;
            total += precio * cantidad;
        }
    });

    if (!hayProducto) {
        document.getElementById("total").textContent = "Debe agregar productos.";
    } else {
        document.getElementById("total").textContent = `$${total.toFixed(2)}`;
    }
}

// Función para validar el formulario antes de enviarlo
function validarFormulario(event) {
    let esValido = true;
    let mensajesError = [];

    // Validación de método de entrega
    const metodoEntrega = document.getElementById("metodoEntrega").value;
    if (!metodoEntrega) {
        mensajesError.push("Seleccione un método de entrega.");
        esValido = false;
    }

    // Validación de datos de domicilio si se selecciona "domicilio"
    if (metodoEntrega === "domicilio") {
        const direccion = document.getElementById("direccion").value;
        const telefono = document.getElementById("telefono").value;
        
        // Obtén los elementos donde se mostrarán los errores
        const errorDireccion = document.getElementById("errorDireccion");
        const errorTelefono = document.getElementById("errorTelefono");

        // Reinicia los mensajes de error en pantalla
        errorDireccion.textContent = "";
        errorTelefono.textContent = "";

        // Validación de dirección
        if (!direccion || direccion.trim() === "") {
            errorDireccion.textContent = "El campo de dirección no puede estar vacío.";
            esValido = false;
        }

        // Validación de teléfono (exactamente 8 dígitos)
        const telefonoRegex = /^[0-9]{8}$/;
        if (!telefono || !telefonoRegex.test(telefono)) {
            errorTelefono.textContent = "Por favor, ingrese un teléfono válido (exactamente 8 dígitos).";
            esValido = false;
        }
    }
    // Validación de productos
    const productos = document.querySelectorAll(".producto");
    if (productos.length === 0) {
        mensajesError.push("Agregue al menos un producto.");
        esValido = false;
    }

    // Validación de total
    const total = parseFloat(document.getElementById("total").textContent.replace("$", ""));
    if (isNaN(total) || total <= 0) {
        mensajesError.push("El total debe ser mayor que cero.");
        esValido = false;
    }

    // Si hay errores, mostrar una alerta con todos los mensajes
    if (!esValido) {
        Swal.fire({
            title: 'Error en el formulario',
            text: mensajesError.join("\n"),
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        event.preventDefault(); // Detener el envío del formulario
    }
    
}



// Llamada al validarFormulario cuando se intenta enviar el formulario
document.getElementById("pedidoForm").addEventListener("submit", validarFormulario);
