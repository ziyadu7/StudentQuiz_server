const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/getUserData',adminController.getData)
router.patch('/acceptUser',adminController.acceptUser)
router.post('/addQuestion',adminController.addQuestion)
router.post('/login',adminController.login)

module.exports = router