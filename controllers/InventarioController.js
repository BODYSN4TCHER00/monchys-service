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
// Borrar algun producto especifico desde inventario  
exports.eliminarProducto = async (req, res) => {
    try {
      const { id } = req.params;
      await Inventario.findByIdAndDelete(id);
      res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  };