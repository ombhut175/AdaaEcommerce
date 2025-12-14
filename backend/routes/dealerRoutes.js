const {giveProducts, editProduct} = require("../controllers/dealer");
const router = require('express').Router();
const uploadForProducts = require('../middlewares/multer.middleware');
const {addProduct, updateProduct, removeProduct} = require("../controllers/products");

router.get('/getAllProducts', giveProducts);
router.put('/updateProduct', uploadForProducts.any(),updateProduct);
router.post('/add', uploadForProducts.any(), addProduct);
router.delete('/deleteProduct/:id',removeProduct);

module.exports = router;