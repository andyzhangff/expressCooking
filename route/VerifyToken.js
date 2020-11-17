const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const auth_token = req.headers.authorization;
    if (!auth_token) return res.status(401).send('Access Denied');
    // // res.status(200), send('token');

    try {
        const verified = jwt.verify(auth_token, process.env.WEB_TOKEN);
        req.user = verified;
        // console.log(verified);
        // res.json(verified);
    } catch {
        res.status(200).send('Invalid Token');
    }
    // res.json(auth_token);
    next();

}