const router = require('express').Router();
const userController = require('../controller/UserController');
const verifyToken = require('../route/VerifyToken');
const receipeController = require('../controller/ReceipeController');

router.post('/register', userController.user_register);

router.post('/login', userController.user_login);

router.post('/add-receipe', verifyToken, receipeController.add_receipe);

router.get('/get-receipes', verifyToken, receipeController.get_receipes);

router.get('/find', verifyToken, userController.user_find);

router.get('/guard', userController.user_guard);

router.patch('/update', verifyToken, userController.user_update);

router.delete('/delete', verifyToken, userController.user_delete);

module.exports = router;