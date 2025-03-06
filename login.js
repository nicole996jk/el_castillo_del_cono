document.addEventListener("DOMContentLoaded", function () {
    // Obtener el modal de registro y los botones
    var regModal = document.getElementById("registerModal");
    var regBtn = document.getElementById("openRegister");
    var regCloseBtn = regModal.querySelector(".close");

    // Abrir el modal cuando se haga clic en el botón de registro
    regBtn.onclick = function() {
        regModal.style.display = "block";
    }

    // Cerrar el modal cuando se haga clic en la 'X'
    regCloseBtn.onclick = function() {
        regModal.style.display = "none";
    }

    // Cerrar el modal si el usuario hace clic fuera de él
    window.onclick = function(event) {
        if (event.target == regModal) {
            regModal.style.display = "none";
        }
    }

    // Manejar el evento de clic en el botón de registro
    document.getElementById("registerButton").addEventListener("click", function() {
        var username = document.getElementById("reg-username").value.trim();
        var email = document.getElementById("reg-email").value.trim();
        var password = document.getElementById("reg-password").value.trim();
        var confirmPassword = document.getElementById("reg-confirm-password").value.trim();
        var errorDiv = document.getElementById("reg-error");

        // Limpiar el mensaje de error anterior
        errorDiv.textContent = "";

        // Validación de campos obligatorios
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            errorDiv.textContent = "Todos los campos son obligatorios.";
            return;
        }

        // Validación del nombre
        var nameRegex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
        if (username === "") {
              errorDiv.textContent = "El nombre es obligatorio.";
              return;
        } else if (!nameRegex.test(username)) {
              errorDiv.textContent = "El nombre solo debe contener letras y espacios.";
              return;
        } else if (username.length < 3 || username.length > 50) {
              errorDiv.textContent = "El nombre debe tener mas de 3 caracteres.";
              return;
        }

        // Validación del formato de correo electrónico con una expresión regular
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            errorDiv.textContent = "Por favor, ingresa un correo electrónico válido.";
            return;
        }

        // Validación de la longitud de la contraseña (mínimo 8 caracteres)
        if (password.length < 8) {
            errorDiv.textContent = "La contraseña debe tener al menos 8 caracteres.";
            return;
        }

        // Validación de coincidencia de contraseñas
        if (password !== confirmPassword) {
            errorDiv.textContent = "Las contraseñas no coinciden.";
            return;
        }

        // Si todas las validaciones se cumplen, mostrar la alerta de SweetAlert2
        Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Tu cuenta se ha creado correctamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#4CAF50'
        });

    });
});
