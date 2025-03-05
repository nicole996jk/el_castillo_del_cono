
    document.getElementById("feedbackForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío real del formulario
        
        let isValid = true;
        
        // Validación de calificación
        let rating = document.getElementById("rating");
        let ratingError = document.getElementById("ratingError");
        if (rating.value === "") {
            ratingError.style.display = "block";
            isValid = false;
        } else {
            ratingError.style.display = "none";
        }

        // Validación de comentario
        let comment = document.getElementById("comment");
        let commentError = document.getElementById("commentError");
        if (comment.value.trim().length < 10) {
            commentError.style.display = "block";
            isValid = false;
        } else {
            commentError.style.display = "none";
        }

        // Si todo está bien, muestra el mensaje de confirmación
        if (isValid) {
            document.getElementById("feedbackMessage").style.display = "block";
            this.reset(); // Limpia el formulario
        }
    });
