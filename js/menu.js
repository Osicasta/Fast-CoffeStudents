// Estado de la aplicación
let cart = [];

// Productos disponibles (deben coincidir con los de carrito.js)
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

// Actualizar contador del carrito en el icono
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((acc, item) => acc + item.cantidad, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = count;
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateCartCount(); // Inicializar contador al cargar
});

// Configurar event listeners
function setupEventListeners() {
    // Navegación por categorías
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            changeCategory(category, button);
        });
    });

document.getElementById('footerMenu').addEventListener('click', function() {
  window.location.href = 'menu.html';
});
document.getElementById('footerPedido').addEventListener('click', function() {
  window.location.href = 'pedido.html';
});

    // Eventos para botones de agregar al carrito
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const id = parseInt(this.getAttribute('data-id'));
            const producto = productos.find(p => p.id === id);
            if (!producto) return;

            let cart = getCart();
            const idx = cart.findIndex(item => item.id === id);
            if (idx !== -1) {
                cart[idx].cantidad += 1;
            } else {
                cart.push({ id: producto.id, cantidad: 1 });
            }
            setCart(cart);
            updateCartCount();

            // Feedback visual
            const originalText = button.textContent;
            button.textContent = "¡Agregado!";
            button.style.background = "#28a745";
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = "#393939";
            }, 1200);
        });
    });
}

// Cambiar categoría
function changeCategory(category, button) {
    // Ocultar todas las secciones de productos
    document.querySelectorAll('.menu-grid').forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar la categoría seleccionada
    document.getElementById(category).style.display = 'grid';
    
    // Actualizar UI de categorías
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Agregar producto al carrito
function addToCart(productId, buttonElement) {
    // Obtener información del producto desde el DOM
    const productElement = buttonElement.closest('.menu-item');
    const productName = productElement.querySelector('.item-title').textContent;
    const productPrice = productElement.querySelector('.item-price').textContent;
    
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    // Mostrar feedback visual
    const originalText = buttonElement.textContent;
    buttonElement.textContent = "¡Agregado!";
    buttonElement.style.background = "#28a745";
    
    setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.style.background = "#393939";
    }, 1500);
    
    // Actualizar la interfaz si es necesario
    updateCartUI();
}

// Actualizar la interfaz del carrito
function updateCartUI() {
    // Aquí puedes actualizar un contador de carrito si decides agregarlo
    console.log('Productos en el carrito:', cart);
}

// Funciones para cambiar vistas
function mostrarCarrito() {
    // Ocultar todas las secciones de productos
    document.querySelectorAll('.menu-grid').forEach(section => {
        section.style.display = 'none';
    });
    
    // Ocultar categorías y sección de menciones
    document.querySelector('.categories').style.display = 'none';
    document.querySelector('.mentions-section').style.display = 'none';
    
    // Aquí podrías mostrar el carrito de compras
    alert("Aquí se mostraría el carrito de compras");
}

function mostrarResenas() {
    // Ocultar todas las secciones de productos
    document.querySelectorAll('.menu-grid').forEach(section => {
        section.style.display = 'none';
    });
    
    // Ocultar categorías
    document.querySelector('.categories').style.display = 'none';
    
    // Aquí podrías mostrar las reseñas
    alert("Aquí se mostrarían las reseñas");
}

function mostrarMenu() {
    // Mostrar categorías y sección de menciones
    document.querySelector('.categories').style.display = 'flex';
    document.querySelector('.mentions-section').style.display = 'block';
    
    // Mostrar la categoría activa
    const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
    document.getElementById(activeCategory).style.display = 'grid';
}