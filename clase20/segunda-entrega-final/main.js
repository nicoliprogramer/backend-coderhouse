const express = require('express');
const path = require('path');

const productRouter = require('./src/routers/productos');
const carritoRouter = require('./src/routers/carrito');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productRouter);
app.use('/api/carrito', carritoRouter);

app.use((req, res) => {
  res.status(404).json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' NO autorizado`,
  });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is runner in ${PORT}`);
});