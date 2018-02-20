const express = require('express')
const router = express.Router()

const { createUser, getUsers } = require('../controllers/users')

router.get('/users', getUsers)

router.get('/', (req, res)=>{
    res.send('this works')
})


router.post('/register', createUser)

module.exports = router