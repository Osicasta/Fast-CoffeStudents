import '../css/style.css';
import '../css/login.css';
import '../css/register.css';

document.getElementById('app').innerHTML = `
  <div class="container">
    <img src="img/logo2.png" alt="Logo Snackademia" class="logo" />
    <h1 class="title">SNACKADEMIA</h1>
    <button class="btn" id="loginBtn">Inicia sesion</button>
    <button class="btn" id="registerBtn">Registrate</button>
  </div>
`;

document.getElementById('loginBtn').addEventListener('click', () => {
  window.location.href = 'login.html';
});

document.getElementById('registerBtn').addEventListener('click', () => {
  window.location.href = 'register.html';
});