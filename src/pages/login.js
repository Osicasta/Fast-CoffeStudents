import '../../css/login.css';
import '../../css/style.css';

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Obtener usuario guardado
  const user = JSON.parse(localStorage.getItem('user'));

  if (email && password) {
    if (user && user.email === email && user.password === password) {
      window.location.href = 'menuStart.html';
    } else {
      alert('Email o contraseña incorrectos.');
    }
  } else {
    alert('Por favor completa todos los campos.');
  }
});

document.querySelector('.forgot-link').addEventListener('click', function(e) {
  e.preventDefault();
  window.location.href = 'resetpassword.html';
});