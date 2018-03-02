const express = require('express')
const router = express.Router()

const publiControllers = require('../controllers/publications')
const md_auth = require('../middlewares/authenticated');

router.post('/create-post', md_auth.ensureAuth, publiControllers.createPublic);

router.get('/get-posts', publiControllers.getPublics);

router.delete('/destroy-post/:id', publiControllers.deletePublic)


module.exports = router;