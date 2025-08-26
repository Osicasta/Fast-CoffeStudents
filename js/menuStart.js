document.getElementById('menuBtn').addEventListener('click', function() {
  // Redirigir a la página del menú (ajusta el nombre si es necesario)
  alert('Ir al menú (demo)');
});

document.getElementById('reviewsBtn').addEventListener('click', function() {
  // Redirigir a la página de reseñas (ajusta el nombre si es necesario)
  alert('Ir a reseñas (demo)');
});

document.getElementById('orderBtn').addEventListener('click', function() {
  // Redirigir a la página de mi pedido (ajusta el nombre si es necesario)
  alert('Ir a mi pedido (demo)');
});

document.getElementById('logoutBtn').addEventListener('click', function() {
  // Redirigir al inicio de sesión o cerrar sesión
window.location.href = 'index.html';
});