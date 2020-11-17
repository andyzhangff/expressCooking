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
        username: req.body.username,
        email: req.body.email,
        password: passwordHashed,
    });
    try {
        const userSaved = await user.save();
        res.status(200).send('userinfo registered');
    } catch {
        res.status(400).send('userinfo register fail');
    }
};

const user_login = (req, res) => {
    const { error } = UserValidation.loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const req_password = req.body.password;
    const req_username = req.body.username;

    try {
        User.findOne({ 'username': req_username }, 'password', (err, search_result) => {
            if (search_result) {
                const login_result = bcrypt.compareSync(req_password, search_result['password']);
                // res.status(400).send(err);
                if (login_result) {
                    User.findOne({ 'username': req_username }, '_id', (err, data) => {
                        const user_id = data['_id']
                        const token = generateToken(user_id);
                        res.status(200).json({ loginResult: 'login success', token: token });
                    });
                } else {
                    res.status(200).json({ loginResult: 'password wrong' });
                }
            } else {
                res.status(200).json({ loginResult: 'username not exist' });
            }

        });
    } catch (err) {
        res.status(400).json({ err: "an error at backend" });
        console.log(err);
    }
};

const user_guard = (req, res) => {
    try {
        const auth_token = req.headers.authorization;
        const verified = jwt.verify(auth_token, process.env.WEB_TOKEN);
        // console.log(verified);
        const token_decoded = jwt.decode(auth_token);
        User.findOne({ '_id': token_decoded['id'] }, 'username', (err, username) => {
            const result = {
                "result": 'verify OK',
                "username": username['username']
            };
            res.status(200).json(result);
            console.log(result);

        });
    } catch {
        const result = {
            "result": 'verify not OK',
            "username": ""
        };
        res.status(200).json(result);
        console.log(result);
    }
};

const user_find = (req, res) => {
    if (req.user) {
        const username = req.query.username;
        User.findOne({ 'username': username }, 'email', (err, email) => {
            res.status(200).json(email);
        });
    }
};

const user_update = (req, res) => {
    let username = req.query.username;
    let email = req.query.email;
    User.updateOne({ username: username }, { email: email }, () => {
        res.send('email is updated');
    });
};

const user_delete = (req, res) => {
    let id = req.query.id;
    User.deleteOne({ id: id }, (err, user) => {
        if (err) return handleError(err);
        res.send('Deleted');
    });
};

function generateToken(data) {
    const token = jwt.sign({
        id: data
    }, process.env.WEB_TOKEN, { expiresIn: '1h' });
    return token;
}

module.exports = {
    user_register,
    user_find,
    user_update,
    user_delete,
    user_login,
    user_guard
}