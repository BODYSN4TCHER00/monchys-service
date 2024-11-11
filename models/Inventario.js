// models/Inventario.js
const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    clasificacion: {
        type: String,
        required: true,
    },
    cantidadDisponible: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Inventario', inventarioSchema);
