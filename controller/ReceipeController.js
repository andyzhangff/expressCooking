const Receipe = require('../model/Receipe');
const Mongoose = require('mongoose');

const get_receipe = (req, res) => {
    const username = req.query.username;
    const role = req.query.role;
    const id = Mongoose.Types.ObjectId(req.params.id).str;
        Receipe.find({ receipeId: id }, (err, receipe) => {
            if (err || !receipe) return res.status(404).send('receipe id is wrong');
            res.status(200).json(receipe[0]);
        });
}

const add_receipe = async(req, res) => {
    const stepObj = [];
    receipe_path = req.files['receipePictureSource'][0]['path'];

    for (key in req.body.steps) {
        stepObj.push({
            step: req.body.steps[key],
            stepPath: req.body.stepPicturePath[key]
        })
    }
    const receipe = new Receipe({
        name: {
            receipe_name: req.body.receipeName,
            receipe_path: req.body.receipePicture,
            receipeFeature: req.body.receipeFeature,
        },
        ingrediant: req.body.ingrediants,
        step: stepObj
    });
    console.log(receipe_path);
    try {
        await receipe.save();
        res.status(200).json({ result: 'receipe saved' });
    } catch {
        res.status(400).send('receipe saved fail');
    }
}

module.exports = {
    get_receipe,
    add_receipe,
}