const express = require('express');
const router = express.Router();
const UsertestFileUpload = require('./Multer');
const receipeController = require('../controller/ReceipeController');

// Multer File upload settings
const DIR = './public/';
const upload = UsertestFileUpload(DIR);

// POST User
router.post('/create-receipe', upload.array('steps', 30), receipeController.add_receipe);

module.exports = router;