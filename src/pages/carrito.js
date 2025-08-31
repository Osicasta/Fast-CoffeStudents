// Productos de ejemplo (deberían coincidir con los de menu.js)
const productos = [
  { id: 1, nombre: "Tinto", precio: 1000, imagen: "img/tinto.jpg" },
  { id: 2, nombre: "Café con leche", precio: 2000, imagen: "img/cafeLeche.jpg" },
  { id: 3, nombre: "Capuchino", precio: 3000, imagen: "img/capuchino.jpg" },
  { id: 4, nombre: "Jugo de naranja", precio: 2500, imagen: "img/jugoNaranja.jpg" },
  { id: 5, nombre: "Limonada", precio: 2000, imagen: "img/limonada.jpg" },
  { id: 6, nombre: "Smoothie de fresa", precio: 3500, imagen: "img/smoothieFresa.jpg" },
  { id: 7, nombre: "Torta de chocolate", precio: 3000, imagen: "img/tortaChocolate.jpg" },
  { id: 8, nombre: "Galletas", precio: 1500, imagen: "img/galletaChoco.jpg" },
  { id: 9, nombre: "Muffin", precio: 2000, imagen: "img/muffin.jpg" },
  { id: 10, nombre: "Sandwich de jamón", precio: 4000, imagen: "img/sandwichJamon.jpg" },
  { id: 11, nombre: "Sandwich de pollo", precio: 4500, imagen: "img/sandwichPollo.jpg" },
  { id: 12, nombre: "Sandwich vegetariano", precio: 3800, imagen: "img/sandwichVegetariano.jpg" }
];

// Obtener carrito del localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar carrito en localStorage
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Renderizar productos del carrito
function renderCart() {
  const cart = getCart();
  const cartMain = document.getElementById('cart-main');
  const cartTotal = document.getElementById('cart-total');
  cartMain.innerHTML = '';

  if (cart.length === 0) {
    cartMain.innerHTML = '<p style="text-align:center;color:#b0a8b9;">Tu carrito está vacío.</p>';
    cartTotal.textContent = 'Total: $0.00';
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (!producto) return;

    total += producto.precio * item.cantidad;

    const div = document.createElement('div');
    div.className = 'cart-product';
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="cart-product-img">
      <div class="cart-product-info">
        <div class="cart-product-title">${producto.nombre}</div>
        <div class="cart-product-controls">
          <button class="cart-qty-btn" data-action="decrease" data-id="${producto.id}">−</button>
          <span class="cart-product-qty">x${item.cantidad}</span>
          <button class="cart-qty-btn" data-action="increase" data-id="${producto.id}">+</button>
          <span class="cart-product-price">$${(producto.precio * item.cantidad).toFixed(2)}</span>
        </div>
      </div>
    `;
    cartMain.appendChild(div);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Manejar clicks en botones de cantidad
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('cart-qty-btn')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const action = e.target.getAttribute('data-action');
    let cart = getCart();
    const idx = cart.findIndex(item => item.id === id);
    if (idx === -1) return;

    if (action === 'increase') {
      cart[idx].cantidad += 1;
    } else if (action === 'decrease') {
      cart[idx].cantidad -= 1;
      if (cart[idx].cantidad <= 0) cart.splice(idx, 1);
    }
    setCart(cart);
    renderCart();
  }
});
document.querySelectorAll('.bottom-nav .nav-btn').forEach((btn, idx) => {
    btn.addEventListener('click', function() {
        if (idx === 0) window.location.href = 'menu.html';
        if (idx === 1) window.location.href = 'carrito.html';
        if (idx === 2) window.location.href = 'reseñas.html';
    });
});

// Botones de pago (demo)
document.getElementById('pay-card-btn').addEventListener('click', function() {
  alert('Funcionalidad de pago con tarjeta no implementada.');
});
document.getElementById('pay-store-btn').addEventListener('click', function() {
  alert('Funcionalidad de pago en tienda no implementada.');
});

// Renderizar al cargar
renderCart();