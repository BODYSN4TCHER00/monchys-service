// models/Venta.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoVentaSchema = new Schema({
    productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
});

const VentaSchema = new Schema({
    productos: { type: [ProductoVentaSchema], required: true },
    metodoPago: { type: String, required: true }, // Ejemplo: "efectivo", "tarjeta", "mixto"
    total: { type: Number, required: true },
    fechaHora: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Venta', VentaSchema);
