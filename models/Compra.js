// models/Compra.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoCompraSchema = new Schema({
    productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
    precioUnitario: { type: Number, required: true }
});

const CompraSchema = new Schema({
    folio: { type: String, required: true },
    productos: { type: [ProductoCompraSchema], required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Compra', CompraSchema);
