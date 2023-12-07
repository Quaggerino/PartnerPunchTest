// js/script.js

let productosOriginales = [];

let modoEdicion = false;
let idProductoEdicion = null;

// Función para cargar productos de la API de Platzi al iniciar
function cargarProductosDesdeApi() {
    fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=20')
        .then(response => response.json())
        .then(data => {
            productosOriginales = data.map(producto => ({
                id: producto.id,
                title: producto.title,
                price: producto.price,
                description: producto.description,
                category: producto.category.name,
                image: producto.images[0] 
            }));
            mostrarProductos(productosOriginales);
        })
        .catch(error => console.error("Error al cargar productos:", error));
}

// Función para cargar categorías de la API de Platzi al iniciar
function cargarCategoriasDesdeApi() {
    fetch('https://api.escuelajs.co/api/v1/categories')
        .then(response => response.json())
        .then(categorias => {
            const selectCategoriaFiltrar = document.getElementById('filtrar-categoria');
            const selectCategoriaFormulario = document.getElementById('producto-categoria');
            
            selectCategoriaFiltrar.innerHTML = '<option value="">Todas las categorías</option>';
            selectCategoriaFormulario.innerHTML = ''; // Limpiar antes de agregar nuevas opciones

            categorias.forEach(categoria => {
                const opcionFiltrar = document.createElement('option');
                opcionFiltrar.value = categoria.name;
                opcionFiltrar.textContent = categoria.name;
                selectCategoriaFiltrar.appendChild(opcionFiltrar);
                
                const opcionFormulario = document.createElement('option');
                opcionFormulario.value = categoria.name;
                opcionFormulario.textContent = categoria.name;
                selectCategoriaFormulario.appendChild(opcionFormulario);
            });
        })
        .catch(error => console.error("Error al cargar categorías:", error));
}


document.addEventListener('DOMContentLoaded', () => {
    cargarProductosDesdeApi();
    cargarCategoriasDesdeApi();
});

// Función para mostrar productos en la interfaz de usuario
function mostrarProductos(productos) {
    const contenedor = document.getElementById('product-container');
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos productos

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'product';
        productoDiv.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p>${producto.description}</p>
            <p>Precio: $${producto.price}</p>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
            <button onclick="abrirFormularioActualizacion(${producto.id})">Actualizar</button>
        `;
        contenedor.appendChild(productoDiv);
    });
}

// Funciones CRUD en memoria

function crearProductoEnMemoria(producto) {
    producto.id = productosOriginales.length + 1; // Generar un nuevo ID
    productosOriginales.push(producto);
    mostrarProductos(productosOriginales);
}

function actualizarProductoEnMemoria(id, productoActualizado) {
    const index = productosOriginales.findIndex(p => p.id === id);
    if (index !== -1) {
        productosOriginales[index] = { ...productosOriginales[index], ...productoActualizado };
        mostrarProductos(productosOriginales);
    } else {
        console.error('Producto no encontrado');
    }
}




function eliminarProductoEnMemoria(id) {
    productosOriginales = productosOriginales.filter(p => p.id !== id);
    mostrarProductos(productosOriginales);
}

// Definir eliminarProducto global
function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        eliminarProductoEnMemoria(id);
    }
}

// Función para abrir el formulario de actualización con los datos del producto
function abrirFormularioActualizacion(id) {
    modoEdicion = true;
    idProductoEdicion = id;
    const producto = productosOriginales.find(p => p.id === id);
    if (producto) {
        document.getElementById('producto-titulo').value = producto.title;
        document.getElementById('producto-precio').value = producto.price;
        document.getElementById('producto-descripcion').value = producto.description;
        document.getElementById('producto-categoria').value = producto.category;
        document.getElementById('producto-imagen').value = producto.image;
        document.getElementById('formulario-agregar-producto').querySelector('button').textContent = 'Actualizar Producto';
    } else {
        console.error('Producto no encontrado');
    }
}

// Manejo de eventos del formulario para agregar o actualizar productos
document.getElementById('formulario-agregar-producto').addEventListener('submit', function(event) {
    event.preventDefault();

    const productoDatos = {
        title: document.getElementById('producto-titulo').value,
        price: parseFloat(document.getElementById('producto-precio').value),
        description: document.getElementById('producto-descripcion').value,
        category: document.getElementById('producto-categoria').value,
        image: document.getElementById('producto-imagen').value,
    };

    if (modoEdicion) {
        actualizarProductoEnMemoria(idProductoEdicion, productoDatos);
    } else {
        crearProductoEnMemoria(productoDatos);
    }

    // Restablecer el formulario y el modo
    modoEdicion = false;
    idProductoEdicion = null;
    document.getElementById('formulario-agregar-producto').reset();
    document.getElementById('formulario-agregar-producto').querySelector('button').textContent = 'Agregar Producto';
});




function ordenarProductosPorPrecioAsc() {
    productosOriginales.sort((a, b) => a.price - b.price);
    mostrarProductos(productosOriginales);
}

function ordenarProductosPorPrecioDesc() {
    productosOriginales.sort((a, b) => b.price - a.price);
    mostrarProductos(productosOriginales);
}

// event listeners para los botones
document.getElementById('ordenar-precio-asc').addEventListener('click', ordenarProductosPorPrecioAsc);
document.getElementById('ordenar-precio-desc').addEventListener('click', ordenarProductosPorPrecioDesc);


function filtrarProductosPorCategoria() {
    const categoriaSeleccionada = document.getElementById('filtrar-categoria').value;
    const productosFiltrados = categoriaSeleccionada
        ? productosOriginales.filter(p => p.category === categoriaSeleccionada)
        : productosOriginales;
    mostrarProductos(productosFiltrados);
}

// event listener para el selector de categoría
document.getElementById('filtrar-categoria').addEventListener('change', filtrarProductosPorCategoria);



