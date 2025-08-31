import '../../css/pedido.css';
import '../../css/style.css';

// Navegación del footer y resaltar botón activo
document.addEventListener('DOMContentLoaded', function() {
    // Remover clase active de todos los botones primero
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Obtener la página actual
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    // Agregar clase active al botón correspondiente
    if (page === 'pedido.html') {
        document.getElementById('footerPedido').classList.add('active');
    } else if (page === 'menu.html') {
        document.getElementById('footerMenu').classList.add('active');
    } else if (page.includes('resena')) {
        document.getElementById('footerResenas').classList.add('active');
    }
    
    // Agregar event listeners para navegación
    document.getElementById('footerPedido').addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            window.location.href = 'pedido.html';
        }
    });
    
    document.getElementById('footerMenu').addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            window.location.href = 'menu.html';
        }
    });
    
    document.getElementById('footerResenas').addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            window.location.href = 'reseñas.html';
        }
    });
});