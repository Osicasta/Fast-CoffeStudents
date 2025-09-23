// src/pages/pedido.js
import '../../css/pedido.css';
import '../../css/style.css';

/* Formato moneda (COP) */
const COP = new Intl.NumberFormat('es-CO', {
  style: 'currency', currency: 'COP', maximumFractionDigits: 0,
});
const fmt = n => COP.format(Number(n) || 0);

/* Pintar el último pedido guardado por "Pagar" (menu.js) */
function renderLastOrder() {
  const box = document.getElementById('orderSummary');
  if (!box) return;

  let order = null;
  try { order = JSON.parse(localStorage.getItem('lastOrder') || 'null'); } catch {}

  if (!order || !Array.isArray(order.items) || order.items.length === 0) {
    box.innerHTML = '<p class="order-empty">Aún no tienes un pedido reciente.</p>';
    return;
  }

  const rows = order.items.map(it => `
    <div class="order-row">
      <div class="order-left">
        <strong class="order-name">${it.nombre}</strong>
        <span class="order-sub">${it.cantidad} × ${fmt(it.precio)}</span>
      </div>
      <div class="order-line">${fmt((it.precio || 0) * (it.cantidad || 0))}</div>
    </div>
  `).join('');

  box.innerHTML = `
    <h3 class="order-title">Mi pedido</h3>
    ${rows}
    <div class="order-total">
      <strong>Total</strong>
      <strong>${fmt(order.total)}</strong>
    </div>
  `;
}

/* Navegación footer + activo */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const page = window.location.pathname.split('/').pop()?.toLowerCase();

  if (page === 'pedido.html')       document.getElementById('footerPedido')?.classList.add('active');
  else if (page === 'menu.html')    document.getElementById('footerMenu')?.classList.add('active');
  else if (page?.includes('resena'))document.getElementById('footerResenas')?.classList.add('active');

  document.getElementById('footerPedido')?.addEventListener('click', function () {
    if (!this.classList.contains('active')) location.href = 'pedido.html';
  });
  document.getElementById('footerMenu')?.addEventListener('click', function () {
    if (!this.classList.contains('active')) location.href = 'menu.html';
  });
  document.getElementById('footerResenas')?.addEventListener('click', function () {
    if (!this.classList.contains('active')) location.href = 'resenas.html';
  });

  renderLastOrder();
});
