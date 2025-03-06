document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe inmediatamente

    let valid = true;

    // Obtener los valores de los campos
    const dateInput = document.getElementById('dateInput').value;
    const timeInput = document.getElementById('timeInput').value;
    const persons = document.getElementById('personsSelect').value;

    // Mensajes de error
    const dateError = document.getElementById('dateError');
    const timeError = document.getElementById('timeError');

    // Limpiar errores previos
    dateError.textContent = '';
    timeError.textContent = '';

    // Validación de la fecha
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Eliminar horas para comparar solo fechas
    const inputDate = new Date(dateInput); // Convierte la fecha ingresada a un objeto Date

    if (!dateInput) {
        dateError.textContent = "La fecha es obligatoria.";
        valid = false;
    } else if (inputDate < currentDate) { // Solo permite la fecha actual o futuras
        dateError.textContent = "La fecha no puede ser anterior a hoy.";
        valid = false;
    } else if (inputDate.getFullYear() !== currentDate.getFullYear()) {
        dateError.textContent = "La fecha debe ser del año actual.";
        valid = false;
    }

    // Validación de la hora
    if (!validarHora(timeInput)) {
        timeError.textContent = "Solo puedes reservar entre las 7:00 AM y las 7:00 PM.";
        valid = false;
    }

    // Verificar la cantidad de personas
    if (!persons) {
        alert("Debe seleccionar la cantidad de personas.");
        valid = false;
    }

    // Si todas las validaciones pasan, mostrar SweetAlert
    if (valid) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = inputDate.toLocaleDateString('es-ES', options);
        const formattedTime = timeInput;

        Swal.fire({
            icon: 'success',
            title: '¡Reserva realizada con éxito!',
            html: `
                <p><strong>Fecha:</strong> ${formattedDate}</p>
                <p><strong>Hora:</strong> ${formattedTime}</p>
                <p><strong>Personas:</strong> ${persons}</p>
            `,
            confirmButtonText: 'Aceptar'
        });
    }
});

// Función para validar la hora ingresada
function validarHora(selectedTime) {
    const timePattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])\s?(AM|PM)$/i;

    if (!timePattern.test(selectedTime)) {
        return false;
    }

    const timeParts = selectedTime.match(timePattern);
    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const period = timeParts[3].toUpperCase();

    // Convertir a formato de 24 horas
    if (period === "PM" && hours !== 12) {
        hours += 12;
    } else if (period === "AM" && hours === 12) {
        hours = 0;
    }

    // Validar el rango de 07:00 AM a 08:00 PM (07:00 a 20:00 en formato 24h)
    return hours >= 7 && hours < 20;
}

// Validación en tiempo real cuando cambia el input de la hora
document.addEventListener("DOMContentLoaded", function () {
    const timeInput = document.getElementById("timeInput");
    const timeError = document.getElementById("timeError");

    timeInput.addEventListener("change", function () {
        if (!validarHora(timeInput.value)) {
            timeError.textContent = "Solo puedes reservar entre las 7:00 AM y las 8:00 PM.";
            timeInput.value = "";
        } else {
            timeError.textContent = "";
        }
    });
});
