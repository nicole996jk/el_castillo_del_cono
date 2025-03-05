// Función para abrir el formulario modal
function abrirFormulario() {
    document.getElementById('modal').style.display = 'block';
}

// Función para cerrar el formulario modal
function cerrarFormulario() {
    document.getElementById('modal').style.display = 'none';
}

// Función de validación del formulario
document.querySelector('#pedidoForm').addEventListener('submit', function(event) {
    // Obtener los campos del formulario
    var direccion = document.getElementById('direccion');
    var telefono = document.getElementById('telefono');
    var producto = document.getElementById('producto');
    var cantidad = document.getElementById('cantidad');
    var metodoPago = document.getElementById('metodo-pago');
    
    // Limpiar mensajes de error previos
    var errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(error) {
        error.textContent = '';
    });
    
    // Bandera para verificar si el formulario es válido
    var isValid = true;
    
    // Validación de dirección
    if (direccion.value.trim() === '') {
        document.getElementById('direccionError').textContent = 'La dirección de entrega es requerida.';
        isValid = false;
    }
    
    // Validación de teléfono (8 dígitos)
    var telefonoPattern = /^[0-9]{8}$/; // Validación de un número de teléfono de exactamente 8 dígitos
    if (!telefonoPattern.test(telefono.value)) {
        document.getElementById('telefonoError').textContent = 'Por favor, ingresa un número de teléfono válido de 8 dígitos.';
        isValid = false;
    }
    
    // Validación de producto
    if (producto.value === '') {
        document.getElementById('productoError').textContent = 'Por favor, selecciona un producto.';
        isValid = false;
    }
    
    // Validación de cantidad
    if (cantidad.value < 1) {
        document.getElementById('cantidadError').textContent = 'La cantidad debe ser mayor o igual a 1.';
        isValid = false;
    }
    
    // Validación de método de pago
    if (metodoPago.value === '') {
        document.getElementById('metodoPagoError').textContent = 'Por favor, selecciona un método de pago.';
        isValid = false;
    }
    
    // Si alguna validación falla, se evita el envío del formulario
    if (!isValid) {
        event.preventDefault();
    }
});
