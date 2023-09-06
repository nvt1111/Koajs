import Koa from 'koa';
import Router from 'koa-router';
import productHandler from '../handlers/productHandler.js';
import validateProduct from '../middleware/validate.js';

const router = new Router({
    prefix: '/api'
});

router.get('/products', productHandler.handelGetProduct);
router.post('/products', validateProduct, productHandler.createProduct);
router.put('/product/:id', validateProduct, productHandler.updateProduct);
router.delete('/product/:id', productHandler.deleteProduct);
router.get('/product/:id', productHandler.getProductById);

export default router

