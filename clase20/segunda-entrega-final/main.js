import express from 'express';

import {containerMongo} from './src/containers/mongodb/containerProducts.js';
import {containerCarrito} from './src/containers/firebase/containerCarrito.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/mongodb/products', containerMongo);
app.use('/api/firebase/carrito', containerCarrito);

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