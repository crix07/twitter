const express = require('express')
const router = express.Router()

const { verifyToken, createUser, getUsers } = require('../controllers/users')

router.get('/users', getUsers)

router.get('/', (req, res)=>{
    res.send('this works')
})


router.post('/register', createUser)

router.get('/activation/:token?', verifyToken)


module.exports = router