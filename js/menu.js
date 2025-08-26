// Estado de la aplicación
let cart = [];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
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

    // Navegación inferior
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Aquí puedes agregar la lógica para cambiar entre vistas
            if (button.textContent === "Mi Pedido") {
                mostrarCarrito();
            } else if (button.textContent === "Reseñas") {
                mostrarResenas();
            } else {
                mostrarMenu();
            }
        });
    });

    // Eventos para botones de agregar al carrito
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId, e.target);
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