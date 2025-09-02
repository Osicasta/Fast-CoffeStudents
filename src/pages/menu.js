// src/pages/menu.js
// Menu + carrito (con mini-modal de carrito), compatible con menu.html y css/menu.css

/* =========================
   Datos de productos (estáticos)
   ========================= */
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

/* =========================
   Helpers: localStorage cart
   ========================= */
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        console.error('Error leyendo carrito desde localStorage:', e);
        return [];
    }
}

function setCart(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error guardando carrito en localStorage:', e);
    }
}

function formatCurrency(n) {
    // Formato simple en pesos (sin decimales)
    return `$${Number(n).toLocaleString('es-CO')}`;
}

/* Actualiza el contador visible del carrito */
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((acc, item) => acc + (item.cantidad || 0), 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = count;
}

/* =========================
   Inicialización
   ========================= */
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateCartCount();

    // Mostrar categoría activa al cargar o la primera disponible
    const activeBtn = document.querySelector('.category-btn.active');
    if (activeBtn) {
        changeCategory(activeBtn.getAttribute('data-category'), activeBtn);
    } else {
        const first = document.querySelector('.category-btn');
        if (first) changeCategory(first.getAttribute('data-category'), first);
    }
});

/* =========================
   Event listeners
   ========================= */
function setupEventListeners() {
    // Categorías
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            changeCategory(category, button);
        });
    });

    // Botones agregar (si existen en DOM)
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            if (!isNaN(productId)) addToCart(productId, this);
        });
    });

    // Footer (nav interno)
    const footerMenu = document.getElementById('footerMenu');
    const footerPedido = document.getElementById('footerPedido');
    const footerResenas = document.getElementById('footerResenas');

    if (footerMenu) {
        footerMenu.addEventListener('click', () => {
            mostrarMenu();
            setActiveFooterButton(footerMenu);
        });
    }
    if (footerPedido) {
        // <-- CAMBIO: ahora navega a pedido.html en lugar de abrir el modal de carrito
        footerPedido.addEventListener('click', () => {
            // Solo navegar si no estamos ya en pedido.html
            const path = window.location.pathname.split('/').pop();
            if (path !== 'pedido.html') {
                window.location.href = 'pedido.html';
            } else {
                // si ya estamos en pedido.html, solo marcar activo
                setActiveFooterButton(footerPedido);
            }
        });
    }
    if (footerResenas) {
        footerResenas.addEventListener('click', () => {
            mostrarResenas();
            setActiveFooterButton(footerResenas);
        });
    }

    // Enlace del carrito (icono superior) — sigue abriendo la mini-vista del carrito
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarCarrito();
        });
    }

    // Botón volver
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            // Si quieres que navegue a otra página, cambia aquí.
            // Por defecto hace history.back() si hay historial, si no va a menuStart.html
            e.preventDefault();
            if (window.history.length > 1) window.history.back();
            else window.location.href = backLink.getAttribute('href') || 'menuStart.html';
        });
    }
}

/* Helper para marcar footer activo */
function setActiveFooterButton(button) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');
}

/* =========================
   Cambio de categoría
   ========================= */
function changeCategory(category, buttonElement) {
    if (!category) return;
    // Ocultar secciones
    document.querySelectorAll('.menu-grid').forEach(sec => {
        sec.style.display = 'none';
        sec.setAttribute('aria-hidden', 'true');
    });

    // Mostrar la correcta
    const sec = document.getElementById(category);
    if (sec) {
        sec.style.display = 'grid';
        sec.setAttribute('aria-hidden', 'false');
    }

    // Actualizar UI de categorías
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    if (buttonElement) buttonElement.classList.add('active');
}

/* =========================
   Agregar al carrito
   ========================= */
function addToCart(productId, buttonEl) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;

    const cart = getCart();
    const idx = cart.findIndex(i => i.id === productId);

    if (idx !== -1) cart[idx].cantidad += 1;
    else cart.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });

    setCart(cart);
    updateCartCount();

    // Feedback visual en el botón
    if (buttonEl) {
        const originalText = buttonEl.textContent;
        const originalBg = buttonEl.style.backgroundColor;
        buttonEl.textContent = '¡Agregado!';
        buttonEl.style.backgroundColor = '#28a745';
        buttonEl.disabled = true;
        setTimeout(() => {
            buttonEl.textContent = originalText;
            buttonEl.style.backgroundColor = originalBg || '';
            buttonEl.disabled = false;
        }, 900);
    }
}

/* =========================
   Mini-vista del carrito (modal interno dentro de .pedido-container)
   ========================= */
