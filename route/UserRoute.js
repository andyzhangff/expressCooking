const router = require('express').Router();
const userController = require('../controller/UserController')

router.post('/register', userController.user_register);

router.get('/find', userController.user_find);

router.patch('/update', userController.user_update);

router.delete('/delete', userController.user_delete);

module.exports = router;