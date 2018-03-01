const express = require('express')
const router = express.Router()
const passport = require('passport')
const UserControllers = require('../controllers/users')

router.get('/users', UserControllers.getUsers)

router.post('/login', UserControllers.login);

router.post('/register', UserControllers.createUser);

router.get('/activation/:token', UserControllers.verifyToken);



module.exports = router;