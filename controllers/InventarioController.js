// controllers/InventarioController.js
const Inventario = require('../models/Inventario');

// Obtener todos los productos en el inventario
exports.obtenerInventario = async (req, res) => {
    try {
        const inventario = await Inventario.find();
        res.status(200).json(inventario);
    } catch (error) {
        console.error('Error al obtener el inventario:', error);
        res.status(500).json({ error: 'Error al obtener el inventario' });
    }
};
