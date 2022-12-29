const { postCarrito, deleteCarrito, getProductosCarrito, postProductoCarrito, deleteProductoCarrito } = require('../controllers/carrito');

const { Router } = require('express');
const infoGet = require('../middlewars/infoGet');

const carritoRouter = Router();

carritoRouter.use(infoGet);

carritoRouter.post('/', infoGet, postCarrito);
carritoRouter.delete('/:id', infoGet, deleteCarrito);
carritoRouter.get('/:id/productos', infoGet, getProductosCarrito);
carritoRouter.post('/:id/productos', infoGet, postProductoCarrito);
carritoRouter.delete('/:id/productos/:id_prod', infoGet, deleteProductoCarrito);

module.exports = carritoRouter;