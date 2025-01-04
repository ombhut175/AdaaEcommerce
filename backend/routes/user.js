const express = require('express');
const upload = require('../middlewares/multer.middleware');
const {changeProfilePicture, setProfilePictureToDefault} = require("../controllers/user");

//declaration
const router = express.Router();

//routes

router.post('/uploadProfilePicture', upload.single('profilePicture'), changeProfilePicture);
router.delete('/setProfilePictureToDefault', setProfilePictureToDefault);

module.exports = router