const express = require('express');
const {addProduct,removeProduct,getAllProducts,getProduct,updateProduct} = require('../controllers/products')

//delclaration 
const router = express.Router();

//routes
router.get('/products/',getAllProducts);
router.get('/products/:id',getProduct);
router.delete('/products/:id',removeProduct);
router.updateProduct('/products/:id',updateProduct);
router.post('/products/',addProduct);

module.exports = router