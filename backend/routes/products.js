const express = require('express');
const {addProduct,removeProduct,getAllProducts,getProduct,updateProduct,filterProduct} = require('../controllers/products')

//delclaration 
const router = express.Router();

//routes
router.get('/',getAllProducts);
router.get('/:id',getProduct);
router.delete('/:id',removeProduct);
router.patch('/:id',updateProduct);
router.post('/add',addProduct);
router.post('/filter',filterProduct);

module.exports = router