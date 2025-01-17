const express = require('express');
const {addProduct,removeProduct,getAllProducts,getProduct,updateProduct,filterProduct} = require('../controllers/products')
const uploadForProducts = require('../middlewares/multer.middleware');

//declaration
const router = express.Router();

//routes
router.get('/',getAllProducts);
router.get('/checking',(req,res)=>{
    return res.json({message : "ok ok"});
})
router.get('/:id',getProduct);
router.delete('/:id',removeProduct);
router.patch('/:id',updateProduct);
router.post('/add',uploadForProducts.array("files"),addProduct);
router.post('/filter',filterProduct);
// router.post('/add',(req,res)=>{
//     return res.send({message:'Product Added'});
// });

module.exports = router