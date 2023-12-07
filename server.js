const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.static('frontend'));

// Sirve archivos estáticos desde el directorio 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());

let productos = [
    // Ejemplo de producto
    {
        id: 1,
        title: "Producto 1",
        price: 100,
        description: "Descripción del producto 1",
        category: "Categoría 1",
        image: "url-de-la-imagen"
    },
    // Más productos...
];

app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1, // Simplemente incrementa el ID basado en la longitud del array
        ...req.body // Asigna las propiedades del producto desde el cuerpo de la solicitud
    };

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// GET - Obtener un producto por ID
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// PUT - Actualizar un producto
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
        const productoActualizado = { id, ...req.body };
        productos[index] = productoActualizado;
        res.json(productoActualizado);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// DELETE - Eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
        productos = productos.filter(p => p.id !== id);
        res.status(204).send();
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
