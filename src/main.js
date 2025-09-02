import '../css/style.css';
import '../css/login.css';
import '../css/register.css';

// Sistema de enrutamiento para la SPA
const routes = {
  '/': () => {
    document.getElementById('app').innerHTML = `
      <div class="container">
        <img src="img/logo2.png" alt="Logo Snackademia" class="logo" />
        <h1 class="title">SNACKADEMIA</h1>
        <button class="btn" id="loginBtn">Inicia sesion</button>
        <button class="btn" id="registerBtn">Registrate</button>
      </div>
    `;

    document.getElementById('loginBtn').addEventListener('click', () => navigateTo('/login'));
    document.getElementById('registerBtn').addEventListener('click', () => navigateTo('/register'));
  },
  '/login': () => {
    document.getElementById('app').innerHTML = `
      <div class="menu-container">
        <button class="back-btn" onclick="window.history.back()">&#8592;</button>
        <div class="menu-header">
          <img src="img/logo2.png" alt="Logo Snackademia" class="logo" />
          <h1 class="title">SNACKADEMIA</h1>
        </div>
        <div class="login-container">
          <form id="loginForm">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Value" required />
            <label for="password">Contraseña</label>
            <input type="password" id="password" placeholder="Value" required />
            <button class="btn" id="loginBtn">Sign In</button>
          </form>
          <a href="/resetpassword" class="forgot-link">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    `;
  },
  '/register': () => {
    document.getElementById('app').innerHTML = `
      <div class="register-header">
        <img src="img/logo2.png" alt="Logo Snackademia" class="logo" />
        <h1 class="title">SNACKADEMIA</h1>
      </div>

      <div class="register-container">
        <form id="registerForm">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Value" required />
          <label for="password">Contraseña</label>
          <input type="password" id="password" placeholder="Value" required />
          <button type="submit" class="btn">Register</button>
        </form>
      </div>
    `;
  }
};

function navigateTo(route) {
  window.history.pushState({}, '', route);
  routes[route]();
}

window.onpopstate = () => {
  const path = window.location.pathname;
  routes[path] ? routes[path]() : routes['/']();
};

routes['/']();