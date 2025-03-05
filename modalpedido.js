// Modal de orden
document.querySelectorAll('.product-img').forEach(img => {
    img.addEventListener('click', function() {
        // Asignar nombre y precio del producto al modal
        document.getElementById('productName').value = this.dataset.name;
        document.getElementById('productPrice').value = this.dataset.price;
        document.getElementById('quantity').value = 1;  // Reiniciar cantidad
        new bootstrap.Modal(document.getElementById('orderModal')).show();
    });
});



// Validación del formulario de pedido
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de inmediato

    // Obtener los valores de los campos
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const quantity = document.getElementById('quantity').value;

    // Si todo es válido, puedes proceder con el envío o acción adicional
    Swal.fire({
        icon: 'success',
        title: 'Pedido confirmado',
        text: `Producto: ${productName}\nCantidad: ${quantity}`,
        confirmButtonText: 'Gracias',
        confirmButtonColor: '#3085d6',
    });

    // Aquí puedes añadir el código para proceder con el envío del pedido (por ejemplo, hacer una petición AJAX)

    
});