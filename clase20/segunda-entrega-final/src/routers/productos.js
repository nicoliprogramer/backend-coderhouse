const { getProductos, postProducto, putProducto, deleteProducto } = require('../controllers/producto');

const { Router } = require('express');
const checkAdmin = require('../middlewars/checkAdmin');

//crear una variable admin y pasarla por parámetro en el router
const admin = true;

const productosRouter = Router();

productosRouter.get('/:id?', getProductos);
productosRouter.post('/', checkAdmin(admin), postProducto);
productosRouter.put('/:id', checkAdmin(admin), putProducto);
productosRouter.delete('/:id', checkAdmin(admin), deleteProducto);

module.exports = productosRouter;