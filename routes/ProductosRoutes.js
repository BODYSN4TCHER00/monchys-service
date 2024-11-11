const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductosController');

// Ruta para crear un nuevo producto
router.post('/', productController.crearProducto);

// Ruta para obtener todos los productos
router.get('/', productController.obtenerProductos);

// Ruta para obtener un producto por su nombre
router.get('/:nombre', productController.obtenerProductoPorNombre);

module.exports = router;
