const express = require('express');
const multer = require('multer');
const router = express.Router();
const GenreModel = require('../model/Genre');

// Multer File upload settings
const DIR = './public/genre/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

// Multer Mime Type Validation
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// POST User
router.post('/create-genre', upload.single('avatar'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const Genre = new GenreModel({
        name: req.body.name,
        avatar: url + '/public/genre/' + req.file.filename
    });
    Genre.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Genre registered successfully!",
            genreCreated: {
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

// GET Genres
router.get("/getallgenre/:pageid", async(req, res) => {
    const genrePerPage = 6;
    const totalGenres = await GenreModel.find();

    GenreModel.find().
    limit(6).
    skip(genrePerPage * req.params.pageid)
        .exec((err, data) => {
            res.status(200).json({
                genre: data,
                genreLength: totalGenres.length
            });
        });
});

module.exports = router;