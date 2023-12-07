// integration-tests.js

describe('flujo de agregar y eliminar producto', () => {
    it('debe agregar un producto y luego eliminarlo', () => {
      const producto = { id: 1, title: 'Test Product', price: 100, category: 'Test Category', image: 'test-image.jpg' };
      crearProductoEnMemoria(producto);
      expect(productosOriginales).toContain(producto);
  
      eliminarProductoEnMemoria(producto.id);
      expect(productosOriginales).not.toContain(producto);
    });
  });
  