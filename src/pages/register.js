import '../../css/register.css';
import '../../css/style.css';

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (email && password) {
    // Guardar usuario en localStorage
    localStorage.setItem('user', JSON.stringify({ email, password }));
    window.location.href = 'login.html';
  } else {
    alert('Por favor completa todos los campos.');
  }
});
