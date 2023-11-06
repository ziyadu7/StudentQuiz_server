const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')

router.post('/login',adminController.login)
router.get('/getUserData',auth.verifyAdminToken,adminController.getData)
router.patch('/acceptUser',auth.verifyAdminToken,adminController.acceptUser)
router.post('/addQuestion',auth.verifyAdminToken,adminController.addQuestion)

module.exports = router