const multer = require('multer');
const fs = require('fs');

const uploadFile = (dir) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const filePath = dir + req.body.receipeName + '/';
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
            }
            cb(null, filePath);
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, fileName)
        }
    });

    // Multer Mime Type Validation
    let upload = multer({
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
    return upload;
}

module.exports = uploadFile;