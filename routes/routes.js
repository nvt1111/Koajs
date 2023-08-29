// const Router = require('koa-router');
// const productHandler = require('../handlers/productHandler')
// const validateProduct = require('../middleware/validate')
import Koa from 'koa';
import Router from 'koa-router';
import productHandler from '../handlers/productHandler.js';
import validateProduct from '../middleware/validate.js';


const router = new Router({
    prefix: '/api'
});

router.get('/product', productHandler.handelGetProduct);
router.get('/product/:id', productHandler.getProByID);
router.delete('/delProduct/:id', productHandler.deleteProduct);
router.post('/product', validateProduct, productHandler.creatProduct);
router.put('/product/:id', validateProduct, productHandler.updateProduct);

// module.exports = router;
export default router

