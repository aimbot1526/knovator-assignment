const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const postController = require('../controllers/postController')

router.post('/create/:id', auth, postController.Create)
router.get('/view/:id', auth, postController.View)
router.post('/update/:id', auth, postController.Update)
router.delete('/delete/:id', auth, postController.Delete)
router.get('/geoloc', auth, postController.findByCoordinates)
router.get('/postcount', auth, postController.postCount)

router.get('/check', auth, (req, res) => {
    res.send("working")
})

module.exports = router;