const {giveProducts, editProduct} = require("../controllers/dealer");
const router = require('express').Router();
const uploadForProducts = require('../middlewares/multer.middleware');
const {addProduct, updateProduct} = require("../controllers/products");

router.get('/getAllProducts', giveProducts);
router.put('/updateProduct', uploadForProducts.any(),updateProduct);
router.post('/addProduct', addProduct);

module.exports = router;