const {giveProducts} = require("../controllers/dealer");
const router = require('express').Router();

router.get('/getAllProducts', giveProducts);

module.exports = router;