function mostrarCarrito() {
    const existing = document.querySelector('.cart-modal-overlay');
    if (existing) {
        existing.remove(); // si ya existe, eliminar (toggle)
        return;
    }

    const cart = getCart();
    const container = document.querySelector('.pedido-container') || document.body;

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'cart-modal-overlay';
    // estilos inline mínimos para que funcione sin CSS adicional
    overlay.style.position = 'absolute';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.35)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '60';

    // Modal (card)
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.style.width = '92%';
    modal.style.maxWidth = '360px';
    modal.style.maxHeight = '80%';
    modal.style.overflow = 'auto';
    modal.style.background = '#fff';
    modal.style.borderRadius = '14px';
    modal.style.padding = '14px';
    modal.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.gap = '10px';

    // Header modal
    const h = document.createElement('div');
    h.style.display = 'flex';
    h.style.justifyContent = 'space-between';
    h.style.alignItems = 'center';

    const title = document.createElement('h3');
    title.textContent = 'Mi carrito';
    title.style.margin = '0';
    title.style.fontSize = '1rem';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Cerrar';
    closeBtn.style.border = 'none';
    closeBtn.style.background = 'transparent';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#393939';
    closeBtn.style.fontWeight = '600';

    closeBtn.addEventListener('click', () => overlay.remove());

    h.appendChild(title);
    h.appendChild(closeBtn);
    modal.appendChild(h);

    // Contenido carrito
    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '8px';

    if (!cart.length) {
        const empty = document.createElement('p');
        empty.textContent = 'El carrito está vacío.';
        empty.style.color = '#666';
        list.appendChild(empty);
    } else {
        cart.forEach(item => {
            const prod = productos.find(p => p.id === item.id) || {};
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.justifyContent = 'space-between';
            row.style.gap = '8px';
            row.style.padding = '8px';
            row.style.borderRadius = '8px';
            row.style.background = '#fafafa';

            const left = document.createElement('div');
            left.style.display = 'flex';
            left.style.flexDirection = 'column';
            left.style.flex = '1';

            const name = document.createElement('div');
            name.textContent = item.nombre || prod.nombre || 'Producto';
            name.style.fontWeight = '600';
            name.style.fontSize = '0.95rem';

            const price = document.createElement('div');
            price.textContent = formatCurrency(item.precio || prod.precio || 0);
            price.style.color = '#333';
            price.style.fontSize = '0.9rem';

            left.appendChild(name);
            left.appendChild(price);

            const controls = document.createElement('div');
            controls.style.display = 'flex';
            controls.style.alignItems = 'center';
            controls.style.gap = '6px';

            const minus = document.createElement('button');
            minus.textContent = '-';
            minus.style.width = '30px';
            minus.style.height = '30px';
            minus.style.borderRadius = '6px';
            minus.style.border = '1px solid #ddd';
            minus.style.background = '#fff';
            minus.style.cursor = 'pointer';

            const qty = document.createElement('div');
            qty.textContent = item.cantidad;
            qty.style.minWidth = '24px';
            qty.style.textAlign = 'center';

            const plus = document.createElement('button');
            plus.textContent = '+';
            plus.style.width = '30px';
            plus.style.height = '30px';
            plus.style.borderRadius = '6px';
            plus.style.border = '1px solid #ddd';
            plus.style.background = '#fff';
            plus.style.cursor = 'pointer';

            const remove = document.createElement('button');
            remove.textContent = 'Eliminar';
            remove.style.marginLeft = '8px';
            remove.style.border = 'none';
            remove.style.background = 'transparent';
            remove.style.color = '#b33';
            remove.style.cursor = 'pointer';
            remove.style.fontSize = '0.85rem';

            controls.appendChild(minus);
            controls.appendChild(qty);
            controls.appendChild(plus);
            controls.appendChild(remove);

            row.appendChild(left);
            row.appendChild(controls);
            list.appendChild(row);

            // Eventos controles
            plus.addEventListener('click', () => {
                const c = getCart();
                const i = c.find(it => it.id === item.id);
                if (i) i.cantidad += 1;
                setCart(c);
                updateCartCount();
                qty.textContent = i.cantidad;
                // actualizar total al final
                renderTotal();
            });

            minus.addEventListener('click', () => {
                const c = getCart();
                const i = c.find(it => it.id === item.id);
                if (i) {
                    i.cantidad = Math.max(1, i.cantidad - 1);
                    setCart(c);
                    updateCartCount();
                    qty.textContent = i.cantidad;
                    renderTotal();
                }
            });

            remove.addEventListener('click', () => {
                let c = getCart();
                c = c.filter(it => it.id !== item.id);
                setCart(c);
                updateCartCount();
                // quitar nodo visualmente
                row.remove();
                // si quedó vacío, mostrar mensaje
                if (!getCart().length) {
                    list.innerHTML = '';
                    const empty = document.createElement('p');
                    empty.textContent = 'El carrito está vacío.';
                    empty.style.color = '#666';
                    list.appendChild(empty);
                }
                renderTotal();
            });
        });
    }

    modal.appendChild(list);

    // Total y acciones
    const footer = document.createElement('div');
    footer.style.display = 'flex';
    footer.style.justifyContent = 'space-between';
    footer.style.alignItems = 'center';
    footer.style.gap = '8px';
    footer.style.marginTop = '8px';

    const totalDiv = document.createElement('div');
    totalDiv.style.fontWeight = '700';
    totalDiv.style.fontSize = '1rem';
    totalDiv.textContent = 'Total: ' + formatCurrency(cart.reduce((s, it) => s + (it.precio * it.cantidad), 0));

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '8px';

    const checkout = document.createElement('button');
    checkout.textContent = 'Pagar';
    checkout.style.padding = '8px 12px';
    checkout.style.background = '#393939';
    checkout.style.color = '#fff';
    checkout.style.border = 'none';
    checkout.style.borderRadius = '8px';
    checkout.style.cursor = 'pointer';

    const continueBtn = document.createElement('button');
    continueBtn.textContent = 'Seguir comprando';
    continueBtn.style.padding = '8px 12px';
    continueBtn.style.border = '1px solid #ddd';
    continueBtn.style.background = '#fff';
    continueBtn.style.cursor = 'pointer';
    continueBtn.style.borderRadius = '8px';

    actions.appendChild(continueBtn);
    actions.appendChild(checkout);
    footer.appendChild(totalDiv);
    footer.appendChild(actions);
    modal.appendChild(footer);

    // Funciones auxiliares
    function renderTotal() {
        const c = getCart();
        totalDiv.textContent = 'Total: ' + formatCurrency(c.reduce((s, it) => s + (it.precio * it.cantidad), 0));
    }

    continueBtn.addEventListener('click', () => overlay.remove());
    checkout.addEventListener('click', () => {
        // Si tienes página pedido.html para checkout, navega:
        // window.location.href = 'pedido.html';
        // Por ahora mostramos un mensaje y cerramos modal
        overlay.remove();
        alert('Aquí se procesaría el pago / pedido (implementa checkout).');
    });

    overlay.appendChild(modal);
    container.appendChild(overlay);
}

