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
        // Para cada producto, buscamos su precio en la base de datos
        const productosConPrecio = [];

        for (let prod of productos) {
            // Buscar producto por ID
            const producto = await Producto.findById(prod.productoId);
            
            if (producto) {
                // Agregar el precio unitario al producto en la compra
                productosConPrecio.push({
                    productoId: prod.productoId,
                    cantidad: prod.cantidad,
                    precioUnitario: producto.precioUnitario
                });

                // Actualizar el inventario: si el producto ya existe en inventario, aumentar la cantidad
                let inventario = await Inventario.findOne({ productoId: prod.productoId });

                if (inventario) {
                    // Si el producto ya está en el inventario, actualizamos la cantidad
                    inventario.cantidadDisponible += prod.cantidad;
                    await inventario.save(); // Guardar los cambios en el inventario
                } else {
                    // Si el producto no existe en inventario, crear uno nuevo
                    const nuevoInventario = new Inventario({
                        productoId: prod.productoId,
                        nombre: producto.nombre,
                        clasificacion: producto.clasificacion || "General", // Asignar una clasificación por defecto si no existe
                        cantidadDisponible: prod.cantidad
                    });

                    await nuevoInventario.save(); // Guardar el nuevo producto en inventario
                }

            } else {
                // Si el producto no se encuentra, devolver un error
                return res.status(400).json({ error: `Producto con ID ${prod.productoId} no encontrado` });
            }
        }

        // Crear el objeto de compra con los productos y precios completos
        const compra = new Compra({
            folio,
            productos: productosConPrecio,
            fecha: fecha || new Date(),  // Usar la fecha actual si no se proporciona
        });

        // Guardar la compra en la base de datos
        await compra.save();
        res.status(201).json(compra);  // Devolver la compra creada como respuesta
    } catch (error) {
        console.error('Error al registrar la compra:', error);
        res.status(500).json({ error: 'Error al registrar la compra' });
    }
};
