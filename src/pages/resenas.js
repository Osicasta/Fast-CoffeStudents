import '../../css/resenas.css';
import '../../css/style.css';
import tinto from '../../img/tinto.jpg';
import cafeLeche from '../../img/cafeLeche.jpg';
import capuchino from'../../img/capuchino.jpg';
import limonada from '../../img/limonada.jpg';

/* Datos de prueba (reemplaza la ruta de imagen cuando quieras) */
const reviews = [
  { id: 1, name: 'Tinto',          img: tinto,          rating: 5, text: 'Excelente y económico.' },
  { id: 2, name: 'Café con leche', img: cafeLeche,     rating: 4, text: 'Buen sabor, podría ser más cremoso.' },
  { id: 3, name: 'Capuchino',      img: capuchino,      rating: 5, text: 'Espuma perfecta y aroma increíble.' },
  { id: 4, name: 'Limonada',       img: limonada,       rating: 4, text: 'Refrescante, ideal para el calor.' },
];

function stars(n) {
  const full = '★'.repeat(Math.min(5, Math.max(0, n)));
  const empty = '☆'.repeat(5 - Math.min(5, Math.max(0, n)));
  return `${full}${empty}`;
}

function paintReviews() {
  const box = document.getElementById('reviewsList');
  if (!box) return;
  box.innerHTML = reviews.map(r => `
    <article class="review-item" aria-label="Reseña de ${r.name}">
      <img class="review-thumb" src="${r.img}" alt="Imagen de ${r.name}">
      <div class="review-meta">
        <div class="review-title">${r.name}</div>
        <div class="review-stars" aria-label="Calificación ${r.rating} de 5">${stars(r.rating)}</div>
        <p class="review-text">${r.text}</p>
      </div>
    </article>
    <div class="review-divider" role="separator" aria-hidden="true"></div>
  `).join('');
}

/* Footer: navegación y activo */
function setupFooter() {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('footerResenas')?.classList.add('active');

  document.getElementById('footerMenu')?.addEventListener('click', () => location.href = 'menu.html');
  document.getElementById('footerPedido')?.addEventListener('click', () => location.href = 'pedido.html');
  document.getElementById('footerResenas')?.addEventListener('click', () => {/* ya estás aquí */});
}

document.addEventListener('DOMContentLoaded', () => {
  setupFooter();
  paintReviews();
});
