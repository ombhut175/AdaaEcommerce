const {giveProducts, editProduct} = require("../controllers/dealer");
const router = require('express').Router();
const uploadForProducts = require('../middlewares/multer.middleware');
const {addProduct} = require("../controllers/products");

router.get('/getAllProducts', giveProducts);
router.put('/updateProduct', uploadForProducts.any(),addProduct);

module.exports = router;