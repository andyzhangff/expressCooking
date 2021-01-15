const Receipe = require('../model/Receipe');
const Mongoose = require('mongoose');
const path = require('path');

const get_receipe = (req, res) => {
    const username = req.query.username;
    const role = req.query.role;
    const id = Mongoose.Types.ObjectId(req.params.id).str;
        Receipe.find({ receipeId: id }, (err, receipe) => {
            if (err || !receipe) return res.status(404).send('receipe id is wrong');
            res.sendFile(receipe[0]['name']['receipe_path'],{root:'./'});
        });
}

const add_receipe = async(req, res) => {
   
    const receipe = new Receipe({
        name: {
            receipe_name: req.body.receipeName,
            receipe_path: req.receipe_path,
            receipeFeature: req.body.receipeFeature,
        },
        ingrediant: req.body.ingrediants,
        step: req.steps
    });
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