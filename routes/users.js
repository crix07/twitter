const express = require('express')
const router = express.Router()

const { createUser, getUsers } = require('../controllers/users')

router.get('/users', getUsers)

router.get('/', (req, res)=>{
    res.render('index', { title: 'this works' })
})

module.exports = router