// routes/ComprasRoutes.js

const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/ComprasController');  // Asegúrate de que esté bien importado

// Ruta para registrar una compra (POST)
router.post('/', comprasController.registrarCompra);  // Verifica que registrarCompra esté disponible

// Ruta para obtener todas las compras (GET)
router.get('/', comprasController.obtenerCompras);

// Ruta para obtener una compra por folio (GET)
router.get('/:folio', comprasController.obtenerCompraPorFolio);

module.exports = router;
