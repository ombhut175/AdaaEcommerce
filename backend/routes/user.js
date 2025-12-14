const express = require('express');
const upload = require('../middlewares/multer.middleware');
const {
    changeProfilePicture,
    setProfilePictureToDefault,
    handleGiveUserInfo,
    handleEditProfile
} = require("../controllers/user");

//declaration
const router = express.Router();

//routes

router.post('/uploadProfilePicture', upload.single('profilePicture'), changeProfilePicture);
router.delete('/setProfilePictureToDefault', setProfilePictureToDefault);
router.get('/userInfo', handleGiveUserInfo);
router.put(
    '/editProfile',
    upload.single('profilePicture'),
    handleEditProfile
)

module.exports = router