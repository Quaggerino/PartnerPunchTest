// tests.js

const { crearProductoEnMemoria, eliminarProductoEnMemoria } = require('./script'); 

// Mock de la función 'mostrarProductos' para evitar manipulación del DOM en las pruebas
global.mostrarProductos = jest.fn();

describe('crearProductoEnMemoria', () => {
  it('debe agregar un producto al array', () => {
    const producto = { id: 1, title: 'Test Product', price: 100, category: 'Test Category', image: 'test-image.jpg' };
    crearProductoEnMemoria(producto);
    expect(productosOriginales).toContain(producto);
  });
});

describe('eliminarProductoEnMemoria', () => {
  it('debe eliminar un producto del array', () => {
    const id = 1;
    eliminarProductoEnMemoria(id);
    expect(productosOriginales).not.toContain(producto => producto.id === id);
  });
});
