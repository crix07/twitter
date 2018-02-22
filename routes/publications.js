const express = require('express')
const router = express.Router()

const { createPublic, getPublics, deletePublic, updatePublic } = require('../controllers/publications')


router.post('/create-post', createPublic);

router.get('/get-posts', getPublics);

router.put('/update-post/:id', updatePublic)

router.delete('/destroy-post/:id', deletePublic)


module.exports = router;
