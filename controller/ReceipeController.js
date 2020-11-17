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
    const receipe = new Receipe({
        name: req.body.name,
        ingrediant: req.body.ingrediant,
        step: req.body.step,
        owner: req.body.owner
    });
    try {
        await receipe.save();
        res.status(200).send('receipe saved');
    } catch {
        res.status(400).send('receipe saved fail');
    }
}

module.exports = {
    get_receipes,
    add_receipe,
}