// controllers/VentasController.js
const Venta = require('../models/Venta');
const Inventario = require('../models/Inventario');

exports.registrarVenta = async (req, res) => {
    const { productos, metodoPago, total } = req.body;

    try {
        // Registrar cada producto en la venta y actualizar el inventario
        const productosVendidos = [];

        for (let prod of productos) {
            const inventarioProducto = await Inventario.findOne({ productoId: prod.productoId });

            if (inventarioProducto && inventarioProducto.cantidadDisponible >= prod.cantidad) {
                inventarioProducto.cantidadDisponible -= prod.cantidad;
                await inventarioProducto.save(); // Guardar cambios en el inventario

                productosVendidos.push({
                    productoId: prod.productoId,
                    cantidad: prod.cantidad
                });
            } else {
                return res.status(400).json({ error: `Cantidad insuficiente para el producto con ID ${prod.productoId}` });
            }
        }

        // Crear el objeto de venta
        const venta = new Venta({
            productos: productosVendidos,
            metodoPago,
            total,
            fechaHora: new Date()
        });

        // Guardar la venta en la base de datos
        await venta.save();
        res.status(201).json(venta);  // Devolver la venta creada como respuesta
    } catch (error) {
        console.error('Error al registrar la venta:', error);
        res.status(500).json({ error: 'Error al registrar la venta' });
    }
};


// Corte de caja por sesión (ventas del día actual o de un rango específico)
// Corte de caja por sesión (ventas del día actual o de un rango específico)
exports.corteCajaPorSesion = async (req, res) => {
    try {
        // Obtener el rango de fechas desde los parámetros de consulta (query)
        const { fechaInicio, fechaFin } = req.query;

        // Configurar fechas por defecto para la sesión de hoy si no se pasan parámetros
        const inicio = fechaInicio ? new Date(fechaInicio) : new Date(new Date().setHours(0, 0, 0, 0)); // Comienzo del día
        const fin = fechaFin ? new Date(fechaFin) : new Date(new Date().setHours(23, 59, 59, 999)); // Fin del día

        // Consultar las ventas dentro del rango de fechas especificado
        const ventas = await Venta.find({
            fecha: {
                $gte: inicio,
                $lte: fin,
            }
        });

        // Calcular el total de las ventas de la sesión
        const totalCorte = ventas.reduce((total, venta) => total + venta.total, 0);

        res.status(200).json({
            ventas,
            totalCorte,
            fechaInicio: inicio,
            fechaFin: fin,
        });
    } catch (error) {
        console.error('Error al realizar el corte de caja:', error);
        res.status(500).json({ error: 'Error al realizar el corte de caja' });
    }
};