const router = require('express').Router();

router.get('/', (req, res) => {

    res.send('You are verified!');


});

module.exports = router;