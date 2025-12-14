const router = require('express').Router();
const upload = require('../middlewares/multer.middleware');
const {changeImages, giveStaticImages, givePermission, giveAllUsers, deleteUser, removePermission,
    giveUserAndOrdersInfo
} = require("../controllers/admin");

router.get('/', giveAllUsers);
router.get('/getStaticImages', giveStaticImages);
router.put('/removePermission',removePermission);
router.put('/uploadImages',upload.single("image"),changeImages);
router.put('/givePermissions', givePermission);
router.get('/:userId',giveUserAndOrdersInfo);
router.delete('/:userId', deleteUser);



module.exports = router;