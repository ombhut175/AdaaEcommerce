const router = require('express').Router();
const upload = require('../middlewares/multer.middleware');
const {changeImages, giveStaticImages, givePermission} = require("../controllers/admin");


router.put('/uploadImages',upload.single("image"),changeImages);
router.get('/getStaticImages', giveStaticImages);
router.put('/givePermissions', givePermission);

module.exports = router;