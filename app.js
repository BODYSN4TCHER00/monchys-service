const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Importar CORS
const comprasRoutes = require('./routes/ComprasRoutes');
const productRoutes = require('./routes/ProductosRoutes');
const inventarioRoutes = require('./routes/InventarioRoutes');
const ventasRoutes = require('./routes/VentasRoutes');

dotenv.config();
const app = express();

// Usar CORS para permitir acceso desde cualquier origen
app.use(cors());  // Habilitar CORS para todas las solicitudes

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
