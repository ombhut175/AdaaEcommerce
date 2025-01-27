const express = require('express');
const {addProduct,removeProduct,getAllProducts,getProduct,updateProduct,filterProduct, searchProducts} = require('../controllers/products')
const uploadForProducts = require('../middlewares/multer.middleware');

//declaration
const router = express.Router();
 
//routes
router.get('/',getAllProducts);
router.get('/:id',getProduct);
router.get('/search/:searchText',searchProducts);
router.delete('/:id',removeProduct);
router.patch('/:id',updateProduct);
// Accept multiple files for any field
router.post('/add', uploadForProducts.any(), addProduct);
router.post('/filter',filterProduct);

//testing

// router.post('/add',(req,res)=>{
//     console.log("entered");
//     return res.status(201).send({
//         message:"Product added successfully",
//     });
// });
module.exports = router