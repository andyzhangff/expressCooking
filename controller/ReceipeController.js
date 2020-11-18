const Receipe = require('../model/Receipe');

const get_receipes = (req, res) => {
    const username = req.query.username;
    const role = req.query.role;
    if (role == 'admin') {

        Receipe.find((err, receipes) => {
            if (err || !receipes) return res.status(404).end();
            res.status(200).json(receipes);
        });
    }
    if (role == 'user') {
        Receipe.find({ owner: username }, (err, receipes) => {
            res.status(200).json(receipes);
        });
    }
}

const add_receipe = async(req, res) => {
    const stepObj = [];
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
    try {
        await receipe.save();
        res.status(200).json({ result: 'receipe saved' });
    } catch {
        res.status(400).send('receipe saved fail');
    }
}

module.exports = {
    get_receipes,
    add_receipe,
}