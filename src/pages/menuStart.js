document.getElementById('menuBtn').addEventListener('click', function() {
  window.location.href = 'menu.html';
});

document.getElementById('reviewsBtn').addEventListener('click', function() {
  // Redirigir a la página de reseñas (ajusta el nombre si es necesario)
  alert('Ir a reseñas (demo)');
});

document.getElementById('orderBtn').addEventListener('click', function() {
  window.location.href = 'pedido.html';
});

document.getElementById('logoutBtn').addEventListener('click', function() {
  // Redirigir al inicio de sesión o cerrar sesión
window.location.href = 'index.html';
});