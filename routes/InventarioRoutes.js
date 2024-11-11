// routes/InventarioRoutes.js
const express = require('express');
const router = express.Router();
const InventarioController = require('../controllers/InventarioController');

// Endpoint para obtener la lista de productos en el inventario
router.get('/', InventarioController.obtenerInventario);

module.exports = router;
