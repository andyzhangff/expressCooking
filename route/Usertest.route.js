const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();
const Usertest = require('../model/Usertest');
const UsertestFileUpload = require('./Multer')

// Multer File upload settings
const DIR = './public/';
const upload = UsertestFileUpload(DIR);

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, fileName)
//     }
// });

// // Multer Mime Type Validation
// var upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" ||
//             file.mimetype == "image/jpg" ||
//             file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

// POST User
router.post('/create-user', upload.single('avatar'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user_test = new Usertest({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        avatar: url + '/public/' + req.file.filename
    });
    user_test.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                name: result.name,
                avatar: result.avatar
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

// GET All User
router.get("/getalluser", (req, res, next) => {
    Usertest.find().then(data => {
        res.status(200).json({
            message: "Users retrieved successfully!",
            users: data
        });
    });
});

// GET User
router.get("/:id", (req, res, next) => {
    Usertest.findById(req.params.id).then(data => {
        if (data) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "User not found!"
            });
        }
    });
});

module.exports = router;