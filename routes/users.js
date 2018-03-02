const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/users')

const md_auth = require('../middlewares/authenticated');

router.post('/login', UserControllers.login);

router.post('/register', UserControllers.createUser);

router.get('/activation/:token', UserControllers.verifyToken);

router.put('/password', md_auth.ensureAuth, UserControllers.changePassword)

module.exports = router;