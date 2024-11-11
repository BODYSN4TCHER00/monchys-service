// routes/InventarioRoutes.js
const express = require('express');
const router = express.Router();
const InventarioController = require('../controllers/InventarioController');

// Endpoint para obtener la lista de productos en el inventario
router.get('/', InventarioController.obtenerInventario);
// Endpoint para borrar un producto
router.delete('/:id', InventarioController.eliminarProducto);

module.exports = router;
