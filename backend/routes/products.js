const express = require('express');
const {addProduct,removeProduct,getAllProducts,getProduct,updateProduct,filterProduct, searchProducts,
    getDealsOfTheMonth, getNewArrivals
} = require('../controllers/products')
const uploadForProducts = require('../middlewares/multer.middleware');

//declaration
const router = express.Router();
 
//routes
router.get('/',getAllProducts);
router.get('/newArrivals',getNewArrivals);
router.post('/add', uploadForProducts.any(), addProduct);
router.post('/filter',filterProduct);
router.get('/dealsOfMonth',getDealsOfTheMonth);
router.get('/:id',getProduct);
router.get('/search/:searchText',searchProducts);
router.delete('/:id',removeProduct);
router.patch('/:id',updateProduct);
// Accept multiple files for any field

//testing

// router.post('/add',(req,res)=>{
//     console.log("entered");
//     return res.status(201).send({
//         message:"Product added successfully",
//     });
// });
module.exports = router