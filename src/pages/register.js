import '../../css/register.css';
import '../../css/style.css';

const form = document.getElementById('registerForm');
const emailEl = document.getElementById('email');
const passEl  = document.getElementById('password');
const confEl  = document.getElementById('confirmPassword');
const errEl   = document.getElementById('passwordError');

function validatePasswords() {
  // Limpia estado previo
  passEl.classList.remove('is-invalid');
  confEl.classList.remove('is-invalid');
  errEl.textContent = '';

  const p = passEl.value.trim();
  const c = confEl.value.trim();

  if (p.length < 8) {
    errEl.textContent = 'La contraseña debe tener al menos 8 caracteres.';
    passEl.classList.add('is-invalid');
    return false;
  }
  if (p !== c) {
    errEl.textContent = 'Las contraseñas no coinciden.';
    passEl.classList.add('is-invalid');
    confEl.classList.add('is-invalid');
    return false;
  }
  return true;
}

// Validación en tiempo real
[passEl, confEl].forEach(el => el.addEventListener('input', validatePasswords));

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailEl.value.trim();
  if (!email) {
    errEl.textContent = 'Por favor escribe tu email.';
    return;
  }
  if (!validatePasswords()) return;

  // ⚠️ Solo para demo: no guardes contraseñas reales en localStorage en apps productivas
  localStorage.setItem('user', JSON.stringify({ email, password: passEl.value }));

  // Redirige a login
  window.location.href = 'login.html';
});
