const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const ctrlImage = require('../controllers/image.controller');


router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/userProfile', ctrlUser.userProfile);
router.post('/uploadImage',ctrlImage.uploadImage);
router.get('/uploadImages',ctrlImage.getImages);
router.get('/uploadImage',ctrlImage.getImages);

module.exports = router;