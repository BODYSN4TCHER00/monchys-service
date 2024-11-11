// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const comprasRoutes = require('./routes/ComprasRoutes');
const productRoutes = require('./routes/ProductosRoutes');
const inventarioRoutes = require('./routes/InventarioRoutes'); // Importar rutas de inventario
const ventasRoutes = require('./routes/VentasRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

// Rutas
app.use('/api/compras', comprasRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/inventario', inventarioRoutes); // Ruta para inventario
app.use('/api/ventas', ventasRoutes);

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Microservicio de Compras corriendo en el puerto 3001');
});
