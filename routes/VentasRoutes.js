// VentasRoutes.js
const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/VentasController');

router.post('/', ventasController.registrarVenta); // Ruta para registrar una venta
router.get('/corte-caja', ventasController.corteCajaPorSesion);

module.exports = router;
