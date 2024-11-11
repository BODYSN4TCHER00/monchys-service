// controllers/ComprasController.js
const Compra = require('../models/Compra');
const Producto = require('../models/Producto');
const Inventario = require('../models/Inventario');

// Obtener todas las compras
exports.obtenerCompras = async (req, res) => {
    try {
        const compras = await Compra.find();
        res.status(200).json(compras);
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        res.status(500).json({ error: 'Error al obtener las compras' });
    }
};

// Obtener una compra por su folio
exports.obtenerCompraPorFolio = async (req, res) => {
    const { folio } = req.params;
    try {
        const compra = await Compra.findOne({ folio });
        if (!compra) {
            return res.status(404).json({ error: 'Compra no encontrada' });
        }
        res.status(200).json(compra);
    } catch (error) {
        console.error('Error al obtener la compra:', error);
        res.status(500).json({ error: 'Error al obtener la compra' });
    }
};

// Registrar una nueva compra
exports.registrarCompra = async (req, res) => {
    const { folio, productos, fecha } = req.body;

    try {
        const productosConPrecio = [];

        for (let prod of productos) {
            // Buscar el producto por nombre y clasificación
            let producto = await Producto.findOne({ nombre: prod.name, clasificacion: prod.classification });
            
            if (!producto) {
                // Crear el producto en la base de datos si no existe
                producto = new Producto({
                    nombre: prod.name,
                    clasificacion: prod.classification,
                    precioUnitario: prod.price
                });
                await producto.save();
            }

            // Agregar detalles del producto para la compra
            productosConPrecio.push({
                productoId: producto._id,
                cantidad: prod.quantity,
                precioUnitario: producto.precioUnitario
            });

            // Actualizar o agregar al inventario
            let inventario = await Inventario.findOne({ productoId: producto._id });

            if (inventario) {
                inventario.cantidadDisponible += prod.quantity;
                await inventario.save();
            } else {
                const nuevoInventario = new Inventario({
                    productoId: producto._id,
                    nombre: producto.nombre,
                    clasificacion: producto.clasificacion,
                    cantidadDisponible: prod.quantity
                });
                await nuevoInventario.save();
            }
        }

        const compra = new Compra({
            folio,
            productos: productosConPrecio,
            fecha: fecha || new Date()
        });

        await compra.save();
        res.status(201).json(compra);
    } catch (error) {
        console.error('Error al registrar la compra:', error);
        res.status(500).json({ error: 'Error al registrar la compra' });
    }
};


