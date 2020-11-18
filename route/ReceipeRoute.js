const express = require('express');
const router = express.Router();
const pictureUploadMulter = require('./Multer');
const receipeController = require('../controller/ReceipeController');

// Multer File upload settings
const DIR = 'public/receipes/';
const upload = pictureUploadMulter(DIR);

const pictureUploadMulterMiddleware = upload.fields([
    { name: 'receipePictureSource', maxCount: 1 },
    { name: 'stepPictureSource[]', maxCount: 20 }
])

router.post('/store-receipe', pictureUploadMulterMiddleware, receipeController.add_receipe);

module.exports = router;