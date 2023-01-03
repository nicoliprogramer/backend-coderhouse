import express from 'express';


import {ContainerMongo} from './src/containers/mongodb/containerProducts.js';
import {ContainerCarrito} from './src/containers/firebase/containerCarrito.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const containerMongo = new ContainerMongo()
const containerCarrito = new ContainerCarrito()

// app.use('/api/firebase/carrito', containerCarrito);

app.get('/api/mongodb/productos', async (req, res) => {
  const products = await containerMongo.getProducts();
  res.send(products);
})

app.post('/api/mongodb/productos', async(req, res) => {
  const products = await containerMongo.postProducts(req.body);
  res.send(products);
})



app.get('/api/firebase/carrito', async (req, res) => {
  const products = await containerCarrito.getCarrito();
  res.send(products);
})

app.post('/api/firebase/carrito', async(req, res) => {
  const products = await containerCarrito.postCarrito(req.body);
  res.send(products);
})



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