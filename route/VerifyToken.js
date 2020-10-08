const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.WEB_TOKEN);
        req.user = verified;
    } catch {
        res.status(400), send('Invalid Token');
    }
    next();

}