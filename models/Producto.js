const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  precioUnitario: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
  },
  categoria: {
    type: String,
  },
}, { timestamps: true });

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