/* =========================
   Mostrar reseñas (simple)
   ========================= */
function mostrarResenas() {
    // Modal básico con contenido de reseñas (puedes reemplazar por render en DOM)
    const existing = document.querySelector('.resenas-modal');
    if (existing) { existing.remove(); return; }

    const container = document.querySelector('.pedido-container') || document.body;
    const overlay = document.createElement('div');
    overlay.className = 'resenas-modal';
    overlay.style.position = 'absolute';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.28)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '60';

    const box = document.createElement('div');
    box.style.width = '92%';
    box.style.maxWidth = '360px';
    box.style.background = '#fff';
    box.style.borderRadius = '12px';
    box.style.padding = '14px';
    box.style.boxShadow = '0 8px 30px rgba(0,0,0,0.18)';

    const h = document.createElement('div');
    h.style.display = 'flex';
    h.style.justifyContent = 'space-between';
    h.style.alignItems = 'center';
    const title = document.createElement('h3');
    title.textContent = 'Reseñas';
    title.style.margin = '0';
    title.style.fontSize = '1rem';
    const close = document.createElement('button');
    close.textContent = 'Cerrar';
    close.style.border = 'none';
    close.style.background = 'transparent';
    close.style.cursor = 'pointer';
    close.style.fontWeight = '600';
    close.addEventListener('click', () => overlay.remove());
    h.appendChild(title);
    h.appendChild(close);
    box.appendChild(h);

    const p = document.createElement('p');
    p.textContent = 'Calificación promedio: ⭐⭐⭐⭐☆ (4.2/5 basado en 128 reseñas)';
    p.style.marginTop = '10px';
    box.appendChild(p);

    overlay.appendChild(box);
    container.appendChild(overlay);
}

/* =========================
   Mostrar menú (restaurar vista)
   ========================= */
function mostrarMenu() {
    // Mostrar categorías y menciones
    const categories = document.querySelector('.categories');
    const mentions = document.querySelector('.mentions-section');
    if (categories) categories.style.display = 'flex';
    if (mentions) mentions.style.display = 'block';

    // Mostrar la categoría activa
    const active = document.querySelector('.category-btn.active');
    if (active) changeCategory(active.getAttribute('data-category'), active);
    else {
        const first = document.querySelector('.category-btn');
        if (first) changeCategory(first.getAttribute('data-category'), first);
    }

    // Cerrar modals si están abiertos
    const overlays = document.querySelectorAll('.cart-modal-overlay, .resenas-modal');
    overlays.forEach(o => o.remove());
}
