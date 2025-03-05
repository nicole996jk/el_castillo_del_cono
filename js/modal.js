document.getElementById("openModal").addEventListener("click", function() {
    document.getElementById("modalNombre").textContent = "Juan Pérez";
    document.getElementById("modalFecha").textContent = "15 de Marzo, 2025";
    document.getElementById("modalHora").textContent = "19:00";
    document.getElementById("modalPersonas").textContent = "4";
    document.getElementById("myModal").style.display = "block";
});

document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("myModal").style.display = "none";
});

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
};

//modal de orden
document.querySelectorAll('.product-img').forEach(img => {
    img.addEventListener('click', function() {
        document.getElementById('productName').value = this.dataset.name;
        document.getElementById('productPrice').value = this.dataset.price;
        new bootstrap.Modal(document.getElementById('orderModal')).show();
    });
});