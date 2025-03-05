document.addEventListener("DOMContentLoaded", function () {
    var regModal = document.getElementById("registerModal");
    var regBtn = document.getElementById("openRegister");
    var regCloseBtn = regModal.querySelector(".close");
  
    regBtn.onclick = function() {
        regModal.style.display = "block";
    }
  
    regCloseBtn.onclick = function() {
        regModal.style.display = "none";
    }
  
    window.onclick = function(event) {
        if (event.target == regModal) {
            regModal.style.display = "none";
        }
    }
  
    document.getElementById("registerButton").addEventListener("click", function() {
        var username = document.getElementById("reg-username").value.trim();
        var email = document.getElementById("reg-email").value.trim();
        var password = document.getElementById("reg-password").value.trim();
        var confirmPassword = document.getElementById("reg-confirm-password").value.trim();
        var errorDiv = document.getElementById("reg-error");
  
        // Limpiar el mensaje de error
        errorDiv.textContent = "";
  
        // Validación de campos vacíos
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            errorDiv.textContent = "Todos los campos son obligatorios.";
            return;
        }
  
        // Validación de formato del correo electrónico
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            errorDiv.textContent = "Por favor, ingresa un correo electrónico válido.";
            return;
        }
  
        // Validación de longitud de la contraseña (por ejemplo, al menos 8 caracteres)
        if (password.length < 8) {
            errorDiv.textContent = "La contraseña debe tener al menos 8 caracteres.";
            return;
        }
  
        // Validación de que las contraseñas coincidan
        if (password !== confirmPassword) {
            errorDiv.textContent = "Las contraseñas no coinciden.";
            return;
        }
  
        // Si todo está bien, mostrar mensaje de éxito
        alert("Registro exitoso");
        regModal.style.display = "none";
    });
  });
  