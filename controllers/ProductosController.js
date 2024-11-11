const Producto = require('../models/Producto');

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  const { nombre, precioUnitario, descripcion, categoria } = req.body;

  try {
    const nuevoProducto = new Producto({
      nombre,
      precioUnitario,
      descripcion,
      categoria,
    });

    await nuevoProducto.save();
    res.status(201).json({ message: 'Producto creado con éxito', producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Obtener un producto por nombre
exports.obtenerProductoPorNombre = async (req, res) => {
  const { nombre } = req.params;

  try {
    const producto = await Producto.findOne({ nombre });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};
