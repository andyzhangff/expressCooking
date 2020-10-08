const User = require('../model/User');
const UserValidation = require('../validation/UserValidation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user_register = async(req, res) => {

    const { error } = UserValidation.registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        id: req.body.id,
        password: passwordHashed,
    });
    const userSaved = await user.save();
    res.send(userSaved);
};

const user_find = (req, res) => {

    const token = jwt.sign({
        data: 'foobar'
    }, process.env.WEB_TOKEN, { expiresIn: '1h' });
    res.header('auth-token', token);

    let id = req.query.id;
    User.findOne({ 'id': id }, 'name gender', (err, user) => {
        res.send(user);
    });
};

const user_update = (req, res) => {
    let id = req.query.id;
    let age = req.query.age;
    User.updateOne({ id: id }, { age: age }, () => {
        res.send('age is updated');
    });
};

const user_delete = (req, res) => {
    let id = req.query.id;
    User.deleteOne({ id: id }, (err, user) => {
        if (err) return handleError(err);
        res.send('Deleted');
    });
};

module.exports = {
    user_register,
    user_find,
    user_update,
    user_delete
}