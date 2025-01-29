const router = require('express').Router();
const upload = require('../middlewares/multer.middleware');
const {changeImages, giveStaticImages} = require("../controllers/admin");


router.put('/uploadImages',upload.single("image"),changeImages);
router.get('/getStaticImages', giveStaticImages);

module.exports = router;