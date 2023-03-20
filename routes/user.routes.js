const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')

router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)

router.get('/check', auth, (req, res) => {
    res.send("working")
})

module.exports = router;